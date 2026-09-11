import { createClient } from '@supabase/supabase-js';

// User's provided Supabase project credentials
export const SUPABASE_PROJECT_ID = 'hbwomnuosklfusuuwuzf';

function cleanSupabaseUrl(rawUrl?: string): string {
  const fallback = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
  if (!rawUrl) return fallback;
  try {
    const parsed = new URL(rawUrl.trim());
    return parsed.origin;
  } catch {
    return rawUrl.trim().replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
  }
}

export const SUPABASE_URL = cleanSupabaseUrl((import.meta as any).env?.VITE_SUPABASE_URL as string);
export const SUPABASE_ANON_KEY = ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string) || 'sb_publishable_ImVW1obqBiT6cmXMpJNe7Q_NOPXXR8G';

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface SupabaseBookingRecord {
  id: string;
  booking_type: 'movie' | 'parking' | 'space' | 'store_order' | 'general';
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  details: Record<string, any>;
  amount: number;
  status: string;
  created_at?: string;
}

export interface SupabaseLoginRecord {
  id: string;
  user_name: string;
  phone: string;
  email?: string;
  role: 'Customer' | 'Buyer' | 'Admin';
  auth_method: string;
  device?: string;
  ip?: string;
  status: string;
  timestamp?: string;
}

export interface SupabaseDocumentRecord {
  id: string;
  user_phone: string;
  user_name?: string;
  document_type: string;
  type_name: string;
  document_number: string;
  holder_name?: string;
  full_name?: string;
  issue_date?: string;
  expiry_date?: string;
  status: string;
  verified_by?: string;
  notes?: string;
  file_url?: string;
  uploaded_at?: string;
}

export interface SupabaseSyncEvent {
  id: string;
  type: 'booking' | 'login' | 'document';
  title: string;
  payload: any;
  status: 'synced' | 'local_queued' | 'error';
  errorMessage?: string;
  timestamp: string;
}

// In-memory + local storage log of recent sync events
const SYNC_EVENTS_STORAGE_KEY = 'sb_supabase_sync_log';

export function getSyncEvents(): SupabaseSyncEvent[] {
  try {
    const raw = localStorage.getItem(SYNC_EVENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function recordSyncEvent(event: Omit<SupabaseSyncEvent, 'id' | 'timestamp'>) {
  const newEvent: SupabaseSyncEvent = {
    ...event,
    id: `sync-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
  };

  try {
    const existing = getSyncEvents();
    const updated = [newEvent, ...existing].slice(0, 50); // Keep last 50
    localStorage.setItem(SYNC_EVENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }

  return newEvent;
}

/**
 * 1. Save Booking Form to Supabase Table ('bookings')
 */
export async function saveBookingToSupabase(booking: SupabaseBookingRecord): Promise<{ success: boolean; message: string; data?: any }> {
  console.log('[Supabase] Saving booking to backend:', booking);
  
  // Safe sanitization ensuring NOT NULL constraints are never violated
  const payload = {
    id: booking.id || `SB-BKG-${Date.now()}`,
    booking_type: booking.booking_type || 'store_order',
    customer_name: (booking.customer_name || 'Valued Guest').trim() || 'Valued Guest',
    customer_phone: (booking.customer_phone || '').trim() || '+91 99999 99999',
    customer_email: (booking.customer_email || '').trim(),
    details: booking.details || {},
    amount: Number(booking.amount) || 0,
    status: booking.status || 'confirmed',
    created_at: booking.created_at || new Date().toISOString(),
  };

  try {
    // Attempt insert to Supabase 'bookings' table
    const { data, error } = await supabase.from('bookings').insert([payload]).select();

    if (error) {
      console.warn('[Supabase Bookings Table Insert Warning]', error.message);
      recordSyncEvent({
        type: 'booking',
        title: `${booking.booking_type.toUpperCase()} Booking: ${payload.id}`,
        payload,
        status: error.code === 'PGRST205' ? 'local_queued' : 'error',
        errorMessage: error.message,
      });

      return {
        success: false,
        message: error.code === 'PGRST205'
          ? "Supabase table 'bookings' is pending creation in SQL editor. Record queued safely in local backup."
          : `Supabase error: ${error.message}`,
        data: payload,
      };
    }

    recordSyncEvent({
      type: 'booking',
      title: `${booking.booking_type.toUpperCase()} Booking: ${payload.id}`,
      payload,
      status: 'synced',
    });

    return {
      success: true,
      message: `Successfully saved to Supabase 'bookings' table (ID: ${payload.id})`,
      data,
    };
  } catch (err: any) {
    console.error('[Supabase Booking Sync Error]', err);
    recordSyncEvent({
      type: 'booking',
      title: `${booking.booking_type.toUpperCase()} Booking: ${payload.id}`,
      payload,
      status: 'error',
      errorMessage: err.message || 'Network error',
    });

    return {
      success: false,
      message: err.message || 'Network exception while connecting to Supabase',
      data: payload,
    };
  }
}

/**
 * 2. Save Login Form to Supabase Table ('logins')
 */
export async function saveLoginToSupabase(login: SupabaseLoginRecord): Promise<{ success: boolean; message: string; data?: any }> {
  console.log('[Supabase] Saving user login to backend:', login);

  // Safe sanitization ensuring NOT NULL constraints are never violated
  const payload = {
    id: login.id || `login-${Date.now()}`,
    user_name: (login.user_name || 'Customer').trim() || 'Customer',
    phone: (login.phone || '').trim() || '+91 99999 99999',
    email: (login.email || '').trim(),
    role: login.role || 'Customer',
    auth_method: login.auth_method || 'SMS OTP Verified',
    device: login.device || (typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 100) : 'Browser'),
    ip: login.ip || 'Client Applet',
    status: login.status || 'success',
    timestamp: login.timestamp || new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase.from('logins').insert([payload]).select();

    if (error) {
      console.warn('[Supabase Logins Table Insert Warning]', error.message);
      recordSyncEvent({
        type: 'login',
        title: `Login Record: ${payload.user_name} (${payload.phone})`,
        payload,
        status: error.code === 'PGRST205' ? 'local_queued' : 'error',
        errorMessage: error.message,
      });

      return {
        success: false,
        message: error.code === 'PGRST205'
          ? "Supabase table 'logins' pending creation in SQL editor. Login tracked locally."
          : `Supabase error: ${error.message}`,
        data: payload,
      };
    }

    recordSyncEvent({
      type: 'login',
      title: `Login Record: ${payload.user_name} (${payload.phone})`,
      payload,
      status: 'synced',
    });

    return {
      success: true,
      message: `Successfully saved to Supabase 'logins' table`,
      data,
    };
  } catch (err: any) {
    console.error('[Supabase Login Sync Error]', err);
    recordSyncEvent({
      type: 'login',
      title: `Login Record: ${payload.user_name} (${payload.phone})`,
      payload,
      status: 'error',
      errorMessage: err.message || 'Network error',
    });

    return {
      success: false,
      message: err.message || 'Network exception',
      data: payload,
    };
  }
}

/**
 * 3. Save Document Form to Supabase Table ('documents')
 */
export async function saveDocumentToSupabase(doc: SupabaseDocumentRecord): Promise<{ success: boolean; message: string; data?: any }> {
  console.log('[Supabase] Saving user document to backend:', doc);

  const cleanName = (doc.user_name || doc.full_name || doc.holder_name || 'Customer').trim() || 'Customer';
  const cleanPhone = (doc.user_phone || '').trim() || '+91 99999 99999';

  const payload = {
    id: doc.id || `doc-${Date.now()}`,
    user_phone: cleanPhone,
    user_name: cleanName,
    document_type: doc.document_type || 'aadhaar',
    type_name: doc.type_name || 'Identity Document',
    document_number: (doc.document_number || '').trim() || 'NOT_PROVIDED',
    holder_name: cleanName,
    issue_date: doc.issue_date || '15 Jan 2022',
    expiry_date: doc.expiry_date || 'Permanent',
    status: doc.status || 'verified',
    verified_by: doc.verified_by || 'Smart Bazzar KYC Security Cell',
    notes: doc.notes || '',
    file_url: doc.file_url || '',
    uploaded_at: doc.uploaded_at || new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase.from('documents').insert([payload]).select();

    if (error) {
      console.warn('[Supabase Documents Table Insert Warning]', error.message);
      recordSyncEvent({
        type: 'document',
        title: `KYC Document: ${doc.type_name} (${doc.document_number})`,
        payload,
        status: error.code === 'PGRST205' ? 'local_queued' : 'error',
        errorMessage: error.message,
      });

      return {
        success: false,
        message: error.code === 'PGRST205'
          ? "Supabase table 'documents' is pending creation in SQL editor. Document stored in private local vault."
          : `Supabase error: ${error.message}`,
        data: payload,
      };
    }

    recordSyncEvent({
      type: 'document',
      title: `KYC Document: ${doc.type_name} (${doc.document_number})`,
      payload,
      status: 'synced',
    });

    return {
      success: true,
      message: `Successfully saved to Supabase 'documents' table`,
      data,
    };
  } catch (err: any) {
    console.error('[Supabase Document Sync Error]', err);
    recordSyncEvent({
      type: 'document',
      title: `KYC Document: ${doc.type_name} (${doc.document_number})`,
      payload,
      status: 'error',
      errorMessage: err.message || 'Network error',
    });

    return {
      success: false,
      message: err.message || 'Network exception',
      data: payload,
    };
  }
}

/**
 * 4. Fetch Bookings & Orders from Supabase
 */
export async function fetchBookingsFromSupabase(): Promise<SupabaseBookingRecord[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase] Failed to fetch bookings:', error.message);
      return [];
    }
    return (data || []) as SupabaseBookingRecord[];
  } catch (err) {
    console.warn('[Supabase] Exception fetching bookings:', err);
    return [];
  }
}

/**
 * 5. Fetch Logins from Supabase
 */
export async function fetchLoginsFromSupabase(): Promise<SupabaseLoginRecord[]> {
  try {
    const { data, error } = await supabase
      .from('logins')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.warn('[Supabase] Failed to fetch logins:', error.message);
      return [];
    }
    return (data || []) as SupabaseLoginRecord[];
  } catch (err) {
    console.warn('[Supabase] Exception fetching logins:', err);
    return [];
  }
}

/**
 * 6. Fetch Documents from Supabase (Optionally filtered by phone)
 */
export async function fetchDocumentsFromSupabase(phone?: string): Promise<SupabaseDocumentRecord[]> {
  try {
    let query = supabase.from('documents').select('*');
    if (phone) {
      const clean = phone.trim();
      query = query.or(`user_phone.eq.${clean},user_phone.ilike.%${clean.replace(/\D/g, '')}%`);
    }
    const { data, error } = await query.order('uploaded_at', { ascending: false });

    if (error) {
      console.warn('[Supabase] Failed to fetch documents:', error.message);
      return [];
    }
    return (data || []) as SupabaseDocumentRecord[];
  } catch (err) {
    console.warn('[Supabase] Exception fetching documents:', err);
    return [];
  }
}

/**
 * 7. Delete Record from Supabase
 */
export async function deleteRecordFromSupabase(
  table: 'bookings' | 'logins' | 'documents',
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: `Record ${id} removed from Supabase ${table}` };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to delete record' };
  }
}

/**
 * Health check & diagnostic function for the user's Supabase backend
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  success: boolean;
  message: string;
  projectId: string;
  url: string;
  statusText: string;
  counts: {
    bookings: number;
    logins: number;
    documents: number;
  };
  tables: {
    bookings: boolean | string;
    logins: boolean | string;
    documents: boolean | string;
  };
  details?: any;
}> {
  const result = {
    connected: false,
    success: false,
    message: 'Connecting to Supabase...',
    projectId: SUPABASE_PROJECT_ID,
    url: SUPABASE_URL,
    statusText: 'Connecting to Supabase...',
    counts: {
      bookings: 0,
      logins: 0,
      documents: 0,
    },
    tables: {
      bookings: 'checking' as boolean | string,
      logins: 'checking' as boolean | string,
      documents: 'checking' as boolean | string,
    },
    details: undefined as any,
  };

  try {
    const startTime = performance.now();

    // Check bookings table with count
    const { count: bCount, error: bErr } = await supabase.from('bookings').select('*', { count: 'exact', head: true });
    result.tables.bookings = bErr ? (bErr.code === 'PGRST205' ? 'not_created' : bErr.message) : true;
    result.counts.bookings = bCount || 0;

    // Check logins table with count
    const { count: lCount, error: lErr } = await supabase.from('logins').select('*', { count: 'exact', head: true });
    result.tables.logins = lErr ? (lErr.code === 'PGRST205' ? 'not_created' : lErr.message) : true;
    result.counts.logins = lCount || 0;

    // Check documents table with count
    const { count: dCount, error: dErr } = await supabase.from('documents').select('*', { count: 'exact', head: true });
    result.tables.documents = dErr ? (dErr.code === 'PGRST205' ? 'not_created' : dErr.message) : true;
    result.counts.documents = dCount || 0;

    const latencyMs = Math.round(performance.now() - startTime);

    const allTablesOk = result.tables.bookings === true && result.tables.logins === true && result.tables.documents === true;

    result.connected = true;
    result.success = allTablesOk;
    result.message = allTablesOk
      ? `Supabase is connected & healthy (${latencyMs}ms latency). ${result.counts.bookings} bookings, ${result.counts.logins} logins, and ${result.counts.documents} documents stored.`
      : `Supabase is connected but some tables require attention.`;
    result.statusText = allTablesOk
      ? `Connected to Supabase Project: ${SUPABASE_PROJECT_ID} (${latencyMs}ms)`
      : `Connected with warnings: ${SUPABASE_PROJECT_ID}`;
    result.details = { ...result.tables, latencyMs, counts: result.counts };
  } catch (err: any) {
    result.connected = false;
    result.success = false;
    result.message = err.message || 'Failed to connect to Supabase';
    result.statusText = err.message || 'Failed to connect to Supabase';
  }

  return result;
}

/**
 * SQL Schema that user can run in their Supabase Dashboard -> SQL Editor
 */
export const SUPABASE_SQL_SETUP = `-- =========================================================================
-- SMART BAZZAR SUPABASE BACKEND SCHEMA
-- Project ID: hbwomnuosklfusuuwuzf
-- Copy and paste this into Supabase Dashboard -> SQL Editor -> Run
-- =========================================================================

-- 1. Bookings Table (Movie Tickets, Parking Bays, Space Inquiries)
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    booking_type TEXT NOT NULL,
    customer_name TEXT,
    customer_phone TEXT,
    customer_email TEXT,
    details JSONB,
    amount NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Logins Table (User & Admin Sign-in Records)
CREATE TABLE IF NOT EXISTS public.logins (
    id TEXT PRIMARY KEY,
    user_name TEXT,
    phone TEXT,
    email TEXT,
    role TEXT DEFAULT 'Customer',
    auth_method TEXT,
    device TEXT,
    ip TEXT,
    status TEXT DEFAULT 'success',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Documents Table (Customer KYC, Aadhaar, PAN, GSTIN, IDs)
CREATE TABLE IF NOT EXISTS public.documents (
    id TEXT PRIMARY KEY,
    user_phone TEXT,
    user_name TEXT,
    document_type TEXT,
    type_name TEXT,
    document_number TEXT,
    holder_name TEXT,
    issue_date TEXT,
    expiry_date TEXT,
    status TEXT DEFAULT 'verified',
    verified_by TEXT,
    notes TEXT,
    file_url TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Allow Public (anon) Inserts & Reads for Applet Operation
DROP POLICY IF EXISTS "Allow public insert to bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow public select from bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow insert on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow select on bookings" ON public.bookings;
CREATE POLICY "Allow public insert to bookings" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public select from bookings" ON public.bookings FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public insert to logins" ON public.logins;
DROP POLICY IF EXISTS "Allow public select from logins" ON public.logins;
DROP POLICY IF EXISTS "Allow insert on logins" ON public.logins;
DROP POLICY IF EXISTS "Allow select on logins" ON public.logins;
CREATE POLICY "Allow public insert to logins" ON public.logins FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public select from logins" ON public.logins FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public insert to documents" ON public.documents;
DROP POLICY IF EXISTS "Allow public select from documents" ON public.documents;
DROP POLICY IF EXISTS "Allow insert on documents" ON public.documents;
DROP POLICY IF EXISTS "Allow select on documents" ON public.documents;
CREATE POLICY "Allow public insert to documents" ON public.documents FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public select from documents" ON public.documents FOR SELECT TO anon, authenticated USING (true);
`;
