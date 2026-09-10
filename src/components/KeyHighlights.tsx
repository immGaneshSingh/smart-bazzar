import React from 'react';
import { 
  Building2, 
  Layers, 
  Car, 
  Users, 
  Wifi, 
  Film, 
  Palette, 
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { ActiveTab } from '../types';

interface KeyHighlightsProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenParking: () => void;
  onOpenVirtualTour: () => void;
}

export const KeyHighlights: React.FC<KeyHighlightsProps> = ({ 
  onNavigate,
  onOpenParking,
  onOpenVirtualTour
}) => {
  const highlights = [
    {
      icon: <Building2 className="w-6 h-6 text-amber-600" />,
      tag: 'Scale & Space',
      title: '2,50,000 Sq. Ft. Commercial Wonder',
      description: 'Lakhisarai’s largest retail landmark featuring wide air-conditioned shopping avenues, expansive central skylight atriums, and international safety compliance.',
      features: ['2.5 Lakh sq. ft. built-up area', 'Central double-height atrium', 'Natural skylight illumination']
    },
    {
      icon: <Layers className="w-6 h-6 text-amber-600" />,
      tag: '5 Thematic Levels',
      title: 'Five Specially Curated Floors',
      description: 'From ground floor luxury fashion and 1st floor tech, to 2nd floor Made in Bihar crafts, 3rd floor food court, 4th floor cinema, and 5th floor rooftop sky lounge.',
      features: ['L0: Fashion & Atrium', 'L1: Electronics & Lifestyle', 'L2: Hypermarket & Crafts', 'L3: Food Court', 'L4: CineSmart', 'L5: Sky Lounge']
    },
    {
      icon: <Car className="w-6 h-6 text-amber-600" />,
      tag: 'Automated Facility',
      title: '500+ Cars & 1000+ Two-Wheelers Parking',
      description: 'Stress-free 2-level basement parking with automated sensor slot indicators, EV charging points, dedicated handicapped bays, and mobile slot reservations.',
      features: ['Real-time slot tracking', 'Valet parking assistance', '24/7 CCTV surveillance']
    },
    {
      icon: <Users className="w-6 h-6 text-amber-600" />,
      tag: 'Capacity & Safety',
      title: '10,000+ Daily Visitors Capacity',
      description: 'Built for festive mega rushes with 8 modern capsule elevators, high-speed escalators on every floor, wide emergency exits, and medical first-aid desks.',
      features: ['High-capacity crowd transit', 'Wheelchair accessibility', 'Trained safety personnel']
    },
    {
      icon: <Film className="w-6 h-6 text-amber-600" />,
      tag: 'Dolby Atmos Audio',
      title: '4-Screen CineSmart Multiplex',
      description: 'The first world-class multi-screen cinema in Lakhisarai featuring cutting-edge Dolby Atmos surround sound, 4K digital projection, and luxury push-back recliners.',
      features: ['4 High-tech Audi screens', 'VIP leather recliner row', 'Gourmet cinema snacks concourse']
    },
    {
      icon: <Palette className="w-6 h-6 text-amber-600" />,
      tag: 'Regional Pride',
      title: 'Dedicated "Made in Bihar" Section',
      description: 'Promoting local heritage: authentic Bhagalpuri Tussar silk handloom, certified Madhubani paintings, Sikki golden grass crafts, and regional artisan cooperatives.',
      features: ['100% genuine artisan crafts', 'Live artisan demos on weekends', 'Zero middlemen markup']
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-300">
            Key Mall Highlights
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Setting New Standards For Bihar’s Retail Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Smart Bazzar brings the grandeur of metropolitan shopping malls to NH-80 Road in Lakhisarai, combining modern convenience with authentic Bihari culture.
          </p>
        </div>

        {/* Highlights Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-400/60 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-md">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {item.description}
                </p>
              </div>

              {/* Mini bullet points */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {item.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Smart Features Banner */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-500/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Wifi className="w-3.5 h-3.5" />
                <span>Next-Gen Smart Mall Amenities</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Designed for 100% Cashless, High-Tech Convenience
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Enjoy high-speed complimentary 5G Wi-Fi across all 5 floors, interactive touch-screen digital wayfinding kiosks, digital loyalty reward tracking, and seamless UPI & card payments at every single store.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenParking}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-all shadow-md cursor-pointer"
              >
                Check Parking Availability
              </button>
              <button
                onClick={onOpenVirtualTour}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-all cursor-pointer"
              >
                Take 360° Walkthrough
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
