import React from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Layers, 
  ArrowRight,
  Truck,
  Sparkles,
  Store
} from 'lucide-react';
import { ActiveTab, AppMode } from '../types';
import { useShop } from '../context/ShopContext';

interface HeroBannerProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenVirtualTour?: () => void;
  onOpenParking?: () => void;
  onOpenMovieBooking?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onNavigate
}) => {
  const { appMode, setAppMode } = useShop();

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-800">
      
      {/* Minimized Banner Canvas (Height: ~190px on mobile, ~220px on desktop) */}
      <div className="relative h-[190px] sm:h-[220px] w-full flex items-center">
        
        {/* Subtle Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={
              appMode === 'online'
                ? "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=80"
                : "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1920&q=80"
            }
            alt={appMode === 'online' ? "Smart Bazzar Online Shopping" : "Smart Bazzar NH-80"}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1920&q=80';
            }}
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Left text block */}
            <div className="max-w-2xl">
              {appMode === 'offline' ? (
                <>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] font-bold mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>NH-80 Main Road, Lakhisarai • Open 10 AM – 10:30 PM</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                    Smart Bazzar <span className="text-red-500">Offline Mall</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
                    5 retail floors, 50+ fashion & electronics brands, CineSmart 4-Screen Dolby Atmos cinema, food court, and 300+ slot smart parking.
                  </p>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[11px] font-bold mb-2">
                    <Truck className="w-3 h-3" />
                    <span>2-Hour Doorstep Delivery in Lakhisarai & Kiul</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                    Smart Bazzar <span className="text-purple-400">Online Store</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
                    Shop direct from Reliance Smart, Croma, Manyavar & Bihar Handloom weavers. Fast home delivery with Cash on Delivery & UPI.
                  </p>
                </>
              )}
            </div>

            {/* Minimized Option: 1 Clean Action Button */}
            <div className="flex items-center gap-2.5 shrink-0">
              {appMode === 'offline' ? (
                <button
                  id="hero-offline-action-btn"
                  onClick={() => onNavigate('stores')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  <span>Floor Directory & Stores</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  id="hero-online-action-btn"
                  onClick={() => onNavigate('shop')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Browse Festive Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
