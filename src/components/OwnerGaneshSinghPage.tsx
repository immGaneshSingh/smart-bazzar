import React, { useState } from 'react';
import { 
  Building2, 
  Award, 
  Target, 
  Eye, 
  HeartHandshake, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Send, 
  Check, 
  Briefcase, 
  Users, 
  Quote,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { MALL_INFO } from '../data/mallData';

interface OwnerGaneshSinghPageProps {
  onNavigate: (tab: any) => void;
  onOpenVirtualTour: () => void;
}

export const OwnerGaneshSinghPage: React.FC<OwnerGaneshSinghPageProps> = ({ onNavigate, onOpenVirtualTour }) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Header for Owner Ganesh Singh */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white py-16 sm:py-24 relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Owner Portrait & Credentials Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/30 bg-slate-900 group">
                <div className="aspect-4/5 w-full relative">
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                    alt="Ganesh Singh, Owner & Founder Smart Bazzar"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1000&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Owner & Founder</span>
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 space-y-1 text-white">
                    <p className="text-xs uppercase font-bold text-amber-400 tracking-wider">Visionary Leadership</p>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Ganesh Singh</h1>
                    <p className="text-xs text-slate-300 font-medium">Founder & Managing Director, Smart Bazzar</p>
                    <div className="pt-2 flex items-center gap-2 text-[11px] text-amber-200">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>NH-80 Road, Lakhisarai, Bihar</span>
                    </div>
                  </div>
                </div>

                {/* Quick Owner Stats Bar */}
                <div className="grid grid-cols-3 divide-x divide-slate-800 bg-slate-950/90 py-3 text-center border-t border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Established</span>
                    <p className="text-sm font-black text-amber-400">2024</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Total Area</span>
                    <p className="text-sm font-black text-white">2.5 Lakh sq.ft</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Local Jobs</span>
                    <p className="text-sm font-black text-emerald-400">600+ Direct</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Intro & Personal Statement */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Quote className="w-3.5 h-3.5" />
                <span>Message from Owner Ganesh Singh</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                “Building Bihar’s Brightest Retail Destination in Our Own Lakhisarai.”
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Welcome to <strong>Smart Bazzar</strong>. When we laid the cornerstone for this 2,50,000 sq. ft. destination on NH-80 Road, our goal was crystal clear: our families, students, and elders in Lakhisarai deserve the exact same premier shopping, Dolby Atmos cinema, and fine dining amenities found in metro cities—without traveling 120 km to Patna or Bhagalpur.
              </p>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>The Core Pillars of Ganesh Singh's Vision</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Affordable Luxury:</strong> Modern national brands accessible to all families.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Local Youth Employment:</strong> 600+ livelihoods created right here in Lakhisarai.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Cultural Pride:</strong> Free retail spaces dedicated to Bihar artisans and weavers.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Green Technology:</strong> 500 kW rooftop solar & rainwater reservoirs.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`tel:${MALL_INFO.phone}`}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 transition-transform hover:scale-105 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Direct Helpline: {MALL_INFO.phone}</span>
                </a>

                <button
                  onClick={() => onNavigate('stores')}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-colors"
                >
                  <span>Explore Stores & Brands</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Main Content: Story, Vision, Milestones & CSR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* 1. The Story Behind Smart Bazzar */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              The Origin Story
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Why Ganesh Singh Built Smart Bazzar in Lakhisarai
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Lakhisarai is a historic land steeped in ancient Buddhist culture and surrounded by lush agrarian communities. Yet, for decades, commercial infrastructure lagged behind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="text-base font-bold text-slate-900">The Problem Solved</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prior to 2024, residents faced long 3-hour journeys to Patna just to watch newly released movies or purchase authentic branded apparel. Ganesh Singh resolved to bring metropolitan lifestyle home.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="text-base font-bold text-slate-900">Strategic NH-80 Location</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Positioned directly along National Highway 80, only 2.5 km from Lakhisarai Junction and 3.8 km from Kiul Junction, creating an easily accessible landmark for Munger, Sheikhpura, and Begusarai shoppers.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="text-base font-bold text-slate-900">5 Dynamic Floors</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Crafted with 2,50,000 sq. ft. across 5 distinct floors: Ground Atrium, First Floor Fashion, Second Floor Lifestyle & Made in Bihar, Third Floor Food Court, and Fourth & Fifth Floor CineSmart Multiplex & Sky Lounge.
              </p>
            </div>
          </div>
        </div>

        {/* 2. CSR Initiatives Spearheaded by Ganesh Singh */}
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-slate-950 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-black uppercase tracking-wider bg-slate-950 text-amber-300 px-3 py-1 rounded-full">
              Giving Back to Lakhisarai
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
              Ganesh Singh CSR & Community Initiatives
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
              True prosperity begins when we lift our students and rural artisans together with our commercial growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Scholarship Fund */}
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-black text-slate-900">Ganesh Singh Student Higher Education Scholarship</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Each fiscal year, <strong>1% of Smart Bazzar corporate revenues</strong> is directly deposited into an educational endowment fund. This provides full college tuition scholarships and laptop grants to over 50 meritorious students from economically challenged families in Lakhisarai district.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-800">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Active Program for 2024–2025 Academic Cycle</span>
              </div>
            </div>

            {/* Free Stalls for Artisans */}
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-black text-slate-900">Free Stalls for Bihar Crafts & Handlooms</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under Ganesh Singh's directive, <strong>Floor 2 features dedicated free exhibition stalls</strong> provided without rent or commission to rural Bhagalpur Tussar silk weavers, Madhubani canvas artists, and Sikki grass craftswomen to sell directly to thousands of visitors every weekend.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-800">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Over 35 Rural Artisan Families Supported</span>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Executive Office Contact & Direct Inquiry to Ganesh Singh */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Executive Suite</span>
              <h3 className="text-xl font-bold text-white mt-1">Office of Owner Ganesh Singh</h3>
              <p className="text-xs text-slate-400 mt-1">Direct corporate & community affairs inquiries</p>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3 p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Executive Address</p>
                  <p className="text-slate-400 mt-0.5">5th Floor Corporate Suite, Smart Bazzar, NH-80 Road, Lakhisarai, Bihar – 811311</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Direct Executive Email</p>
                  <p className="text-amber-300 mt-0.5 font-mono">owner.ganeshsingh@smartbazzar.in</p>
                  <p className="text-slate-400 text-[11px]">info@smartbazzar.in</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Founder Office Helpline</p>
                  <p className="text-amber-300 mt-0.5 font-bold">+91-6200-123456</p>
                  <p className="text-slate-400 text-[11px]">Mon – Sat: 10:30 AM – 6:30 PM</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenVirtualTour}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Take 360° Virtual Tour of the Mall</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Direct Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Request Meeting or Send Message to Ganesh Singh</h3>
              <p className="text-xs text-slate-500">Retail partnerships, community proposals, media inquiries, or artisan applications</p>
            </div>

            {inquirySent ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Proposal Dispatched to Ganesh Singh's Office</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you <strong>{inquiryName}</strong>. Your correspondence has been routed to Mr. Ganesh Singh's executive desk. The executive assistant will reply via phone ({inquiryPhone}) within 24–48 hours.
                </p>
                <button
                  onClick={() => setInquirySent(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer hover:bg-slate-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Retailer / Community Representative"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 6200 123456"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Topic / Subject</label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none">
                    <option>Store Leasing & Anchor Retail Space</option>
                    <option>Artisan Free Stall Request (Made in Bihar)</option>
                    <option>Student Scholarship Inquiry (Lakhisarai)</option>
                    <option>Corporate Partnership & Media</option>
                    <option>Personal Greeting to Ganesh Singh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your proposal or inquiry in detail..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Executive Office of Ganesh Singh</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
