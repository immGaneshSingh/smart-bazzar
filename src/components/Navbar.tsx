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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 transition-all">
      
      {/* 1. TOP DIVISION BAR: Offline (Red) vs Online Shopping (Purple) */}
      <div className="bg-slate-950 text-white text-xs py-2 px-3 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Mode Selection Indicator & Compact Switch Button */}
          <div className="flex items-center gap-2.5">
            {appMode === 'offline' ? (
              <>
                {/* Selected: Offline Mall (Red) */}
                <div 
                  id="mode-indicator-offline"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black tracking-wide shadow-sm border border-red-500"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>🏬 Offline Mall Visit (NH-80)</span>
                </div>

                {/* Unselected: Online Shopping shows only as a small button in top with Purple color */}
                <button
                  id="switch-to-online-btn"
                  onClick={() => handleSwitchToMode('online')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer border border-purple-400/60"
                  title="Switch to Smart Bazzar Online Shopping"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>🛍️ Switch to Online Shopping</span>
                </button>
              </>
            ) : (
              <>
                {/* Selected: Online Shopping (Purple) */}
                <div 
                  id="mode-indicator-online"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-black tracking-wide shadow-sm border border-purple-500"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>🛍️ Online Shopping (Doorstep Delivery)</span>
                </div>

                {/* Unselected: Offline Mall shows only as a small button in top with Red color */}
                <button
                  id="switch-to-offline-btn"
                  onClick={() => handleSwitchToMode('offline')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer border border-red-400/60"
                  title="Switch to Offline Mall Visit"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>🏬 Switch to Offline Mall</span>
                </button>
              </>
            )}
          </div>

          {/* Right: Specific User Login & Logout Controls */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            {user ? (
              <div className="flex items-center gap-2">
                {/* Logged in Customer Account Button */}
                <button
                  onClick={() => handleNavClick('account')}
                  className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold cursor-pointer text-[11px] transition-colors shadow-xs"
                  title="My Private Account & Documents Vault"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
                    {user.name.charAt(0)}
                  </span>
                  <span className="font-bold text-white max-w-[120px] truncate">{user.name}</span>
                  <span className="hidden md:inline text-amber-400 font-medium">({user.memberTier})</span>
                </button>

                {/* Direct Logout Button */}
                <button
                  id="top-logout-btn"
                  onClick={logout}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-medium text-red-400 hover:text-white hover:bg-red-900/40 transition-colors cursor-pointer border border-red-500/30"
                  title="Logout of your account"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                id="top-login-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-xs transition-colors cursor-pointer"
              >
                <User className="w-3 h-3" />
                <span>Sign In / Login</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo with Mode Subtitle (Owner section removed as requested) */}
          <div 
            id="brand-logo-btn"
            onClick={() => handleNavClick(appMode === 'offline' ? 'home' : 'shop')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 shrink-0 ${
              appMode === 'offline'
                ? 'bg-gradient-to-br from-red-600 via-red-700 to-red-900 shadow-red-500/20'
                : 'bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 shadow-purple-500/20'
            }`}>
              <span className="text-white font-black text-xl sm:text-2xl tracking-tighter">SB</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900">
                  SMART <span className={appMode === 'offline' ? 'text-red-600' : 'text-purple-600'}>BAZZAR</span>
                </span>
                <span className={`px-1.5 py-0.5 text-[9px] uppercase font-black tracking-wider rounded border ${
                  appMode === 'offline' 
                    ? 'bg-red-50 text-red-700 border-red-200' 
                    : 'bg-purple-50 text-purple-700 border-purple-200'
                }`}>
                  {appMode === 'offline' ? 'Offline Mall' : 'Online Store'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                NH-80 Main Road, Lakhisarai, Bihar
              </p>
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
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 relative ${
                    isActive
                      ? appMode === 'offline'
                        ? 'bg-red-600 text-white font-black shadow-xs'
                        : 'bg-purple-600 text-white font-black shadow-xs'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] bg-amber-500 text-slate-950 rounded-full font-black uppercase">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* About User & Documents Tab in Navbar */}
            <button
              id="nav-link-account"
              onClick={() => handleNavClick('account')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'account'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>Personal Documents</span>
            </button>
          </nav>

          {/* Action Quick Buttons */}
          <div className="hidden sm:flex items-center space-x-2.5">
            
            {/* Shopping Bag Button with Live Badge */}
            <button
              id="shopping-bag-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition-colors shadow-2xs cursor-pointer"
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 text-slate-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-amber-500 text-slate-950 font-black text-[11px] rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Customer Account / Sign In Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 transition-colors cursor-pointer shadow-2xs"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-amber-500"
                  />
                  <div className="text-left leading-tight hidden xl:block">
                    <span className="block text-xs font-bold">{user.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-amber-800 font-semibold">{user.memberTier} VIP</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in-50 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                          {user.points} Coins
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                          KYC {user.kycStatus === 'verified' ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleNavClick('account')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-amber-500" />
                      <span>About User & Personal Documents</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('account')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Package className="w-4 h-4 text-amber-500" />
                      <span>My Orders & Live Tracking</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('membership')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
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
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out ({user.name})</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-700" />
                <span>Sign In</span>
              </button>
            )}

          </div>

          {/* Mobile Right Controls: Bag + Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 transition-colors"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 text-slate-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-800 hover:bg-slate-100 focus:outline-none transition-colors border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-2xl animate-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Mode Switcher (Red vs Purple) */}
          <div className="p-3 bg-slate-900 text-white flex items-center justify-between gap-2 border-b border-slate-800">
            <span className="text-[11px] font-semibold text-slate-300">Experience Mode:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleSwitchToMode('offline')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  appMode === 'offline' ? 'bg-red-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🏬 Offline
              </button>
              <button
                onClick={() => handleSwitchToMode('online')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  appMode === 'online' ? 'bg-purple-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🛍️ Online
              </button>
            </div>
          </div>

          {/* User Sign In / Account Section in Mobile Drawer */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            {user ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{user.name}</h4>
                  <p className="text-[11px] text-amber-700 font-semibold">{user.memberTier} VIP • {user.documents?.length || 0} Docs</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-slate-500" />
                <span className="text-xs font-bold text-slate-800">User Account</span>
              </div>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('account')}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  My Docs
                </button>
                <button
                  onClick={logout}
                  className="px-2 py-1.5 rounded-xl bg-red-100 text-red-700 text-xs font-bold"
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
                className="px-4 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-3 space-y-1 max-h-[60vh] overflow-y-auto">
            {currentNavLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? appMode === 'offline' ? 'bg-red-600 text-white' : 'bg-purple-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}

            <button
              onClick={() => handleNavClick('account')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 mt-2"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Personal Documents & KYC</span>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-600" />
            </button>

            {appMode === 'offline' && (
              <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMovieBooking();
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900"
                >
                  <Film className="w-3.5 h-3.5 text-amber-400" />
                  <span>Book Movie</span>
                </button>
                <button
                  onClick={() => handleNavClick('tour')}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-500"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>360° Walkthrough</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </header>
  );
};
