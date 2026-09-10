import React, { useState } from 'react';
import { 
  Calendar, 
  Tag, 
  Sparkles, 
  Clock, 
  MapPin, 
  Copy, 
  Check, 
  Gift, 
  Flame, 
  PartyPopper,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENTS_DATA, COUPONS_DATA } from '../data/mallData';
import { MallEvent, Coupon } from '../types';

export const EventsCalendar: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {}
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const filteredEvents = EVENTS_DATA.filter((e) => {
    if (selectedCategory === 'All') return true;
    return e.category === selectedCategory;
  });

  return (
    <section className="py-16 sm:py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>Festivals & Celebrations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Events Calendar & Exclusive Deals
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Experience vibrant cultural festivals, blockbuster sale promotions, and weekend entertainment in Lakhisarai.
          </p>
        </div>

        {/* 1. DIGITAL COUPON WALLET (GRAB YOUR VOUCHER) */}
        <div className="mb-16 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl font-bold text-slate-900">Instant Digital Discount Coupons</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Click to copy code and present at store billing counters or cinema box office.</p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full self-start sm:self-auto">
              Active Offers for 2024-25
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COUPONS_DATA.map((coupon, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-400 hover:shadow-xs transition-all relative overflow-hidden group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">{coupon.category}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {coupon.validTill}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 leading-tight">{coupon.discount}</h4>
                  <p className="text-xs font-bold text-slate-700">{coupon.title}</p>
                  <p className="text-[11px] text-slate-500 leading-normal">{coupon.minSpend}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                    {coupon.code}
                  </span>

                  <button
                    onClick={() => handleCopyCoupon(coupon.code)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-amber-600 text-white transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                    title="Copy Promo Code"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Claim</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. UPCOMING EVENTS SHOWCASE */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-slate-900">Upcoming Mall Events & Festivals</h3>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Festival', 'Culture', 'Food Fest', 'Entertainment'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                      {evt.category}
                    </span>

                    {evt.discountBadge && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">
                        {evt.discountBadge}
                      </span>
                    )}

                    <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {evt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {evt.time}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {evt.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{evt.venue}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{evt.highlight}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  {evt.couponCode ? (
                    <button
                      onClick={() => handleCopyCoupon(evt.couponCode!)}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>
                        {copiedCode === evt.couponCode ? 'Code Copied!' : `Use Code: ${evt.couponCode}`}
                      </span>
                    </button>
                  ) : (
                    <div className="text-center py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
                      Open to All Mall Visitors • No Registration Needed
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
