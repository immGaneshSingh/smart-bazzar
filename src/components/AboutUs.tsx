import React from 'react';
import { 
  Building2, 
  Target, 
  Eye, 
  Award, 
  HeartHandshake, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Calendar,
  Leaf,
  Sun,
  Droplets
} from 'lucide-react';
import { MALL_INFO } from '../data/mallData';

interface AboutUsProps {
  onNavigate?: (tab: any) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-300">
            <Building2 className="w-3.5 h-3.5" />
            <span>The Story of Smart Bazzar</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Pioneering Modern Retail In Lakhisarai
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Established in 2024 on NH-80 Main Road, Smart Bazzar bridges world-class metropolitan lifestyle with Bihar’s rich cultural heartland.
          </p>
        </div>

        {/* Mall Landmarks & Architectural Overview */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm mb-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-4/3 lg:aspect-auto lg:h-96">
                <img
                  src="https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1000&q=80"
                  alt="Smart Bazzar Mall Architecture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Retail & Entertainment Hub</p>
                  <h4 className="text-2xl font-black">Smart Bazzar Complex</h4>
                  <p className="text-xs text-slate-300">NH-80 Road, Lakhisarai • 2,50,000 Sq. Ft.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Our Heritage & Purpose</span>
              </div>

              <blockquote className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">
                “Bringing world-class shopping, cinema, and dining experiences right to Lakhisarai, empowering local youth, celebrating Bihar's artisans, and giving our families a dignified sanctuary.”
              </blockquote>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Historically celebrated for its cultural heritage and proximity to sacred Buddhist circuits, Lakhisarai previously lacked a centralized, air-conditioned shopping and entertainment venue. Residents often travelled over 120 km to Patna or Bhagalpur for basic multiplex movies and anchor brand shopping.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Smart Bazzar changed this narrative permanently in 2024. Rising across 2,50,000 sq. ft. directly on NH-80 Road, this 5-floor destination brings 50+ national brands, a 4-screen Dolby Atmos multiplex, and 20+ restaurants right to our community's doorstep.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-xs text-slate-400 font-bold uppercase">Established</p>
                  <p className="text-xl font-black text-slate-900 mt-0.5">2024</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-xs text-slate-400 font-bold uppercase">Daily Footfall</p>
                  <p className="text-xl font-black text-amber-600 mt-0.5">10,000+</p>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-xs text-slate-400 font-bold uppercase">Direct Jobs</p>
                  <p className="text-xl font-black text-slate-900 mt-0.5">600+ Local</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Vision */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Our Vision</h3>
            <p className="text-base text-slate-700 font-semibold leading-relaxed">
              “{MALL_INFO.vision}”
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              To position Lakhisarai as Eastern Bihar’s premier retail capital, setting the gold standard for hygiene, technology integration, safety, and cultural representation in commercial spaces.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Our Mission</h3>
            <p className="text-base text-slate-700 font-semibold leading-relaxed">
              “{MALL_INFO.mission}”
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              We continually strive to offer fair value, pristine air-conditioned comfort, cashless speed, and uplifting entertainment where families, students, and seniors feel equally cherished and safe.
            </p>
          </div>

        </div>

        {/* CSR & Community Initiatives Feature */}
        <div className="bg-gradient-to-br from-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 border border-amber-500/20 shadow-xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Giving Back to Lakhisarai
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Corporate Social Responsibility (CSR) & Green Initiatives
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Smart Bazzar believes in growing together with our community, our artisans, and the natural environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 bg-white/10 rounded-2xl border border-white/10 space-y-3">
              <HeartHandshake className="w-6 h-6 text-amber-400" />
              <h4 className="text-lg font-bold text-white">Free Stalls for Bihar Artisans</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We provide 100% complimentary retail stalls on Floor 2 to rural handloom weavers from Bhagalpur and Madhubani painters to sell directly to patrons without middleman deductions.
              </p>
            </div>

            <div className="p-5 bg-white/10 rounded-2xl border border-white/10 space-y-3">
              <GraduationCap className="w-6 h-6 text-amber-400" />
              <h4 className="text-lg font-bold text-white">Lakhisarai Student Scholarship Fund</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instituted by Ganesh Singh: 1% of mall corporate profits fund annual higher education scholarships for 50+ underprivileged youth from Lakhisarai district.
              </p>
            </div>

            <div className="p-5 bg-white/10 rounded-2xl border border-white/10 space-y-3">
              <Sun className="w-6 h-6 text-emerald-400" />
              <h4 className="text-lg font-bold text-white">Solar Energy & Green Recycling</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Powered by a 500 kW rooftop solar generation plant, 100,000-liter rainwater harvesting reservoirs, and zero-discharge organic waste composting units.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
