import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Clock, 
  Phone, 
  Tag, 
  Check, 
  Heart, 
  ExternalLink,
  Store as StoreIcon,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Store, StoreCategory } from '../types';
import { STORES_DATA } from '../data/mallData';

interface StoresDirectoryProps {
  onOpenVirtualTour?: () => void;
}

export const StoresDirectory: React.FC<StoresDirectoryProps> = ({ onOpenVirtualTour }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory>('all');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [subFilter, setSubFilter] = useState<'all' | 'kids' | 'ethnic' | 'anchors'>('all');

  const categories: { id: StoreCategory; label: string }[] = [
    { id: 'all', label: 'All Brands (50+)' },
    { id: 'fashion', label: 'Fashion & Apparel' },
    { id: 'electronics', label: 'Electronics & Gadgets' },
    { id: 'groceries', label: 'Hypermarket & Groceries' },
    { id: 'lifestyle', label: 'Lifestyle & Home' },
    { id: 'bihar-craft', label: '⭐ Made in Bihar Crafts' },
  ];

  const filteredStores = useMemo(() => {
    return STORES_DATA.filter((store) => {
      const matchesCategory = selectedCategory === 'all' || store.category === selectedCategory;
      
      let matchesSubFilter = true;
      if (subFilter === 'kids') {
        matchesSubFilter = store.categoryLabel.toLowerCase().includes('boys') || 
                           store.categoryLabel.toLowerCase().includes('girls') || 
                           store.name.toLowerCase().includes('junior') ||
                           store.name.toLowerCase().includes('kids') ||
                           store.description.toLowerCase().includes('kids') ||
                           store.description.toLowerCase().includes('frocks');
      } else if (subFilter === 'ethnic') {
        matchesSubFilter = store.categoryLabel.toLowerCase().includes('ethnic') ||
                           store.categoryLabel.toLowerCase().includes('bridal') ||
                           store.isBiharSpecial === true ||
                           store.description.toLowerCase().includes('sherwani') ||
                           store.description.toLowerCase().includes('kurta');
      } else if (subFilter === 'anchors') {
        matchesSubFilter = store.isAnchor === true;
      }

      const matchesSearch = 
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.floor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSubFilter && matchesSearch;
    });
  }, [selectedCategory, subFilter, searchQuery]);

  return (
    <section className="py-16 sm:py-20 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-300">
            <StoreIcon className="w-3.5 h-3.5" />
            <span>Anchor Stores & Brand Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Discover 50+ Top National & Regional Brands
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From premier fashion anchors and tech stores to daily hypermarket value and authentic Lakhisarai artisans.
          </p>
        </div>

        {/* Dedicated "Made in Bihar" Highlight Banner */}
        <div className="mb-12 bg-gradient-to-r from-amber-900 via-orange-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Special Regional Initiative by Ganesh Singh
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Dedicated "Made in Bihar" Cultural Pavilion
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Smart Bazzar proudly hosts an exclusive zone on the 2nd Floor honoring Bihar's artisanal legacy. Discover authentic Bhagalpuri Tussar silk handloom, certified Madhubani canvas art, and Sikki golden grass crafts with 100% direct artisan support.
              </p>
            </div>

            <button
              onClick={() => setSelectedCategory('bihar-craft')}
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-md transition-all self-start lg:self-auto cursor-pointer"
            >
              Browse Bihar Artisans
            </button>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search input */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands (e.g., Reliance Trends, Croma, Apple, Bata, Madhubani...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium shrink-0">
              Showing <strong>{filteredStores.length}</strong> stores
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick Sub-Filter Chips */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-0.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3 text-amber-500" />
              Quick Filter:
            </span>
            <button
              onClick={() => setSubFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                subFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSubFilter('kids')}
              className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                subFilter === 'kids'
                  ? 'bg-rose-600 text-white'
                  : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              Boys & Girls Fashion Hub
            </button>
            <button
              onClick={() => setSubFilter('ethnic')}
              className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                subFilter === 'ethnic'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              Festive & Ethnic Wear
            </button>
            <button
              onClick={() => setSubFilter('anchors')}
              className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                subFilter === 'anchors'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              Anchor Mega Stores
            </button>
          </div>
        </div>

        {/* Boys & Girls Fashion in Mall Promotion Banner */}
        <div className="mb-10 bg-gradient-to-r from-rose-950 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-rose-500/30 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-400/40">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              Boys & Girls Designer Fashion in Lakhisarai
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Stylish Partywear & Festive Dresses for Boys & Girls
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore 4 brand-new fashion destinations on Floor 1 and Ground Floor: <span className="text-rose-300 font-semibold">Junior Vogue, Little Manyavar, Pink Cow, and Spykar Boys</span>. Featuring boys tuxedo suits, sherwanis, and streetwear, alongside girls fairy princess gowns, Anarkalis, and twirl dresses.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSubFilter('kids');
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs shadow-md transition-all self-start md:self-auto cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            <span>View Kids & Youth Stores</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stores Grid */}
        {filteredStores.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <StoreIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-800">No stores found</h4>
            <p className="text-sm text-slate-500 mt-1">Try changing your search term or category filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Store Card Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={store.image}
                      alt={store.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    
                    {store.isAnchor && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
                        Anchor Brand
                      </span>
                    )}

                    {store.isBiharSpecial && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                        Made in Bihar
                      </span>
                    )}

                    <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {store.floor}
                    </span>
                  </div>

                  {/* Store Details Content */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                          {store.name}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">{store.categoryLabel}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {store.description}
                    </p>

                    {store.offer && (
                      <div className="p-2 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-amber-900">
                        <Tag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{store.offer}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {store.hours}
                  </span>

                  <button
                    onClick={() => setSelectedStore(store)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
                  >
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Store Detail Modal */}
      {selectedStore && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-200">
            <div className="relative h-48 w-full">
              <img
                src={selectedStore.image}
                alt={selectedStore.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedStore(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                  {selectedStore.categoryLabel}
                </span>
                <h3 className="text-2xl font-black mt-1">{selectedStore.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedStore.description}
              </p>

              <div className="grid grid-cols-2 gap-3 py-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Location / Floor</p>
                  <p className="text-slate-800 font-bold mt-0.5">{selectedStore.floor}</p>
                  <p className="text-slate-500">Unit: {selectedStore.unit}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Store Timings</p>
                  <p className="text-slate-800 font-bold mt-0.5">{selectedStore.hours}</p>
                  <p className="text-slate-500">Open 7 Days a week</p>
                </div>
              </div>

              {selectedStore.offer && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-amber-900">{selectedStore.offer}</span>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                {selectedStore.phone && (
                  <a
                    href={`tel:${selectedStore.phone}`}
                    className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs text-center shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Store: {selectedStore.phone}</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedStore(null)}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
