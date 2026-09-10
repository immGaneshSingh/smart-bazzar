import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  Gift, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Store, 
  Phone, 
  ArrowRight, 
  Download, 
  Sparkles, 
  Plus, 
  LogOut, 
  ShieldCheck, 
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  FileCheck,
  Lock
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderDeliveryAddress } from '../types';
import { UserDocumentsSection } from './UserDocumentsSection';

interface CustomerAccountPageProps {
  onNavigate: (tab: any) => void;
  initialTab?: 'documents' | 'orders' | 'addresses' | 'rewards' | 'settings';
}

export const CustomerAccountPage: React.FC<CustomerAccountPageProps> = ({ onNavigate, initialTab = 'documents' }) => {
  const { 
    user, 
    orders, 
    login,
    logout, 
    setIsAuthModalOpen,
    selectedOrderForTracking, 
    setSelectedOrderForTracking,
    addAddress,
    setIsCartOpen,
    addToCart,
    products
  } = useShop();

  const [activeAccountTab, setActiveAccountTab] = useState<'documents' | 'orders' | 'addresses' | 'rewards' | 'settings'>(initialTab);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState<OrderDeliveryAddress>({
    fullName: user?.name || '',
    phone: user?.phone || '',
    addressLine: '',
    landmark: '',
    city: 'Lakhisarai',
    pincode: '811311',
    deliveryMode: 'home-delivery'
  });

  // If user is not logged in
  if (!user) {
    return (
      <div className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
            <div className="w-16 h-16 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <Lock className="w-3.5 h-3.5" />
                <span>Strict Customer Account Isolation</span>
              </span>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Private Customer Account Portal
              </h1>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Every customer only opens their own personal account. Your verified KYC documents, addresses, and order history are strictly private to your mobile number.
              </p>
            </div>

            {/* Sign In & Isolation Information */}
            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-900 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Protected Account Space
                </p>
                <p className="text-[11px] text-slate-500">
                  Please sign in with your mobile number. Your addresses, orders, and uploaded documents will be securely accessible.
                </p>
              </div>
            </div>

            {/* Custom Sign In / Registration Button */}
            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Open / Register With Your Mobile Number</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Continue Shopping Online</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Active tracking order or first order
  const trackingOrder = selectedOrderForTracking 
    ? orders.find(o => o.id === selectedOrderForTracking) || orders[0]
    : orders[0];

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.addressLine || !newAddress.phone) return;
    addAddress(newAddress);
    setShowAddAddressModal(false);
    setNewAddress({
      fullName: user.name,
      phone: user.phone,
      addressLine: '',
      landmark: '',
      city: 'Lakhisarai',
      pincode: '811311',
      deliveryMode: 'home-delivery'
    });
  };

  const handleReorder = (itemProductId: string) => {
    const prod = products.find(p => p.id === itemProductId);
    if (prod) {
      addToCart(prod, 1);
      setIsCartOpen(true);
    }
  };

  const handleDownloadInvoice = (orderId: string) => {
    alert(`Generating official Smart Bazzar Tax Invoice for Order #${orderId}. Sent to ${user.email}`);
  };

  return (
    <div className="py-12 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Customer Header Card */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'}
                  alt={user.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500/40 shadow-md"
                />
                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] tracking-wide uppercase shadow-xs">
                  {user.memberTier}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold tracking-tight">{user.name}</h1>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-xs font-semibold">
                    Smart Bazzar VIP
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{user.email} • {user.phone}</p>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>Private Account Session • Isolated to {user.phone}</span>
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setIsAuthModalOpen(true);
                    }}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                  >
                    Switch Account / Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60">
              <div className="text-center px-2">
                <span className="block text-[11px] text-slate-400 font-medium">Orders</span>
                <span className="text-base font-extrabold text-white">{orders.length}</span>
              </div>
              <div className="text-center px-2 border-x border-slate-700">
                <span className="block text-[11px] text-slate-400 font-medium">Smart Coins</span>
                <span className="text-base font-extrabold text-amber-400">{user.points}</span>
              </div>
              <div className="text-center px-2">
                <span className="block text-[11px] text-slate-400 font-medium">Coin Worth</span>
                <span className="text-base font-extrabold text-emerald-400">₹{Math.floor(user.points / 10)}</span>
              </div>
            </div>
          </div>

          {/* Account Sub-Tabs */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-2">
            {[
              { id: 'documents', label: 'About User & Documents', icon: FileCheck },
              { id: 'orders', label: 'My Orders & Tracking', icon: Package },
              { id: 'addresses', label: 'Delivery Addresses', icon: MapPin },
              { id: 'rewards', label: 'Smart Club Coins', icon: Gift },
              { id: 'settings', label: 'Settings', icon: User },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAccountTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeAccountTab === tab.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
            
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-red-950/80 text-slate-400 hover:text-red-400 text-xs font-medium transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

        </div>

        {/* TAB 0: ABOUT USER PERSONAL DOCUMENTS & KYC */}
        {activeAccountTab === 'documents' && (
          <UserDocumentsSection />
        )}

        {/* TAB 1: ORDERS & LIVE TRACKING */}
        {activeAccountTab === 'orders' && (
          <div className="space-y-8">
            
            {/* Live Tracking Spotlight (if any order is selected) */}
            {trackingOrder && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-mono text-xs font-extrabold">
                        {trackingOrder.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                        trackingOrder.status === 'delivered' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-500 text-slate-950 animate-pulse'
                      }`}>
                        {trackingOrder.status === 'delivered' ? 'Delivered' : 'Live In-Transit'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">
                      Placed on {trackingOrder.orderDate} • {trackingOrder.items.length} items • ₹{trackingOrder.totalAmount.toLocaleString('en-IN')} paid via {trackingOrder.paymentMethod.toUpperCase()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadInvoice(trackingOrder.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Invoice</span>
                    </button>

                    <a
                      href="tel:+916200123456"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Delivery Help</span>
                    </a>
                  </div>
                </div>

                {/* Tracking Progress Bar */}
                <div className="py-8">
                  <div className="relative">
                    <div className="overflow-hidden h-2 mb-6 text-xs flex rounded-full bg-slate-100">
                      <div 
                        style={{ 
                          width: trackingOrder.status === 'delivered' ? '100%' : '65%' 
                        }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500 transition-all duration-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {trackingOrder.trackingSteps.map((step, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            {step.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : step.current ? (
                              <div className="w-4 h-4 rounded-full border-2 border-amber-500 bg-amber-100 flex items-center justify-center shrink-0">
                                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-ping" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                            )}
                            <h4 className={`text-xs font-bold leading-tight ${
                              step.completed ? 'text-slate-900' : step.current ? 'text-amber-800' : 'text-slate-400'
                            }`}>
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-[11px] font-mono text-slate-500 pl-5.5">{step.time}</p>
                          {step.description && (
                            <p className="text-[11px] text-slate-600 pl-5.5 leading-tight">{step.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                    Items in this Package
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trackingOrder.items.map((item, idx) => (
                      <div key={idx} className="flex gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{item.name}</h5>
                            <p className="text-[11px] text-amber-700 font-medium">{item.storeOrigin}</p>
                          </div>
                          <div className="flex items-center justify-between text-xs mt-2">
                            <span className="font-semibold text-slate-900">
                              ₹{item.price.toLocaleString('en-IN')} × {item.quantity}
                            </span>
                            <button
                              onClick={() => handleReorder(item.productId)}
                              className="text-[11px] font-bold text-amber-600 hover:text-amber-700 hover:underline"
                            >
                              Buy Again
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Destination Address Footer */}
                <div className="mt-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900">Destination: </span>
                    <span className="text-slate-700">
                      {trackingOrder.deliveryAddress.fullName}, {trackingOrder.deliveryAddress.addressLine}, {trackingOrder.deliveryAddress.landmark}, {trackingOrder.deliveryAddress.city} – {trackingOrder.deliveryAddress.pincode}
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      Delivery Contact: {trackingOrder.deliveryAddress.phone}
                    </span>
                  </div>
                </div>

              </div>
            )}

            {/* Past Orders List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">All Customer Orders ({orders.length})</h3>
                <button
                  onClick={() => onNavigate('shop')}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <span>Shop More Products</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-4">
                {orders.map(order => (
                  <div
                    key={order.id}
                    className={`p-5 rounded-3xl bg-white border transition-all cursor-pointer ${
                      selectedOrderForTracking === order.id
                        ? 'border-amber-500 shadow-md ring-2 ring-amber-500/20'
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                    onClick={() => setSelectedOrderForTracking(order.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-slate-900">{order.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {order.status === 'delivered' ? 'Delivered' : 'In Progress'}
                        </span>
                        <span className="text-xs text-slate-500">• {order.orderDate}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-slate-900">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        {order.items.slice(0, 3).map((it, idx) => (
                          <img
                            key={idx}
                            src={it.image}
                            alt={it.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                            title={it.name}
                          />
                        ))}
                        {order.items.length > 3 && (
                          <span className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                            +{order.items.length - 3}
                          </span>
                        )}
                        <span className="text-xs text-slate-600 ml-2">
                          {order.items.map(i => i.name).join(', ').slice(0, 50)}...
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrderForTracking(order.id);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                      >
                        Track Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SAVED ADDRESSES */}
        {activeAccountTab === 'addresses' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Saved Delivery Addresses in Lakhisarai</h3>
                <p className="text-xs text-slate-500 mt-0.5">Addresses used for 90-minute express doorstep dispatch</p>
              </div>
              <button
                onClick={() => setShowAddAddressModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.savedAddresses.map((addr, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{addr.fullName}</span>
                    {idx === 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600">
                    {addr.addressLine}
                  </p>
                  {addr.landmark && (
                    <p className="text-[11px] text-slate-500">Landmark: {addr.landmark}</p>
                  )}
                  <p className="text-xs font-medium text-slate-700">
                    {addr.city}, Bihar – {addr.pincode}
                  </p>
                  <p className="text-xs text-slate-500">Phone: {addr.phone}</p>
                </div>
              ))}
            </div>

            {/* Add Address Form Modal */}
            {showAddAddressModal && (
              <form onSubmit={handleSaveAddress} className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Add New Address in Lakhisarai</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newAddress.fullName}
                      onChange={e => setNewAddress({ ...newAddress, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={newAddress.phone}
                      onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Street / House / Ward Details</label>
                    <input
                      type="text"
                      required
                      value={newAddress.addressLine}
                      onChange={e => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                      placeholder="e.g. Ward No 8, Near Durga Mandir"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Landmark</label>
                    <input
                      type="text"
                      value={newAddress.landmark}
                      onChange={e => setNewAddress({ ...newAddress, landmark: e.target.value })}
                      placeholder="e.g. Near Kiul Station Flyover"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={newAddress.pincode}
                      onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAddressModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* TAB 3: SMART CLUB REWARDS */}
        {activeAccountTab === 'rewards' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-linear-to-r from-slate-900 to-amber-950 text-white">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-extrabold">Smart Club Loyalty</span>
                <h3 className="text-2xl font-extrabold tracking-tight mt-1">{user.points} Available Coins</h3>
                <p className="text-xs text-slate-300 mt-1">
                  You earn 1 coin for every ₹10 spent on Smart Bazzar online shopping or in-store purchases on NH-80.
                </p>
              </div>
              <div className="text-right">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
                >
                  Redeem on Shopping
                </button>
              </div>
            </div>

            <h4 className="text-sm font-bold text-slate-900">Your Member Privileges ({user.memberTier})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Free 2-Hour Express Delivery</span>
                <p className="text-slate-500 text-[11px]">Free delivery on all online orders above ₹499 in Lakhisarai</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Priority CineSmart Seats</span>
                <p className="text-slate-500 text-[11px]">Zero convenience fee and free popcorn upgrade on 4K Dolby shows</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Reserved Smart Parking</span>
                <p className="text-slate-500 text-[11px]">Priority basement bay access with digital automated boom barrier</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeAccountTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 max-w-2xl">
            <h3 className="text-base font-bold text-slate-900">Account Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  disabled
                  value={user.name}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Phone</label>
                <input
                  type="tel"
                  disabled
                  value={user.phone}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-700"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Need to update your KYC or GST details?</span>
              <a
                href="mailto:support@smartbazzar.in"
                className="text-xs font-bold text-amber-600 hover:underline"
              >
                Contact Support Desk
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
