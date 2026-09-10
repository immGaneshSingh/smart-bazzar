/**
 * Production-Ready Google Cloud Function / Firebase Functions v2 Webhook Handler
 * 
 * Target Platform: Google Cloud Functions (2nd Gen) / Firebase Functions v2 (Node.js 18+ / 20+)
 * Architecture: Serverless Event Ingestion with Distributed Idempotency & Cryptographic Verification
 * Gateways Supported: Stripe & Razorpay (Multi-gateway routing via headers)
 * 
 * Security & Reliability Highlights:
 * 1. Cryptographic Signature Verification using raw byte buffer (`req.rawBody`) to prevent serialization divergence.
 * 2. Distributed Idempotency backed by Firestore atomic transactions (`runTransaction`), preventing race conditions.
 * 3. Secret Isolation via Google Cloud Secret Manager (`defineSecret`), avoiding env or disk exposure.
 * 4. Strict Error Boundaries to eliminate internal stack-trace leaks while signaling gateway retry semantics (500 vs 200).
 */

import { onRequest, Request } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import crypto from 'crypto';
import Stripe from 'stripe';

// ============================================================================
// 1. Secrets Declaration (Google Cloud Secret Manager Integration)
// ============================================================================
// Stored securely in Google Secret Manager; injected at runtime without disk or env exposure
const stripeWebhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET');
const stripeApiKey = defineSecret('STRIPE_SECRET_KEY');
const razorpayWebhookSecret = defineSecret('RAZORPAY_WEBHOOK_SECRET');

// ============================================================================
// 2. Firebase Admin Initialization (Singleton Pattern)
// ============================================================================
if (!getApps().length) {
  initializeApp();
}
const db = getFirestore();

// Webhook Event Record Interface for distributed state tracking
export interface WebhookEventDoc {
  eventId: string;
  gateway: 'stripe' | 'razorpay';
  eventType: string;
  status: 'processing' | 'processed' | 'failed';
  receivedAt: Timestamp;
  processedAt?: Timestamp;
  orderId?: string;
  amount?: number;
  currency?: string;
  error?: string;
  attemptCount: number;
}

// ============================================================================
// 3. Cryptographic Signature Verification Helpers
// ============================================================================

/**
 * Validates Stripe webhook payload using the official Stripe SDK.
 * CRITICAL: Must use `req.rawBody` (the raw Buffer), NOT `req.body` (parsed JSON),
 * because whitespace reformatting breaks HMAC-SHA256 digest validation.
 */
function verifyStripeSignature(
  rawBody: Buffer,
  signatureHeader: string | string[] | undefined,
  secret: string,
  stripeClient: Stripe
): Stripe.Event {
  if (!signatureHeader || typeof signatureHeader !== 'string') {
    throw new Error('MISSING_STRIPE_SIGNATURE_HEADER');
  }

  // Tolerance window is enforced by Stripe SDK (defaults to 300 seconds to prevent replay attacks)
  return stripeClient.webhooks.constructEvent(rawBody, signatureHeader, secret);
}

/**
 * Validates Razorpay webhook payload using raw crypto HMAC-SHA256 comparison.
 * Uses timing-safe buffer comparison to prevent side-channel timing attacks.
 */
function verifyRazorpaySignature(
  rawBody: Buffer,
  signatureHeader: string | string[] | undefined,
  secret: string
): boolean {
  if (!signatureHeader || typeof signatureHeader !== 'string') {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
  const receivedBuffer = Buffer.from(signatureHeader, 'utf8');

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  // Constant-time comparison prevents byte-by-byte timing attacks
  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

// ============================================================================
// 4. Fulfillment Logic (Isolated Domain Logic)
// ============================================================================
async function fulfillOrder(
  transaction: FirebaseFirestore.Transaction,
  orderId: string,
  paymentDetails: {
    gatewayPaymentId: string;
    amountPaid: number;
    currency: string;
    status: 'paid';
  }
) {
  const orderRef = db.collection('orders').doc(orderId);
  const orderSnapshot = await transaction.get(orderRef);

  if (!orderSnapshot.exists) {
    throw new Error(`ORDER_NOT_FOUND: ${orderId}`);
  }

  const orderData = orderSnapshot.data();
  if (orderData?.paymentStatus === 'paid') {
    // Already fulfilled; idempotency safeguard at entity level
    return;
  }

  transaction.update(orderRef, {
    paymentStatus: paymentDetails.status,
    gatewayTransactionId: paymentDetails.gatewayPaymentId,
    amountPaid: paymentDetails.amountPaid,
    paymentCurrency: paymentDetails.currency,
    paidAt: FieldValue.serverTimestamp(),
    status: 'confirmed',
    'trackingSteps.0.completed': true,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

// ============================================================================
// 5. Cloud Function v2 Endpoint Definition
// ============================================================================
export const paymentGatewayWebhook = onRequest(
  {
    region: 'asia-east1', // Or 'us-central1' matching project deployment target
    secrets: [stripeWebhookSecret, stripeApiKey, razorpayWebhookSecret],
    concurrency: 80,
    timeoutSeconds: 60,
    memory: '512MiB',
    maxInstances: 10,
    invoker: 'public', // Webhook must receive external calls from gateway IP ranges
  },
  async (req: Request, res: any) => {
    const correlationId = `wh_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    
    // 1. Enforce strict HTTP method validation
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({
        error: 'METHOD_NOT_ALLOWED',
        message: 'Webhooks only accept HTTP POST requests.',
      });
    }

    // 2. Ensure rawBody is present (Cloud Functions preserves this on the Request object)
    const rawBody = (req as any).rawBody as Buffer | undefined;
    if (!rawBody || !Buffer.isBuffer(rawBody)) {
      console.error(`[${correlationId}] Missing rawBody. Ensure express.raw() or native functions engine is used.`);
      return res.status(400).json({
        error: 'INVALID_RAW_PAYLOAD',
        message: 'Webhook payload verification requires unaltered raw bytes.',
      });
    }

    const gatewayHeader = req.headers['x-payment-gateway'] || 'stripe';
    let eventId = '';
    let eventType = '';
    let orderId: string | undefined;
    let paymentAmount = 0;
    let currency = 'INR';
    let gatewayTransactionId = '';

    // 3. Cryptographic Signature Verification Phase
    try {
      if (gatewayHeader === 'razorpay' || req.headers['x-razorpay-signature']) {
        const signature = req.headers['x-razorpay-signature'];
        const isValid = verifyRazorpaySignature(
          rawBody,
          signature,
          razorpayWebhookSecret.value()
        );

        if (!isValid) {
          console.warn(`[${correlationId}] Razorpay signature validation rejected.`);
          return res.status(400).json({ error: 'INVALID_SIGNATURE' });
        }

        const payload = JSON.parse(rawBody.toString('utf8'));
        eventId = payload.event_id || payload.payload?.payment?.entity?.id || `rzp_${Date.now()}`;
        eventType = payload.event;
        orderId = payload.payload?.payment?.entity?.notes?.orderId;
        paymentAmount = (payload.payload?.payment?.entity?.amount || 0) / 100;
        currency = payload.payload?.payment?.entity?.currency || 'INR';
        gatewayTransactionId = payload.payload?.payment?.entity?.id;
      } else {
        // Default: Stripe Webhook
        const stripeSignature = req.headers['stripe-signature'];
        const stripe = new Stripe(stripeApiKey.value(), {
          apiVersion: '2023-10-16' as any,
          typescript: true,
        });

        const stripeEvent = verifyStripeSignature(
          rawBody,
          stripeSignature,
          stripeWebhookSecret.value(),
          stripe
        );

        eventId = stripeEvent.id;
        eventType = stripeEvent.type;

        if (stripeEvent.type === 'payment_intent.succeeded') {
          const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
          orderId = paymentIntent.metadata?.orderId;
          paymentAmount = paymentIntent.amount_received / 100;
          currency = paymentIntent.currency.toUpperCase();
          gatewayTransactionId = paymentIntent.id;
        } else if (stripeEvent.type === 'checkout.session.completed') {
          const session = stripeEvent.data.object as Stripe.Checkout.Session;
          orderId = session.client_reference_id || session.metadata?.orderId;
          paymentAmount = (session.amount_total || 0) / 100;
          currency = (session.currency || 'inr').toUpperCase();
          gatewayTransactionId = (session.payment_intent as string) || session.id;
        }
      }
    } catch (sigErr: any) {
      // Signature mismatch or expired timestamp; drop request immediately with 400 Bad Request
      console.warn(`[${correlationId}] Signature verification failed:`, sigErr.message);
      return res.status(400).json({
        error: 'SIGNATURE_VERIFICATION_FAILED',
        message: 'Security validation rejected payload.',
      });
    }

    // 4. Distributed Idempotency & Atomic Concurrency Control (Firestore Transaction)
    const eventRef = db.collection('webhook_events').doc(eventId);

    try {
      let isAlreadyProcessed = false;

      await db.runTransaction(async (transaction) => {
        const eventDoc = await transaction.get(eventRef);

        if (eventDoc.exists) {
          const data = eventDoc.data() as WebhookEventDoc;
          if (data.status === 'processed') {
            isAlreadyProcessed = true;
            return; // Duplicate retry safely detected; abort state mutation
          }
          if (data.status === 'processing') {
            // Event is currently being processed by another concurrent invocation
            const lockAgeSeconds = (Timestamp.now().seconds - data.receivedAt.seconds);
            if (lockAgeSeconds < 30) {
              isAlreadyProcessed = true;
              return;
            }
            // Lock expired (e.g., node crashed mid-flight); proceed with retry
          }
        }

        // Acquire lock or set initial status
        transaction.set(
          eventRef,
          {
            eventId,
            gateway: gatewayHeader === 'razorpay' ? 'razorpay' : 'stripe',
            eventType,
            status: 'processing',
            receivedAt: FieldValue.serverTimestamp(),
            attemptCount: FieldValue.increment(1),
            orderId: orderId || null,
            amount: paymentAmount,
            currency,
          },
          { merge: true }
        );

        // Execute entity-level fulfillment atomically inside the same transaction
        if (orderId && (eventType === 'payment_intent.succeeded' || eventType === 'order.paid' || eventType === 'checkout.session.completed')) {
          await fulfillOrder(transaction, orderId, {
            gatewayPaymentId: gatewayTransactionId,
            amountPaid: paymentAmount,
            currency,
            status: 'paid',
          });
        }

        // Mark event as successfully processed
        transaction.update(eventRef, {
          status: 'processed',
          processedAt: FieldValue.serverTimestamp(),
        });
      });

      if (isAlreadyProcessed) {
        console.log(`[${correlationId}] Idempotent skip: Event ${eventId} already handled.`);
        // Gateways expect 200 OK to stop retrying
        return res.status(200).json({
          received: true,
          status: 'already_processed',
          eventId,
        });
      }

      console.log(`[${correlationId}] Webhook ${eventId} (${eventType}) processed successfully.`);
      return res.status(200).json({
        received: true,
        status: 'success',
        eventId,
      });
    } catch (processingError: any) {
      console.error(`[${correlationId}] Fulfillment error during webhook processing:`, processingError);

      // Record failure state in firestore without leaking stack trace to client
      try {
        await eventRef.set(
          {
            status: 'failed',
            error: processingError.message || 'Unknown fulfillment error',
            failedAt: FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      } catch (logErr) {
        console.error('Failed to log webhook error record:', logErr);
      }

      // Return 500 so gateway knows to retry delivery according to its exponential backoff schedule
      return res.status(500).json({
        error: 'INTERNAL_PROCESSING_ERROR',
        correlationId,
      });
    }
  }
);
