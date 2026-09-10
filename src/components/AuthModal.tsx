import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  MapPin,
  FileCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface AuthModalProps {
  onNavigate?: (tab: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, user } = useShop();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setOtpSent(true);
    setOtp('6204'); // default simulation OTP
  };

  const handleVerifyAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPhone = phone.startsWith('+91') ? phone : `+91 ${phone}`;
    login({
      name: name.trim() || (mode === 'register' ? 'New Customer' : (user?.name || 'Verified Shopper')),
      phone: formattedPhone,
      email: email.trim() || `${phone.replace(/\D/g, '')}@smartbazzar.in`,
      savedAddresses: [
        {
          fullName: name.trim() || 'Valued Customer',
          phone: formattedPhone,
          addressLine: 'Main Road',
          landmark: 'Town Center',
          city: city.trim() || 'Lakhisarai',
          pincode: pincode.trim() || '811311',
          deliveryMode: 'home-delivery'
        }
      ]
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header Banner */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Personal Customer Account</span>
          </div>

          <h3 className="text-xl font-bold tracking-tight">
            {mode === 'signin' ? 'Customer Sign In' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Access your private documents vault, order tracking, and all-India delivery addresses.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 bg-slate-50 text-xs font-bold">
          <button
            onClick={() => { setMode('signin'); setOtpSent(false); }}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              mode === 'signin' 
                ? 'bg-white text-amber-600 border-b-2 border-amber-500 font-extrabold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In to Your Account
          </button>
          <button
            onClick={() => { setMode('register'); setOtpSent(false); }}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              mode === 'register' 
                ? 'bg-white text-amber-600 border-b-2 border-amber-500 font-extrabold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            New Customer Register
          </button>
        </div>

        {/* Custom Auth Form */}
        <div className="p-6 space-y-4">
          
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
            <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">Account Privacy & Security</p>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                Each customer only opens their own personal account. Your KYC documents, addresses, and order history are strictly isolated to your profile.
              </p>
            </div>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-3.5">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        City / Town
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Lakhisarai / Patna"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Pincode (All India)
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                        placeholder="e.g. 811311"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  10-Digit Mobile Number
                </label>
                <div className="flex rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
                  <span className="inline-flex items-center px-3 bg-slate-50 text-slate-600 text-xs font-bold border-r border-slate-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full px-3 py-2.5 text-xs text-slate-900 font-medium focus:outline-hidden"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  We'll send a secure one-time verification code to open your account.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Send Verification Code</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndLogin} className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900">
                <p className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Code sent to +91 {phone}
                </p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Enter verification OTP: <span className="font-mono font-bold">6204</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Enter 4-Digit OTP
                </label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6204"
                  className="w-full px-3 py-2.5 text-center text-lg tracking-widest font-mono font-bold border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Verify & Open My Account</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
              >
                Change mobile number
              </button>
            </form>
          )}

          {/* Member Benefits & Demo switchers */}
          <div className="pt-3 border-t border-slate-100 space-y-3 text-[11px] text-slate-500">
            <div>
              <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1.5">
                Quick Test Customer Account Isolation:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    login({
                      phone: '+91 62044 12345',
                      name: 'Ganesh Singh'
                    });
                  }}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-left transition-colors cursor-pointer"
                >
                  <p className="font-bold text-slate-900 text-xs truncate">Ganesh Singh</p>
                  <p className="text-[10px] text-slate-500 font-mono">+91 62044 12345</p>
                  <span className="inline-block mt-1 text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-sm">
                    Platinum • Lakhisarai
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    login({
                      phone: '+91 94312 88990',
                      name: 'Priya Sharma'
                    });
                  }}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-left transition-colors cursor-pointer"
                >
                  <p className="font-bold text-slate-900 text-xs truncate">Priya Sharma</p>
                  <p className="text-[10px] text-slate-500 font-mono">+91 94312 88990</p>
                  <span className="inline-block mt-1 text-[9px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-sm">
                    Gold • Patna
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Private Document Vault
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                All-India Pincode Delivery
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
