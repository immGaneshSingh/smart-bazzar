import React, { useState } from 'react';
import { 
  Layers, 
  MapPin, 
  Store as StoreIcon, 
  Coffee, 
  Film, 
  Sparkles, 
  Baby, 
  Accessibility, 
  Compass, 
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { FLOORS_DATA, STORES_DATA } from '../data/mallData';
import { ActiveTab } from '../types';

interface FloorGuideProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenVirtualTour: () => void;
}

export const FloorGuide: React.FC<FloorGuideProps> = ({ onNavigate, onOpenVirtualTour }) => {
  const [selectedLevel, setSelectedLevel] = useState(0);

  const currentFloor = FLOORS_DATA[selectedLevel];
  const floorStores = STORES_DATA.filter((s) => {
    if (selectedLevel === 0) return s.floor.includes('Ground');
    if (selectedLevel === 1) return s.floor.includes('First');
    if (selectedLevel === 2) return s.floor.includes('Second');
    if (selectedLevel === 3) return s.floor.includes('Third') || s.category === 'bihar-craft';
    return true;
  });

  return (
    <section className="py-16 bg-transparent border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Directory Map</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore All 5 Floors of Smart Bazzar
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Select a level to view retail anchors, dining spots, entertainment venues, and floor facilities.
            </p>
          </div>

          <button
            onClick={onOpenVirtualTour}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs sm:text-sm transition-all cursor-pointer self-start md:self-auto shadow-xs"
          >
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Launch 360° Floor Walkthrough</span>
          </button>
        </div>

        {/* Floor Selection Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {FLOORS_DATA.map((floor, index) => {
            const isSelected = selectedLevel === index;
            return (
              <button
                key={floor.level}
                onClick={() => setSelectedLevel(index)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-md scale-[1.02]'
                    : 'bg-white/80 text-slate-700 hover:bg-white border-slate-200/80 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {floor.level === 0 ? 'G' : floor.level}
                  </span>
                  <span>{floor.name.split(' (')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Floor Card Showcase */}
        <div className="bg-white/85 backdrop-blur-xs rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Image & Virtual Link */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[420px]">
              <img
                src={currentFloor.image}
                alt={currentFloor.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow">
                  Level {currentFloor.level}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">Level Details</p>
                <h3 className="text-xl sm:text-2xl font-black mt-1 leading-snug">{currentFloor.title}</h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">{currentFloor.description}</p>
              </div>
            </div>

            {/* Right Details & Stores */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{currentFloor.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">Over {currentFloor.storesCount}+ Stores & Customer Service Points</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                    Fully Operational
                  </span>
                </div>

                <div className="mb-6">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Attractions on this Floor:</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentFloor.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200/80 text-xs text-slate-800 font-semibold shadow-2xs">
                        <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Floor Amenities */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Floor Amenities & Services:</h5>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200">
                      <Accessibility className="w-3.5 h-3.5 text-amber-600" />
                      Wheelchair Ramps & Escalators
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200">
                      <Baby className="w-3.5 h-3.5 text-amber-600" />
                      Baby Care & Nursing Rooms
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      Security & First Aid Station
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Bottom */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500 font-medium">
                  Looking for a specific brand on this level?
                </p>
                <button
                  onClick={() => onNavigate('stores')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                >
                  <span>Browse Full Store Directory</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
