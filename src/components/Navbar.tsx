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
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md shadow-md border-b border-white/10 relative overflow-hidden transition-all text-slate-100">
      
      {/* Subdued Watermark Typography Layer */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.035] flex items-center justify-between font-black text-2xl sm:text-4xl tracking-widest text-white uppercase whitespace-nowrap z-0 overflow-hidden">
        <span>SMART BAZZAR</span>
        <span>LAKHISARAI</span>
        <span>EST 2024</span>
        <span>SMART BAZZAR</span>
      </div>

      {/* 1. TOP DIVISION BAR: Minimized Slim Height */}
      <div className="relative z-10 bg-black/35 text-slate-200 text-[10px] py-0.5 px-3 sm:px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-1.5">
          
          {/* Left: Mode Selection Indicator & Compact Switch Button */}
          <div className="flex items-center gap-1.5">
            {appMode === 'offline' ? (
              <>
                {/* Selected: Offline Mall (Red) */}
                <div 
                  id="mode-indicator-offline"
                  className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-red-600 text-white font-bold tracking-wide shadow-xs border border-red-400/80 text-[10px]"
                >
                  <Store className="w-2.5 h-2.5" />
                  <span>Offline Mall (NH-80)</span>
                </div>

                {/* Unselected: Online Shopping switch */}
                <button
                  id="switch-to-online-btn"
                  onClick={() => handleSwitchToMode('online')}
                  className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-purple-600/90 hover:bg-purple-500 text-white font-medium shadow-xs transition-all cursor-pointer border border-purple-400/60 text-[10px]"
                  title="Switch to Smart Bazzar Online Shopping"
                >
                  <ShoppingBag className="w-2.5 h-2.5" />
                  <span>Online Store</span>
                </button>
              </>
            ) : (
              <>
                {/* Selected: Online Shopping (Purple) */}
                <div 
                  id="mode-indicator-online"
                  className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-purple-600 text-white font-bold tracking-wide shadow-xs border border-purple-400/80 text-[10px]"
                >
                  <ShoppingBag className="w-2.5 h-2.5" />
                  <span>Online Store</span>
                </div>

                {/* Unselected: Offline Mall switch */}
                <button
                  id="switch-to-offline-btn"
                  onClick={() => handleSwitchToMode('offline')}
                  className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-red-600/90 hover:bg-red-500 text-white font-medium shadow-xs transition-all cursor-pointer border border-red-400/60 text-[10px]"
                  title="Switch to Offline Mall Visit"
                >
                  <Store className="w-2.5 h-2.5" />
                  <span>Mall Visit</span>
                </button>
              </>
            )}
          </div>

          {/* Right: Specific User Login & Admin Portal Direct Access */}
          <div className="flex items-center gap-1.5 text-[10px]">
            
            {/* Direct Admin Portal Access Button */}
            <button
              id="top-admin-access-btn"
              onClick={() => handleNavClick('admin')}
              className={`inline-flex items-center gap-1 px-2 py-0.2 rounded-full font-bold cursor-pointer transition-all border ${
                activeTab === 'admin'
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border-amber-500/40'
              }`}
              title="Restricted Admin & Owner Management Console"
            >
              <ShieldCheck className="w-2.5 h-2.5 text-amber-400" />
              <span>Admin Console</span>
            </button>

            {user ? (
              <div className="flex items-center gap-1">
                {/* Logged in Customer Account Button */}
                <button
                  onClick={() => handleNavClick('account')}
                  className="inline-flex items-center gap-1 px-2 py-0.2 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 font-semibold cursor-pointer transition-colors shadow-xs"
                  title="My Private Account & Documents Vault"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-slate-950 font-black text-[8px] flex items-center justify-center">
                    {user.name.charAt(0)}
                  </span>
                  <span className="font-semibold text-white max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                </button>

                {/* Direct Logout Button */}
                <button
                  id="top-logout-btn"
                  onClick={logout}
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-md font-medium text-red-300 hover:text-white hover:bg-red-900/40 transition-colors cursor-pointer border border-red-500/30"
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
                className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 font-medium border border-white/15 transition-colors cursor-pointer"
              >
                <User className="w-2.5 h-2.5 text-amber-400" />
                <span>Sign In</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Bar: Minimized Sleek Height */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-10 sm:h-11">
          
          {/* Brand Logo with Mode Subtitle */}
          <div 
            id="brand-logo-btn"
            onClick={() => handleNavClick(appMode === 'offline' ? 'home' : 'shop')}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 shrink-0 ${
              appMode === 'offline'
                ? 'bg-gradient-to-br from-red-600 to-rose-700'
                : 'bg-gradient-to-br from-purple-600 to-indigo-700'
            }`}>
              <span className="text-white font-black text-xs sm:text-sm tracking-tight">SB</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm sm:text-base font-black tracking-tight text-white">
                  SMART <span className={appMode === 'offline' ? 'text-rose-400' : 'text-purple-400'}>BAZZAR</span>
                </span>
                <span className={`px-1 py-0.2 text-[7px] sm:text-[8px] uppercase font-black tracking-wider rounded border ${
                  appMode === 'offline' 
                    ? 'bg-red-500/20 text-red-300 border-red-500/40' 
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
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
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 relative ${
                    isActive
                      ? appMode === 'offline'
                        ? 'bg-red-600 text-white font-bold shadow-xs'
                        : 'bg-purple-600 text-white font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1 py-0.1 text-[7px] bg-amber-400 text-slate-950 rounded-full font-black uppercase">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Admin Console Tab Button */}
            <button
              id="nav-link-admin"
              onClick={() => handleNavClick('admin')}
              className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'admin'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30'
              }`}
              title="Website Management & Admin Dashboard"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>Admin</span>
            </button>
          </nav>

          {/* Action Quick Buttons */}
          <div className="hidden sm:flex items-center space-x-1.5">
            
            {/* Shopping Bag Button with Live Badge */}
            <button
              id="shopping-bag-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 rounded-lg border border-white/15 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-3.5 h-3.5 px-0.5 bg-amber-400 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Customer Account / Sign In Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-white/15 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-[11px]"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'}
                    alt={user.name}
                    className="w-4 h-4 rounded-full object-cover border border-amber-400"
                  />
                  <span className="font-semibold text-white max-w-[70px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-56 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 py-1.5 z-50 animate-in fade-in-50 duration-150 text-slate-200">
                    <div className="px-3 py-1.5 border-b border-white/10">
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => handleNavClick('admin')}
                      className="w-full text-left px-3 py-1.5 text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 flex items-center gap-2 font-bold"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Admin Management</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('account')}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-white/10 flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>My Documents Vault</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('account')}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-white/10 flex items-center gap-2"
                    >
                      <Package className="w-3.5 h-3.5 text-slate-400" />
                      <span>My Orders & Tracking</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('membership')}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-white/10 flex items-center gap-2"
                    >
                      <Gift className="w-3.5 h-3.5 text-amber-400" />
                      <span>Smart Club Rewards</span>
                    </button>

                    <div className="border-t border-white/10 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out ({user.name.split(' ')[0]})</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
              >
                <User className="w-3 h-3 text-slate-950" />
                <span>Sign In</span>
              </button>
            )}

          </div>

          {/* Mobile Right Controls: Bag + Hamburger Toggle */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 rounded-lg border border-white/15 bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-3.5 h-3.5 px-0.5 bg-amber-400 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-colors border border-white/15"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top-2 duration-200 text-slate-200">
          
          {/* Mobile Mode Switcher (Red vs Purple) */}
          <div className="p-2.5 bg-black/40 text-white flex items-center justify-between gap-2 border-b border-white/10">
            <span className="text-[11px] font-semibold text-slate-300">Experience Mode:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleSwitchToMode('offline')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                  appMode === 'offline' ? 'bg-red-600 text-white shadow-xs' : 'bg-white/10 text-slate-400 hover:text-white'
                }`}
              >
                🏬 Offline Mall
              </button>
              <button
                onClick={() => handleSwitchToMode('online')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                  appMode === 'online' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white/10 text-slate-400 hover:text-white'
                }`}
              >
                🛍️ Online Store
              </button>
            </div>
          </div>

          {/* User Sign In / Account Section in Mobile Drawer */}
          <div className="p-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
            {user ? (
              <div className="flex items-center gap-2.5">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-amber-400"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{user.name}</h4>
                  <p className="text-[10px] text-amber-300 font-medium">{user.memberTier} VIP • {user.documents?.length || 0} Docs</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Customer Account</span>
              </div>
            )}

            {user ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleNavClick('account')}
                  className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold"
                >
                  My Docs
                </button>
                <button
                  onClick={logout}
                  className="px-2 py-1 rounded-lg bg-red-500/20 text-red-300 text-xs font-medium border border-red-500/30"
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
                className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs"
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
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? appMode === 'offline' ? 'bg-red-600 text-white font-bold' : 'bg-purple-600 text-white font-bold'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                </button>
              );
            })}

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 mt-2"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin & Owner Console</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            </button>

            <button
              onClick={() => handleNavClick('account')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-200 bg-white/5 border border-white/10 mt-1"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Personal Documents & KYC</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
