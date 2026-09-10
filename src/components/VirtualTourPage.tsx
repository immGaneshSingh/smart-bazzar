import React, { useState } from 'react';
import { 
  Compass, 
  Eye, 
  RotateCw, 
  MapPin, 
  Sparkles, 
  Info, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Check
} from 'lucide-react';
import { VIRTUAL_TOUR_ZONES } from '../data/mallData';

interface VirtualTourPageProps {
  onNavigate: (tab: any) => void;
}

export const VirtualTourPage: React.FC<VirtualTourPageProps> = ({ onNavigate }) => {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [panPosition, setPanPosition] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const zone = VIRTUAL_TOUR_ZONES[activeZoneIndex];

  const handlePanLeft = () => {
    setPanPosition((prev) => Math.max(prev - 20, -35));
  };

  const handlePanRight = () => {
    setPanPosition((prev) => Math.min(prev + 20, 35));
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">
      
      {/* Top Breadcrumb & Control Bar */}
      <div className="bg-slate-900 border-b border-slate-800 py-3.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white">Smart Bazzar 360° Panoramic Walkthrough</h1>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                Interactive Zone
              </span>
            </div>
            <p className="text-xs text-slate-400">NH-80 Road, Lakhisarai • Founded by Ganesh Singh</p>
          </div>
        </div>

        {/* Quick Floor Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          {VIRTUAL_TOUR_ZONES.map((z, idx) => {
            const isActive = activeZoneIndex === idx;
            return (
              <button
                key={z.id}
                onClick={() => {
                  setActiveZoneIndex(idx);
                  setPanPosition(0);
                  setActiveHotspot(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {z.floor}: {z.name.split(' (')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Panoramic Viewport (Fills screen nicely) */}
      <div className="relative flex-1 min-h-[65vh] bg-black overflow-hidden select-none">
        
        {/* Panoramic Image Canvas with Pan Translation */}
        <div
          className="absolute inset-0 w-[150%] -left-[25%] h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(${panPosition}%)` }}
        >
          <img
            src={zone.image}
            alt={zone.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />

          {/* Hotspots */}
          {zone.hotspots.map((spot, sIdx) => (
            <div
              key={sIdx}
              className="absolute z-20 cursor-pointer group"
              style={{ top: spot.y, left: spot.x }}
              onClick={() => setActiveHotspot(spot.label)}
            >
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-400 opacity-75"></span>
                <div className="relative w-8 h-8 rounded-full bg-amber-500 text-slate-950 border-2 border-white shadow-xl flex items-center justify-center font-bold text-xs hover:scale-125 transition-transform">
                  <Info className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-amber-300 text-xs font-bold px-3 py-1 rounded-lg border border-amber-400/40 shadow-xl pointer-events-none opacity-90 group-hover:opacity-100">
                {spot.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pan Navigation Buttons */}
        <div className="absolute inset-y-0 left-4 flex items-center z-30">
          <button
            onClick={handlePanLeft}
            className="w-12 h-12 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
            title="Pan Left"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-4 flex items-center z-30">
          <button
            onClick={handlePanRight}
            className="w-12 h-12 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
            title="Pan Right"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>

        {/* Active Hotspot Toast */}
        {activeHotspot && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 border-2 border-amber-400 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-3 max-w-md">
            <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-amber-300 uppercase">Spotlight Highlight</p>
              <p className="text-sm font-bold text-white">{activeHotspot}</p>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-xs text-slate-400 hover:text-white ml-3 cursor-pointer p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Bottom Floating Info Card */}
        <div className="absolute bottom-6 left-4 right-4 z-30">
          <div className="max-w-2xl mx-auto bg-slate-900/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400">{zone.floor} Showcase</span>
              <h3 className="text-lg font-black text-white">{zone.name}</h3>
              <p className="text-xs text-slate-300">{zone.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigate('stores')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs cursor-pointer shadow transition-colors"
              >
                View Stores on this Floor
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
