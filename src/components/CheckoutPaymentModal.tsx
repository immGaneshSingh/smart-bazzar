import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  MapPin, 
  Phone, 
  User, 
  Lock, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { PaymentMethod, OrderDeliveryAddress, CustomerOrder } from '../types';

interface CheckoutPaymentModalProps {
  onNavigate?: (tab: any) => void;
}

export const CheckoutPaymentModal: React.FC<CheckoutPaymentModalProps> = ({ onNavigate }) => {
  const { 
    cart, 
    cartSubtotal, 
    user, 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    placeOrder,
    setSelectedOrderForTracking
  } = useShop();

  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  
  // Delivery details state dynamically linked to current user
  const defaultSaved = user?.savedAddresses?.[0];
  const [fullName, setFullName] = useState(user?.name || defaultSaved?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || defaultSaved?.phone || '');
  const [addressLine, setAddressLine] = useState(defaultSaved?.addressLine || '');
  const [landmark, setLandmark] = useState(defaultSaved?.landmark || '');
  const [city, setCity] = useState(defaultSaved?.city || 'Lakhisarai');
  const [pincode, setPincode] = useState(defaultSaved?.pincode || '811311');
  const [deliveryMode, setDeliveryMode] = useState<'home-delivery' | 'mall-pickup'>('home-delivery');

  // Sync with active user when modal opens or user switches
  React.useEffect(() => {
    if (user) {
      const saved = user.savedAddresses?.[0];
      setFullName(user.name || saved?.fullName || '');
      setPhone(user.phone || saved?.phone || '');
      setAddressLine(saved?.addressLine || '');
      setLandmark(saved?.landmark || '');
      setCity(saved?.city || 'Lakhisarai');
      setPincode(saved?.pincode || '811311');
      setCardHolder((user.name || 'VALUED CUSTOMER').toUpperCase());
      const cleanName = (user.name || 'customer').toLowerCase().replace(/[^a-z0-9]/g, '');
      setUpiId(`${cleanName}@okaxis`);
    } else {
      setFullName('');
      setPhone('');
      setAddressLine('');
      setLandmark('');
      setCardHolder('VALUED CUSTOMER');
      setUpiId('customer@upi');
    }
  }, [user, isCheckoutOpen]);

  // Payment form states
  const [upiId, setUpiId] = useState(user ? `${user.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@okaxis` : 'customer@upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('qr');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('821');
  const [cardHolder, setCardHolder] = useState((user?.name || 'VALUED CUSTOMER').toUpperCase());
  const [selectedBank, setSelectedBank] = useState('sbi');

  // Processing simulation state
  const [processingStatus, setProcessingStatus] = useState('Initiating 256-bit encrypted banking session...');
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);

  if (!isCheckoutOpen) return null;

  const deliveryFee = deliveryMode === 'mall-pickup' ? 0 : (cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 50);
  const discountAmount = 100; // default festive discount
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || (deliveryMode === 'home-delivery' && !addressLine)) {
      alert('Please fill out all contact and delivery details');
      return;
    }

    setStep('processing');
    setProcessingStatus('Connecting to Smart Bazzar Lakhisarai Payment Gateway...');

    setTimeout(() => {
      setProcessingStatus(`Authorizing ${paymentMethod.toUpperCase()} transaction of ₹${grandTotal.toLocaleString('en-IN')}...`);
    }, 1000);

    setTimeout(() => {
      setProcessingStatus('Verifying banking token & preparing order invoice...');
    }, 2000);

    setTimeout(() => {
      const orderAddress: OrderDeliveryAddress = {
        fullName,
        phone,
        addressLine: deliveryMode === 'mall-pickup' ? 'Smart Bazzar Help Desk, NH-80 Ground Floor' : addressLine,
        landmark,
        city,
        pincode,
        deliveryMode
      };

      const newOrder = placeOrder({
        items: cart,
        subtotal: cartSubtotal,
        discount: discountAmount,
        deliveryFee,
        totalAmount: grandTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        deliveryAddress: orderAddress
      });

      setConfirmedOrder(newOrder);
      setStep('success');

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }, 3000);
  };

  const handleClose = () => {
    setStep('details');
    setIsCheckoutOpen(false);
  };

  const handleViewOrderInAccount = () => {
    handleClose();
    if (confirmedOrder) {
      setSelectedOrderForTracking(confirmedOrder.id);
    }
    if (onNavigate) {
      onNavigate('account');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                {step === 'success' ? 'Order Confirmed!' : 'Secure Online Payment & Checkout'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Smart Bazzar NH-80, Lakhisarai • 256-Bit SSL Encrypted
              </p>
            </div>
          </div>
          {step !== 'processing' && (
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* STEP 1: Details & Payment Method */}
        {step === 'details' && (
          <form onSubmit={handleStartPayment} className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">
            
            {/* Quick Order Overview */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Order Total ({cart.length} items)</span>
                <div className="text-lg font-extrabold text-slate-900">
                  ₹{grandTotal.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-emerald-600 ml-2">(-₹{discountAmount} Festive Off)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Free Express Delivery in Lakhisarai
                </span>
              </div>
            </div>

            {/* Delivery Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  1. Delivery Address & Contact in Lakhisarai
                </h4>
                <div className="flex gap-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('home-delivery')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      deliveryMode === 'home-delivery' 
                        ? 'bg-amber-500 text-slate-950 font-bold' 
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Doorstep
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('mall-pickup')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      deliveryMode === 'mall-pickup' 
                        ? 'bg-amber-500 text-slate-950 font-bold' 
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Mall Pickup
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Recipient Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ganesh Singh"
                      className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Mobile Number (For Delivery SMS)</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 62044 12345"
                      className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {deliveryMode === 'home-delivery' ? (
                  <>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">House / Flat / Street Address</label>
                      <input
                        type="text"
                        required
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                        placeholder="e.g. Near Vidyapeeth Chowk, Ward No 4, NH-80"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Landmark</label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="e.g. Near District Court / Kiul Junction"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">City</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">PIN Code</label>
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="sm:col-span-2 p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900">
                    <p className="font-bold">Self-Pickup at Smart Bazzar NH-80 Ground Floor Desk</p>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      Your bag will be packed and waiting within 30 minutes at the Central Reception Desk. Bring your order confirmation SMS.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-3">
                <CreditCard className="w-4 h-4 text-amber-500" />
                2. Select Online Payment Mode
              </h4>

              {/* Tabs for Payment */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'upi'
                      ? 'border-amber-500 bg-amber-50/50 text-slate-900 font-bold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-amber-600" />
                  <span className="text-[11px]">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'border-amber-500 bg-amber-50/50 text-slate-900 font-bold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span className="text-[11px]">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'netbanking'
                      ? 'border-amber-500 bg-amber-50/50 text-slate-900 font-bold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-purple-600" />
                  <span className="text-[11px]">Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'cod'
                      ? 'border-amber-500 bg-amber-50/50 text-slate-900 font-bold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px]">Cash / Desk</span>
                </button>
              </div>

              {/* UPI Screen */}
              {paymentMethod === 'upi' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedUpiApp('qr')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        selectedUpiApp === 'qr' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-700'
                      }`}
                    >
                      Scan QR Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUpiApp('gpay')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        selectedUpiApp === 'gpay' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-700'
                      }`}
                    >
                      Google Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUpiApp('phonepe')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        selectedUpiApp === 'phonepe' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-700'
                      }`}
                    >
                      PhonePe
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUpiApp('paytm')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        selectedUpiApp === 'paytm' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-700'
                      }`}
                    >
                      Paytm
                    </button>
                  </div>

                  {selectedUpiApp === 'qr' ? (
                    <div className="flex flex-col items-center justify-center text-center p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                      {/* Realistic QR representation */}
                      <div className="w-36 h-36 bg-slate-900 p-2 rounded-xl flex items-center justify-center mb-2">
                        <div className="w-full h-full bg-white p-2 rounded-lg flex flex-col items-center justify-center">
                          <QrCode className="w-24 h-24 text-slate-950" />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        Scan with Any UPI App (GPay, PhonePe, Paytm)
                      </span>
                      <span className="text-[11px] text-amber-600 font-mono mt-0.5 font-semibold">
                        smartbazzar.lakhisarai@okhdfcbank • ₹{grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="block text-[11px] font-semibold text-slate-700">Enter your UPI ID / VPA</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank or 9876543210@paytm"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-mono"
                      />
                      <p className="text-[10px] text-slate-500">
                        A payment request of ₹{grandTotal.toLocaleString('en-IN')} will be sent to your UPI app.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Card Screen */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 0000 0000 8821"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Valid Thru</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Card Type</label>
                      <div className="text-[11px] font-bold text-slate-600 py-2">RuPay / Visa / MC</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 uppercase"
                    />
                  </div>
                </div>
              )}

              {/* Netbanking Screen */}
              {paymentMethod === 'netbanking' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <label className="block text-[11px] font-semibold text-slate-700">Choose Bank</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'sbi', name: 'State Bank of India (SBI)' },
                      { id: 'hdfc', name: 'HDFC Bank' },
                      { id: 'icici', name: 'ICICI Bank' },
                      { id: 'pnb', name: 'Punjab National Bank (PNB)' }
                    ].map(bank => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setSelectedBank(bank.id)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                          selectedBank === bank.id 
                            ? 'border-amber-500 bg-white text-slate-900 shadow-xs' 
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {bank.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* COD Screen */}
              {paymentMethod === 'cod' && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                  <p className="text-xs font-bold text-emerald-950">
                    {deliveryMode === 'mall-pickup' ? 'Pay at Mall Pickup Counter' : 'Cash on Delivery (COD) Available'}
                  </p>
                  <p className="text-[11px] text-emerald-800">
                    Pay ₹{grandTotal.toLocaleString('en-IN')} using Cash or any UPI QR scan when your package arrives at your doorstep in Lakhisarai.
                  </p>
                </div>
              )}

            </div>

            {/* Submit Button */}
            <div className="pt-2 border-t border-slate-200">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Pay ₹{grandTotal.toLocaleString('en-IN')} & Confirm Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Safe & Secure Gateway • Direct Dispatch from Smart Bazzar NH-80 Stores
              </p>
            </div>

          </form>
        )}

        {/* STEP 2: Processing Animation */}
        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin flex items-center justify-center" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-6 h-6 text-slate-900" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-900">Processing Online Transaction...</h4>
              <p className="text-xs text-amber-700 font-medium animate-pulse">
                {processingStatus}
              </p>
            </div>

            <div className="w-full max-w-xs bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-amber-500 h-full w-3/4 animate-pulse rounded-full" />
            </div>

            <p className="text-[11px] text-slate-400">
              Please do not press back or refresh while the gateway verifies payment.
            </p>
          </div>
        )}

        {/* STEP 3: Order Success Screen */}
        {step === 'success' && confirmedOrder && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600">
                Payment Successful • Order Placed
              </span>
              <h4 className="text-xl font-extrabold text-slate-900">
                Thank You, {fullName}!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your order <span className="font-bold text-slate-900 font-mono">#{confirmedOrder.id}</span> has been assigned to Smart Bazzar store attendants and is being packed.
              </p>
            </div>

            {/* Order Card Summary */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-3">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-extrabold text-slate-900">₹{confirmedOrder.totalAmount.toLocaleString('en-IN')} via {confirmedOrder.paymentMethod.toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-bold text-emerald-700">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="text-xs text-slate-600">
                <span className="text-slate-500 block mb-0.5">Delivery Destination:</span>
                <span className="font-medium text-slate-900">{confirmedOrder.deliveryAddress.addressLine}, {confirmedOrder.deliveryAddress.city} ({confirmedOrder.deliveryAddress.pincode})</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleViewOrderInAccount}
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Track Order Live in My Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Continue Shopping</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
