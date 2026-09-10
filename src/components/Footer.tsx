import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Youtube, 
  ChevronRight, 
  Heart, 
  ShieldCheck, 
  Sparkles,
  Send,
  Check,
  UserCheck,
  Car,
  Compass,
  Film,
  Layers,
  Camera
} from 'lucide-react';
import { MALL_INFO } from '../data/mallData';
import { ActiveTab } from '../types';

interface FooterProps {
  onNavigate: (sectionId: ActiveTab) => void;
  onOpenParking: () => void;
  onOpenVirtualTour: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenParking, onOpenVirtualTour }) => {
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSubscribed, setNewsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsSubscribed(true);
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter / Deal Alerts Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/70 rounded-3xl p-6 sm:p-10 border border-amber-500/20 mb-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left max-w-md">
            <div className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Bazzar VIP Club</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Get Lakhisarai Weekend Deals & Movie Alerts
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Subscribe for instant festive discount coupons, CineSmart showtimes, and cultural events on NH-80 Road.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsSubscribed ? (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Check className="w-4 h-4" />
                <span>Subscribed! Welcome to Smart Bazzar VIP Club.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join Club</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-14">
          
          {/* Col 1: Brand & Owner Ganesh Singh (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-black text-slate-950 shadow-md">
                SB
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block">SMART BAZZAR</span>
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block">Lakhisarai • Bihar</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {MALL_INFO.tagline}
            </p>

            <div className="space-y-1 text-xs text-slate-400 pt-1">
              <p><strong>Total Area:</strong> {MALL_INFO.totalArea} • 5 Floors</p>
              <p><strong>Capacity:</strong> 10,000+ Visitors / Day</p>
              <p><strong>Parking:</strong> 500+ Cars, 1,000+ Two-Wheelers</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-400 flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-400 flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-400 flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Dedicated Pages (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Specific Mall Pages</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left font-bold text-amber-300"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Shop Online (Doorstep Delivery)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('account')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left text-slate-200"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Track Orders & Account</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('stores')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Stores & Brands Directory</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dining')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Food Court & Taste of Bihar</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('entertainment')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>CineSmart 4-Screen Multiplex</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('floors')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Interactive 5-Floor Map</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('parking')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left font-semibold text-emerald-400"
                >
                  <Car className="w-3 h-3 text-emerald-400" />
                  <span>Smart Parking Live Bays</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tour')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left font-semibold text-amber-300"
                >
                  <Compass className="w-3 h-3 text-amber-400" />
                  <span>360° Virtual Walkthrough</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & CSR (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Services & Experience</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('membership')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Smart Club Membership</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Festivals & Events</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('facilities')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Facilities & Green Tech</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Mall Photo Gallery</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Reach Us (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Visit Smart Bazzar</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{MALL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${MALL_INFO.phone}`} className="hover:text-white transition-colors">{MALL_INFO.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${MALL_INFO.email}`} className="hover:text-white transition-colors">{MALL_INFO.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>10:00 AM – 10:30 PM (Open All 7 Days)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Store Leasing & Help Desk</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2024–{new Date().getFullYear()} Smart Bazzar Lakhisarai • Owned by <strong className="text-slate-300 font-semibold">Ganesh Singh</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>NH-80 Road, Lakhisarai, Bihar</span>
            <span>•</span>
            <span>Owner: Ganesh Singh</span>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 cursor-pointer">
              Store Leasing & Contact
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
