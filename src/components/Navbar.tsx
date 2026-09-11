import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  Compass, 
  Sparkles, 
  Film, 
  Utensils, 
  Gift, 
  Calendar, 
  Car,
  Layers,
  ShieldCheck,
  Camera,
  ChevronRight,
  User,
  Package,
  LogOut,
  ChevronDown,
  Store,
  FileText,
  Truck,
  ArrowRight,
  Users
} from 'lucide-react';
import { ActiveTab } from '../types';
import { MALL_INFO } from '../data/mallData';
import { useShop } from '../context/ShopContext';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  onOpenParking: () => void;
  onOpenVirtualTour: () => void;
  onOpenMovieBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  onOpenParking,
  onOpenVirtualTour,
  onOpenMovieBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { 
    cartCount, 
    setIsCartOpen, 
    user, 
    setIsAuthModalOpen, 
    logout,
    appMode,
    setAppMode
  } = useShop();

  // Navigation links for Offline Mall
  const offlineNavLinks: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Mall Home', icon: <Store className="w-4 h-4" /> },
    { id: 'stores', label: 'Stores', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'dining', label: 'Dining', icon: <Utensils className="w-4 h-4" /> },
    { id: 'entertainment', label: 'CineSmart', icon: <Film className="w-4 h-4" /> },
    { id: 'floors', label: '5 Floors', icon: <Layers className="w-4 h-4" /> },
    { id: 'parking', label: 'Smart Parking', icon: <Car className="w-4 h-4" /> },
    { id: 'tour', label: '360° Tour', icon: <Compass className="w-4 h-4" /> },
    { id: 'events', label: 'Carnival', icon: <Calendar className="w-4 h-4" /> },
    { id: 'facilities', label: 'Facilities', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'contact', label: 'Directions', icon: <MapPin className="w-4 h-4" /> },
  ];

  // Navigation links for Online Shopping
  const onlineNavLinks: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'shop', label: 'Store Catalog', icon: <ShoppingBag className="w-4 h-4" />, badge: 'Live' },
    { id: 'account', label: 'About User & Documents', icon: <FileText className="w-4 h-4" /> },
    { id: 'membership', label: 'Smart Club Coins', icon: <Gift className="w-4 h-4" /> },
  ];

  const currentNavLinks = appMode === 'offline' ? offlineNavLinks : onlineNavLinks;

  const handleNavClick = (tab: ActiveTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchToMode = (targetMode: 'offline' | 'online') => {
    setAppMode(targetMode);
    if (targetMode === 'offline') {
      onNavigate('home');
    } else {
      onNavigate('shop');
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl shadow-xs border-b border-white/60 relative overflow-hidden transition-all text-slate-800 bg-gradient-to-r from-white/90 via-rose-50/40 to-purple-50/50">
      
      {/* Subdued Watermark Typography Layer */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.035] flex items-center justify-between font-black text-2xl sm:text-4xl tracking-widest text-slate-900 uppercase whitespace-nowrap z-0 overflow-hidden">
        <span>SMART BAZZAR</span>
        <span>LAKHISARAI</span>
        <span>EST 2024</span>
        <span>SMART BAZZAR</span>
      </div>

      {/* 1. TOP DIVISION BAR: Minimized Slim Height in Light Glass */}
      <div className="relative z-10 bg-slate-100/60 backdrop-blur-md text-slate-600 text-[10px] py-1 px-3 sm:px-6 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-1.5">
          
          {/* Left: Mode Selection Indicator & Compact Switch Button */}
          <div className="flex items-center gap-1.5">
            {appMode === 'offline' ? (
              <>
                {/* Selected: Offline Mall (Red) */}
                <div 
                  id="mode-indicator-offline"
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-bold tracking-wide shadow-xs border border-rose-500 text-[10px]"
                >
                  <Store className="w-2.5 h-2.5" />
                  <span>Offline Mall (NH-80)</span>
                </div>

                {/* Unselected: Online Shopping switch */}
                <button
                  id="switch-to-online-btn"
                  onClick={() => handleSwitchToMode('online')}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white hover:bg-purple-50 text-purple-700 font-semibold shadow-2xs transition-all cursor-pointer border border-purple-200 text-[10px]"
                  title="Switch to Smart Bazzar Online Shopping"
                >
                  <ShoppingBag className="w-2.5 h-2.5 text-purple-600" />
                  <span>Online Store</span>
                </button>
              </>
            ) : (
              <>
                {/* Selected: Online Shopping (Purple) */}
                <div 
                  id="mode-indicator-online"
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-600 text-white font-bold tracking-wide shadow-xs border border-purple-500 text-[10px]"
                >
                  <ShoppingBag className="w-2.5 h-2.5" />
                  <span>Online Store</span>
                </div>

                {/* Unselected: Offline Mall switch */}
                <button
                  id="switch-to-offline-btn"
                  onClick={() => handleSwitchToMode('offline')}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white hover:bg-rose-50 text-rose-700 font-semibold shadow-2xs transition-all cursor-pointer border border-rose-200 text-[10px]"
                  title="Switch to Offline Mall Visit"
                >
                  <Store className="w-2.5 h-2.5 text-rose-600" />
                  <span>Mall Visit</span>
                </button>
              </>
            )}
          </div>

          {/* Right: Specific User Login */}
          <div className="flex items-center gap-1.5 text-[10px]">
            {user ? (
              <div className="flex items-center gap-1">
                {/* Logged in Customer Account Button */}
                <button
                  onClick={() => handleNavClick('account')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/90 hover:bg-white text-slate-800 border border-slate-200/80 font-semibold cursor-pointer transition-colors shadow-2xs"
                  title="My Private Account & Documents Vault"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-slate-950 font-black text-[8px] flex items-center justify-center">
                    {user.name.charAt(0)}
                  </span>
                  <span className="font-semibold text-slate-800 max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                </button>

                {/* Direct Logout Button */}
                <button
                  id="top-logout-btn"
                  onClick={logout}
                  className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer border border-rose-200"
                  title="Logout of your account"
                >
                  <LogOut className="w-2.5 h-2.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                id="top-login-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-colors cursor-pointer shadow-2xs"
              >
                <User className="w-2.5 h-2.5 text-slate-950" />
                <span>Sign In</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Bar: Minimized Sleek Height in Light Glass */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-11 sm:h-12">
          
          {/* Brand Logo with Mode Subtitle */}
          <div 
            id="brand-logo-btn"
            onClick={() => handleNavClick(appMode === 'offline' ? 'home' : 'shop')}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 shrink-0 ${
              appMode === 'offline'
                ? 'bg-gradient-to-br from-rose-600 to-red-700 text-white'
                : 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white'
            }`}>
              <span className="font-black text-xs sm:text-sm tracking-tight">SB</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm sm:text-base font-black tracking-tight text-slate-900">
                  SMART <span className={appMode === 'offline' ? 'text-rose-600' : 'text-purple-600'}>BAZZAR</span>
                </span>
                <span className={`px-1.5 py-0.2 text-[8px] sm:text-[9px] uppercase font-black tracking-wider rounded border ${
                  appMode === 'offline' 
                    ? 'bg-rose-100 text-rose-700 border-rose-200' 
                    : 'bg-purple-100 text-purple-700 border-purple-200'
                }`}>
                  {appMode === 'offline' ? 'Mall' : 'Store'}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {currentNavLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 relative ${
                    isActive
                      ? appMode === 'offline'
                        ? 'bg-rose-600 text-white font-bold shadow-xs'
                        : 'bg-purple-600 text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-900/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[8px] bg-amber-400 text-slate-950 rounded-full font-black uppercase">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Quick Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            
            {/* Shopping Bag Button with Live Badge */}
            <button
              id="shopping-bag-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-white text-slate-800 transition-all cursor-pointer shadow-2xs"
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-slate-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-rose-600 text-white font-black text-[9px] rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Customer Account / Sign In Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-white text-slate-800 transition-colors cursor-pointer text-xs shadow-2xs"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80';
                    }}
                    className="w-5 h-5 rounded-full object-cover border border-amber-400"
                  />
                  <span className="font-semibold text-slate-800 max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in-50 duration-150 text-slate-700">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => handleNavClick('admin')}
                      className="w-full text-left px-3.5 py-2 text-xs text-amber-900 bg-amber-50 hover:bg-amber-100 flex items-center gap-2 font-bold transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>Admin Management</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('account')}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>My Documents Vault</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('account')}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      <span>My Orders & Tracking</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('membership')}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Gift className="w-4 h-4 text-amber-500" />
                      <span>Smart Club Rewards</span>
                    </button>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out ({user.name.split(' ')[0]})</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer shadow-xs"
              >
                <User className="w-3.5 h-3.5 text-slate-950" />
                <span>Sign In</span>
              </button>
            )}

          </div>

          {/* Mobile Right Controls: Bag + Hamburger Toggle */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-white text-slate-800 transition-colors shadow-2xs"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-slate-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-rose-600 text-white font-black text-[9px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-800 bg-white/80 hover:bg-white focus:outline-none transition-colors border border-slate-200/80 shadow-2xs cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top-2 duration-200 text-slate-800">
          
          {/* Mobile Mode Switcher (Red vs Purple) */}
          <div className="p-3 bg-slate-50 text-slate-800 flex items-center justify-between gap-2 border-b border-slate-200/80">
            <span className="text-xs font-semibold text-slate-600">Experience Mode:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleSwitchToMode('offline')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  appMode === 'offline' ? 'bg-rose-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                🏬 Offline Mall
              </button>
              <button
                onClick={() => handleSwitchToMode('online')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  appMode === 'online' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                🛍️ Online Store
              </button>
            </div>
          </div>

          {/* User Sign In / Account Section in Mobile Drawer */}
          <div className="p-3.5 bg-slate-50/50 border-b border-slate-200/80 flex items-center justify-between">
            {user ? (
              <div className="flex items-center gap-2.5">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80';
                  }}
                  className="w-9 h-9 rounded-full object-cover border-2 border-amber-400 shadow-xs"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{user.name}</h4>
                  <p className="text-[10px] text-amber-700 font-semibold">{user.memberTier} VIP • {user.documents?.length || 0} Docs</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-800">Customer Account</span>
              </div>
            )}

            {user ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleNavClick('account')}
                  className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  My Docs
                </button>
                <button
                  onClick={logout}
                  className="px-2 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-medium border border-rose-200 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer shadow-xs"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-2 space-y-1 max-h-[60vh] overflow-y-auto">
            {currentNavLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? appMode === 'offline' ? 'bg-rose-600 text-white font-bold' : 'bg-purple-600 text-white font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}

            <button
              onClick={() => handleNavClick('account')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 mt-1 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Personal Documents & KYC</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
