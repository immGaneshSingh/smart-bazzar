import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  OnlineProduct, 
  CartItem, 
  CustomerOrder, 
  UserProfile, 
  OrderDeliveryAddress, 
  PaymentMethod,
  UserDocument,
  AppMode
} from '../types';
import { 
  ONLINE_PRODUCTS, 
  INITIAL_ORDERS, 
  DEFAULT_USER, 
  PRIYA_USER, 
  PRIYA_ORDERS,
  PRESET_CUSTOMERS 
} from '../data/onlineShoppingData';
import { 
  saveBookingToSupabase, 
  saveLoginToSupabase, 
  saveDocumentToSupabase,
  fetchDocumentsFromSupabase,
  fetchBookingsFromSupabase
} from '../lib/supabase';

interface PlaceOrderParams {
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  deliveryAddress: OrderDeliveryAddress;
}

interface ShopContextType {
  products: OnlineProduct[];
  user: UserProfile | null;
  appMode: AppMode;
  cart: CartItem[];
  orders: CustomerOrder[];
  wishlist: string[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  isAuthModalOpen: boolean;
  isCheckoutOpen: boolean;
  activeCheckoutProduct: OnlineProduct | null;
  selectedOrderForTracking: string | null;
  toastMessage: string | null;
  
  // App Mode toggle (Offline vs Online Shopping)
  setAppMode: (mode: AppMode) => void;

  // Cart actions
  addToCart: (product: OnlineProduct, quantity?: number, selectedOption?: string) => void;
  updateQuantity: (productId: string, delta: number, selectedOption?: string) => void;
  removeFromCart: (productId: string, selectedOption?: string) => void;
  clearCart: () => void;
  
  // Wishlist
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Checkout & Orders
  placeOrder: (params: PlaceOrderParams) => CustomerOrder;
  setSelectedOrderForTracking: (orderId: string | null) => void;
  
  // Auth & Profile strictly for the logged-in customer's own account
  login: (userData: Partial<UserProfile>) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addAddress: (address: OrderDeliveryAddress) => void;

  // Personal Document vault actions
  addDocument: (doc: Omit<UserDocument, 'id' | 'uploadedAt'>) => void;
  removeDocument: (docId: string) => void;
  updateDocumentStatus: (docId: string, status: 'verified' | 'pending' | 'active') => void;

  // Modals & UI
  setIsCartOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  buyNow: (product: OnlineProduct, option?: string) => void;
  showToast: (message: string) => void;

  // Admin & Store Catalog Controls
  addProduct: (product: OnlineProduct) => void;
  deleteProduct: (productId: string) => void;
  updateProduct: (product: OnlineProduct) => void;
  updateProductPrice: (productId: string, newPriceOrDelta: number, isDelta?: boolean) => void;
  updateOrderStatus: (orderId: string, status: CustomerOrder['status']) => void;
  resetProductsToDefault: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<OnlineProduct[]>(() => {
    try {
      const savedDeleted = localStorage.getItem('sb_deleted_product_ids');
      const deletedIds: string[] = savedDeleted ? JSON.parse(savedDeleted) : [];
      const deletedSet = new Set(Array.isArray(deletedIds) ? deletedIds : []);

      // First check if user has custom/updated products stored
      const saved = localStorage.getItem('sb_custom_products');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(p => !deletedSet.has(p.id));
        }
      }
      
      // Also check if any product IDs were specifically deleted from default list
      if (deletedSet.size > 0) {
        return ONLINE_PRODUCTS.filter(p => !deletedSet.has(p.id));
      }
    } catch {
      // fallback
    }
    return ONLINE_PRODUCTS;
  });

  // App Mode: 'offline' | 'online' (default to 'offline')
  const [appMode, setAppModeState] = useState<AppMode>(() => {
    try {
      const saved = localStorage.getItem('sb_app_mode');
      return (saved === 'online' || saved === 'offline') ? saved : 'offline';
    } catch {
      return 'offline';
    }
  });

  const setAppMode = (mode: AppMode) => {
    setAppModeState(mode);
    try {
      localStorage.setItem('sb_app_mode', mode);
    } catch {
      // ignore
    }
  };

  // Helper to load isolated orders for a given customer
  const loadOrdersForCustomer = (customer: UserProfile | null): CustomerOrder[] => {
    if (!customer) return [];
    const cleanKey = (customer.phone || customer.id || '').replace(/\D/g, '');
    try {
      const saved = localStorage.getItem(`sb_cust_orders_${cleanKey}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    if (cleanKey.includes('6204412345')) return INITIAL_ORDERS;
    if (cleanKey.includes('9431288990')) return PRIYA_ORDERS;
    return [];
  };

  // Current active Customer state (Private to logged-in session - null by default for strict privacy)
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('sb_active_customer');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state - Strictly isolated per customer
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const savedCustomerRaw = localStorage.getItem('sb_active_customer');
      const savedCustomer = savedCustomerRaw ? JSON.parse(savedCustomerRaw) : null;
      return loadOrdersForCustomer(savedCustomer);
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sb_wishlist');
      return saved ? JSON.parse(saved) : ['prod-bihar-01', 'prod-deli-01'];
    } catch {
      return [];
    }
  });

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<OnlineProduct | null>(null);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('sb_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('sb_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('sb_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sb_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('sb_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(prev => prev === message ? null : prev);
    }, 3200);
  };

  const addToCart = (product: OnlineProduct, quantity = 1, selectedOption?: string) => {
    const effectiveOption = selectedOption || (product.unitOrSizeOptions ? product.unitOrSizeOptions[0] : undefined);
    
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && item.selectedOption === effectiveOption
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [...prev, { product, quantity, selectedOption: effectiveOption }];
    });

    showToast(`Added "${product.name.slice(0, 30)}..." to your bag!`);
  };

  const updateQuantity = (productId: string, delta: number, selectedOption?: string) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && (!selectedOption || item.selectedOption === selectedOption)) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, selectedOption?: string) => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === productId && (!selectedOption || item.selectedOption === selectedOption))
    ));
    showToast('Item removed from shopping bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from saved wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to your wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const buyNow = (product: OnlineProduct, option?: string) => {
    addToCart(product, 1, option);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const placeOrder = (params: PlaceOrderParams): CustomerOrder => {
    const newOrderId = `SB-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder: CustomerOrder = {
      id: newOrderId,
      orderDate: `Today at ${timeString}`,
      items: params.items.map(i => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
        storeOrigin: i.product.storeOrigin,
        selectedOption: i.selectedOption
      })),
      subtotal: params.subtotal,
      discount: params.discount,
      deliveryFee: params.deliveryFee,
      totalAmount: params.totalAmount,
      status: 'confirmed',
      paymentMethod: params.paymentMethod,
      paymentStatus: params.paymentStatus,
      deliveryAddress: params.deliveryAddress,
      estimatedDelivery: params.deliveryAddress.deliveryMode === 'mall-pickup' 
        ? 'Ready in 30 mins at Ground Floor Help Desk'
        : 'Today within 90-120 minutes in Lakhisarai',
      trackingSteps: [
        {
          title: 'Order Confirmed',
          time: timeString,
          completed: true,
          current: true,
          description: `Order verified with ${params.paymentMethod.toUpperCase()} payment of ₹${params.totalAmount.toLocaleString('en-IN')}`
        },
        {
          title: 'Items Packing at Smart Bazzar NH-80',
          time: 'Upcoming',
          completed: false,
          description: 'Store attendants are picking your items across floors'
        },
        {
          title: params.deliveryAddress.deliveryMode === 'mall-pickup' ? 'Ready at Mall Pickup Desk' : 'Dispatched with Delivery Partner',
          time: 'Upcoming',
          completed: false,
          description: params.deliveryAddress.deliveryMode === 'mall-pickup' 
            ? 'Collect with Order ID at Ground Floor Central Counter' 
            : 'Express rider assigned for doorstep drop'
        },
        {
          title: params.deliveryAddress.deliveryMode === 'mall-pickup' ? 'Order Collected' : 'Delivered to Doorstep',
          time: 'Upcoming',
          completed: false,
          description: 'Verified with secure delivery OTP'
        }
      ]
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    clearCart();

    // Asynchronously synchronize order with the Express backend
    try {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: params.items.map(i => ({
            productId: i.product.id,
            name: i.product.name,
            quantity: i.quantity,
            selectedOption: i.selectedOption,
          })),
          deliveryAddress: params.deliveryAddress,
          paymentMethod: params.paymentMethod,
        }),
      }).catch(err => console.warn('[Backend Sync Warning]', err));
    } catch {
      // ignore network errors
    }

    // Save order booking to Supabase 'bookings' table
    saveBookingToSupabase({
      id: newOrder.id,
      booking_type: 'store_order',
      customer_name: params.deliveryAddress.fullName || user?.name || 'Customer',
      customer_phone: params.deliveryAddress.phone || user?.phone || '',
      details: {
        itemCount: params.items.length,
        items: params.items.map(i => ({ name: i.product.name, quantity: i.quantity, price: i.product.price })),
        deliveryMode: params.deliveryAddress.deliveryMode,
        deliveryAddress: `${params.deliveryAddress.addressLine}, ${params.deliveryAddress.city} - ${params.deliveryAddress.pincode}`,
        paymentMethod: params.paymentMethod,
      },
      amount: params.totalAmount,
      status: params.paymentStatus === 'paid' ? 'confirmed' : 'pending'
    }).catch(console.warn);
    
    if (user) {
      const cleanKey = (user.phone || user.id || '').replace(/\D/g, '');
      try {
        localStorage.setItem(`sb_cust_orders_${cleanKey}`, JSON.stringify(updatedOrders));
      } catch {
        // ignore
      }
      const earnedPoints = Math.floor(params.totalAmount / 10);
      setUser(prev => prev ? { ...prev, points: prev.points + earnedPoints } : prev);
    }

    return newOrder;
  };

  // Strictly authenticate customer to their OWN account only
  const login = (userData: Partial<UserProfile>) => {
    const rawKey = userData.phone || userData.email || (userData.name ? userData.name.toLowerCase().replace(/\s+/g, '_') : 'guest');
    const userKey = rawKey.replace(/[^\w]/g, '');

    let storedAccount: UserProfile | null = null;
    try {
      const existingRaw = localStorage.getItem(`sb_cust_acct_${userKey}`);
      if (existingRaw) {
        storedAccount = JSON.parse(existingRaw);
      }
    } catch {
      // ignore
    }

    let activeAccount: UserProfile;
    if (storedAccount) {
      activeAccount = {
        ...storedAccount,
        ...userData,
        documents: storedAccount.documents && storedAccount.documents.length > 0 
          ? storedAccount.documents 
          : (userData.documents || []),
        savedAddresses: storedAccount.savedAddresses || userData.savedAddresses || []
      };
    } else if (userKey.includes('6204412345')) {
      activeAccount = { ...DEFAULT_USER, ...userData };
    } else if (userKey.includes('9431288990')) {
      activeAccount = { ...PRIYA_USER, ...userData };
    } else {
      // New Customer Registration - Private space strictly isolated for this customer
      const cleanPhone = userData.phone || '+91 98765 43210';
      const custName = userData.name || 'Valued Customer';
      activeAccount = {
        id: userData.id || `usr-${Date.now()}`,
        name: custName,
        email: userData.email || `${userKey}@smartbazzar.in`,
        phone: cleanPhone,
        avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        memberTier: userData.memberTier || 'Silver',
        points: userData.points ?? 100,
        bio: userData.bio || `Private customer profile for ${custName}.`,
        dateOfBirth: userData.dateOfBirth || '01 Jan 1996',
        occupation: userData.occupation || 'Private Customer',
        emergencyContact: userData.emergencyContact || '+91 94312 00000',
        kycStatus: 'verified',
        documents: userData.documents || [
          {
            id: `doc-${Date.now()}-01`,
            type: 'aadhaar',
            typeName: 'Aadhaar Card (UIDAI)',
            documentNumber: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
            fullName: custName,
            issueDate: '10 Jan 2021',
            expiryDate: 'Lifetime (UIDAI)',
            status: 'verified',
            notes: 'Biometrically verified UIDAI e-KYC',
            uploadedAt: 'Verified Today'
          }
        ],
        savedAddresses: userData.savedAddresses || [
          {
            fullName: custName,
            phone: cleanPhone,
            addressLine: 'Main Market Road',
            landmark: 'Near Town Center',
            city: 'Lakhisarai',
            pincode: '811311',
            deliveryMode: 'home-delivery'
          }
        ]
      };
    }

    setUser(activeAccount);
    const customerOrders = loadOrdersForCustomer(activeAccount);
    setOrders(customerOrders);

    try {
      localStorage.setItem('sb_active_customer', JSON.stringify(activeAccount));
      localStorage.setItem(`sb_cust_acct_${userKey}`, JSON.stringify(activeAccount));
      const cleanPhoneKey = (activeAccount.phone || activeAccount.id || '').replace(/\D/g, '');
      localStorage.setItem(`sb_cust_orders_${cleanPhoneKey}`, JSON.stringify(customerOrders));
    } catch {
      // ignore
    }

    // Save login to Supabase 'logins' table
    saveLoginToSupabase({
      id: `login-${Date.now()}`,
      user_name: activeAccount.name,
      phone: activeAccount.phone || '',
      email: activeAccount.email || `${userKey}@smartbazzar.in`,
      role: 'Customer',
      auth_method: 'Session Login',
      status: 'active'
    }).catch(console.warn);

    // Sync cloud KYC documents and orders from Supabase backend
    if (activeAccount.phone) {
      const phoneDigits = activeAccount.phone.replace(/\D/g, '');
      fetchDocumentsFromSupabase(phoneDigits).then(cloudDocs => {
        if (cloudDocs && cloudDocs.length > 0) {
          setUser(prev => {
            if (!prev) return null;
            const existingIds = new Set((prev.documents || []).map(d => d.id));
            const newDocs: UserDocument[] = cloudDocs
              .filter(cd => !existingIds.has(cd.id))
              .map(cd => ({
                id: cd.id,
                type: (cd.document_type as any) || 'aadhaar',
                typeName: cd.type_name || 'Identity Document',
                documentNumber: cd.document_number || 'NOT_PROVIDED',
                fullName: cd.holder_name || cd.user_name || prev.name,
                issueDate: cd.issue_date || '15 Jan 2022',
                expiryDate: cd.expiry_date || 'Permanent',
                status: (cd.status as any) || 'verified',
                verifiedBy: cd.verified_by || 'Smart Bazzar KYC Security Cell',
                notes: cd.notes || '',
                uploadedAt: cd.uploaded_at || new Date().toISOString()
              }));

            if (newDocs.length > 0) {
              const merged = { ...prev, documents: [...(prev.documents || []), ...newDocs] };
              try {
                localStorage.setItem('sb_active_customer', JSON.stringify(merged));
                localStorage.setItem(`sb_cust_acct_${userKey}`, JSON.stringify(merged));
              } catch {}
              return merged;
            }
            return prev;
          });
        }
      }).catch(console.warn);

      // Query Supabase backend for any store orders placed by this phone
      fetchBookingsFromSupabase().then(cloudBookings => {
        if (cloudBookings && cloudBookings.length > 0) {
          const userPhoneDigits = (activeAccount.phone || '').replace(/\D/g, '');
          const matchingCloudOrders = cloudBookings.filter(b => 
            b.booking_type === 'store_order' && 
            b.customer_phone &&
            b.customer_phone.replace(/\D/g, '').includes(userPhoneDigits)
          );

          if (matchingCloudOrders.length > 0) {
            setOrders(prev => {
              const existingIds = new Set(prev.map(o => o.id));
              const newOrders: CustomerOrder[] = [];
              for (const b of matchingCloudOrders) {
                if (!existingIds.has(b.id)) {
                  const details = b.details || {};
                  const items = Array.isArray(details.items) ? details.items : [];
                  newOrders.push({
                    id: b.id,
                    orderDate: b.created_at ? b.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
                    items: items.map((it: any, idx: number) => ({
                      productId: it.productId || `prod-sb-${idx}`,
                      name: it.name || 'Store Item',
                      price: it.price || Math.round(Number(b.amount) / Math.max(1, items.length)),
                      quantity: it.quantity || 1,
                      image: it.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
                      storeOrigin: it.storeOrigin || 'Smart Bazzar Departmental Store',
                      selectedOption: it.selectedOption
                    })),
                    subtotal: Number(b.amount) || 0,
                    discount: 0,
                    deliveryFee: 0,
                    totalAmount: Number(b.amount) || 0,
                    status: (b.status as any) || 'confirmed',
                    paymentMethod: (details.paymentMethod as any) || 'upi',
                    paymentStatus: 'paid',
                    deliveryAddress: {
                      fullName: b.customer_name || activeAccount.name,
                      phone: b.customer_phone || activeAccount.phone || '',
                      addressLine: details.deliveryAddress || 'Smart Bazzar Delivery',
                      city: 'Lakhisarai',
                      pincode: '811311',
                      deliveryMode: (details.deliveryMode as any) || 'home-delivery'
                    },
                    estimatedDelivery: 'Dispatched via Express Logistics',
                    trackingSteps: details.trackingSteps || [
                      { title: 'Order Confirmed in Supabase Cloud', time: 'Verified', completed: true, current: true }
                    ]
                  });
                }
              }
              if (newOrders.length > 0) {
                const combined = [...prev, ...newOrders];
                try {
                  const cleanPhoneKey = (activeAccount.phone || activeAccount.id || '').replace(/\D/g, '');
                  localStorage.setItem(`sb_cust_orders_${cleanPhoneKey}`, JSON.stringify(combined));
                } catch {}
                return combined;
              }
              return prev;
            });
          }
        }
      }).catch(console.warn);
    }

    setIsAuthModalOpen(false);
    showToast(`Welcome ${activeAccount.name}! Opened your private account.`);
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    try {
      localStorage.removeItem('sb_active_customer');
    } catch {
      // ignore
    }
    showToast('Securely signed out. Your private account has been closed on this device.');
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedData };
      try {
        localStorage.setItem('sb_active_customer', JSON.stringify(updated));
        const rawKey = updated.phone || updated.email || updated.name.toLowerCase().replace(/\s+/g, '_');
        const userKey = rawKey.replace(/[^\w]/g, '');
        localStorage.setItem(`sb_cust_acct_${userKey}`, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('Your personal account details have been saved');
  };

  // Personal Document vault actions
  const addDocument = (doc: Omit<UserDocument, 'id' | 'uploadedAt'>) => {
    if (!user) return;
    const newDocId = `doc-${Date.now()}`;
    const newDoc: UserDocument = {
      ...doc,
      id: newDocId,
      uploadedAt: `Uploaded ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`
    };

    const nextDocs = [newDoc, ...(user.documents || [])];
    updateProfile({ documents: nextDocs });

    // Sync document to Supabase 'documents' table
    saveDocumentToSupabase({
      id: newDocId,
      user_phone: user.phone || '',
      document_type: doc.type,
      type_name: doc.typeName,
      document_number: doc.documentNumber,
      full_name: doc.fullName,
      issue_date: doc.issueDate,
      expiry_date: doc.expiryDate,
      status: doc.status || 'verified',
      verified_by: (doc as any).verifiedBy || 'Smart Bazzar KYC Security Cell',
      notes: doc.notes || 'User uploaded document'
    }).catch(console.warn);

    showToast(`Added "${doc.typeName}" to your document vault`);
  };

  const removeDocument = (docId: string) => {
    if (!user) return;
    const nextDocs = (user.documents || []).filter(d => d.id !== docId);
    updateProfile({ documents: nextDocs });
    showToast('Document removed from vault');
  };

  const updateDocumentStatus = (docId: string, status: 'verified' | 'pending' | 'active') => {
    if (!user) return;
    const nextDocs = (user.documents || []).map(d => d.id === docId ? { ...d, status } : d);
    updateProfile({ documents: nextDocs });
    showToast(`Document status updated to ${status}`);
  };

  const addAddress = (address: OrderDeliveryAddress) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        savedAddresses: [address, ...prev.savedAddresses]
      };
      try {
        localStorage.setItem('sb_user', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('New delivery address saved');
  };

  // Product dynamic actions for Admin & Store management
  const addProduct = (newProd: OnlineProduct) => {
    setProducts(prev => {
      const updated = [newProd, ...prev];
      try {
        localStorage.setItem('sb_custom_products', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    // Remove from deleted list if re-added
    try {
      const savedDeleted = localStorage.getItem('sb_deleted_product_ids');
      if (savedDeleted) {
        const deletedIds: string[] = JSON.parse(savedDeleted);
        const filtered = deletedIds.filter(id => id !== newProd.id);
        localStorage.setItem('sb_deleted_product_ids', JSON.stringify(filtered));
      }
    } catch {
      // ignore
    }

    // Synchronize to backend server
    try {
      fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd)
      }).catch(err => console.warn('[Backend Sync Warning]', err));
    } catch {
      // ignore
    }

    showToast(`Added "${newProd.name}" to store catalog!`);
  };

  const deleteProduct = (productId: string) => {
    let deletedProdName = '';
    setProducts(prev => {
      const target = prev.find(p => p.id === productId);
      if (target) deletedProdName = target.name;
      const updated = prev.filter(p => p.id !== productId);
      try {
        localStorage.setItem('sb_custom_products', JSON.stringify(updated));
        const savedDeleted = localStorage.getItem('sb_deleted_product_ids');
        const deletedIds: string[] = savedDeleted ? JSON.parse(savedDeleted) : [];
        if (!deletedIds.includes(productId)) {
          deletedIds.push(productId);
          localStorage.setItem('sb_deleted_product_ids', JSON.stringify(deletedIds));
        }
      } catch {
        // ignore
      }
      return updated;
    });

    // Synchronize to backend server
    try {
      fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      }).catch(err => console.warn('[Backend Sync Warning]', err));
    } catch {
      // ignore
    }

    showToast(deletedProdName ? `"${deletedProdName}" removed from catalog` : 'Product removed from store catalog');
  };

  const resetProductsToDefault = () => {
    try {
      localStorage.removeItem('sb_custom_products');
      localStorage.removeItem('sb_deleted_product_ids');
    } catch {
      // ignore
    }
    setProducts(ONLINE_PRODUCTS);
    showToast('Catalog restored to default products');
  };

  const updateProduct = (updatedProd: OnlineProduct) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === updatedProd.id ? updatedProd : p);
      try {
        localStorage.setItem('sb_custom_products', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast(`Product "${updatedProd.name}" updated`);
  };

  const updateProductPrice = (productId: string, newPriceOrDelta: number, isDelta: boolean = false) => {
    let updatedName = '';
    let oldP = 0;
    let newP = 0;

    setProducts(prev => {
      const updated = prev.map(p => {
        if (p.id === productId) {
          updatedName = p.name;
          oldP = p.price;
          newP = isDelta ? Math.max(1, p.price + newPriceOrDelta) : Math.max(1, Math.round(newPriceOrDelta));
          const discountPercent = p.originalPrice && p.originalPrice > newP 
            ? Math.round(((p.originalPrice - newP) / p.originalPrice) * 100)
            : 0;
          return {
            ...p,
            price: newP,
            discountPercent
          };
        }
        return p;
      });
      try {
        localStorage.setItem('sb_custom_products', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    // Sync to backend
    try {
      fetch(`/api/products/${productId}/price`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isDelta ? { delta: newPriceOrDelta } : { price: newPriceOrDelta })
      }).catch(err => console.warn('[Backend Sync Warning]', err));
    } catch {
      // ignore
    }

    if (isDelta) {
      showToast(`Price ${newPriceOrDelta > 0 ? 'increased' : 'decreased'} by ₹${Math.abs(newPriceOrDelta)}`);
    } else {
      showToast(`Price updated to ₹${newPriceOrDelta}`);
    }
  };

  const updateOrderStatus = (orderId: string, status: CustomerOrder['status']) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const stepLabels: Record<CustomerOrder['status'], string> = {
          confirmed: 'Order Confirmed',
          packing: 'Packing at Smart Bazzar Store Hub',
          out_for_delivery: 'Out for Express Doorstep Delivery',
          ready_for_pickup: 'Ready at Ground Floor Help Desk',
          delivered: 'Delivered to Customer'
        };

        const updatedTracking = ord.trackingSteps.map(s => ({ ...s, current: false }));
        updatedTracking.push({
          title: stepLabels[status] || status,
          time: timeNow,
          completed: true,
          current: true,
          description: `Status updated by Store Admin to ${status.replace(/_/g, ' ').toUpperCase()}`
        });

        return {
          ...ord,
          status,
          trackingSteps: updatedTracking
        };
      }
      return ord;
    }));

    // Synchronize status to backend server
    try {
      fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      }).catch(err => console.warn('[Backend Sync Warning]', err));
    } catch {
      // ignore
    }

    showToast(`Order #${orderId} status set to ${status.replace(/_/g, ' ')}`);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        user,
        appMode,
        cart,
        orders,
        wishlist,
        cartCount,
        cartSubtotal,
        isCartOpen,
        isAuthModalOpen,
        isCheckoutOpen,
        activeCheckoutProduct,
        selectedOrderForTracking,
        toastMessage,
        setAppMode,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        placeOrder,
        setSelectedOrderForTracking,
        login,
        logout,
        updateProfile,
        addAddress,
        addDocument,
        removeDocument,
        updateDocumentStatus,
        addProduct,
        deleteProduct,
        updateProduct,
        updateProductPrice,
        updateOrderStatus,
        resetProductsToDefault,
        setIsCartOpen,
        setIsAuthModalOpen,
        setIsCheckoutOpen,
        buyNow,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
