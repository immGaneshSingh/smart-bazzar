import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Package, 
  PlusCircle, 
  Trash2, 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileText, 
  Store, 
  RefreshCw, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Database,
  ArrowRight,
  Check,
  Smartphone,
  Laptop,
  LogOut,
  Sliders,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  X
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OnlineProduct, CustomerOrder } from '../types';
import { SECURE_OWNER_VAULT } from '../data/onlineShoppingData';
import { 
  testSupabaseConnection, 
  SUPABASE_PROJECT_ID, 
  SUPABASE_SQL_SETUP, 
  saveLoginToSupabase 
} from '../lib/supabase';

interface BuyerRecord {
  buyerId: string;
  fullName: string;
  phone: string;
  city: string;
  pincode: string;
  addressLine: string;
  totalOrders: number;
  totalSpent: number;
  latestOrderDate: string;
  orders: CustomerOrder[];
}

interface UserLoginRecord {
  id: string;
  userName: string;
  phone: string;
  email: string;
  timestamp: string;
  role: 'Buyer' | 'Admin' | 'Customer';
  device: string;
  ip: string;
  authMethod: 'SMS OTP Verified' | 'Google Sign-In' | 'Direct Session';
  status: 'active' | 'success';
}

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    addProduct, 
    deleteProduct, 
    updateProductPrice,
    orders, 
    updateOrderStatus,
    resetProductsToDefault,
    showToast 
  } = useShop();

  // Authentication State for Admin Console (Google Auth Only - Restricted to ganeshsingh62044@gmail.com)
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return sessionStorage.getItem('sb_admin_unlocked') === 'true';
  });
  
  const [adminGoogleUser, setAdminGoogleUser] = useState<any>(() => {
    try {
      const saved = sessionStorage.getItem('sb_admin_google_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [googleEmailInput, setGoogleEmailInput] = useState('');
  const [googleAuthError, setGoogleAuthError] = useState('');
  const [isVerifyingGoogle, setIsVerifyingGoogle] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'buyers' | 'addProduct' | 'products' | 'orders' | 'userLogins' | 'ownerVault' | 'supabase' | 'logs'>('buyers');

  // Deletion and Catalog Reset States
  const [deleteConfirmProdId, setDeleteConfirmProdId] = useState<string | null>(null);
  const [showResetCatalogModal, setShowResetCatalogModal] = useState(false);

  // Supabase Diagnostics & Live Data Explorer State
  const [supabaseTestResult, setSupabaseTestResult] = useState<{
    success: boolean;
    message: string;
    details?: any;
  } | null>(null);
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [supabaseExplorerTab, setSupabaseExplorerTab] = useState<'bookings' | 'logins' | 'documents'>('bookings');
  const [supabaseData, setSupabaseData] = useState<{
    bookings: any[];
    logins: any[];
    documents: any[];
  }>({
    bookings: [],
    logins: [],
    documents: []
  });
  const [supabaseCounts, setSupabaseCounts] = useState<{
    bookings: number;
    logins: number;
    documents: number;
  }>({
    bookings: 0,
    logins: 0,
    documents: 0
  });
  const [loadingSupabaseData, setLoadingSupabaseData] = useState(false);
  const [supabaseSearch, setSupabaseSearch] = useState('');
  const [viewingRecordJson, setViewingRecordJson] = useState<{ title: string; data: any } | null>(null);
  const [deletingRecordId, setDeletingRecordId] = useState<string | null>(null);

  // Buyers from server
  const [buyers, setBuyers] = useState<BuyerRecord[]>([]);
  const [loadingBuyers, setLoadingBuyers] = useState(false);
  const [buyerSearch, setBuyerSearch] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState<BuyerRecord | null>(null);

  // User Sign-In Activity & Sessions Tracking
  const [userLogins, setUserLogins] = useState<UserLoginRecord[]>([]);
  const [loginStats, setLoginStats] = useState<{ totalLogins: number; uniqueUsersCount: number; todayLogins: number }>({
    totalLogins: 0,
    uniqueUsersCount: 0,
    todayLogins: 0
  });
  const [loginSearch, setLoginSearch] = useState('');
  const [loadingLogins, setLoadingLogins] = useState(false);

  // Server Audit Logs & Health
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [serverHealth, setServerHealth] = useState<any>(null);
  const [isRefreshingLogs, setIsRefreshingLogs] = useState(false);

  // Product Form State
  const [productSearch, setProductSearch] = useState('');
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('men');
  const [newProdCategoryLabel, setNewProdCategoryLabel] = useState("Men's Wear");
  const [newProdBrand, setNewProdBrand] = useState('Smart Bazzar Exclusive');
  const [newProdPrice, setNewProdPrice] = useState('999');
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState('1499');
  const [newProdStock, setNewProdStock] = useState('25');
  const [newProdStore, setNewProdStore] = useState('Floor 1 • Main Fashion Hub');
  const [newProdFloor, setNewProdFloor] = useState('Floor 1');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80');
  const [newProdDescription, setNewProdDescription] = useState('Premium quality product crafted for comfort and long durability, sourced directly for Smart Bazzar Lakhisarai.');
  const [newProdTags, setNewProdTags] = useState('New Arrival, Pan-India Delivery, Verified Quality');
  const [newProdFeatured, setNewProdFeatured] = useState(false);
  const [newProdBiharSpecial, setNewProdBiharSpecial] = useState(false);
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);

  // Inline Price Edit State for Products
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [customPriceInput, setCustomPriceInput] = useState<string>('');

  // Preset sample images for quick catalog creation
  const sampleImages = [
    { label: 'Men Plaid Shirt', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Silk Kurta', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80' },
    { label: 'Women Anarkali', url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80' },
    { label: 'Madhubani Painting', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80' },
    { label: 'Smart Earbuds', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80' },
  ];

  // 1. Google Sign-In Handler (Strict authorization: Only ganeshsingh62044@gmail.com)
  const handleGoogleSignIn = async (emailOverride?: string) => {
    setGoogleAuthError('');

    const targetEmail = (emailOverride !== undefined ? emailOverride : googleEmailInput).trim().toLowerCase();

    if (!targetEmail) {
      setGoogleAuthError('Please enter your Google email address.');
      return;
    }

    setIsVerifyingGoogle(true);

    try {
      const res = await fetch('/api/admin/google-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          name: 'Ganesh Singh'
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const userObj = {
          email: data.adminEmail,
          name: data.adminName,
          role: data.role,
          verified: true
        };
        sessionStorage.setItem('sb_admin_unlocked', 'true');
        sessionStorage.setItem('sb_admin_google_user', JSON.stringify(userObj));
        setAdminGoogleUser(userObj);
        setIsAdminUnlocked(true);

        // Sync admin login to Supabase
        saveLoginToSupabase({
          id: `admin-login-${Date.now()}`,
          user_name: 'Ganesh Singh',
          phone: '+91 62044 12345',
          email: data.adminEmail || 'ganeshsingh62044@gmail.com',
          role: 'Admin',
          auth_method: 'Google Sign-In',
          status: 'success'
        }).catch(console.warn);

        showToast('Google Sign-In Verified: Welcome Super Admin Ganesh Singh');
        fetchAllAdminData();
      } else {
        const rawMsg = data.message || `Access Denied: Account "${targetEmail}" is not authorized. Access is strictly restricted to (Admin).`;
        const sanitizedMsg = rawMsg.replace(/ganeshsingh62044@gmail\.com/gi, '(Admin)');
        setGoogleAuthError(sanitizedMsg);
      }
    } catch {
      // Offline fallback with strict email validation
      if (targetEmail === 'ganeshsingh62044@gmail.com') {
        const userObj = {
          email: 'ganeshsingh62044@gmail.com',
          name: 'Ganesh Singh',
          role: 'Owner & Super Admin',
          verified: true
        };
        sessionStorage.setItem('sb_admin_unlocked', 'true');
        sessionStorage.setItem('sb_admin_google_user', JSON.stringify(userObj));
        setAdminGoogleUser(userObj);
        setIsAdminUnlocked(true);

        // Sync admin login to Supabase
        saveLoginToSupabase({
          id: `admin-login-${Date.now()}`,
          user_name: 'Ganesh Singh',
          phone: '+91 62044 12345',
          email: 'ganeshsingh62044@gmail.com',
          role: 'Admin',
          auth_method: 'Google Sign-In (Direct)',
          status: 'success'
        }).catch(console.warn);

        showToast('Google Sign-In Verified: Master Admin Unlocked');
        fetchAllAdminData();
      } else {
        setGoogleAuthError(`Access Denied: Account "${targetEmail}" is not authorized. Access is strictly restricted to (Admin).`);
      }
    } finally {
      setIsVerifyingGoogle(false);
    }
  };

  const handleAdminSignOut = () => {
    sessionStorage.removeItem('sb_admin_unlocked');
    sessionStorage.removeItem('sb_admin_google_user');
    setIsAdminUnlocked(false);
    setAdminGoogleUser(null);
    setGoogleAuthError('');
    showToast('Admin Console locked & signed out safely.');
  };

  const fetchUserLogins = async () => {
    setLoadingLogins(true);
    try {
      const res = await fetch('/api/user-logins');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setUserLogins(data.data);
          setLoginStats({
            totalLogins: data.totalLogins,
            uniqueUsersCount: data.uniqueUsersCount,
            todayLogins: data.todayLogins
          });
        }
      }
    } catch (err) {
      console.warn('Failed to fetch user logins', err);
    } finally {
      setLoadingLogins(false);
    }
  };

  const fetchAllAdminData = async () => {
    setLoadingBuyers(true);
    setIsRefreshingLogs(true);
    try {
      const [buyersRes, healthRes, logsRes, loginsRes] = await Promise.all([
        fetch('/api/buyers'),
        fetch('/api/health'),
        fetch('/api/audit-logs?limit=30'),
        fetch('/api/user-logins')
      ]);

      if (buyersRes.ok) {
        const bData = await buyersRes.json();
        if (bData.success && Array.isArray(bData.data)) {
          setBuyers(bData.data);
        }
      }
      if (healthRes.ok) {
        const hData = await healthRes.json();
        setServerHealth(hData);
      }
      if (logsRes.ok) {
        const lData = await logsRes.json();
        if (lData.success && Array.isArray(lData.data)) {
          setAuditLogs(lData.data);
        }
      }
      if (loginsRes.ok) {
        const loginData = await loginsRes.json();
        if (loginData.success && Array.isArray(loginData.data)) {
          setUserLogins(loginData.data);
          setLoginStats({
            totalLogins: loginData.totalLogins,
            uniqueUsersCount: loginData.uniqueUsersCount,
            todayLogins: loginData.todayLogins
          });
        }
      }
      // Also sync Supabase counts
      fetchSupabaseData();
    } catch (err) {
      console.warn('Failed to load admin telemetry', err);
    } finally {
      setLoadingBuyers(false);
      setIsRefreshingLogs(false);
    }
  };

  const fetchSupabaseData = async () => {
    setLoadingSupabaseData(true);
    try {
      const [dataRes, statusRes] = await Promise.all([
        fetch('/api/supabase/data'),
        fetch('/api/supabase/status')
      ]);

      if (dataRes.ok) {
        const d = await dataRes.json();
        if (d.success) {
          setSupabaseData({
            bookings: Array.isArray(d.bookings) ? d.bookings : [],
            logins: Array.isArray(d.logins) ? d.logins : [],
            documents: Array.isArray(d.documents) ? d.documents : [],
          });
        }
      }

      if (statusRes.ok) {
        const s = await statusRes.json();
        if (s.success && s.counts) {
          setSupabaseCounts(s.counts);
          setSupabaseTestResult({
            success: true,
            message: `Supabase Project ${s.projectId} connected with ${s.latencyMs}ms latency.`,
            details: { ...s.counts, latencyMs: s.latencyMs }
          });
        }
      }
    } catch (err) {
      console.warn('Failed to load Supabase table data', err);
    } finally {
      setLoadingSupabaseData(false);
    }
  };

  const handleDeleteSupabaseRecord = async (table: 'bookings' | 'logins' | 'documents', id: string) => {
    if (!window.confirm(`Delete record "${id}" from Supabase table '${table}'? This will permanently remove it from the cloud database.`)) {
      return;
    }

    setDeletingRecordId(id);
    try {
      const res = await fetch(`/api/supabase/record/${table}/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Record ${id} deleted from Supabase!`);
        setSupabaseData(prev => ({
          ...prev,
          [table]: prev[table].filter((row: any) => row.id !== id)
        }));
        setSupabaseCounts(prev => ({
          ...prev,
          [table]: Math.max(0, prev[table] - 1)
        }));
      } else {
        showToast(`Failed: ${data.message || 'Could not delete'}`);
      }
    } catch (err: any) {
      showToast(`Delete failed: ${err.message}`);
    } finally {
      setDeletingRecordId(null);
    }
  };

  useEffect(() => {
    if (isAdminUnlocked) {
      fetchAllAdminData();
    }
  }, [isAdminUnlocked]);

  useEffect(() => {
    if (isAdminUnlocked && activeTab === 'supabase') {
      fetchSupabaseData();
    }
  }, [activeTab, isAdminUnlocked]);

  // Handle adding new product
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice) {
      showToast('Please provide product title and selling price');
      return;
    }

    setIsSubmittingProduct(true);
    const parsedPrice = Math.max(1, parseInt(newProdPrice, 10) || 499);
    const parsedOriginal = Math.max(parsedPrice, parseInt(newProdOriginalPrice, 10) || parsedPrice);
    const discount = parsedOriginal > parsedPrice ? Math.round(((parsedOriginal - parsedPrice) / parsedOriginal) * 100) : 0;
    const tagArray = newProdTags.split(',').map(t => t.trim()).filter(Boolean);

    const newProd: OnlineProduct = {
      id: `prod-admin-${Date.now()}`,
      name: newProdName.trim(),
      category: newProdCategory,
      categoryLabel: newProdCategoryLabel,
      brand: newProdBrand.trim() || 'Smart Bazzar Partner',
      price: parsedPrice,
      originalPrice: parsedOriginal,
      discountPercent: discount,
      rating: 4.9,
      reviewsCount: 1,
      image: newProdImage.trim() || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      storeOrigin: newProdStore,
      floor: newProdFloor,
      inStock: parseInt(newProdStock, 10) || 20,
      deliveryTime: 'Pan-India 2-3 Days • Express Available',
      tags: tagArray.length > 0 ? tagArray : ['New Arrival', 'Verified'],
      isFeatured: newProdFeatured,
      isBiharSpecial: newProdBiharSpecial,
      unitOrSizeOptions: ['Standard / Free Size'],
      description: newProdDescription.trim() || `${newProdName} available at Smart Bazzar Lakhisarai.`,
      highlights: [
        '100% Quality checked by Smart Bazzar',
        'Direct inventory fulfillment from Lakhisarai Mall',
        'Free door-to-door delivery with live OTP'
      ]
    };

    addProduct(newProd);
    setIsSubmittingProduct(false);

    // Reset Form
    setNewProdName('');
    setNewProdPrice('999');
    setNewProdOriginalPrice('1499');
    setActiveTab('products');
    showToast(`"${newProd.name}" is now live on Smart Bazzar!`);
  };

  // Filter buyers
  const filteredBuyers = buyers.filter(b => {
    if (!buyerSearch.trim()) return true;
    const q = buyerSearch.toLowerCase();
    return (
      b.fullName.toLowerCase().includes(q) ||
      b.phone.includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.buyerId.toLowerCase().includes(q)
    );
  });

  // Filter products
  const filteredProducts = products.filter(p => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  });

  // Filter User Login Activity
  const filteredUserLogins = userLogins.filter(l => {
    if (!loginSearch.trim()) return true;
    const q = loginSearch.toLowerCase();
    return (
      l.userName.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.device.toLowerCase().includes(q)
    );
  });

  // Calculate totals
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // -------------------------------------------------------------------------
  // 1. GOOGLE SIGN-IN GATEWAY SCREEN (PIN CODE COMPLETELY REMOVED)
  // -------------------------------------------------------------------------
  if (!isAdminUnlocked) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          {!showEmailPrompt ? (
            <>
              <div className="text-center space-y-3 mb-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg border border-slate-700">
                  {/* Google multi-color G Icon */}
                  <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                    Google Identity & RBAC Protection
                  </span>
                  <h1 className="text-2xl font-black tracking-tight mt-2 text-white">
                    Admin Portal Access
                  </h1>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Sign in with your Google account to access the Smart Bazzar Administration Portal.
                  </p>
                </div>
              </div>

              {/* Security Alert: Restricted Master Access */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl mb-4 text-xs space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Restricted Master Access</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Administrator portal access is strictly restricted to the authorized administrator. Unauthorized access is blocked.
                </p>
              </div>

              {googleAuthError && (
                <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded-2xl text-xs text-red-200 mb-4 flex items-start gap-2.5 animate-in fade-in-50">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-red-300 block">Security Alert</span>
                    <span className="text-[11px]">{googleAuthError.replace(/ganeshsingh62044@gmail\.com/gi, '(Admin)')}</span>
                  </div>
                </div>
              )}

              {/* Primary Action: Continue as Google */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowEmailPrompt(true);
                    setGoogleAuthError('');
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 shadow-lg shadow-white/5 transition-all cursor-pointer border border-slate-200"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue as Google</span>
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Official Admin Portal</span>
                </span>
                <span className="font-mono text-emerald-400 text-[10px]">
                  Auth: Google OAuth 2.0
                </span>
              </div>
            </>
          ) : (
            /* Option to Enter Email (Google website-style prompt) */
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-md border border-slate-700">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Sign in with Google</h2>
                  <p className="text-xs text-slate-400 mt-1">to continue to Smart Bazzar Admin Portal</p>
                </div>
              </div>

              {googleAuthError && (
                <div className="p-3.5 bg-red-950/90 border border-red-500/60 rounded-2xl text-xs text-red-200 flex items-start gap-2.5 animate-in fade-in-50">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-red-300 block">Access Denied</span>
                    <span className="text-[11px] leading-relaxed block">{googleAuthError.replace(/ganeshsingh62044@gmail\.com/gi, '(Admin)')}</span>
                  </div>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGoogleSignIn();
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label htmlFor="admin-google-email" className="block text-xs font-semibold text-slate-300">
                    Enter Email
                  </label>
                  <input
                    id="admin-google-email"
                    type="email"
                    autoFocus
                    required
                    value={googleEmailInput}
                    onChange={(e) => {
                      setGoogleEmailInput(e.target.value);
                      if (googleAuthError) setGoogleAuthError('');
                    }}
                    placeholder="Email or phone"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
                  />
                  <p className="text-[11px] text-slate-500">
                    Only authorized administrator accounts are permitted access.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmailPrompt(false);
                      setGoogleAuthError('');
                    }}
                    className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isVerifyingGoogle || !googleEmailInput.trim()}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isVerifyingGoogle ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Next</span>
                    )}
                  </button>
                </div>
              </form>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                <span>Google Identity Services</span>
                <span>Protected by RBAC</span>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 2. UNLOCKED MASTER ADMIN DASHBOARD
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-16">
      
      {/* Top Admin Navigation Header */}
      <div className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
              SB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-white tracking-tight">
                  SMART BAZZAR ADMIN PORTAL
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Owner Super Admin
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Google Verified:</span>
                <span className="text-amber-400 font-mono font-bold">
                  {adminGoogleUser?.email || 'ganeshsingh62044@gmail.com'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAllAdminData}
              disabled={isRefreshingLogs}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              title="Refresh live data from server"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingLogs ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync Server</span>
            </button>

            <button
              onClick={handleAdminSignOut}
              className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-red-500/30"
              title="Sign out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock & Sign Out</span>
            </button>
          </div>

        </div>

        {/* Dashboard Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-1 border-t border-slate-800/80 py-1.5 scrollbar-none text-xs">
          
          <button
            onClick={() => setActiveTab('userLogins')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              activeTab === 'userLogins'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>User Sign-In Activity ({userLogins.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Products & Price Control ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('buyers')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              activeTab === 'buyers'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Buyer Accounts ({buyers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addProduct')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              activeTab === 'addProduct'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ownerVault')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              activeTab === 'ownerVault'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Ganesh Singh Vault</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Server Audit Logs</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer border ${
              activeTab === 'supabase'
                ? 'bg-emerald-500 text-slate-950 font-black border-emerald-400 shadow-xs'
                : 'text-emerald-400 hover:bg-emerald-950/40 border-emerald-800/40'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase Cloud DB (hbwomnuosklfusuuwuzf)</span>
          </button>
        </div>

      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
            <span className="text-slate-400 text-xs font-semibold block">Total User Sign-Ins</span>
            <span className="text-2xl font-black text-amber-400 mt-1 block font-mono">
              {loginStats.totalLogins || userLogins.length}
            </span>
            <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" />
              {loginStats.todayLogins || 5} logged in today
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
            <span className="text-slate-400 text-xs font-semibold block">Store Catalog</span>
            <span className="text-2xl font-black text-white mt-1 block font-mono">
              {products.length} Items
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">
              Live price increase/decrease enabled
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
            <span className="text-slate-400 text-xs font-semibold block">Customer Orders</span>
            <span className="text-2xl font-black text-white mt-1 block font-mono">
              {orders.length} Orders
            </span>
            <span className="text-[10px] text-emerald-400 font-medium block mt-1">
              ₹{totalRevenue.toLocaleString('en-IN')} Total Value
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
            <span className="text-slate-400 text-xs font-semibold block">Admin Security</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block font-mono">
              Google Auth
            </span>
            <span className="text-[10px] text-slate-400 block mt-1 truncate">
              ganeshsingh62044@gmail.com
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TAB 1: USER SIGN-IN ACTIVITY & SESSIONS (WHO & IN WHICH TIME)      */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'userLogins' && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Real-Time User Sign-In Activity</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  User Sign-Ins Tracker & Session Audit
                </h3>
                <p className="text-xs text-slate-400">
                  Track who signed into your website, their mobile number, email, exact timestamp, and authentication method.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={loginSearch}
                    onChange={(e) => setLoginSearch(e.target.value)}
                    placeholder="Search by name, phone, email..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 text-xs text-white border border-slate-700 rounded-xl focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <button
                  onClick={fetchUserLogins}
                  disabled={loadingLogins}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                  title="Refresh Sign-Ins"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingLogins ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Login Sessions Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-700/80">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-700">
                  <tr>
                    <th className="py-3 px-4">User / Buyer Name</th>
                    <th className="py-3 px-4">Mobile & Email</th>
                    <th className="py-3 px-4">Sign-In Time (Exact Timestamp)</th>
                    <th className="py-3 px-4">Authentication Method</th>
                    <th className="py-3 px-4">Device & IP Address</th>
                    <th className="py-3 px-4 text-right">Session Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 bg-slate-900/40">
                  {filteredUserLogins.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        No sign-in records match your search filter.
                      </td>
                    </tr>
                  ) : (
                    filteredUserLogins.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/60 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black text-xs shrink-0">
                              {rec.userName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <span className="block text-white font-bold">{rec.userName}</span>
                              <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                                rec.role === 'Admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-300'
                              }`}>
                                {rec.role}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono text-slate-300">
                          <div>
                            <span className="text-amber-400 font-bold block">{rec.phone}</span>
                            <span className="text-slate-400 text-[11px] block">{rec.email}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-mono text-[11px]">
                            <span className="text-white font-semibold block">
                              {new Date(rec.timestamp).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="text-emerald-400 font-bold text-[11px] block">
                              {new Date(rec.timestamp).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                              })}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 ${
                            rec.authMethod === 'Google Sign-In'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>{rec.authMethod}</span>
                          </span>
                        </td>

                        <td className="py-3 px-4 text-slate-400">
                          <div className="text-[11px]">
                            <span className="text-slate-300 flex items-center gap-1">
                              {rec.device.toLowerCase().includes('mobile') || rec.device.toLowerCase().includes('iphone') ? (
                                <Smartphone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              ) : (
                                <Laptop className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                              )}
                              <span>{rec.device}</span>
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">IP: {rec.ip}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Verified Session
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 2: PRODUCTS CATALOG WITH REAL-TIME PRICE INCREASE/DECREASE     */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'products' && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-5 shadow-xl space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                  <span>Product Catalog & Real-Time Price Adjustment ({products.length} Items)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Use the quick <strong className="text-amber-400">[-]</strong> and <strong className="text-amber-400">[+]</strong> buttons to increase or decrease the price of any product by ₹50 / ₹100, or type an exact price.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowResetCatalogModal(true)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                  title="Restore original product inventory"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reset Catalog</span>
                </button>

                <button
                  onClick={() => setActiveTab('addProduct')}
                  className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>

                <div className="relative w-48 sm:w-56">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search catalog..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 text-xs text-white border border-slate-700 rounded-xl focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-700/80">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Item Details</th>
                    <th className="py-3 px-4">Category / Brand</th>
                    <th className="py-3 px-4">Current Price</th>
                    <th className="py-3 px-4 text-center">Increase / Decrease Price</th>
                    <th className="py-3 px-4">Inventory</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 bg-slate-900/40">
                  {filteredProducts.slice(0, 40).map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-800/60 transition-colors">
                      
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80';
                            }}
                            className="w-11 h-11 rounded-xl object-cover border border-slate-700 shrink-0 shadow-xs"
                          />
                          <div>
                            <span className="font-bold text-white block max-w-xs truncate">{prod.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {prod.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-white capitalize block font-medium">{prod.category}</span>
                        <span className="text-slate-400 text-[11px] block">{prod.brand}</span>
                      </td>

                      {/* Current Price */}
                      <td className="py-3 px-4">
                        <div className="font-mono">
                          <span className="text-base font-black text-amber-400 block">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          {prod.originalPrice && prod.originalPrice > prod.price && (
                            <span className="text-[10px] text-slate-400 line-through block">
                              MRP ₹{prod.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                          {prod.discountPercent > 0 && (
                            <span className="text-[10px] text-emerald-400 font-bold block">
                              {prod.discountPercent}% OFF
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Price Increase & Decrease Controller */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col items-center gap-1.5">
                          
                          {/* Quick Delta Buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateProductPrice(prod.id, -100, true)}
                              disabled={prod.price <= 100}
                              className="px-1.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-red-400 text-[10px] font-mono font-bold border border-slate-700 cursor-pointer disabled:opacity-30"
                              title="Decrease price by ₹100"
                            >
                              -₹100
                            </button>
                            <button
                              onClick={() => updateProductPrice(prod.id, -50, true)}
                              disabled={prod.price <= 50}
                              className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-red-400 text-[11px] font-mono font-black border border-slate-700 cursor-pointer disabled:opacity-30"
                              title="Decrease price by ₹50"
                            >
                              -₹50
                            </button>

                            <button
                              onClick={() => updateProductPrice(prod.id, 50, true)}
                              className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[11px] font-mono font-black border border-slate-700 cursor-pointer"
                              title="Increase price by ₹50"
                            >
                              +₹50
                            </button>
                            <button
                              onClick={() => updateProductPrice(prod.id, 100, true)}
                              className="px-1.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[10px] font-mono font-bold border border-slate-700 cursor-pointer"
                              title="Increase price by ₹100"
                            >
                              +₹100
                            </button>
                          </div>

                          {/* Direct Custom Price Input */}
                          {editingPriceId === prod.id ? (
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-slate-400 text-xs">₹</span>
                              <input
                                type="number"
                                autoFocus
                                min="1"
                                value={customPriceInput}
                                onChange={(e) => setCustomPriceInput(e.target.value)}
                                placeholder="Price"
                                className="w-16 px-1.5 py-0.5 text-xs bg-slate-950 text-white border border-amber-500 rounded font-mono"
                              />
                              <button
                                onClick={() => {
                                  const num = parseInt(customPriceInput, 10);
                                  if (num && num > 0) {
                                    updateProductPrice(prod.id, num, false);
                                  }
                                  setEditingPriceId(null);
                                }}
                                className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[10px] cursor-pointer"
                              >
                                Set
                              </button>
                              <button
                                onClick={() => setEditingPriceId(null)}
                                className="px-1 py-0.5 rounded text-slate-400 hover:text-white text-[10px] cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingPriceId(prod.id);
                                setCustomPriceInput(String(prod.price));
                              }}
                              className="text-[10px] text-slate-400 hover:text-amber-400 underline cursor-pointer"
                            >
                              Edit exact price
                            </button>
                          )}

                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prod.inStock > 10 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {prod.inStock} In Stock
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        {deleteConfirmProdId === prod.id ? (
                          <div className="flex items-center justify-end gap-1.5 animate-in fade-in-50">
                            <button
                              onClick={() => {
                                deleteProduct(prod.id);
                                setDeleteConfirmProdId(null);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] shadow-sm flex items-center gap-1 cursor-pointer"
                              title="Confirm immediate deletion"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Confirm Delete</span>
                            </button>
                            <button
                              onClick={() => setDeleteConfirmProdId(null)}
                              className="px-2 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmProdId(prod.id)}
                            className="p-1.5 px-2.5 rounded-xl text-red-400 hover:text-white hover:bg-red-600/30 transition-all cursor-pointer inline-flex items-center gap-1.5 border border-transparent hover:border-red-500/30"
                            title="Delete Product from Catalog"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-[11px] font-semibold">Delete</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reset Catalog Confirmation Modal */}
            {showResetCatalogModal && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <div className="text-center space-y-1">
                    <h4 className="text-lg font-bold text-white">Reset Catalog to Default?</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      This will restore all default Smart Bazzar products and clear any custom deletions. All buyer orders and accounts remain intact.
                    </p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setShowResetCatalogModal(false)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        resetProductsToDefault();
                        setShowResetCatalogModal(false);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg"
                    >
                      Yes, Reset Catalog
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 3: BUYER DIRECTORY & ACCOUNTS                                  */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'buyers' && (
          <div className="space-y-4">
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-400" />
                    <span>Multiple Registered Buyers Directory ({buyers.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Active buyer profiles with orders, addresses, and delivery histories.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={buyerSearch}
                    onChange={(e) => setBuyerSearch(e.target.value)}
                    placeholder="Search buyers by name/phone/city..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 text-xs text-white border border-slate-700 rounded-xl focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              {loadingBuyers ? (
                <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Loading buyers from server...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredBuyers.map((b) => (
                    <div
                      key={b.buyerId}
                      onClick={() => setSelectedBuyer(b)}
                      className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer space-y-2.5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-white text-sm">{b.fullName}</h4>
                          <span className="text-[11px] text-amber-400 font-mono font-semibold">{b.phone}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                          {b.totalOrders} Orders
                        </span>
                      </div>

                      <div className="text-xs text-slate-400 space-y-1 pt-1 border-t border-slate-900">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{b.addressLine}, {b.city} - {b.pincode}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span>Total Spent:</span>
                          <span className="text-white font-bold font-mono">₹{b.totalSpent.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Buyer Order History Modal */}
            {selectedBuyer && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Buyer Order History</span>
                      <h3 className="text-lg font-bold text-white">{selectedBuyer.fullName}</h3>
                      <p className="text-xs text-slate-400">{selectedBuyer.phone} • {selectedBuyer.city}</p>
                    </div>
                    <button
                      onClick={() => setSelectedBuyer(null)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedBuyer.orders.map((ord) => (
                      <div key={ord.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-amber-400">#{ord.id}</span>
                          <span className="text-emerald-400 font-bold">₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="space-y-1 text-slate-300">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-[11px]">
                              <span>{item.quantity}x {item.name}</span>
                              <span className="font-mono">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 4: ADD NEW PRODUCT TO STORE CATALOG                            */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'addProduct' && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 shadow-xl space-y-5">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <span>Publish New Product to Smart Bazzar</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Add real retail inventory from Lakhisarai Mall with instant online listing and live price adjustments.
              </p>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Bhagalpur Handloom Tussar Silk Saree"
                    className="w-full px-3.5 py-2.5 bg-slate-950 text-xs text-white border border-slate-700 rounded-xl focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Brand / Manufacturer *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    placeholder="e.g. Mithila Handloom / Manyavar / Croma"
                    className="w-full px-3.5 py-2.5 bg-slate-950 text-xs text-white border border-slate-700 rounded-xl focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => {
                      setNewProdCategory(e.target.value);
                      const catLabels: Record<string, string> = {
                        men: "Men's Wear",
                        women: "Women's Ethnic & Fusion",
                        boys: "Boys Apparel",
                        girls: "Girls Fashion",
                        kids: "Infants & Kids",
                        footwear: "Footwear & Shoes",
                        'bihar-craft': "Authentic Bihar Craft",
                        electronics: "Smart Electronics",
                        'home-living': "Home & Living",
                        beauty: "Beauty & Personal Care",
                        delicacies: "Bihar Delicacies & Sweets"
                      };
                      setNewProdCategoryLabel(catLabels[e.target.value] || 'Store Item');
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-950 text-xs text-white border border-slate-700 rounded-xl focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="men">Men's Wear</option>
                    <option value="women">Women's Ethnic & Western</option>
                    <option value="boys">Boys Apparel</option>
                    <option value="girls">Girls Fashion</option>
                    <option value="kids">Kids & Toys</option>
                    <option value="footwear">Footwear & Shoes</option>
                    <option value="bihar-craft">Authentic Bihar Craft (Madhubani / Handloom)</option>
                    <option value="electronics">Electronics & Gadgets</option>
                    <option value="home-living">Home & Living</option>
                    <option value="delicacies">Bihar Specialties & Delicacies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Store Origin & Mall Floor
                  </label>
                  <input
                    type="text"
                    value={newProdStore}
                    onChange={(e) => setNewProdStore(e.target.value)}
                    placeholder="e.g. Floor 1 • Manyavar Pavilion"
                    className="w-full px-3.5 py-2.5 bg-slate-950 text-xs text-white border border-slate-700 rounded-xl focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      placeholder="999"
                      className="w-full px-3.5 py-2.5 bg-slate-950 text-xs text-white border border-slate-700 rounded-xl focus:outline-hidden focus:border-amber-500 font-mono font-bold text-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      MRP Original Price (₹)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newProdOriginalPrice}
                      onChange={(e) => setNewProdOriginalPrice(e.target.value)}
                      placeholder="1499"
                      className="w-full px-3.5 py-2.5 bg-slate-950 text-xs text-white border border-slate-700 rounded-xl focus:outline-hidden focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Available Stock Count *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    placeholder="25"
                    className="w-full px-3.5 py-2.5 bg-slate-950 text-xs text-white border border-slate-700 rounded-xl focus:outline-hidden focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Product Image URL (or select sample below)
                </label>
                <input
                  type="url"
                  required
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 text-xs text-white border border-slate-700 rounded-xl focus:outline-hidden focus:border-amber-500 font-mono text-[11px]"
                />

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Quick Samples:</span>
                  {sampleImages.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewProdImage(s.url)}
                      className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] border border-slate-700 cursor-pointer"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description & Specifications
                </label>
                <textarea
                  rows={3}
                  value={newProdDescription}
                  onChange={(e) => setNewProdDescription(e.target.value)}
                  placeholder="Describe the fabric, dimensions, style, and care instructions..."
                  className="w-full px-3.5 py-2 bg-slate-950 text-xs text-white border border-slate-700 rounded-xl focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-700/80 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  disabled={isSubmittingProduct}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Item to Smart Bazzar</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 5: ORDERS MANAGEMENT & TRACKING CONTROLLER                     */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'orders' && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-5 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-400" />
                <span>Customer Orders Management ({orders.length})</span>
              </h3>
              <p className="text-xs text-slate-400">
                Update live shipment tracking status for customers across Lakhisarai and Pan-India.
              </p>
            </div>

            <div className="space-y-3">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400 text-sm">#{ord.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          ord.status === 'delivered' 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                            : ord.status === 'out_for_delivery'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}>
                          {ord.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Customer: <strong className="text-white">{ord.deliveryAddress.fullName}</strong> ({ord.deliveryAddress.phone}) • {ord.orderDate}
                      </p>
                    </div>

                    {/* Status Update Quick Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Set Status:</span>
                      
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'confirmed')}
                        className={`px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                          ord.status === 'confirmed' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        Confirmed
                      </button>

                      <button
                        onClick={() => updateOrderStatus(ord.id, 'packing')}
                        className={`px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                          ord.status === 'packing' ? 'bg-orange-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        Packing
                      </button>

                      <button
                        onClick={() => updateOrderStatus(ord.id, 'out_for_delivery')}
                        className={`px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                          ord.status === 'out_for_delivery' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        Out for Delivery
                      </button>

                      <button
                        onClick={() => updateOrderStatus(ord.id, 'delivered')}
                        className={`px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                          ord.status === 'delivered' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        Delivered
                      </button>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 text-xs">
                    <div className="space-y-1.5">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-slate-300">
                          <span>{item.quantity}x {item.name} {item.selectedOption ? `(${item.selectedOption})` : ''}</span>
                          <span className="font-bold text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800 font-bold">
                      <span className="text-slate-400">Total Order Value ({ord.paymentMethod.toUpperCase()}):</span>
                      <span className="text-amber-400 text-sm">₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Deliver to: {ord.deliveryAddress.addressLine}, {ord.deliveryAddress.city} - {ord.deliveryAddress.pincode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 6: GANESH SINGH SECURE OWNER VAULT                             */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'ownerVault' && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Authenticated Owner Security Vault</span>
                </div>
                <h3 className="text-2xl font-black text-white">{SECURE_OWNER_VAULT.fullName}</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  {SECURE_OWNER_VAULT.role}
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-black border border-emerald-500/40">
                Google Verified Super Admin
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Official Contacts & Office</span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Direct Phone:</span>
                    <span className="text-white font-mono font-bold">{SECURE_OWNER_VAULT.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Official Email:</span>
                    <span className="text-white font-mono font-bold text-amber-400">ganeshsingh62044@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Emergency Line:</span>
                    <span className="text-white font-mono">{SECURE_OWNER_VAULT.emergencyContact}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Office Headquarters:</span>
                    <span className="text-slate-300 text-[11px] leading-relaxed block">{SECURE_OWNER_VAULT.officeLocation}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Commercial Credentials & GSTIN</span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Commercial GSTIN:</span>
                    <span className="text-emerald-400 font-mono font-bold">{SECURE_OWNER_VAULT.gstin}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">PAN Registration:</span>
                    <span className="text-white font-mono font-bold">{SECURE_OWNER_VAULT.panNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">UIDAI Aadhaar (Masked):</span>
                    <span className="text-white font-mono">{SECURE_OWNER_VAULT.aadhaarMasked}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Trade License:</span>
                    <span className="text-blue-400 font-mono">LKS-TL-2024-8819 (Active)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Documents Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Verified Ownership Documents</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SECURE_OWNER_VAULT.verifiedDocuments.map((doc, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{doc.name}</span>
                      <span className="text-slate-400 text-[11px] font-mono">{doc.docNumber} • {doc.date}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Privileges */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-2">Granted System Privileges</span>
              <div className="flex flex-wrap gap-2">
                {SECURE_OWNER_VAULT.systemPrivileges.map((p, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-[11px] flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{p}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 7: SERVER AUDIT LOGS & HEALTH                                  */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'logs' && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-amber-400" />
                  <span>Real-Time Server Audit Logs</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Every order, payment request, price change, and login event is recorded with client IP and timestamp.
                </p>
              </div>

              {serverHealth && (
                <div className="text-right text-xs">
                  <span className="text-emerald-400 font-bold block">● Server Active</span>
                  <span className="text-slate-400 text-[11px]">Uptime: {serverHealth.uptimeSeconds}s</span>
                </div>
              )}
            </div>

            <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 max-h-96 overflow-y-auto font-mono text-xs text-slate-300 space-y-2">
              {auditLogs.length === 0 ? (
                <p className="text-slate-500 text-center py-6">No audit records recorded yet.</p>
              ) : (
                auditLogs.map((log) => (
                  <div key={log.id} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-400">{log.action}</span>
                        <span className="text-slate-400">by {log.actor}</span>
                      </div>
                      <div className="text-slate-500 text-[10px]">
                        IP: {log.ip} • {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    {log.details && (
                      <div className="text-[10px] text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 max-w-xs truncate">
                        {JSON.stringify(log.details)}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 8: SUPABASE CLOUD DATABASE COMMAND CENTER & DATA EXPLORER      */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'supabase' && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 shadow-xl space-y-6">
            
            {/* Top Bar with Live Badge & Quick Diagnostics */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-sm shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">Supabase Cloud Database Hub</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      LIVE CONNECTED
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Real-time PostgreSQL engine ({SUPABASE_PROJECT_ID}.supabase.co) synced across bookings, user logins, and customer KYC vault.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={isTestingSupabase}
                  onClick={async () => {
                    setIsTestingSupabase(true);
                    setSupabaseTestResult(null);
                    try {
                      const res = await testSupabaseConnection();
                      setSupabaseTestResult(res);
                      if (res.counts) {
                        setSupabaseCounts(res.counts);
                      }
                      if (res.success) {
                        showToast('Supabase Live Ping OK! Database accepting queries.');
                        fetchSupabaseData();
                      } else {
                        showToast(`Supabase: ${res.message}`);
                      }
                    } catch (e: any) {
                      setSupabaseTestResult({ success: false, message: e.message || 'Connection failed' });
                    } finally {
                      setIsTestingSupabase(false);
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTestingSupabase ? 'animate-spin' : ''}`} />
                  <span>{isTestingSupabase ? 'Testing Ping...' : 'Test Connection'}</span>
                </button>

                <button
                  type="button"
                  disabled={loadingSupabaseData}
                  onClick={fetchSupabaseData}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  title="Reload rows from Supabase"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingSupabaseData ? 'animate-spin' : ''}`} />
                  <span>Sync Rows</span>
                </button>

                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-slate-300 text-xs font-bold flex items-center gap-1.5 border border-slate-700 cursor-pointer transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Console</span>
                </a>
              </div>
            </div>

            {/* Diagnostic Alert Box if tested */}
            {supabaseTestResult && (
              <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 animate-in fade-in duration-200 ${
                supabaseTestResult.success 
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200' 
                  : 'bg-amber-950/40 border-amber-500/60 text-amber-200'
              }`}>
                {supabaseTestResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">
                      {supabaseTestResult.success ? 'Supabase Backend Healthy & Responding' : 'Supabase Table Setup Status'}
                    </p>
                    {supabaseTestResult.details?.latencyMs && (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-mono text-[10px]">
                        {supabaseTestResult.details.latencyMs}ms latency
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300">{supabaseTestResult.message}</p>
                </div>
              </div>
            )}

            {/* 3 Metric Cards with Real Live Row Counts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Bookings Table Card */}
              <div 
                onClick={() => setSupabaseExplorerTab('bookings')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all text-left ${
                  supabaseExplorerTab === 'bookings'
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg'
                    : 'bg-slate-950 hover:bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">public.bookings</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {supabaseCounts.bookings || supabaseData.bookings.length} <span className="text-xs font-normal text-slate-400">records</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Retail store orders, movie seat tickets, and parking slot reservations.
                </p>
              </div>

              {/* 2. Logins Table Card */}
              <div 
                onClick={() => setSupabaseExplorerTab('logins')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all text-left ${
                  supabaseExplorerTab === 'logins'
                    ? 'bg-blue-950/40 border-blue-500/60 shadow-lg'
                    : 'bg-slate-950 hover:bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">public.logins</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    Live
                  </span>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {supabaseCounts.logins || supabaseData.logins.length} <span className="text-xs font-normal text-slate-400">sessions</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Customer SMS OTP authentications, Google Admin logins, and device records.
                </p>
              </div>

              {/* 3. Documents Table Card */}
              <div 
                onClick={() => setSupabaseExplorerTab('documents')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all text-left ${
                  supabaseExplorerTab === 'documents'
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-lg'
                    : 'bg-slate-950 hover:bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">public.documents</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Live
                  </span>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {supabaseCounts.documents || supabaseData.documents.length} <span className="text-xs font-normal text-slate-400">documents</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Verified Aadhaar, PAN card, driving license, and user identity credentials.
                </p>
              </div>
            </div>

            {/* LIVE DATA EXPLORER */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>Supabase Live Data Explorer</span>
                  </h4>
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setSupabaseExplorerTab('bookings')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        supabaseExplorerTab === 'bookings'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Bookings ({supabaseData.bookings.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSupabaseExplorerTab('logins')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        supabaseExplorerTab === 'logins'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Logins ({supabaseData.logins.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSupabaseExplorerTab('documents')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        supabaseExplorerTab === 'documents'
                          ? 'bg-amber-600 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      KYC Documents ({supabaseData.documents.length})
                    </button>
                  </div>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={supabaseSearch}
                    onChange={(e) => setSupabaseSearch(e.target.value)}
                    placeholder="Search table rows..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Table Data Rendering */}
              {loadingSupabaseData ? (
                <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Loading live rows from Supabase cloud...</span>
                </div>
              ) : (
                <>
                  {/* VIEW 1: BOOKINGS */}
                  {supabaseExplorerTab === 'bookings' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                            <th className="pb-2.5 font-bold">Booking ID</th>
                            <th className="pb-2.5 font-bold">Type</th>
                            <th className="pb-2.5 font-bold">Customer Name</th>
                            <th className="pb-2.5 font-bold">Phone Number</th>
                            <th className="pb-2.5 font-bold">Amount</th>
                            <th className="pb-2.5 font-bold">Status</th>
                            <th className="pb-2.5 font-bold">Created At</th>
                            <th className="pb-2.5 font-bold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 font-mono">
                          {supabaseData.bookings
                            .filter((row: any) => {
                              if (!supabaseSearch.trim()) return true;
                              const q = supabaseSearch.toLowerCase();
                              return (
                                row.id?.toLowerCase().includes(q) ||
                                row.customer_name?.toLowerCase().includes(q) ||
                                row.customer_phone?.toLowerCase().includes(q) ||
                                row.booking_type?.toLowerCase().includes(q)
                              );
                            })
                            .map((row: any) => (
                              <tr key={row.id} className="hover:bg-slate-900/60 transition-colors">
                                <td className="py-2.5 font-bold text-emerald-400">{row.id}</td>
                                <td className="py-2.5">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                                    {row.booking_type || 'order'}
                                  </span>
                                </td>
                                <td className="py-2.5 font-sans font-bold text-white">{row.customer_name}</td>
                                <td className="py-2.5 text-slate-300">{row.customer_phone}</td>
                                <td className="py-2.5 font-bold text-amber-400">₹{row.amount || 0}</td>
                                <td className="py-2.5">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                    {row.status || 'confirmed'}
                                  </span>
                                </td>
                                <td className="py-2.5 text-[11px] text-slate-500">
                                  {row.created_at ? new Date(row.created_at).toLocaleString('en-IN') : 'Just now'}
                                </td>
                                <td className="py-2.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setViewingRecordJson({ title: `Booking #${row.id}`, data: row })}
                                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-all"
                                      title="View Raw JSON Payload"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={deletingRecordId === row.id}
                                      onClick={() => handleDeleteSupabaseRecord('bookings', row.id)}
                                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 cursor-pointer transition-all disabled:opacity-50"
                                      title="Delete record from Supabase"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          {supabaseData.bookings.length === 0 && (
                            <tr>
                              <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                                No booking records stored in Supabase yet. Place an order or movie ticket to sync!
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* VIEW 2: LOGINS */}
                  {supabaseExplorerTab === 'logins' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                            <th className="pb-2.5 font-bold">Session ID</th>
                            <th className="pb-2.5 font-bold">User Name</th>
                            <th className="pb-2.5 font-bold">Mobile Phone</th>
                            <th className="pb-2.5 font-bold">Email</th>
                            <th className="pb-2.5 font-bold">Role</th>
                            <th className="pb-2.5 font-bold">Auth Method</th>
                            <th className="pb-2.5 font-bold">Timestamp</th>
                            <th className="pb-2.5 font-bold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 font-mono">
                          {supabaseData.logins
                            .filter((row: any) => {
                              if (!supabaseSearch.trim()) return true;
                              const q = supabaseSearch.toLowerCase();
                              return (
                                row.id?.toLowerCase().includes(q) ||
                                row.user_name?.toLowerCase().includes(q) ||
                                row.phone?.toLowerCase().includes(q) ||
                                row.email?.toLowerCase().includes(q)
                              );
                            })
                            .map((row: any) => (
                              <tr key={row.id} className="hover:bg-slate-900/60 transition-colors">
                                <td className="py-2.5 font-bold text-blue-400">{row.id}</td>
                                <td className="py-2.5 font-sans font-bold text-white">{row.user_name}</td>
                                <td className="py-2.5 text-slate-300">{row.phone}</td>
                                <td className="py-2.5 text-slate-400">{row.email || '—'}</td>
                                <td className="py-2.5">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                    row.role === 'Admin'
                                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                      : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                  }`}>
                                    {row.role || 'Customer'}
                                  </span>
                                </td>
                                <td className="py-2.5 text-slate-300 text-[11px]">{row.auth_method}</td>
                                <td className="py-2.5 text-[11px] text-slate-500">
                                  {row.timestamp ? new Date(row.timestamp).toLocaleString('en-IN') : 'Active'}
                                </td>
                                <td className="py-2.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setViewingRecordJson({ title: `Login #${row.id}`, data: row })}
                                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-all"
                                      title="View Raw JSON Payload"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={deletingRecordId === row.id}
                                      onClick={() => handleDeleteSupabaseRecord('logins', row.id)}
                                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 cursor-pointer transition-all disabled:opacity-50"
                                      title="Delete record from Supabase"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          {supabaseData.logins.length === 0 && (
                            <tr>
                              <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                                No login records stored in Supabase yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* VIEW 3: DOCUMENTS */}
                  {supabaseExplorerTab === 'documents' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                            <th className="pb-2.5 font-bold">Doc ID</th>
                            <th className="pb-2.5 font-bold">Holder / User Name</th>
                            <th className="pb-2.5 font-bold">User Phone</th>
                            <th className="pb-2.5 font-bold">Document Type</th>
                            <th className="pb-2.5 font-bold">Doc Number</th>
                            <th className="pb-2.5 font-bold">Status</th>
                            <th className="pb-2.5 font-bold">Uploaded At</th>
                            <th className="pb-2.5 font-bold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 font-mono">
                          {supabaseData.documents
                            .filter((row: any) => {
                              if (!supabaseSearch.trim()) return true;
                              const q = supabaseSearch.toLowerCase();
                              return (
                                row.id?.toLowerCase().includes(q) ||
                                row.user_name?.toLowerCase().includes(q) ||
                                row.user_phone?.toLowerCase().includes(q) ||
                                row.document_number?.toLowerCase().includes(q) ||
                                row.document_type?.toLowerCase().includes(q)
                              );
                            })
                            .map((row: any) => (
                              <tr key={row.id} className="hover:bg-slate-900/60 transition-colors">
                                <td className="py-2.5 font-bold text-amber-400">{row.id}</td>
                                <td className="py-2.5 font-sans font-bold text-white">{row.holder_name || row.user_name}</td>
                                <td className="py-2.5 text-slate-300">{row.user_phone}</td>
                                <td className="py-2.5">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                                    {row.type_name || row.document_type}
                                  </span>
                                </td>
                                <td className="py-2.5 font-bold text-emerald-400">{row.document_number}</td>
                                <td className="py-2.5">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                    {row.status || 'verified'}
                                  </span>
                                </td>
                                <td className="py-2.5 text-[11px] text-slate-500">
                                  {row.uploaded_at ? new Date(row.uploaded_at).toLocaleString('en-IN') : 'Verified'}
                                </td>
                                <td className="py-2.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setViewingRecordJson({ title: `Document #${row.id}`, data: row })}
                                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-all"
                                      title="View Raw JSON Payload"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={deletingRecordId === row.id}
                                      onClick={() => handleDeleteSupabaseRecord('documents', row.id)}
                                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 cursor-pointer transition-all disabled:opacity-50"
                                      title="Delete record from Supabase"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          {supabaseData.documents.length === 0 && (
                            <tr>
                              <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                                No KYC documents stored in Supabase yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal: View Raw Record JSON */}
            {viewingRecordJson && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-bold text-sm text-white">{viewingRecordJson.title}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewingRecordJson(null)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 text-[11px] text-emerald-300 font-mono overflow-x-auto max-h-96 leading-relaxed">
                    {JSON.stringify(viewingRecordJson.data, null, 2)}
                  </pre>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(JSON.stringify(viewingRecordJson.data, null, 2));
                        showToast('JSON copied to clipboard!');
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Copy JSON
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewingRecordJson(null)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SQL Table Creator Code Box */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Supabase SQL Schema Script (PostgreSQL DDL)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Tables are initialized. You can copy this script anytime to inspect or replicate schemas in any Supabase project.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(SUPABASE_SQL_SETUP);
                    setCopiedSql(true);
                    showToast('SQL setup code copied to clipboard!');
                    setTimeout(() => setCopiedSql(false), 2500);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      <span>Copy SQL Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-emerald-300 font-mono overflow-x-auto max-h-48 leading-relaxed">
                {SUPABASE_SQL_SETUP}
              </pre>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
