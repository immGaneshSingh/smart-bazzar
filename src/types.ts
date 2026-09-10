export type ActiveTab = 
  | 'home'
  | 'shop'
  | 'stores'
  | 'dining'
  | 'entertainment'
  | 'floors'
  | 'parking'
  | 'tour'
  | 'events'
  | 'membership'
  | 'facilities'
  | 'gallery'
  | 'contact'
  | 'account';

export type AppMode = 'offline' | 'online';

export type StoreCategory = 'all' | 'fashion' | 'electronics' | 'groceries' | 'lifestyle' | 'bihar-craft';

export interface Store {
  id: string;
  name: string;
  category: StoreCategory;
  categoryLabel: string;
  floor: string;
  unit: string;
  logoText: string;
  image: string;
  description: string;
  offer?: string;
  isAnchor?: boolean;
  isBiharSpecial?: boolean;
  phone?: string;
  hours: string;
}

export interface Restaurant {
  id: string;
  name: string;
  type: 'food-court' | 'fine-dining' | 'rooftop' | 'bihar-special';
  cuisine: string;
  floor: string;
  rating: number;
  priceRange: '₹' | '₹₹' | '₹₹₹';
  image: string;
  description: string;
  specialty: string;
  vegOnly?: boolean;
  offer?: string;
}

export interface MovieShow {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  screen: 'Audi 1 (Dolby Atmos 4K)' | 'Audi 2 (Dolby Atmos)' | 'Audi 3 (3D Digital)' | 'Audi 4 (VIP Lounge)';
  language: string;
  poster: string;
  synopsis: string;
  showtimes: string[];
}

export interface MallEvent {
  id: string;
  title: string;
  category: 'Festival' | 'Entertainment' | 'Shopping' | 'Food Fest' | 'Culture';
  date: string;
  time: string;
  venue: string;
  image: string;
  description: string;
  highlight: string;
  couponCode?: string;
  discountBadge?: string;
}

export interface FloorInfo {
  level: number;
  name: string;
  title: string;
  highlights: string[];
  storesCount: number;
  image: string;
  description: string;
}

export interface Coupon {
  code: string;
  title: string;
  discount: string;
  minSpend: string;
  validTill: string;
  category: string;
}

export type ProductCategory = 
  | 'all'
  | 'boys'
  | 'girls'
  | 'men'
  | 'women'
  | 'kids'
  | 'footwear'
  | 'fashion'
  | 'bihar-craft'
  | 'electronics'
  | 'grocery'
  | 'delicacies'
  | 'home-living'
  | 'beauty'
  | 'lifestyle';

export interface OnlineProduct {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  image: string;
  storeOrigin: string;
  floor: string;
  inStock: number;
  deliveryTime: string;
  tags: string[];
  isFeatured?: boolean;
  isBiharSpecial?: boolean;
  unitOrSizeOptions?: string[];
  description: string;
  highlights: string[];
}

export interface CartItem {
  product: OnlineProduct;
  quantity: number;
  selectedOption?: string;
}

export interface OrderDeliveryAddress {
  fullName: string;
  phone: string;
  addressLine: string;
  landmark?: string;
  city: string;
  pincode: string;
  deliveryMode: 'home-delivery' | 'mall-pickup';
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  storeOrigin: string;
  selectedOption?: string;
}

export interface TrackingStep {
  title: string;
  time: string;
  completed: boolean;
  current?: boolean;
  description?: string;
}

export interface CustomerOrder {
  id: string;
  orderDate: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
  status: 'confirmed' | 'packing' | 'out_for_delivery' | 'ready_for_pickup' | 'delivered';
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  deliveryAddress: OrderDeliveryAddress;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
}

export type DocumentType = 
  | 'aadhaar'
  | 'pan'
  | 'voter_id'
  | 'driving_license'
  | 'address_proof'
  | 'gstin'
  | 'smart_card'
  | 'smart_bazzar_club'
  | 'other';

export interface UserDocument {
  id: string;
  type: DocumentType;
  typeName: string;
  documentNumber: string;
  fullName: string;
  issueDate?: string;
  expiryDate?: string;
  status: 'verified' | 'pending' | 'active';
  fileUrl?: string;
  notes?: string;
  uploadedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  memberTier: 'Silver' | 'Gold' | 'Platinum';
  points: number;
  savedAddresses: OrderDeliveryAddress[];
  // Personal Document & About info
  bio?: string;
  dateOfBirth?: string;
  occupation?: string;
  emergencyContact?: string;
  kycStatus: 'verified' | 'pending' | 'unverified';
  documents: UserDocument[];
}

