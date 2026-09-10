import React, { useState } from 'react';
import { 
  X, 
  Compass, 
  Eye, 
  Maximize2, 
  RotateCw, 
  MapPin, 
  Sparkles, 
  Info,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { VIRTUAL_TOUR_ZONES } from '../data/mallData';

interface VirtualTourModalProps {
  onClose: () => void;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ onClose }) => {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [panPosition, setPanPosition] = useState(0);

  const zone = VIRTUAL_TOUR_ZONES[activeZoneIndex];

  const handlePanLeft = () => {
    setPanPosition((prev) => Math.max(prev - 15, -30));
  };

  const handlePanRight = () => {
    setPanPosition((prev) => Math.min(prev + 15, 30));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-5xl w-full h-[88vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Smart Bazzar 360° Virtual Walkthrough</h3>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                  Interactive View
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Current Zone: {zone.name} ({zone.floor})</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 360 Panoramic Viewport */}
        <div className="relative flex-1 bg-black overflow-hidden select-none">
          {/* Panoramic Image with Simulated Pan */}
          <div
            className="absolute inset-0 w-[140%] -left-[20%] h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${panPosition}%)` }}
          >
            <img
              src={zone.image}
              alt={zone.name}
              className="w-full h-full object-cover"
            />
            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/40" />

            {/* Interactive Hotspots */}
            {zone.hotspots.map((spot, sIdx) => (
              <div
                key={sIdx}
                className="absolute z-20 cursor-pointer group"
                style={{ top: spot.y, left: spot.x }}
                onClick={() => setActiveHotspot(spot.label)}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-amber-400 opacity-75"></span>
                  <div className="relative w-7 h-7 rounded-full bg-amber-500 text-slate-950 border-2 border-white shadow-lg flex items-center justify-center font-bold text-xs hover:scale-125 transition-transform">
                    <Info className="w-4 h-4" />
                  </div>
                </div>

                {/* Hotspot Floating Label */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-lg border border-amber-400/40 shadow-lg pointer-events-none opacity-90 group-hover:opacity-100">
                  {spot.label}
                </div>
              </div>
            ))}
          </div>

          {/* Pan Navigation Controls Overlay */}
          <div className="absolute inset-y-0 left-3 flex items-center z-30">
            <button
              onClick={handlePanLeft}
              className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-lg"
              title="Pan Left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-3 flex items-center z-30">
            <button
              onClick={handlePanRight}
              className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-lg"
              title="Pan Right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Active Hotspot Detail Toast */}
          {activeHotspot && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 border border-amber-500/50 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-300">Point of Interest</p>
                <p className="text-sm font-semibold">{activeHotspot}</p>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-xs text-slate-400 hover:text-white ml-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Bottom Info Bar of Current Zone */}
          <div className="absolute bottom-4 left-4 right-4 z-30 pointer-events-none">
            <div className="bg-slate-950/80 backdrop-blur-md rounded-2xl p-3.5 border border-slate-800 text-xs text-slate-200 max-w-xl pointer-events-auto">
              <span className="font-bold text-amber-400">{zone.name} ({zone.floor}): </span>
              <span>{zone.description}</span>
            </div>
          </div>
        </div>

        {/* Bottom Zone Switcher Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2 px-1">
            Choose Virtual Tour Zone:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
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
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left truncate cursor-pointer border ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <p className="text-[9px] uppercase opacity-75">{z.floor}</p>
                  <p className="truncate">{z.name.split(' (')[0].split(' Floor')[0]}</p>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
