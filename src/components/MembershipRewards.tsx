import React, { useState } from 'react';
import { 
  Gift, 
  Crown, 
  Sparkles, 
  Check, 
  CreditCard, 
  QrCode, 
  Download, 
  Smartphone, 
  Percent, 
  ShieldCheck,
  ChevronRight,
  Calculator
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MembershipRewards: React.FC = () => {
  const [monthlySpend, setMonthlySpend] = useState<number>(5000);
  const [memberName, setMemberName] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [generatedCard, setGeneratedCard] = useState<{
    id: string;
    name: string;
    tier: 'Silver' | 'Gold' | 'Platinum';
    points: number;
  } | null>(null);

  // Rewards calculation
  // ₹1 spent = 1 point. 1,000 points = ₹100 voucher
  const pointsEarned = monthlySpend;
  const voucherValue = Math.floor(pointsEarned / 10);

  let currentTier: 'Silver' | 'Gold' | 'Platinum' = 'Silver';
  if (monthlySpend >= 15000) {
    currentTier = 'Platinum';
  } else if (monthlySpend >= 6000) {
    currentTier = 'Gold';
  }

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    const newId = `SB-CLUB-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedCard({
      id: newId,
      name: memberName,
      tier: currentTier,
      points: 500 // Bonus welcome points!
    });

    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <section className="py-16 sm:py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-300">
            <Crown className="w-3.5 h-3.5" />
            <span>Smart Club Membership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Earn Points, Unlock Vouchers & VIP Privileges
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Join thousands of smart shoppers in Lakhisarai. Earn 1 point for every ₹1 spent across fashion, dining, hypermarket, and cinema.
          </p>
        </div>

        {/* 1. THREE TIERS SHOWCASE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Silver Tier */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/90 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-200/70 px-3 py-1 rounded-full">
                  Tier 1
                </span>
                <span className="text-xs font-black text-slate-700">Free to Join</span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-800">Smart Silver</h3>
                <p className="text-xs text-slate-500 mt-1">Starting level for all Lakhisarai shoppers</p>
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-2.5">
                {[
                  '1 Point for every ₹1 spent',
                  'Instant 500 Bonus Points on signup',
                  'Birthday Month 10% Extra Discount',
                  'Free Parking for first 1 hour',
                  'Access to Festival Lucky Draws'
                ].map((perk, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <Check className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-400 font-medium pt-2 border-t border-slate-200">
              Annual Spend: ₹0 – ₹25,000
            </div>
          </div>

          {/* Gold Tier */}
          <div className="bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-7 border-2 border-amber-400/80 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/70 px-3 py-1 rounded-full">
                  Tier 2
                </span>
                <span className="text-xs font-black text-amber-800">Spend ₹25,000+</span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-amber-950">Smart Gold</h3>
                <p className="text-xs text-amber-800 mt-1">Enhanced value for regular family visits</p>
              </div>

              <div className="pt-3 border-t border-amber-200 space-y-2.5">
                {[
                  '1.5x Reward Points multiplier',
                  'Free Valet & Reserved Parking',
                  '1 Free CineSmart Movie Ticket / quarter',
                  '15% Off at Rooftop Sky Lounge',
                  'Priority Entry during Diwali Mega Sale',
                  'Exclusive Made in Bihar Preview'
                ].map((perk, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-xs text-amber-950 font-semibold">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-amber-800 font-medium pt-2 border-t border-amber-200">
              Annual Spend: ₹25,000 – ₹75,000
            </div>
          </div>

          {/* Platinum Tier */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-700 flex flex-col justify-between space-y-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-slate-800 px-3 py-1 rounded-full border border-amber-400/30">
                  Elite VIP
                </span>
                <span className="text-xs font-black text-amber-400">Spend ₹75,000+</span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">Smart Platinum VIP</h3>
                <p className="text-xs text-slate-300 mt-1">Ultimate luxury retail & dining privileges</p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2.5">
                {[
                  '2x Reward Points on every ₹1 spent',
                  'Unlimited Free Premium Parking',
                  'Access to VIP Recliner Lounge at Cinema',
                  'Complimentary Birthday Cake & Feast Pass',
                  'Personal Shopping Concierge Assistant',
                  'Invitations to Private Fashion Previews'
                ].map((perk, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-400 font-medium pt-2 border-t border-slate-800">
              Annual Spend: ₹75,000+
            </div>
          </div>

        </div>

        {/* 2. INTERACTIVE POINTS CALCULATOR & CARD GENERATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Spend & Points Calculator */}
          <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Points & Voucher Calculator</h3>
                <p className="text-xs text-slate-500">Calculate what you earn from your family's mall visits</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Estimated Monthly Spend at Smart Bazzar</span>
                  <span className="text-base text-amber-600 font-black">₹{monthlySpend.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="35000"
                  step="1000"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                  <span>₹1,000</span>
                  <span>₹15,000 (Gold)</span>
                  <span>₹35,000+ (Platinum)</span>
                </div>
              </div>

              {/* Result Preview Box */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Monthly Points</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{pointsEarned.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">1 Point = ₹1</p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Voucher Cashback</p>
                  <p className="text-2xl font-black text-amber-600 mt-1">₹{voucherValue}</p>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Redeemable Instantly</p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>At this spend rate, you qualify for <strong>Smart {currentTier}</strong> tier status!</span>
              </div>
            </div>
          </div>

          {/* Right: Instant Digital Membership Pass Generator */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Generate Your Digital Club Card</h3>
                <p className="text-xs text-slate-400">Get 500 bonus points immediately upon activation</p>
              </div>
              <CreditCard className="w-6 h-6 text-amber-400" />
            </div>

            {generatedCard ? (
              /* Display Generated Card */
              <div className="space-y-4">
                <div className="bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-slate-950 p-6 rounded-2xl shadow-xl space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-wider uppercase">SMART CLUB BAZZAR</span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-amber-400 text-[10px] font-black uppercase">
                      {generatedCard.tier} Member
                    </span>
                  </div>

                  <div className="pt-2">
                    <p className="text-[10px] text-slate-800 uppercase font-bold">Cardholder</p>
                    <p className="text-lg font-black text-slate-950">{generatedCard.name}</p>
                    <p className="font-mono text-xs tracking-wider font-bold mt-1 text-slate-900">{generatedCard.id}</p>
                  </div>

                  <div className="flex items-end justify-between pt-2 border-t border-slate-950/20 text-xs">
                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-800">Welcome Balance</p>
                      <p className="text-sm font-black text-slate-950">{generatedCard.points} Points</p>
                    </div>
                    <QrCode className="w-8 h-8 text-slate-950" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => alert(`Digital Pass ${generatedCard.id} saved to your device!`)}
                    className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Add to Google / Apple Wallet</span>
                  </button>
                  <button
                    onClick={() => setGeneratedCard(null)}
                    className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : (
              /* Card Creation Form */
              <form onSubmit={handleCreateCard} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ganesh Singh"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Number (Login ID)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 6200 123456"
                    value={memberPhone}
                    onChange={(e) => setMemberPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Activate Free Membership & Claim 500 Pts
                </button>
                <p className="text-[10px] text-center text-slate-400">
                  No physical card needed. Simply tell your mobile number at any cashier counter.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
