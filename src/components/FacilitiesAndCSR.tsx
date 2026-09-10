import React, { useState } from 'react';
import { 
  Car, 
  ShieldCheck, 
  Accessibility, 
  HelpCircle, 
  Sun, 
  Droplets, 
  Recycle, 
  CheckCircle2, 
  HeartHandshake, 
  PhoneCall, 
  MessageSquare,
  Sparkles,
  Search,
  Check
} from 'lucide-react';
import { MALL_INFO } from '../data/mallData';

interface FacilitiesAndCSRProps {
  onOpenParking: () => void;
}

export const FacilitiesAndCSR: React.FC<FacilitiesAndCSRProps> = ({ onOpenParking }) => {
  const [lostFoundModalOpen, setLostFoundModalOpen] = useState(false);
  const [lostItem, setLostItem] = useState('');
  const [lostLocation, setLostLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [lostReportSubmitted, setLostReportSubmitted] = useState(false);

  const facilities = [
    {
      icon: <Car className="w-6 h-6 text-amber-600" />,
      title: 'Smart Automated Parking',
      subtitle: '500+ Cars & 1000+ Bikes',
      detail: 'Sensors on every bay show open slots in real time. Pre-book slots via our web app, charge your EV, or enjoy free valet service during peak hours.',
      action: 'Reserve Slot',
      onAction: onOpenParking
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      title: '3-Tier 24x7 Security',
      subtitle: 'CCTV & Biometric Access',
      detail: 'Over 200 high-definition CCTV cameras, automated biometric entry for 600+ mall staff, and 24/7 security patrol with trained fire safety response teams.',
    },
    {
      icon: <Accessibility className="w-6 h-6 text-amber-600" />,
      title: 'Universal Barrier-Free Access',
      subtitle: 'Ramps, Elevators & Wheelchairs',
      detail: 'Gentle grade entry ramps, 8 high-capacity capsule elevators, tactile floor indicators, accessible ADA-compliant restrooms, and free wheelchairs at help desks.',
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-amber-600" />,
      title: 'Central Customer Care & Lost/Found',
      subtitle: 'Ground Floor Atrium Desk',
      detail: 'Dedicated multilingual staff to help with directions, lost and found items, baby stroller loans, emergency mobile power banks, and loyalty enrollment.',
      action: 'Report Lost Item',
      onAction: () => {
        setLostFoundModalOpen(true);
        setLostReportSubmitted(false);
      }
    },
    {
      icon: <Sun className="w-6 h-6 text-emerald-600" />,
      title: '500 kW Rooftop Solar Plant',
      subtitle: 'Clean Renewable Electricity',
      detail: 'Harnessing the sun above NH-80 to power mall air-conditioning and central lighting, reducing our regional carbon footprint by over 450 tons annually.',
    },
    {
      icon: <Droplets className="w-6 h-6 text-blue-600" />,
      title: 'Rainwater Harvesting & Zero Waste',
      subtitle: 'Eco-Friendly Architecture',
      detail: 'A 100,000-liter subterranean rainwater harvesting tank, 100% on-site water recycling, and organic food waste composting into agricultural fertilizer.',
    },
  ];

  const handleLostFoundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLostReportSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-transparent border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Facilities & Amenities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            World-Class Infrastructure & Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Engineered with safety, environmental sustainability, and utmost guest comfort at the forefront.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {facilities.map((f, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/90 flex flex-col justify-between hover:border-amber-400 hover:shadow-xs transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center">
                  {f.icon}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded">
                    {f.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{f.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {f.detail}
                </p>
              </div>

              {f.action && (
                <button
                  onClick={f.onAction}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-amber-50 text-amber-800 border border-slate-200 hover:border-amber-300 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                >
                  {f.action}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Helpline & Lost/Found Quick Bar */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">Need Assistance at Smart Bazzar?</h4>
            <p className="text-xs text-slate-400">
              Our Customer Help Desk is located in the Ground Floor Central Atrium.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${MALL_INFO.phone}`}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Helpline: {MALL_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                setLostFoundModalOpen(true);
                setLostReportSubmitted(false);
              }}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              Report Lost Item
            </button>
          </div>
        </div>

      </div>

      {/* Lost & Found Modal */}
      {lostFoundModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-200">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <h4 className="text-base font-bold">Lost & Found Inquiry Desk</h4>
              </div>
              <button
                onClick={() => setLostFoundModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {lostReportSubmitted ? (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Inquiry Logged Successfully</h4>
                  <p className="text-xs text-slate-600">
                    Our Ground Floor Help Desk security team will review CCTV recordings and contact you at <strong>{contactNumber}</strong> if found.
                  </p>
                  <button
                    onClick={() => setLostFoundModalOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLostFoundSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Item Description</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Black leather wallet, iPhone 14, car keys"
                      value={lostItem}
                      onChange={(e) => setLostItem(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Approximate Location / Floor</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 3rd Floor Food Court, CineSmart Audi 2"
                      value={lostLocation}
                      onChange={(e) => setLostLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 6200 123456"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer mt-1"
                  >
                    Submit Lost Item Report
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
