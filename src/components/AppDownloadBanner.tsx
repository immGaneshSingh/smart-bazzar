import React, { useState } from 'react';
import { 
  Smartphone, 
  Sparkles, 
  Download, 
  QrCode, 
  Ticket, 
  Car, 
  Tag, 
  Check,
  Star
} from 'lucide-react';

export const AppDownloadBanner: React.FC = () => {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [smsSent, setSmsSent] = useState(false);

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    setSmsSent(true);
  };

  return (
    <section className="bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700 text-slate-950 py-16 overflow-hidden relative">
      {/* Background soft circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart Bazzar Official Mobile App</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Unlock Flat ₹500 Off On Your First App Order!
            </h2>

            <p className="text-slate-900 text-sm sm:text-base font-medium max-w-xl leading-relaxed">
              Book CineSmart 4-screen movie tickets with zero convenience fee, reserve parking bays in 1-tap, collect Smart Club loyalty points, and grab daily flash deals at 50+ stores.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950/10 backdrop-blur-sm p-3 rounded-xl border border-slate-950/10">
                <Ticket className="w-5 h-5 text-slate-950 mb-1" />
                <p className="text-xs font-bold text-slate-950">Fast Cinema Booking</p>
                <p className="text-[10px] text-slate-800">Dolby Atmos Audi 1-4</p>
              </div>
              <div className="bg-slate-950/10 backdrop-blur-sm p-3 rounded-xl border border-slate-950/10">
                <Car className="w-5 h-5 text-slate-950 mb-1" />
                <p className="text-xs font-bold text-slate-950">Smart Parking Sensor</p>
                <p className="text-[10px] text-slate-800">Lock Slots from Home</p>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-slate-950/10 backdrop-blur-sm p-3 rounded-xl border border-slate-950/10">
                <Tag className="w-5 h-5 text-slate-950 mb-1" />
                <p className="text-xs font-bold text-slate-950">App-Only Coupons</p>
                <p className="text-[10px] text-slate-800">Flash 50% Off Sales</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => setDownloadModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Get App Download Link</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-950">
                <div className="flex text-slate-950">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-slate-950" />
                  ))}
                </div>
                <span>4.8 Rating • 50,000+ Downloads in Bihar</span>
              </div>
            </div>
          </div>

          {/* Right Mobile Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 sm:w-72 bg-slate-950 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 relative">
              {/* Speaker / Notch */}
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

              <div className="bg-slate-900 rounded-[32px] p-4 text-white space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="text-xs font-black text-amber-300">Smart Bazzar</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Lakhisarai</span>
                </div>

                <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl text-slate-950 font-bold text-xs space-y-1">
                  <p className="text-[10px] uppercase font-black">Welcome Coupon</p>
                  <p className="text-base font-black">FLAT ₹500 OFF</p>
                  <p className="text-[9px] text-slate-900">Code: WELCOME500</p>
                </div>

                <div className="p-2.5 bg-slate-800 rounded-xl space-y-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">CineSmart Multiplex</p>
                  <p className="text-xs font-bold">Singham Returns Again</p>
                  <p className="text-[10px] text-amber-300">Audi 1 Dolby Atmos • 6:00 PM</p>
                </div>

                <div className="p-2.5 bg-slate-800 rounded-xl flex items-center justify-between">
                  <div className="text-[10px]">
                    <p className="font-bold text-slate-300">Smart Parking</p>
                    <p className="text-emerald-400 font-bold">342 Open Slots (B1)</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-black uppercase">
                    Live
                  </span>
                </div>

                <div className="pt-1 text-center">
                  <span className="text-[10px] text-slate-500 font-bold">Smart Bazzar Lakhisarai App v2.4</span>
                </div>
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-3" />
            </div>
          </div>

        </div>
      </div>

      {/* Download SMS Link Modal */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-slate-900 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-amber-600" />
                <h4 className="text-base font-bold">Get Smart Bazzar App</h4>
              </div>
              <button
                onClick={() => {
                  setDownloadModalOpen(false);
                  setSmsSent(false);
                }}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {smsSent ? (
              <div className="text-center py-4 space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-800">Download Link Sent via SMS!</p>
                <p className="text-[11px] text-slate-500">Check your phone {phone} for the direct Google Play / App Store link.</p>
                <button
                  onClick={() => setDownloadModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendLink} className="space-y-3">
                <p className="text-xs text-slate-600">
                  Enter your 10-digit mobile number to receive the direct download link with ₹500 welcome voucher code.
                </p>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="+91 6200 123456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow cursor-pointer"
                >
                  Send Free SMS Download Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
