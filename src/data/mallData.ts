import { Store, Restaurant, MovieShow, MallEvent, FloorInfo, Coupon } from '../types';

export const MALL_INFO = {
  name: 'Smart Bazzar',
  owner: 'Ganesh Singh',
  established: 2024,
  location: 'NH-80 Road, Lakhisarai, Bihar – 811311',
  phone: '+91-6200-123456',
  email: 'info@smartbazzar.in',
  hours: '10:00 AM – 10:30 PM (All 7 Days)',
  tagline: 'Your one-stop destination for shopping, dining, and entertainment in Lakhisarai.',
  vision: 'To bring modern retail experiences to Bihar with world-class facilities.',
  mission: 'Provide affordable luxury, convenience, and entertainment under one roof.',
  totalArea: '2,50,000 sq. ft.',
  totalFloors: 5,
  parkingCapacity: '500+ Cars & 1,000+ Two-Wheelers',
  footfallCapacity: '10,000+ Visitors / Day',
  screensCount: 4,
  foodOutletsCount: '20+ Outlets',
  distanceFromStation: '2.5 km from Lakhisarai Junction & 3.8 km from Kiul Junction',
};

export const HIGHLIGHTS_LIST = [
  {
    icon: 'Maximize2',
    title: '2,50,000 Sq. Ft.',
    subtitle: 'Expansive Retail & Leisure Arena',
    detail: 'Lakhisarai’s largest modern commercial landmark designed with expansive atriums and high-capacity aisles.',
    metric: '2.5 Lakh sq ft'
  },
  {
    icon: 'Layers',
    title: '5 Thematic Floors',
    subtitle: 'From High Fashion to Sky Lounge',
    detail: 'Retail, Hypermarket, Food Court, Dolby Atmos 4-Screen Cinema, and Open-Air Rooftop Zone.',
    metric: '5 Levels'
  },
  {
    icon: 'Car',
    title: 'Smart Parking',
    subtitle: '500+ Cars & 1000+ Bikes',
    detail: 'Two-level automated parking with digital slot guidance, sensor tracking, and app reservation.',
    metric: '1,500+ Slots'
  },
  {
    icon: 'Users',
    title: '10,000+ Visitors / Day',
    subtitle: 'Safe, Air-Conditioned Comfort',
    detail: 'Engineered for smooth crowd flow with wide corridors, 8 high-speed elevators, and dual escalators.',
    metric: '10k Daily'
  },
  {
    icon: 'Wifi',
    title: 'Smart & Connected',
    subtitle: 'Free Wi-Fi & Cashless Ease',
    detail: 'Complimentary 5G Wi-Fi, touch-screen mall wayfinding kiosks, digital loyalty, and 100% UPI acceptance.',
    metric: 'Free 5G Wi-Fi'
  },
  {
    icon: 'Film',
    title: '4-Screen CineSmart',
    subtitle: 'Dolby Atmos & 4K Projection',
    detail: 'First-in-region multi-screen cinema with luxury recliner seating and immersive sound architecture.',
    metric: '4 Screens'
  },
];

export const FLOORS_DATA: FloorInfo[] = [
  {
    level: 0,
    name: 'Ground Floor (L0)',
    title: 'Grand Atrium, High Fashion & Luxury',
    highlights: ['Grand Central Atrium', 'Reliance Trends', 'Pantaloons', 'Apple Reseller', 'Customer Help Desk'],
    storesCount: 18,
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1200&q=80',
    description: 'The vibrant heart of Smart Bazzar. Features high ceiling glass atriums, premium fashion anchors, international cosmetics, and immediate parking access.'
  },
  {
    level: 1,
    name: 'First Floor (L1)',
    title: 'Electronics, Footwear & Modern Lifestyle',
    highlights: ['Croma Mega Store', 'Samsung Experience Store', 'Bata', 'Titan & Fastrack', 'Miniso Japan'],
    storesCount: 22,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
    description: 'Lakhisarai’s definitive technology and lifestyle destination. Explore gadgets, home appliances, watches, eyewear, and contemporary home accents.'
  },
  {
    level: 2,
    name: 'Second Floor (L2)',
    title: 'Hypermarket & "Made in Bihar" Cultural Pavilion',
    highlights: ['Reliance Smart Hypermarket', 'Dedicated "Made in Bihar" Crafts', 'Bhagalpuri Silk', 'FabIndia', 'Home Centre'],
    storesCount: 16,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    description: 'Groceries and daily essentials meet regional heritage. Home to our signature artisan marketplace featuring Madhubani paintings, handlooms, and handicrafts.'
  },
  {
    level: 3,
    name: 'Third Floor (L3)',
    title: 'The Great Food Court & "Taste of Bihar"',
    highlights: ['20+ Food Stalls', 'Domino’s & KFC', 'Chatori Galli Street Food', 'Taste of Bihar Corner', 'Seating for 450+'],
    storesCount: 24,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    description: 'A culinary paradise offering global fast food, North & South Indian delicacies, and our celebrated monthly Taste of Bihar regional gastronomy fest.'
  },
  {
    level: 4,
    name: 'Fourth Floor (L4)',
    title: '4-Screen Multiplex & Kids VR Gaming Arena',
    highlights: ['4-Screen Dolby Atmos Multiplex', 'Kids Trampoline Park', 'VR Racing Simulators', 'E-Sports Lounge', 'Popcorn Concourse'],
    storesCount: 8,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    description: 'Non-stop entertainment for all age groups. Watch blockbuster movies in luxury Dolby Atmos comfort, challenge friends in VR, or let kids play freely.'
  },
  {
    level: 5,
    name: 'Rooftop Zone (L5)',
    title: 'Sky Lounge Café & Open-Air Amphitheatre',
    highlights: ['Skyline View Dining', 'Acoustic Weekend Live Music', 'Sunset Tea Lounge', 'Seasonal Flea Markets', 'Cultural Shows'],
    storesCount: 6,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    description: 'Breathtaking panoramic views of Lakhisarai city and surrounding hills. Enjoy serene open-air evenings, artisan flea markets, and live performances under the stars.'
  },
];

export const STORES_DATA: Store[] = [
  // Fashion
  {
    id: 'store-1',
    name: 'Reliance Trends',
    category: 'fashion',
    categoryLabel: 'Fashion & Apparel',
    floor: 'Ground Floor (G-04)',
    unit: 'G-04 to G-08',
    logoText: 'TRENDS',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    description: 'India’s favorite fashion destination for men, women, and kids apparel with festive collections.',
    offer: 'Flat 40% Off on Ethnic Wear',
    isAnchor: true,
    phone: '+91 6200 123411',
    hours: '10:00 AM - 10:00 PM'
  },
  {
    id: 'store-2',
    name: 'Pantaloons',
    category: 'fashion',
    categoryLabel: 'Fashion & Apparel',
    floor: 'Ground Floor (G-12)',
    unit: 'G-12',
    logoText: 'PANTALOONS',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    description: 'Trendy casuals, formal business wear, and glamorous evening attire from Aditya Birla Fashion.',
    offer: 'Buy 2 Get 1 Free on Western Wear',
    isAnchor: true,
    phone: '+91 6200 123412',
    hours: '10:00 AM - 10:00 PM'
  },
  {
    id: 'store-3',
    name: 'FabIndia',
    category: 'fashion',
    categoryLabel: 'Ethnic & Lifestyle',
    floor: 'Second Floor (2-05)',
    unit: '2-05',
    logoText: 'FABINDIA',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted kurtas, organic clothing, handcrafted home décor, and pure botanical cosmetics.',
    offer: 'Complimentary Organic Gift on ₹2,500 spend',
    isAnchor: false,
    phone: '+91 6200 123413',
    hours: '10:30 AM - 9:30 PM'
  },
  {
    id: 'store-4',
    name: 'Lakhisarai Silk & Boutique',
    category: 'fashion',
    categoryLabel: 'Boutique & Bridal',
    floor: 'Ground Floor (G-18)',
    unit: 'G-18',
    logoText: 'BOUTIQUE',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    description: 'Designer bridal lehengas, Sherwanis, Chanderi silks, and customized tailoring for weddings.',
    offer: 'Special Bridal Package 20% Off',
    phone: '+91 6200 123414',
    hours: '10:00 AM - 9:30 PM'
  },
  {
    id: 'store-boys-girls-1',
    name: 'Junior Vogue & Kids Couture (Boys & Girls)',
    category: 'fashion',
    categoryLabel: 'Boys & Girls Designer Fashion',
    floor: 'First Floor (1-16)',
    unit: '1-16',
    logoText: 'KIDS COUTURE',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
    description: 'High-fashion runway dresses for kids: Girls fairy-tale princess net frocks, birthday ball gowns, Boys 3-piece tuxedo suits, sherwanis, and casual denim outfits.',
    offer: 'Flat 40% Off on Boys & Girls Partywear',
    isAnchor: true,
    phone: '+91 6200 123415',
    hours: '10:00 AM - 10:00 PM'
  },
  {
    id: 'store-boys-girls-2',
    name: 'Little Manyavar & Biba Girls',
    category: 'fashion',
    categoryLabel: 'Festive Ethnic Dresses for Boys & Girls',
    floor: 'Ground Floor (G-22)',
    unit: 'G-22',
    logoText: 'MANYAVAR KIDS',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
    description: 'Premier festive ethnic dresses: Boys royal brocade sherwanis, embroidered Nehru jackets with silk kurtas, and Girls flared Anarkalis, lehenga cholis, and mirror sharara sets.',
    offer: 'Festive Combo: Buy 2 Ethnic Sets Get 20% Off',
    isAnchor: true,
    phone: '+91 6200 123416',
    hours: '10:00 AM - 10:00 PM'
  },
  {
    id: 'store-boys-1',
    name: 'Spykar Junior & Street League (Boys)',
    category: 'fashion',
    categoryLabel: "Boys' Streetwear & Denim",
    floor: 'First Floor (1-18)',
    unit: '1-18',
    logoText: 'SPYKAR BOYS',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80',
    description: 'Trending stylish boys fashion: Stone-washed denim trucker jackets, cargo jogger trousers, varsity bomber jackets, graphic hoodies, and Cuban collar resort shirts.',
    offer: 'Buy 1 Get 1 at 50% Off on Boys Denim',
    phone: '+91 6200 123417',
    hours: '10:00 AM - 9:30 PM'
  },
  {
    id: 'store-girls-1',
    name: 'Pink Cow & Aurelia Junior (Girls)',
    category: 'fashion',
    categoryLabel: "Girls' Party Dresses & Fusion Wear",
    floor: 'First Floor (1-19)',
    unit: '1-19',
    logoText: 'PINK COW',
    image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&w=800&q=80',
    description: 'Glamorous and stylish dresses for girls: Red carpet sequin evening ball gowns, tiered floral summer twirl dresses, chic denim dungarees, and contemporary fusion skirts.',
    offer: 'Free Princess Tiara Headband on billing above ₹1,999',
    phone: '+91 6200 123418',
    hours: '10:00 AM - 9:30 PM'
  },

  // Electronics
  {
    id: 'store-5',
    name: 'Croma Megastore',
    category: 'electronics',
    categoryLabel: 'Electronics & Gadgets',
    floor: 'First Floor (1-01)',
    unit: '1-01 to 1-04',
    logoText: 'CROMA',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    description: 'Tata’s electronics mega-store: 4K Smart TVs, laptops, refrigerators, smart home gear, and phones.',
    offer: 'Zero Down Payment EMI + 10% Cashback on HDFC/SBI Cards',
    isAnchor: true,
    phone: '+91 6200 123421',
    hours: '10:00 AM - 10:00 PM'
  },
  {
    id: 'store-6',
    name: 'Samsung Experience Store',
    category: 'electronics',
    categoryLabel: 'Smartphones & Tech',
    floor: 'First Floor (1-08)',
    unit: '1-08',
    logoText: 'SAMSUNG',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    description: 'Official Galaxy S-Series, Z-Fold/Flip experience zone, smart wearables, and live demo stations.',
    offer: 'Free Wireless Charger with Galaxy Ultra Series',
    phone: '+91 6200 123422',
    hours: '10:00 AM - 9:30 PM'
  },
  {
    id: 'store-7',
    name: 'Apple Authorized Reseller (iStore)',
    category: 'electronics',
    categoryLabel: 'Apple Official Tech',
    floor: 'First Floor (1-10)',
    unit: '1-10',
    logoText: 'APPLE',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    description: 'Latest iPhones, MacBooks, iPads, Apple Watches, AirPods, and certified accessories with genuine warranty.',
    offer: 'Student Discount Flat ₹10,000 Off on MacBooks',
    isAnchor: true,
    phone: '+91 6200 123423',
    hours: '10:00 AM - 10:00 PM'
  },

  // Groceries & Hypermarket
  {
    id: 'store-8',
    name: 'Reliance Smart Hypermarket',
    category: 'groceries',
    categoryLabel: 'Hypermarket & Groceries',
    floor: 'Second Floor (2-01)',
    unit: '2-01 to 2-04',
    logoText: 'SMART BAZAAR',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    description: 'Complete one-stop grocery mart with fresh vegetables, dairy, pulses, household essentials, and FMCG deals.',
    offer: 'Wednesday Super Saving Day: Up to 50% Off on Groceries',
    isAnchor: true,
    phone: '+91 6200 123431',
    hours: '9:00 AM - 10:00 PM'
  },
  {
    id: 'store-9',
    name: 'Bazaar Gourmet & Organic Mart',
    category: 'groceries',
    categoryLabel: 'Organic & Imported Foods',
    floor: 'Second Floor (2-14)',
    unit: '2-14',
    logoText: 'ORGANIC',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    description: 'Cold-pressed oils, dry fruits, organic honey, gluten-free grains, and fresh exotic fruit imported weekly.',
    offer: '15% Off on Bihari Makhana & Honey Jars',
    phone: '+91 6200 123432',
    hours: '9:30 AM - 9:30 PM'
  },

  // Lifestyle
  {
    id: 'store-10',
    name: 'Miniso',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle & Accessories',
    floor: 'First Floor (1-15)',
    unit: '1-15',
    logoText: 'MINISO',
    image: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?auto=format&fit=crop&w=800&q=80',
    description: 'Japanese-inspired trendy plush toys, stationery, travel gear, skincare, and quirky daily gadgets.',
    offer: 'Mystery Box Gifts for purchases above ₹999',
    phone: '+91 6200 123441',
    hours: '10:00 AM - 10:00 PM'
  },
  {
    id: 'store-11',
    name: 'Home Centre',
    category: 'lifestyle',
    categoryLabel: 'Home Decor & Furniture',
    floor: 'Second Floor (2-08)',
    unit: '2-08',
    logoText: 'HOME CENTRE',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    description: 'Contemporary sofas, bedsheets, luxury dinner sets, ceramic vases, and kitchen organizer utilities.',
    offer: 'Up to 45% Off on Modular Home Decor',
    isAnchor: true,
    phone: '+91 6200 123442',
    hours: '10:00 AM - 10:00 PM'
  },
  {
    id: 'store-12',
    name: 'Bata Flagship Store',
    category: 'lifestyle',
    categoryLabel: 'Footwear & Leather',
    floor: 'First Floor (1-20)',
    unit: '1-20',
    logoText: 'BATA',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    description: 'Comfortable formal footwear, trendy sneakers, Hush Puppies, and authentic leather handbags.',
    offer: 'Buy 2 Pairs, Get 25% Off on Bill',
    phone: '+91 6200 123443',
    hours: '10:00 AM - 9:30 PM'
  },
  {
    id: 'store-13',
    name: 'Titan World & Fastrack',
    category: 'lifestyle',
    categoryLabel: 'Watches & Eyewear',
    floor: 'First Floor (1-22)',
    unit: '1-22',
    logoText: 'TITAN',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    description: 'Precision timepieces from Edge, Raga, Fastrack smartwatches, and Titan Eyeplus computerized vision testing.',
    offer: 'Complimentary Watch Service & 20% on Smartwatches',
    phone: '+91 6200 123444',
    hours: '10:00 AM - 9:30 PM'
  },

  // Dedicated Made in Bihar Section
  {
    id: 'store-14',
    name: 'Bhagalpuri Tussar & Silk Weavers',
    category: 'bihar-craft',
    categoryLabel: 'Made in Bihar Handloom',
    floor: 'Second Floor (2-16)',
    unit: '2-16 (Bihar Pavilion)',
    logoText: 'BHAGALPUR SILK',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic 100% pure Bhagalpuri Tussar silk sarees, stoles, dupattas, and kurtas directly from Bihar master weavers.',
    offer: 'Authenticity Guarantee Certificate + Free Silk Scarf',
    isBiharSpecial: true,
    phone: '+91 6200 123451',
    hours: '10:00 AM - 9:30 PM'
  },
  {
    id: 'store-15',
    name: 'Mithila Kala Mandir (Madhubani Art)',
    category: 'bihar-craft',
    categoryLabel: 'Madhubani Hand-Painted Crafts',
    floor: 'Second Floor (2-18)',
    unit: '2-18 (Bihar Pavilion)',
    logoText: 'MADHUBANI ART',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-painted canvas frames, Madhubani wall hangings, terracotta pottery, hand-painted sarees, and handmade souvenirs.',
    offer: 'Live Painting Demo Every Weekend',
    isBiharSpecial: true,
    phone: '+91 6200 123452',
    hours: '10:00 AM - 9:30 PM'
  },
  {
    id: 'store-16',
    name: 'Sikki Grass & Manjusha Heritage',
    category: 'bihar-craft',
    categoryLabel: 'Golden Grass & Clay Crafts',
    floor: 'Second Floor (2-20)',
    unit: '2-20 (Bihar Pavilion)',
    logoText: 'BIHAR CRAFTS',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    description: 'GI-tagged golden Sikki grass baskets, lacquer toys, Angika Manjusha art pieces, and eco-friendly handicrafts.',
    offer: 'Zero Middleman: 100% Proceeds to Lakhisarai Artisan Cooperatives',
    isBiharSpecial: true,
    phone: '+91 6200 123453',
    hours: '10:00 AM - 9:30 PM'
  },
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 'res-1',
    name: 'Domino’s Pizza',
    type: 'food-court',
    cuisine: 'Pizzas, Garlic Breads, Pastas',
    floor: 'Third Floor Food Court (FC-01)',
    rating: 4.8,
    priceRange: '₹₹',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    description: 'Hot, cheesy, freshly oven-baked pizzas, cheesy dips, choco lava cakes, and combo meal deals.',
    specialty: 'Cheese Burst Peppy Paneer & Farmhouse Pizza',
    offer: 'Everyday Value Combo Starting @ ₹99'
  },
  {
    id: 'res-2',
    name: 'KFC',
    type: 'food-court',
    cuisine: 'Crispy Chicken, Burgers & Krushers',
    floor: 'Third Floor Food Court (FC-02)',
    rating: 4.7,
    priceRange: '₹₹',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    description: 'World-famous secret 11 herbs & spices crispy chicken buckets, zinger burgers, and fries.',
    specialty: 'Hot & Crispy Bucket with Peri Peri Dip',
    offer: 'Wednesday 12 Pc Bucket Special Deal'
  },
  {
    id: 'res-3',
    name: 'Subway',
    type: 'food-court',
    cuisine: 'Fresh Subs, Salads, Wraps',
    floor: 'Third Floor Food Court (FC-03)',
    rating: 4.6,
    priceRange: '₹₹',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    description: 'Freshly baked multigrain bread, hand-picked garden vegetables, healthy salads, and cookies.',
    specialty: 'Paneer Tikka Sub on Honey Oat Bread',
    offer: 'Sub of the Day @ ₹179'
  },
  {
    id: 'res-4',
    name: 'Royal Biryani House',
    type: 'food-court',
    cuisine: 'Awadhi & Hyderabadi Dum Biryanis, Kebabs',
    floor: 'Third Floor Food Court (FC-05)',
    rating: 4.9,
    priceRange: '₹₹',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    description: 'Slow-cooked aromatic basmati rice dum biryani flavored with saffron, kewra water, and tender spices.',
    specialty: 'Matka Dum Biryani with Mirchi ka Salan & Burani Raita',
    offer: 'Family Biryani Pot with Free Gulab Jamun'
  },
  {
    id: 'res-5',
    name: 'Chatori Galli Street Corner',
    type: 'food-court',
    cuisine: 'Delhi Chaat, Golgappe, Pav Bhaji, Chole Bhature',
    floor: 'Third Floor Food Court (FC-08)',
    rating: 4.8,
    priceRange: '₹',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    description: 'Hygienic RO-water pani puri with 6 distinct flavored waters, crispy aloo tikki chaat, and buttery pav bhaji.',
    specialty: '6-Flavor Puris & Dahi Bhalla Papdi Chaat',
    vegOnly: true,
    offer: 'Unlimited Pani Puri Challenge Every Tuesday'
  },
  {
    id: 'res-6',
    name: 'Taste of Bihar Pavilion',
    type: 'bihar-special',
    cuisine: 'Authentic Bihari Delicacies & Sweets',
    floor: 'Third Floor (Signature Center)',
    rating: 5.0,
    priceRange: '₹₹',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    description: 'Our proud regional centerpiece: traditional wood-fire Litti-Chokha made in pure desi ghee, chilled roasted sattu drinks, and crunchy makhana kheer.',
    specialty: 'Desi Ghee Litti Chokha with Baingan-Tamatar Bharta + Ahuna Mutton/Paneer',
    offer: 'Thali Combo: Litti, Sattu Sharbat & Makhana Kheer @ ₹220'
  },
  {
    id: 'res-7',
    name: 'The Sky View Terrace & Bistro',
    type: 'rooftop',
    cuisine: 'Multi-Cuisine, Continental, Mocktails & Tandoor',
    floor: 'Fifth Floor Rooftop Zone',
    rating: 4.9,
    priceRange: '₹₹₹',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    description: 'Lakhisarai’s first scenic rooftop restaurant with panoramic skyline views, candlelight cabanas, and live acoustic music.',
    specialty: 'Wood-Fired Pizza, Sizzlers & Virgin Mojitos',
    offer: 'Complimentary Sunset Dessert with Dinner Reservations'
  },
  {
    id: 'res-8',
    name: 'Chai Katta & Sweet Heritage',
    type: 'food-court',
    cuisine: 'Kulhad Chai, Bun Maska, Bihari Thekua & Sweets',
    floor: 'Third Floor Food Court (FC-11)',
    rating: 4.7,
    priceRange: '₹',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    description: 'Steaming ginger cardamom tea served in authentic earthen terracotta kulhads, paired with crispy Thekua and Parwal mithai.',
    specialty: 'Adrak Elaichi Matka Chai with Desi Ghee Thekua',
    vegOnly: true,
    offer: 'Free Kulhad Refill on 3 Cups'
  },
];

export const TASTE_OF_BIHAR_SPECIALS = [
  {
    dish: 'Desi Ghee Litti Chokha',
    tag: 'All-Time Classic',
    description: 'Whole wheat dough stuffed with spicy sattu (roasted gram flour), roasted on charcoal coals, dipped in hot aromatic desi cow ghee, served with smoky roasted baingan-tamatar chokha and green chutney.',
    price: '₹140',
    badge: 'Chef Signature'
  },
  {
    dish: 'Champaran Handi Ahuna Kebab / Paneer',
    tag: 'Clay Pot Specialty',
    description: 'Slow-simmered in sealed earthen earthen pots with whole garlic cloves, mustard oil, and ground aromatic whole spices over gentle wood fires.',
    price: '₹260',
    badge: 'Famous Earthen Pot'
  },
  {
    dish: 'Chilled Jeera Sattu Sharbat',
    tag: 'Summer Superfood',
    description: 'Wholesome roasted gram beverage blended with chilled lemon water, black salt, roasted cumin seeds, finely diced green chillies, and fresh mint leaves.',
    price: '₹60',
    badge: 'Natural Protein Boost'
  },
  {
    dish: 'Mithila Makhana Kheer & Sweets',
    tag: 'Dessert Royalty',
    description: 'Rich slow-reduced creamy milk simmered with toasted local GI-grade foxnuts (makhana), saffron strands, cardamoms, and slivered pistachios.',
    price: '₹95',
    badge: 'Local GI Ingredient'
  },
  {
    dish: 'Traditional Jaggery Thekua',
    tag: 'Crispy Heritage',
    description: 'Crispy, crunchy festive cookies prepared from stone-ground wheat flour, pure jaggery, grated coconut, and dry fruits.',
    price: '₹80 (Box of 6)',
    badge: 'Festive Favorite'
  }
];

export const MOVIES_DATA: MovieShow[] = [
  {
    id: 'mov-1',
    title: 'Singham Returns Again (Dolby Atmos)',
    genre: 'Action / Crime / Thriller',
    duration: '2h 45m',
    rating: 'UA 16+',
    screen: 'Audi 1 (Dolby Atmos 4K)',
    language: 'Hindi (with English Subtitles)',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    synopsis: 'The ultimate high-octane battle for justice erupts with heart-pounding stunts and Dolby Atmos 64-channel immersive audio.',
    showtimes: ['11:00 AM', '02:30 PM', '06:00 PM', '09:30 PM']
  },
  {
    id: 'mov-2',
    title: 'Avatar: The Way of Water 3D',
    genre: 'Sci-Fi / Adventure / Visual Epic',
    duration: '3h 12m',
    rating: 'UA',
    screen: 'Audi 3 (3D Digital)',
    language: 'English / Hindi',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Experience the bioluminescent wonders of Pandora on our silver screen with crystal-clear 3D glasses and depth perception.',
    showtimes: ['10:15 AM', '01:45 PM', '05:15 PM', '08:45 PM']
  },
  {
    id: 'mov-3',
    title: 'Bhojpuriya Superstar: Maati Ke Lal',
    genre: 'Drama / Musical / Family',
    duration: '2h 20m',
    rating: 'U',
    screen: 'Audi 2 (Dolby Atmos)',
    language: 'Bhojpuri / Maithili',
    poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80',
    synopsis: 'A heartfelt inspiring journey celebrating the soil, resilience, and musical traditions of Bihar with packed crowds and festive joy.',
    showtimes: ['12:30 PM', '03:45 PM', '07:15 PM', '10:15 PM']
  },
  {
    id: 'mov-4',
    title: 'Stree 2: Sarkate Ka Aatank',
    genre: 'Horror / Comedy',
    duration: '2h 28m',
    rating: 'UA',
    screen: 'Audi 4 (VIP Lounge)',
    language: 'Hindi',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Chanderi encounters its craziest supernatural chaos yet. Watch with plush reclining leather sofas and push-button waiter service.',
    showtimes: ['11:45 AM', '03:00 PM', '06:30 PM', '09:45 PM']
  },
];

export const EVENTS_DATA: MallEvent[] = [
  {
    id: 'evt-1',
    title: 'Diwali Mega Festive Bonanza 2024-25',
    category: 'Festival',
    date: 'Upcoming Festive Season',
    time: 'All Day (10:00 AM - 11:00 PM)',
    venue: 'Entire Mall & Central Atrium',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1000&q=80',
    description: 'Grand Diwali illumination, gold coin lucky draws on bills above ₹5,000, live rangoli competitions, and festive fireworks showcase.',
    highlight: 'Win a New Car & 50+ Smart TVs in Lucky Draw',
    couponCode: 'DIWALI500',
    discountBadge: 'Up to 50% Off'
  },
  {
    id: 'evt-2',
    title: 'Holi Color Carnival & Musical Euphoria',
    category: 'Culture',
    date: 'Holi Weekend Special',
    time: '4:00 PM - 9:00 PM',
    venue: 'Smart Bazzar Rooftop Zone',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
    description: 'Eco-friendly organic Gulal celebrations, live Dhol performers, Thandai counter, Bollywood dance performances, and family photo booth.',
    highlight: 'Complimentary Organic Gulal Pack for Shoppers',
    couponCode: 'HOLICARNIVAL',
    discountBadge: 'Special Passes'
  },
  {
    id: 'evt-3',
    title: 'Eid Food Fest & Royal Dawat',
    category: 'Food Fest',
    date: 'Festive Week',
    time: '5:00 PM - 10:30 PM',
    venue: '3rd Floor Food Court & Atrium',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    description: 'Specialty stalls for Sheer Khurma, authentic Hyderabadi Haleem, Galouti Kebabs, and live musical Ghazal evenings.',
    highlight: 'Celebrity Chef Demos & Royal Thalis',
    couponCode: 'EIDFEAST',
    discountBadge: 'Flat 20% Off'
  },
  {
    id: 'evt-4',
    title: 'Bihar Handloom & Madhubani Art Expo',
    category: 'Culture',
    date: 'Every 2nd & 4th Weekend',
    time: '11:00 AM - 8:30 PM',
    venue: 'Ground Floor Grand Atrium',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
    description: 'State-awarded master craftsmen demonstrate Madhubani live painting, Sikki grass weaving, and Bhagalpuri silk processing.',
    highlight: 'Free Interactive Workshop for Kids & Adults',
    couponCode: 'BIHARCRAFT',
    discountBadge: 'Artisan Direct'
  },
  {
    id: 'evt-5',
    title: 'Weekend Live Acoustic Music & Comedy',
    category: 'Entertainment',
    date: 'Every Saturday & Sunday',
    time: '6:30 PM - 9:30 PM',
    venue: '5th Floor Sky Lounge Stage',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    description: 'Unwind with soulful acoustic bands, regional folk fusion, open mic sessions, and standup comedians under the stars.',
    highlight: 'Free Entry for All Mall Visitors',
    discountBadge: 'Free Entry'
  },
];

export const COUPONS_DATA: Coupon[] = [
  {
    code: 'WELCOME500',
    title: 'First-Time Mall Shopper Welcome',
    discount: 'Flat ₹500 Off',
    minSpend: 'Min purchase ₹2,499 at Fashion & Lifestyle',
    validTill: 'Valid this month',
    category: 'Fashion'
  },
  {
    code: 'BIHARCRAFT',
    title: 'Local Artisan & Handloom Support',
    discount: '15% Off',
    minSpend: 'Valid at Made in Bihar Pavilion (No minimum)',
    validTill: 'Ongoing 2024-25',
    category: 'Handicrafts'
  },
  {
    code: 'CINEBOGO',
    title: 'Multiplex Movie Magic',
    discount: 'Buy 1 Ticket, Get 1 at 50% Off',
    minSpend: 'Valid on Weekday Shows (Mon-Thu)',
    validTill: 'Limited slots daily',
    category: 'Cinema'
  },
  {
    code: 'FOODIE100',
    title: 'Food Court Delight',
    discount: 'Flat ₹100 Off',
    minSpend: 'Min order ₹399 at any Food Court Outlet',
    validTill: 'Valid everyday after 4 PM',
    category: 'Dining'
  },
];

export const VIRTUAL_TOUR_ZONES = [
  {
    id: 'atrium',
    name: 'Ground Floor Grand Atrium',
    floor: 'Level 0',
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1600&q=80',
    description: 'Towering skylights, polished Italian marble, central water fountain, and high-fashion anchor brand storefronts.',
    hotspots: [
      { label: 'Reliance Trends Anchor Store', x: '25%', y: '45%' },
      { label: 'Central Information & Help Desk', x: '52%', y: '68%' },
      { label: 'Glass Capsule Elevators', x: '78%', y: '35%' },
    ]
  },
  {
    id: 'bihar-pavilion',
    name: 'Made in Bihar Cultural Zone',
    floor: 'Level 2',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=80',
    description: 'Heritage handloom sarees, Madhubani canvas murals, Sikki grass decor, and artisan live craft demonstration stalls.',
    hotspots: [
      { label: 'Bhagalpuri Tussar Silk Pavilion', x: '30%', y: '50%' },
      { label: 'Live Madhubani Art Corner', x: '60%', y: '42%' },
      { label: 'Lakhisarai Heritage Crafts Emporium', x: '82%', y: '65%' },
    ]
  },
  {
    id: 'food-court',
    name: 'Third Floor Food Court & Taste of Bihar',
    floor: 'Level 3',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    description: 'Spacious 450+ seat dining hall with 20+ national and regional brands, digital order pickup screens, and wash stations.',
    hotspots: [
      { label: 'Taste of Bihar Litti Chokha Counter', x: '32%', y: '40%' },
      { label: 'Domino’s & KFC Quick Pick', x: '58%', y: '35%' },
      { label: 'Family Central Dining Seating', x: '50%', y: '75%' },
    ]
  },
  {
    id: 'multiplex',
    name: 'CineSmart 4-Screen Multiplex & VR Gaming',
    floor: 'Level 4',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80',
    description: 'Futuristic lobby with Dolby Atmos audio demo lounges, gourmet popcorn bar, VR pods, and kids trampoline park.',
    hotspots: [
      { label: 'Audi 1 (Dolby Atmos 4K Entry)', x: '20%', y: '45%' },
      { label: 'Kids VR Simulator Arena', x: '70%', y: '55%' },
      { label: 'Caramel & Cheese Popcorn Bar', x: '45%', y: '65%' },
    ]
  },
  {
    id: 'rooftop',
    name: '5th Floor Sky Lounge & Open-Air Zone',
    floor: 'Level 5',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
    description: 'Open sky breezes, landscaped greenery, café seating with sunset views across Lakhisarai and NH-80.',
    hotspots: [
      { label: 'Skyline Terrace Dining Pergola', x: '35%', y: '45%' },
      { label: 'Acoustic Live Music Amphitheatre', x: '65%', y: '60%' },
      { label: 'NH-80 City Observation Deck', x: '85%', y: '35%' },
    ]
  }
];

export const GALLERY_IMAGES = [
  {
    id: 'g-1',
    category: 'Architecture',
    title: 'Grand Glass Atrium & Skylight',
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'g-2',
    category: 'Shopping',
    title: 'Fashion Anchors & Wide Promenade',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'g-3',
    category: 'Cinema',
    title: 'CineSmart Dolby Atmos 4-Screen Multiplex',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'g-4',
    category: 'Dining',
    title: 'The Great Food Court & Taste of Bihar',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'g-5',
    category: 'Culture',
    title: 'Handcrafted Bhagalpuri Silk & Handloom',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'g-6',
    category: 'Rooftop',
    title: '5th Floor Open-Air Sky Lounge & City View',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'g-7',
    category: 'Entertainment',
    title: 'Kids VR Gaming & Trampoline Arena',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'g-8',
    category: 'Architecture',
    title: 'Night Illumination & NH-80 Facade',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80',
  },
];

export const FAQS_DATA = [
  {
    q: 'What are the mall operating hours?',
    a: 'Smart Bazzar is open all 7 days a week from 10:00 AM to 10:30 PM. The Reliance Smart hypermarket opens early at 9:00 AM, and the CineSmart Multiplex late night show operates until 12:30 AM.'
  },
  {
    q: 'Where is Smart Bazzar located in Lakhisarai?',
    a: 'We are prime located right on NH-80 Road, Lakhisarai, Bihar – 811311. We are conveniently situated 2.5 km from Lakhisarai Junction railway station and 3.8 km from Kiul Junction, accessible easily by e-rickshaws, autos, and private vehicles.'
  },
  {
    q: 'How does the Smart Parking work and is slot pre-booking available?',
    a: 'Yes! Smart Bazzar offers 2 levels of smart basement & podium parking accommodating 500+ cars and 1,000+ two-wheelers. You can pre-book your parking slot on our website or mobile app, get an instant digital QR pass, and proceed directly to your reserved bay.'
  },
  {
    q: 'What is the "Made in Bihar" section?',
    a: 'As envisioned by our founder Ganesh Singh, Smart Bazzar dedicates a prominent space on the 2nd floor to support local Bihar artisans. You can purchase authentic Bhagalpuri Tussar silk sarees, hand-painted Madhubani art, Sikki grass crafts, and authentic regional delicacies with 100% direct proceeds to local artisan families.'
  },
  {
    q: 'How do I join the Smart Club Loyalty Program?',
    a: 'Joining is free! Simply enter your name and phone number on our Membership tab or in our mobile app. You earn 1 reward point for every ₹1 spent across all retail, dining, and cinema outlets, which can be redeemed for instant shopping vouchers.'
  }
];
