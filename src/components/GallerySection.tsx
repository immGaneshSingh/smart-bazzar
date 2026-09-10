import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  Maximize2, 
  Play, 
  Compass, 
  X, 
  Check,
  ChevronRight
} from 'lucide-react';
import { GALLERY_IMAGES } from '../data/mallData';

interface GallerySectionProps {
  onOpenVirtualTour: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenVirtualTour }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const categories = ['All', 'Architecture', 'Shopping', 'Cinema', 'Dining', 'Culture', 'Rooftop'];

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    if (selectedCategory === 'All') return true;
    return img.category === selectedCategory;
  });

  return (
    <section className="py-16 sm:py-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Mall Photo & Architectural Gallery
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Glimpse the grand atriums, multiplex screens, bustling food court, and rooftop views of Smart Bazzar.
            </p>
          </div>

          <button
            onClick={onOpenVirtualTour}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md self-start md:self-auto"
          >
            <Compass className="w-4 h-4" />
            <span>Launch 360° Virtual Walkthrough</span>
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-amber-400 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item.image)}
              className="group relative h-64 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                  {item.category}
                </span>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h4 className="text-sm font-bold leading-tight">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Video Tour Feature Card */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Live & Digital Media</span>
            <h3 className="text-2xl font-black">Watch Mall Walkthrough Video on YouTube</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Watch aerial drone shots of the NH-80 facade, CineSmart sound demonstration, and festival celebrations on our official YouTube channel.
            </p>
          </div>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-colors"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Watch On YouTube Channel</span>
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeImage}
              alt="Mall Preview"
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
            />
          </div>
        </div>
      )}
    </section>
  );
};
