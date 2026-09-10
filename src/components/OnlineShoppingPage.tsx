import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Heart, 
  Star, 
  Truck, 
  Sparkles, 
  Store, 
  Check, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Eye, 
  X,
  MapPin,
  Clock,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OnlineProduct, ProductCategory } from '../types';

interface OnlineShoppingPageProps {
  onNavigate?: (tab: any) => void;
}

export const OnlineShoppingPage: React.FC<OnlineShoppingPageProps> = ({ onNavigate }) => {
  const { 
    products, 
    cart, 
    addToCart, 
    updateQuantity, 
    buyNow, 
    toggleWishlist, 
    isWishlisted,
    setIsCartOpen 
  } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('popular');
  const [onlyBiharSpecial, setOnlyBiharSpecial] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<OnlineProduct | null>(null);

  // Advanced Filter Options State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState<'all' | 'under-500' | '500-1000' | '1000-2500' | '2500-5000' | 'above-5000'>('all');
  const [discountFilter, setDiscountFilter] = useState<'all' | '20' | '30' | '40' | '50'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [deliverySpeedFilter, setDeliverySpeedFilter] = useState<'all' | 'express-90' | 'pan-india'>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // Pan-India Pincode Checker State
  const [userPincode, setUserPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Selected option map per product ID (e.g. size or color)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Products', count: products.length },
    { id: 'boys', label: '👦 Boys Fashion', count: products.filter(p => p.category === 'boys').length },
    { id: 'girls', label: '👧 Girls Fashion', count: products.filter(p => p.category === 'girls').length },
    { id: 'men', label: "Men's Fashion", count: products.filter(p => p.category === 'men').length },
    { id: 'women', label: "Women's Ethnic & Western", count: products.filter(p => p.category === 'women').length },
    { id: 'kids', label: 'Kids Wear', count: products.filter(p => p.category === 'kids').length },
    { id: 'footwear', label: 'Footwear & Shoes', count: products.filter(p => p.category === 'footwear').length },
    { id: 'beauty', label: 'Beauty & Skincare', count: products.filter(p => p.category === 'beauty').length },
    { id: 'fashion', label: 'Festive Kurtas & Apparel', count: products.filter(p => p.category === 'fashion').length },
    { id: 'bihar-craft', label: 'Made in Bihar Handlooms', count: products.filter(p => p.category === 'bihar-craft').length },
    { id: 'electronics', label: 'Electronics & Audio', count: products.filter(p => p.category === 'electronics').length },
    { id: 'home-living', label: 'Home & Decor', count: products.filter(p => p.category === 'home-living' || p.category === 'lifestyle').length },
    { id: 'delicacies', label: 'Lakhisarai Sweets & Food', count: products.filter(p => p.category === 'delicacies').length },
    { id: 'grocery', label: 'Hypermarket Staples', count: products.filter(p => p.category === 'grocery').length },
  ];

  const availableBrands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach(p => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet).sort();
  }, [products]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (priceFilter !== 'all') count++;
    if (discountFilter !== 'all') count++;
    if (minRating > 0) count++;
    if (selectedBrand !== 'all') count++;
    if (deliverySpeedFilter !== 'all') count++;
    if (inStockOnly) count++;
    if (onlyBiharSpecial) count++;
    return count;
  }, [selectedCategory, priceFilter, discountFilter, minRating, selectedBrand, deliverySpeedFilter, inStockOnly, onlyBiharSpecial]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setPriceFilter('all');
    setDiscountFilter('all');
    setMinRating(0);
    setSelectedBrand('all');
    setDeliverySpeedFilter('all');
    setInStockOnly(false);
    setOnlyBiharSpecial(false);
    setSearchQuery('');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = userPincode.replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      setPincodeStatus('Please enter a valid 6-digit Indian pincode.');
      return;
    }
    if (cleanPin.startsWith('811311') || cleanPin.startsWith('8113')) {
      setPincodeStatus(`⚡ Pincode ${cleanPin} (Lakhisarai & Kiul): 90-Min Superfast Local Delivery Available!`);
    } else if (cleanPin.startsWith('80') || cleanPin.startsWith('81') || cleanPin.startsWith('82') || cleanPin.startsWith('84') || cleanPin.startsWith('85')) {
      setPincodeStatus(`🚚 Pincode ${cleanPin} (Bihar Zone): Express 1-2 Days Doorstep Delivery Available!`);
    } else {
      setPincodeStatus(`🇮🇳 Pincode ${cleanPin} (All-India Delivery): Available via BlueDart & Delhivery (3-4 Business Days). Free Delivery on ₹499+!`);
    }
  };

  const handleSelectOption = (productId: string, option: string) => {
    setSelectedOptions(prev => ({ ...prev, [productId]: option }));
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (onlyBiharSpecial && !p.isBiharSpecial) return false;
        if (inStockOnly && (!p.inStock || p.inStock <= 0)) return false;

        // Price Range filter
        if (priceFilter === 'under-500' && p.price >= 500) return false;
        if (priceFilter === '500-1000' && (p.price < 500 || p.price > 1000)) return false;
        if (priceFilter === '1000-2500' && (p.price < 1000 || p.price > 2500)) return false;
        if (priceFilter === '2500-5000' && (p.price < 2500 || p.price > 5000)) return false;
        if (priceFilter === 'above-5000' && p.price <= 5000) return false;

        // Discount filter
        if (discountFilter !== 'all') {
          const minDisc = parseInt(discountFilter, 10);
          if (p.discountPercent < minDisc) return false;
        }

        // Rating filter
        if (minRating > 0 && p.rating < minRating) return false;

        // Brand filter
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;

        // Delivery speed filter
        if (deliverySpeedFilter === 'express-90' && !p.isExpressDelivery) return false;
        if (deliverySpeedFilter === 'pan-india' && !p.isPanIndiaDelivery) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchStore = p.storeOrigin.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCategory = p.categoryLabel.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchStore && !matchDesc && !matchCategory) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        // popular
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.reviewsCount - a.reviewsCount;
      });
  }, [
    products, 
    selectedCategory, 
    onlyBiharSpecial, 
    inStockOnly, 
    priceFilter, 
    discountFilter, 
    minRating, 
    selectedBrand, 
    deliverySpeedFilter, 
    searchQuery, 
    sortBy
  ]);

  const getItemQuantityInCart = (productId: string, option?: string) => {
    const item = cart.find(i => i.product.id === productId && (!option || i.selectedOption === option));
    return item ? item.quantity : 0;
  };

  return (
    <div className="py-8 sm:py-12 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="relative rounded-3xl bg-slate-900 text-white overflow-hidden p-5 sm:p-8 lg:p-10 mb-6 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pan-India Shopping • Delivered to 19,000+ Pincodes Across India</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
              Trending Fashion, Kids Wear & All-India Online Shopping
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Shop Manyavar festive kurtas, Biba ethnic suits, stylish boys & girls partywear, Puma athletic gear, authentic Bhagalpur Tussar silk sarees, and Croma gadgets. <span className="text-amber-400 font-bold">Doorstep delivery available across all 28 Indian States & 8 UTs</span>, plus express 90-min delivery in Lakhisarai and Kiul.
            </p>

            {/* Pincode Availability Checker */}
            <div className="pt-1">
              <form onSubmit={handleCheckPincode} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={userPincode}
                    onChange={(e) => setUserPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter Indian 6-digit Pincode (e.g. 110001 / 811311)"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow-xs shrink-0"
                >
                  Check Delivery
                </button>
              </form>

              {pincodeStatus && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-amber-300 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{pincodeStatus}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-6 text-xs border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Truck className="w-4 h-4 text-amber-400" />
                Free All-India Delivery ₹499+
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <Clock className="w-4 h-4 text-amber-400" />
                90-Min Lakhisarai • 2-4 Days Pan-India
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Genuine Outlets & 7-Day Returns
              </span>
            </div>
          </div>
        </div>

        {/* Search, Sort, Filters & Bihar Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search boys sherwani, girls frock, Bhagalpur silk, earbuds, groceries..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Buttons & Sort controls */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Filter Drawer Trigger Button */}
              <button
                type="button"
                id="open-filter-options-btn"
                onClick={() => setIsFilterDrawerOpen(true)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                  activeFilterCount > 0
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                    : 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-black flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Bihar Special Checkbox */}
              <button
                type="button"
                onClick={() => setOnlyBiharSpecial(!onlyBiharSpecial)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  onlyBiharSpecial
                    ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Made in Bihar</span>
              </button>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs font-semibold border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                <option value="popular">Sort: Featured & Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Biggest Discount %</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-slate-800 text-amber-400' : 'bg-slate-200 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Filter Pills Row */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3 text-amber-500" />
              Quick Filters:
            </span>

            {/* Quick Boys Fashion Filter */}
            <button
              onClick={() => setSelectedCategory(selectedCategory === 'boys' ? 'all' : 'boys')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-colors ${
                selectedCategory === 'boys'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              👦 Boys Fashion
            </button>

            {/* Quick Girls Fashion Filter */}
            <button
              onClick={() => setSelectedCategory(selectedCategory === 'girls' ? 'all' : 'girls')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-colors ${
                selectedCategory === 'girls'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              👧 Girls Fashion
            </button>

            {/* Quick Price Under 1000 */}
            <button
              onClick={() => setPriceFilter(priceFilter === 'under-1000' ? 'all' : 'under-1000')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 cursor-pointer transition-colors ${
                priceFilter === 'under-1000'
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Under ₹1,000
            </button>

            {/* Quick 50%+ Discount */}
            <button
              onClick={() => setDiscountFilter(discountFilter === '50' ? 'all' : '50')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 cursor-pointer transition-colors ${
                discountFilter === '50'
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
              }`}
            >
              50%+ Off
            </button>

            {/* Quick 4.5+ Rating */}
            <button
              onClick={() => setMinRating(minRating === 4.5 ? 0 : 4.5)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 cursor-pointer transition-colors flex items-center gap-1 ${
                minRating === 4.5
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400" />
              <span>4.5★ & Above</span>
            </button>

            {/* Quick 90-Min Superfast */}
            <button
              onClick={() => setDeliverySpeedFilter(deliverySpeedFilter === 'express-90' ? 'all' : 'express-90')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 cursor-pointer transition-colors flex items-center gap-1 ${
                deliverySpeedFilter === 'express-90'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>⚡ 90-Min Lakhisarai</span>
            </button>

            {/* Clear all quick link if filters are active */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="px-2.5 py-1 rounded-lg text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0 cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All ({activeFilterCount})</span>
              </button>
            )}
          </div>

          {/* Active Applied Filters Strip */}
          {activeFilterCount > 0 && (
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px] font-semibold">Active filters:</span>
              
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px]">
                  Category: {categories.find(c => c.id === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory('all')} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {priceFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px]">
                  Price: {priceFilter === 'under-500' ? 'Under ₹500' : priceFilter === '500-1000' ? '₹500-₹1,000' : priceFilter === '1000-2500' ? '₹1,000-₹2,500' : priceFilter === '2500-5000' ? '₹2,500-₹5,000' : 'Above ₹5,000'}
                  <button onClick={() => setPriceFilter('all')} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {discountFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-50 text-red-800 font-semibold text-[11px]">
                  Min Discount: {discountFilter}%+ Off
                  <button onClick={() => setDiscountFilter('all')} className="text-red-400 hover:text-red-800 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold text-[11px]">
                  Rating: {minRating}★+
                  <button onClick={() => setMinRating(0)} className="text-amber-500 hover:text-amber-800 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px]">
                  Brand: {selectedBrand}
                  <button onClick={() => setSelectedBrand('all')} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {deliverySpeedFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold text-[11px]">
                  Delivery: {deliverySpeedFilter === 'express-90' ? '90-Min Superfast' : 'Pan-India Free Shipping'}
                  <button onClick={() => setDeliverySpeedFilter('all')} className="text-emerald-500 hover:text-emerald-800 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {onlyBiharSpecial && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-semibold text-[11px]">
                  Made in Bihar
                  <button onClick={() => setOnlyBiharSpecial(false)} className="text-amber-600 hover:text-amber-900 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {inStockOnly && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px]">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-red-600 hover:underline font-bold text-[11px] ml-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-slate-500">
            Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> items available for all-India & Lakhisarai delivery
          </p>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Open Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
          </button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No products match your filters</h3>
            <p className="text-xs text-slate-500 mt-1">Try relaxing some of your filter criteria or search terms</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl cursor-pointer hover:bg-slate-800"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map(product => {
              const currentOption = selectedOptions[product.id] || (product.unitOrSizeOptions ? product.unitOrSizeOptions[0] : undefined);
              const qtyInCart = getItemQuantityInCart(product.id, currentOption);
              const isSaved = isWishlisted(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/5 sm:aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Store Origin / Special Badge */}
                    <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-bold tracking-wide shadow-xs">
                        {product.storeOrigin}
                      </span>
                      {product.isBiharSpecial && (
                        <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-black shadow-xs">
                          Made in Bihar
                        </span>
                      )}
                    </div>

                    {/* Discount & Wishlist */}
                    <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-red-600 text-white text-[9px] sm:text-[10px] font-black shadow-xs">
                        {product.discountPercent}% OFF
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        className={`p-1.5 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
                          isSaved 
                            ? 'bg-red-50 text-red-500' 
                            : 'bg-white/85 text-slate-600 hover:bg-white hover:text-red-500'
                        }`}
                        title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500' : ''}`} />
                      </button>
                    </div>

                    {/* Quick View Button on Hover */}
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="hidden sm:flex absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-slate-900 text-[11px] font-bold items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                    <div>
                      {/* Brand and Rating */}
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-800 truncate">
                          {product.brand}
                        </span>
                        <div className="flex items-center text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0">
                          <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      {/* Product Title */}
                      <h3 className="text-xs font-semibold text-slate-700 line-clamp-1 group-hover:text-amber-600 transition-colors leading-tight" title={product.name}>
                        {product.name}
                      </h3>

                      {/* Options (e.g. sizes or weights) */}
                      {product.unitOrSizeOptions && product.unitOrSizeOptions.length > 0 && (
                        <div className="mt-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                          {product.unitOrSizeOptions.slice(0, 4).map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSelectOption(product.id, opt)}
                              className={`px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold rounded border shrink-0 transition-all ${
                                currentOption === opt 
                                  ? 'border-amber-500 bg-amber-50 text-slate-900' 
                                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-baseline justify-between flex-wrap gap-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-slate-950">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] text-slate-400 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1 rounded">
                          Pan-India
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {qtyInCart > 0 ? (
                          <div className="flex items-center justify-between border border-amber-500 rounded-xl bg-amber-50 px-1.5 py-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, -1, currentOption)}
                              className="p-1 text-slate-700 hover:text-slate-950"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-[11px] font-black text-slate-900">
                              {qtyInCart}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, 1, currentOption)}
                              className="p-1 text-slate-700 hover:text-slate-950"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addToCart(product, 1, currentOption)}
                            className="w-full py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <ShoppingBag className="w-3 h-3 text-amber-400 shrink-0" />
                            <span className="truncate">Add</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => buyNow(product, currentOption)}
                          className="w-full py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-xs"
                        >
                          <span className="truncate">Buy Now</span>
                          <ArrowRight className="w-3 h-3 shrink-0" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Slide-Over Comprehensive Filter Modal / Drawer */}
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-extrabold text-slate-900">
                    Filter Online Products
                  </h3>
                  {activeFilterCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold">
                      {activeFilterCount} Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-red-600 hover:text-red-700 font-bold cursor-pointer"
                    >
                      Reset All
                    </button>
                  )}
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
                
                {/* 1. Category / Department */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2.5">
                    Category & Department
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-2 rounded-xl text-left text-xs font-semibold transition-all border cursor-pointer flex items-center justify-between ${
                          selectedCategory === cat.id
                            ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{cat.label}</span>
                        <span className="text-[10px] text-slate-400 font-normal ml-1">({cat.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Price Range */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2.5">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'all', label: 'All Prices' },
                      { id: 'under-500', label: 'Under ₹500' },
                      { id: '500-1000', label: '₹500 - ₹1,000' },
                      { id: '1000-2500', label: '₹1,000 - ₹2,500' },
                      { id: '2500-5000', label: '₹2,500 - ₹5,000' },
                      { id: 'above-5000', label: 'Above ₹5,000' },
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPriceFilter(item.id as any)}
                        className={`p-2 rounded-xl text-xs font-semibold text-center border cursor-pointer transition-all ${
                          priceFilter === item.id
                            ? 'bg-slate-900 border-slate-900 text-white font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Minimum Discount */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2.5">
                    Minimum Discount
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'all', label: 'Any' },
                      { id: '30', label: '30%+' },
                      { id: '40', label: '40%+' },
                      { id: '50', label: '50%+' },
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDiscountFilter(item.id as any)}
                        className={`p-2 rounded-xl text-xs font-bold text-center border cursor-pointer transition-all ${
                          discountFilter === item.id
                            ? 'bg-red-600 border-red-600 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Minimum Customer Rating */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2.5">
                    Customer Rating
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 0, label: 'All Ratings' },
                      { value: 4.0, label: '4.0★ & Above' },
                      { value: 4.5, label: '4.5★ & Above' },
                    ].map(item => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setMinRating(item.value)}
                        className={`p-2 rounded-xl text-xs font-bold text-center border cursor-pointer transition-all ${
                          minRating === item.value
                            ? 'bg-amber-500 border-amber-600 text-slate-950 font-black'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Brand Selector */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2.5">
                    Brand / Label
                  </label>
                  <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
                    <button
                      type="button"
                      onClick={() => setSelectedBrand('all')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                        selectedBrand === 'all'
                          ? 'bg-slate-900 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      All Brands
                    </button>
                    {availableBrands.map(brand => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setSelectedBrand(brand)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                          selectedBrand === brand
                            ? 'bg-amber-600 text-white font-bold'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Delivery Mode & Availability */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                    Delivery Speed & Region
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setDeliverySpeedFilter('all')}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold border cursor-pointer flex items-center justify-between ${
                        deliverySpeedFilter === 'all'
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>Any Delivery Mode</span>
                      {deliverySpeedFilter === 'all' && <Check className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliverySpeedFilter('express-90')}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold border cursor-pointer flex items-center justify-between ${
                        deliverySpeedFilter === 'express-90'
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        90-Min Superfast (Lakhisarai & Kiul)
                      </span>
                      {deliverySpeedFilter === 'express-90' && <Check className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliverySpeedFilter('pan-india')}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold border cursor-pointer flex items-center justify-between ${
                        deliverySpeedFilter === 'pan-india'
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" />
                        Pan-India Free Courier (₹499+)
                      </span>
                      {deliverySpeedFilter === 'pan-india' && <Check className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Checkboxes */}
                  <div className="pt-2 space-y-2">
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={onlyBiharSpecial}
                        onChange={(e) => setOnlyBiharSpecial(e.target.checked)}
                        className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="font-semibold">Show only Made in Bihar Handloom & Regional Crafts</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="font-semibold">In Stock items only</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Drawer Sticky Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer text-center"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs cursor-pointer text-center shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Apply & View {filteredProducts.length} Results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
              
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="relative aspect-square sm:aspect-auto bg-slate-100">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded-lg text-white text-[11px] font-semibold">
                    {quickViewProduct.storeOrigin}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-600">
                      {quickViewProduct.categoryLabel}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1">
                      {quickViewProduct.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center text-amber-500 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-slate-800 ml-1">{quickViewProduct.rating}</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">{quickViewProduct.reviewsCount} reviews</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-emerald-700 font-semibold">{quickViewProduct.inStock} units in stock</span>
                    </div>

                    <div className="flex items-baseline gap-2 mt-3">
                      <span className="text-xl font-extrabold text-slate-950">
                        ₹{quickViewProduct.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-red-600 font-bold">
                        ({quickViewProduct.discountPercent}% OFF)
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {quickViewProduct.description}
                    </p>

                    <div className="mt-3 space-y-1.5">
                      <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Product Highlights</h4>
                      {quickViewProduct.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct, 1);
                        setQuickViewProduct(null);
                        setIsCartOpen(true);
                      }}
                      className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add to Bag</span>
                    </button>

                    <button
                      onClick={() => {
                        setQuickViewProduct(null);
                        buyNow(quickViewProduct);
                      }}
                      className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Buy Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
