import { OnlineProduct, CustomerOrder, UserProfile } from '../types';

export const ONLINE_PRODUCTS: OnlineProduct[] = [
  // ==========================================
  // 1. MEN'S FASHION
  // ==========================================
  {
    id: 'prod-men-01',
    name: 'Manyavar Festive Embroidered Jacquard Silk Kurta Set',
    category: 'men',
    categoryLabel: "Men's Ethnic Wear",
    brand: 'Manyavar',
    price: 3499,
    originalPrice: 4999,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Manyavar & Mohey Store',
    floor: 'Floor 1',
    inStock: 18,
    deliveryTime: 'Pan-India 2-4 Days • 2-Hour Express in Lakhisarai',
    tags: ['Festive Bestseller', 'Pan-India Free Shipping', '100% Original'],
    isFeatured: true,
    unitOrSizeOptions: ['M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    description: 'Exquisite jacquard art silk kurta crafted with detailed zari thread embroidery on the collar and placket. Paired with comfortable churidar pyjamas.',
    highlights: [
      'Premium jacquard woven fabric with rich golden zari borders',
      'Mandarin collar with royal button detailing',
      'Includes matching off-white silk-blend churidar',
      'Free nationwide door-to-door delivery across all 28 states'
    ]
  },
  {
    id: 'prod-men-02',
    name: 'Roadster Pure Cotton Slim Fit Casual Plaid Shirt',
    category: 'men',
    categoryLabel: "Men's Casual Wear",
    brand: 'Roadster',
    price: 899,
    originalPrice: 1999,
    discountPercent: 55,
    rating: 4.4,
    reviewsCount: 1240,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Bazzar Fashion Hub',
    floor: 'Floor 1',
    inStock: 64,
    deliveryTime: 'Pan-India 2-3 Days • Express Available',
    tags: ['Trending', 'Under ₹999', 'Top Rated'],
    isFeatured: true,
    unitOrSizeOptions: ['S (38)', 'M (40)', 'L (42)', 'XL (44)'],
    description: 'Crisp 100% breathable combed cotton casual button-down shirt with a modern tailored cut, curved hem, and patch pocket.',
    highlights: [
      '100% Premium long-staple combed cotton',
      'Spread collar and buttoned barrel cuffs',
      'Pre-shrunk fabric to prevent post-wash shrinkage',
      'Comfortable all-day wear for office or weekend'
    ]
  },
  {
    id: 'prod-men-03',
    name: 'Reliance Trends DNMX Men Premium Slim Fit Stretch Denim',
    category: 'men',
    categoryLabel: "Men's Bottomwear",
    brand: 'DNMX',
    price: 1199,
    originalPrice: 2299,
    discountPercent: 48,
    rating: 4.7,
    reviewsCount: 815,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Reliance Trends',
    floor: 'Floor 1',
    inStock: 45,
    deliveryTime: 'Pan-India 2-4 Days Shipping',
    tags: ['Daily Essentials', 'Power Stretch'],
    unitOrSizeOptions: ['30', '32', '34', '36', '38'],
    description: 'Dark indigo wash denim jeans engineered with flexible power-stretch elastane for maximum comfort and high durability.',
    highlights: [
      '98% cotton, 2% high-resilience elastane',
      '5-pocket classic styling with reinforced copper rivets',
      'Whiskered fading effect for stylish modern look',
      'Machine washable, fade-resistant color'
    ]
  },
  {
    id: 'prod-men-04',
    name: 'HRX by Hrithik Roshan Rapid-Dry Training Active T-Shirt',
    category: 'men',
    categoryLabel: "Men's Activewear",
    brand: 'HRX',
    price: 649,
    originalPrice: 1499,
    discountPercent: 57,
    rating: 4.6,
    reviewsCount: 940,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Sports Outlet',
    floor: 'Floor 1',
    inStock: 52,
    deliveryTime: 'Pan-India 2-3 Days',
    tags: ['Gym & Running', 'Rapid Dry Tech'],
    unitOrSizeOptions: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Engineered with anti-microbial Rapid-Dry moisture-wicking technology to keep you cool, dry, and odor-free during high intensity workouts.',
    highlights: [
      'Sweat-wicking microfiber poly-spandex mesh',
      'Reflective safety elements for night runs',
      'Ergonomic flatlock seams prevent chafing',
      'Lightweight and ultra-breathable'
    ]
  },
  {
    id: 'prod-men-05',
    name: 'Peter England Royal Navy Tailored Formal Single-Breasted Blazer',
    category: 'men',
    categoryLabel: "Men's Suits & Blazers",
    brand: 'Peter England',
    price: 3999,
    originalPrice: 6999,
    discountPercent: 43,
    rating: 4.8,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Peter England Exclusive Store',
    floor: 'Floor 1',
    inStock: 14,
    deliveryTime: 'Pan-India Express 2 Days',
    tags: ['Formal Wear', 'Wedding Special'],
    unitOrSizeOptions: ['38 Regular', '40 Regular', '42 Regular', '44 Regular'],
    description: 'Impeccably tailored navy blue blazer with a notch lapel, dual side vents, and satin lining. Perfect for weddings, conferences, and celebrations.',
    highlights: [
      'Poly-viscose structured fabric with wrinkle-resistant finish',
      'Notch lapel and two-button single-breasted closure',
      'Three interior pockets including secure pen pocket',
      'Comes with branded garment cover and hanger'
    ]
  },
  {
    id: 'prod-men-06',
    name: 'WROGN Slim Fit Olive Green Cargo Utility Trousers',
    category: 'men',
    categoryLabel: "Men's Bottomwear",
    brand: 'WROGN',
    price: 1599,
    originalPrice: 2999,
    discountPercent: 47,
    rating: 4.5,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Bazzar Fashion Hub',
    floor: 'Floor 1',
    inStock: 30,
    deliveryTime: 'Pan-India 2-4 Days Delivery',
    tags: ['Streetwear', 'Cargo Style'],
    unitOrSizeOptions: ['30', '32', '34', '36'],
    description: 'Heavyweight pure cotton twill cargo trousers featuring 6 tactical pockets, elasticated tapered ankle cuffs, and reinforced knee darts.',
    highlights: [
      '100% durable cotton twill fabric',
      'Multiple flap cargo utility pockets',
      'Relaxed thigh tapering to structured jogger hem'
    ]
  },

  // ==========================================
  // 2. WOMEN'S FASHION
  // ==========================================
  {
    id: 'prod-wom-01',
    name: 'Pantaloons Floral Zari Embroidered Anarkali Kurta & Dupatta',
    category: 'women',
    categoryLabel: "Women's Ethnic Wear",
    brand: 'Pantaloons',
    price: 2199,
    originalPrice: 3499,
    discountPercent: 37,
    rating: 4.8,
    reviewsCount: 298,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Pantaloons Store',
    floor: 'Floor 1',
    inStock: 24,
    deliveryTime: 'Pan-India 2-4 Days Shipping',
    tags: ['Trending', 'Ethnic Festive', 'Free Delivery'],
    isFeatured: true,
    unitOrSizeOptions: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Festive ruby red and gold Anarkali flared kurta paired with sheer Organza dupatta featuring handcrafted gota patti borders.',
    highlights: [
      'Soft rayon-cotton blend for whole-day comfort',
      'Intricate resham embroidery around the neckline',
      'Full flared 3.5-meter umbrella ghera',
      'Pan-India delivery with easy 7-day returns'
    ]
  },
  {
    id: 'prod-wom-02',
    name: 'Libas Embroidered Chanderi Silk Kurta with Trousers & Dupatta',
    category: 'women',
    categoryLabel: "Women's Festive Sets",
    brand: 'Libas',
    price: 2699,
    originalPrice: 4499,
    discountPercent: 40,
    rating: 4.9,
    reviewsCount: 460,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Bazzar Ethnic Pavilion',
    floor: 'Floor 1',
    inStock: 35,
    deliveryTime: 'Pan-India 2-3 Days',
    tags: ['Bestseller', 'Chanderi Silk'],
    isFeatured: true,
    unitOrSizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Emerald green chanderi silk straight kurta adorned with zari threadwork, paired with matching cigarette trousers and digital print organza dupatta.',
    highlights: [
      'Rich Chanderi silk blend with subtle sheen',
      'Zari and sequin hand-embroidery on yolk and cuffs',
      'Includes lined straight fit trousers with pocket'
    ]
  },
  {
    id: 'prod-wom-03',
    name: 'Biba Festive Metallic Foil Tiered Anarkali Maxi Gown',
    category: 'women',
    categoryLabel: "Women's Fusion Wear",
    brand: 'Biba',
    price: 2999,
    originalPrice: 5999,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Biba Exclusive',
    floor: 'Floor 1',
    inStock: 16,
    deliveryTime: 'Pan-India 2-4 Days',
    tags: ['Wedding Guest', '50% OFF'],
    unitOrSizeOptions: ['32 (S)', '34 (M)', '36 (L)', '38 (XL)'],
    description: 'Royal mustard yellow floor-length Anarkali gown crafted with golden foil prints and mirror embroidery accents along the round neckline.',
    highlights: [
      '100% Breathable viscose georgette with soft lining',
      'Tiered flare giving dramatic swirl silhouette',
      'Dry clean recommended'
    ]
  },
  {
    id: 'prod-wom-04',
    name: 'Kalini Traditional Banarasi Art Silk Saree with Zari Weave',
    category: 'women',
    categoryLabel: "Women's Sarees",
    brand: 'Kalini',
    price: 1899,
    originalPrice: 4299,
    discountPercent: 56,
    rating: 4.6,
    reviewsCount: 680,
    image: 'https://images.unsplash.com/photo-1610030469856-7856c80c2f7b?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Bazzar Saree Hub',
    floor: 'Floor 1',
    inStock: 28,
    deliveryTime: 'Pan-India Free Delivery',
    tags: ['Banarasi Zari', 'Top Value'],
    description: 'Magenta pink and royal gold Banarasi art silk saree decorated with ornate floral jaal work and a grand pallu. Comes with an unstitched blouse piece.',
    highlights: [
      'Rich jacquard zari border and heavy pallu',
      'Length: 5.5m saree + 0.8m unstitched blouse piece',
      'Suitable for weddings, Chhath puja, and pooja ceremonies'
    ]
  },
  {
    id: 'prod-wom-05',
    name: 'Vero Moda Elegant Floral Print Belted A-Line Midi Dress',
    category: 'women',
    categoryLabel: "Women's Western Wear",
    brand: 'Vero Moda',
    price: 1699,
    originalPrice: 3299,
    discountPercent: 49,
    rating: 4.5,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Bazzar Western Store',
    floor: 'Floor 1',
    inStock: 22,
    deliveryTime: 'Pan-India 2-3 Days',
    tags: ['Summer Casual', 'Floral Midi'],
    unitOrSizeOptions: ['XS', 'S', 'M', 'L'],
    description: 'Pastel lilac A-line midi dress featuring delicate wildflower prints, a V-neckline, tie-up fabric belt, and puff sleeve detailing.',
    highlights: [
      'Flowy lightweight crepe fabric',
      'Flattering wrap-style front with belt tie',
      'Concealed back zip for effortless fit'
    ]
  },

  // ==========================================
  // 3. KIDS, BOYS & GIRLS FASHION
  // ==========================================
  {
    id: 'prod-kid-01',
    name: 'Hopscotch Boys Traditional Silk Blend Sherwani & Dhoti Set',
    category: 'boys',
    categoryLabel: "Boys' Festive Wear",
    brand: 'Hopscotch',
    price: 1499,
    originalPrice: 2799,
    discountPercent: 46,
    rating: 4.8,
    reviewsCount: 190,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Kids World',
    floor: 'Floor 1',
    inStock: 30,
    deliveryTime: 'Pan-India 2-4 Days Shipping',
    tags: ['Boys Festive', 'Sherwani & Dhoti', 'Cotton Lined', 'Popular'],
    isFeatured: true,
    unitOrSizeOptions: ['2-3 Yrs', '3-4 Yrs', '4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-12 Yrs'],
    description: 'Royal maroon brocade sherwani jacket paired with a pre-stitched ready-to-wear golden dhoti pant. Lined with 100% soft cotton for sensitive skin.',
    highlights: [
      '100% Cotton inner lining to prevent itching',
      'Elasticated waistband for painless dress up',
      'Perfect for family weddings, festivals and school functions'
    ]
  },
  {
    id: 'prod-boy-02',
    name: 'Allen Solly Junior Boys 3-Piece Tuxedo Blazer & Trousers Suit',
    category: 'boys',
    categoryLabel: "Boys' Partywear Suits",
    brand: 'Allen Solly Junior',
    price: 1999,
    originalPrice: 3999,
    discountPercent: 50,
    rating: 4.9,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Kids World',
    floor: 'Floor 1',
    inStock: 18,
    deliveryTime: 'Pan-India 2-3 Days',
    tags: ['Party Suit', 'Tuxedo Style', 'Boys Bestseller'],
    isFeatured: true,
    unitOrSizeOptions: ['3-4 Yrs', '5-6 Yrs', '7-8 Yrs', '9-10 Yrs', '11-12 Yrs', '13-14 Yrs'],
    description: 'Sophisticated royal navy 3-piece formal party suit including slim-fit blazer jacket, contrast bowtie, white dress shirt, and tailored trousers.',
    highlights: [
      'Wrinkle-resistant poly-viscose blend with soft satin lining',
      'Adjustable internal elastic waistband on trousers',
      'Includes detachable designer satin bowtie',
      'Ideal for wedding receptions, birthdays, and school annual days'
    ]
  },
  {
    id: 'prod-boy-03',
    name: 'Spykar Junior Boys Distressed Denim Jacket & Cargo Jogger Outfit',
    category: 'boys',
    categoryLabel: "Boys' Streetwear & Denim",
    brand: 'Spykar Junior',
    price: 1399,
    originalPrice: 2899,
    discountPercent: 51,
    rating: 4.7,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Bazzar Fashion Hub',
    floor: 'Floor 1',
    inStock: 35,
    deliveryTime: 'Pan-India 2-4 Days',
    tags: ['Streetwear', 'Denim Cool', 'Boys Casual'],
    unitOrSizeOptions: ['4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-11 Yrs', '12-13 Yrs'],
    description: 'Ultra-cool washed denim jacket with chest pockets and metal shank buttons, matched with military olive cotton cargo jogger trousers.',
    highlights: [
      'Heavy-duty 100% breathable cotton twill and denim',
      'Elasticated cuffed ankles on trousers for a sporty look',
      'Fade-resistant enzyme stone-wash finish'
    ]
  },
  {
    id: 'prod-boy-04',
    name: 'Manyavar Junior Boys Banarasi Brocade Nehru Jacket with Silk Kurta',
    category: 'boys',
    categoryLabel: "Boys' Ethnic Kurta Sets",
    brand: 'Manyavar',
    price: 1799,
    originalPrice: 3299,
    discountPercent: 45,
    rating: 4.8,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Manyavar & Mohey Store',
    floor: 'Floor 1',
    inStock: 22,
    deliveryTime: 'Pan-India 2-3 Days Shipping',
    tags: ['Nehru Jacket', 'Festive Bestseller', 'Boys Ethnic'],
    unitOrSizeOptions: ['2-3 Yrs', '4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-12 Yrs'],
    description: 'Gold-woven Banarasi jacquard sleeveless Nehru jacket worn over a mustard yellow art silk kurta and comfortable cotton-silk pyjamas.',
    highlights: [
      'Intricate floral zari motifs on the Modi/Nehru waistcoat',
      'Mandarin collar with ornate metallic antique buttons',
      'Cotton lined for zero scratchiness'
    ]
  },
  {
    id: 'prod-boy-05',
    name: 'US Polo Assn. Kids Boys Resort Printed Resort Shirt & Shorts Set',
    category: 'boys',
    categoryLabel: "Boys' Casual Resort Wear",
    brand: 'US Polo Assn. Kids',
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    rating: 4.6,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Kids World',
    floor: 'Floor 1',
    inStock: 44,
    deliveryTime: 'Pan-India 2-3 Days',
    tags: ['Summer Cool', 'Pure Cotton', 'Under ₹999'],
    unitOrSizeOptions: ['3-4 Yrs', '5-6 Yrs', '7-8 Yrs', '9-10 Yrs'],
    description: 'Tropical botanical printed camp collar Cuban shirt paired with tailored cotton chino shorts with drawstrings. Breathable summer favorite.',
    highlights: [
      '100% fine poplin combed cotton fabric',
      'Relaxed vacation fit for outdoor play and birthday parties',
      'Machine washable and quick drying'
    ]
  },
  {
    id: 'prod-boy-06',
    name: 'Puma Junior Street League Colorblock Fleece Hoodie & Tracksuit',
    category: 'boys',
    categoryLabel: "Boys' Sportswear & Tracksuits",
    brand: 'Puma Junior',
    price: 1599,
    originalPrice: 3199,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Sports Outlet',
    floor: 'Floor 1',
    inStock: 28,
    deliveryTime: 'Pan-India 2-4 Days',
    tags: ['Sportswear', 'Warm Fleece', 'Boys Trending'],
    unitOrSizeOptions: ['5-6 Yrs', '7-8 Yrs', '9-10 Yrs', '11-12 Yrs', '13-14 Yrs'],
    description: 'Athletic colorblocked pullover hoodie with kangaroo pocket and matching ribbed jogger pants engineered for active kids.',
    highlights: [
      'Soft brushed cotton fleece interior',
      'Embossed reflective Puma cat logo',
      'Reinforced knee panels for rugged play'
    ]
  },

  // GIRLS' DESIGNER DRESSES & FASHION
  {
    id: 'prod-kid-02',
    name: 'Gini & Jony Girls Embellished Tiered Partywear Net Frock',
    category: 'girls',
    categoryLabel: "Girls' Princess Dresses",
    brand: 'Gini & Jony',
    price: 1299,
    originalPrice: 2499,
    discountPercent: 48,
    rating: 4.8,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Kids World',
    floor: 'Floor 1',
    inStock: 25,
    deliveryTime: 'Pan-India 2-3 Days',
    tags: ['Birthday Princess', 'Soft Tulle', 'Girls Partywear'],
    isFeatured: true,
    unitOrSizeOptions: ['3-4 Yrs', '5-6 Yrs', '7-8 Yrs', '9-10 Yrs', '11-12 Yrs'],
    description: 'Pastel pink tiered tulle princess dress with sparkling sequin floral embroidery on the bodice and a satin bow sash at the waist.',
    highlights: [
      'Multi-layer soft net with gentle cotton lining',
      'Non-scratchy sequin embellishments',
      'Comes with matching floral hairband'
    ]
  },
  {
    id: 'prod-girl-02',
    name: 'Biba Girls Embroidered Georgette Flared Anarkali Gown Dress',
    category: 'girls',
    categoryLabel: "Girls' Ethnic Gowns",
    brand: 'Biba Girls',
    price: 1799,
    originalPrice: 3499,
    discountPercent: 48,
    rating: 4.9,
    reviewsCount: 260,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Biba Exclusive',
    floor: 'Floor 1',
    inStock: 20,
    deliveryTime: 'Pan-India 2-4 Days Shipping',
    tags: ['Festive Anarkali', 'Gown Dress', 'Girls Ethnic', 'Bestseller'],
    isFeatured: true,
    unitOrSizeOptions: ['3-4 Yrs', '5-6 Yrs', '7-8 Yrs', '9-10 Yrs', '11-12 Yrs', '13-14 Yrs'],
    description: 'Dazzling maroon and gold floor-length Anarkali flared gown dress with heavy zari embroidery on the yoke and shimmering sequin borders.',
    highlights: [
      'Lightweight flowy georgette with 100% breathable cotton lining',
      'High twirl factor with 3-meter flare',
      'Comes with coordinating netted dupatta with gota patti'
    ]
  },
  {
    id: 'prod-girl-03',
    name: 'Little Muffet Girls Traditional Embroidered Lehenga Choli Set',
    category: 'girls',
    categoryLabel: "Girls' Lehenga Choli",
    brand: 'Little Muffet',
    price: 1899,
    originalPrice: 3899,
    discountPercent: 51,
    rating: 4.8,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Kids World',
    floor: 'Floor 1',
    inStock: 16,
    deliveryTime: 'Pan-India 2-3 Days',
    tags: ['Wedding Wear', 'Lehenga Choli', 'Girls Ethnic'],
    unitOrSizeOptions: ['4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-11 Yrs', '12-13 Yrs'],
    description: 'Peacock teal and mustard yellow brocade lehenga skirt featuring floral zari weaves, paired with an embroidered crop blouse and sheer organza dupatta.',
    highlights: [
      'Full volume can-can netting under skirt for regal flare',
      'Comfortable back zip and hook closure',
      'Dry clean recommended for bridal & wedding events'
    ]
  },
  {
    id: 'prod-girl-04',
    name: 'Peppermint Girls Chic Denim Pinafore Dungaree Dress with Striped Top',
    category: 'girls',
    categoryLabel: "Girls' Western Dresses",
    brand: 'Peppermint',
    price: 1149,
    originalPrice: 2299,
    discountPercent: 50,
    rating: 4.6,
    reviewsCount: 185,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Kids World',
    floor: 'Floor 1',
    inStock: 32,
    deliveryTime: 'Pan-India 2-3 Days',
    tags: ['Denim Dress', 'Casual Chic', 'Girls Trending'],
    unitOrSizeOptions: ['3-4 Yrs', '5-6 Yrs', '7-8 Yrs', '9-10 Yrs', '11-12 Yrs'],
    description: 'Stylish medium-wash denim pinafore dress with adjustable metal buckle straps, heart-embossed patch pocket, paired with a stretch ribbed cotton tee.',
    highlights: [
      'Stretchy soft denim that allows free movement',
      'Two-piece combo set ready for outings and school parties',
      'Pre-washed and colorfast'
    ]
  },
  {
    id: 'prod-girl-05',
    name: 'Pink Cow Girls Red Carpet Sequin Ball Gown Birthday Dress',
    category: 'girls',
    categoryLabel: "Girls' Ball Gowns",
    brand: 'Pink Cow Boutique',
    price: 2199,
    originalPrice: 4499,
    discountPercent: 51,
    rating: 4.9,
    reviewsCount: 130,
    image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Kids World',
    floor: 'Floor 1',
    inStock: 12,
    deliveryTime: 'Pan-India 2-4 Days Shipping',
    tags: ['Ball Gown', 'Red Carpet', 'Girls Luxury'],
    isFeatured: true,
    unitOrSizeOptions: ['4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-12 Yrs'],
    description: 'Magnificent lavender ball gown dress decorated with hand-sewn metallic sequins on the corsage, horsehair braid hemline, and voluminous layered organza skirt.',
    highlights: [
      'Multi-tiered crinoline tulle structure for ballroom flare',
      'Hypoallergenic smooth inner lining',
      'Includes complimentary satin tiara headband'
    ]
  },
  {
    id: 'prod-girl-06',
    name: 'GAP Kids Girls Floral Tiered Ruffle Cotton Twirl Summer Dress',
    category: 'girls',
    categoryLabel: "Girls' Casual Summer Dresses",
    brand: 'GAP Kids',
    price: 1249,
    originalPrice: 2499,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Bazzar Western Store',
    floor: 'Floor 1',
    inStock: 38,
    deliveryTime: 'Pan-India 2-3 Days',
    tags: ['Summer Twirl', '100% Cotton', 'Girls Casual'],
    unitOrSizeOptions: ['3-4 Yrs', '5-6 Yrs', '7-8 Yrs', '9-10 Yrs', '11-12 Yrs'],
    description: 'Sunny yellow tiered ruffle midi dress featuring vibrant wildflower prints, flutter butterfly sleeves, and a flattering stretch smocked bodice.',
    highlights: [
      '100% Breathable poplin cotton fabric',
      'Ultra-comfortable elasticated smocked chest fits all body types',
      'Playful 360-degree twirl design'
    ]
  },
  {
    id: 'prod-girl-07',
    name: 'Libas Girls Mirror-Work Sharara Suit Set with Gotta Patti',
    category: 'girls',
    categoryLabel: "Girls' Sharara Sets",
    brand: 'Libas Girls',
    price: 1649,
    originalPrice: 3299,
    discountPercent: 50,
    rating: 4.8,
    reviewsCount: 155,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Bazzar Ethnic Pavilion',
    floor: 'Floor 1',
    inStock: 24,
    deliveryTime: 'Pan-India 2-3 Days',
    tags: ['Sharara Set', 'Mirror Work', 'Girls Festive'],
    unitOrSizeOptions: ['4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-11 Yrs', '12-13 Yrs'],
    description: 'Coral peach peplum style short kurti with authentic foil mirror work, paired with flared pleated sharara pants and a gold laced chiffon dupatta.',
    highlights: [
      'Resham and mirror embroidery on the peplum yolk',
      'Tiered wide-leg sharara pants with elastic waistband',
      'Festive essential for Diwali, Eid, and wedding ceremonies'
    ]
  },
  {
    id: 'prod-girl-08',
    name: 'Bihar Handloom Girls Bhagalpuri Tussar Silk Pattu Pavadai Set',
    category: 'girls',
    categoryLabel: "Girls' Traditional Handloom",
    brand: 'Bhagalpur Weavers',
    price: 1599,
    originalPrice: 2999,
    discountPercent: 47,
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Bhagalpuri Tussar & Silk Weavers',
    floor: 'Floor 2 (Bihar Pavilion)',
    inStock: 19,
    deliveryTime: 'Pan-India 2-4 Days Shipping',
    tags: ['Made in Bihar', 'Tussar Silk', 'Authentic Handloom'],
    isBiharSpecial: true,
    unitOrSizeOptions: ['2-3 Yrs', '4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-11 Yrs'],
    description: 'Pure Bhagalpuri Tussar silk traditional two-piece Pattu Pavadai skirt and blouse set hand-woven with golden temple zari borders.',
    highlights: [
      '100% Genuine certified Bihar handloom silk',
      'Traditional golden zari temple borders',
      'Supports local weavers of Bhagalpur & Lakhisarai'
    ]
  },
  {
    id: 'prod-kid-03',
    name: 'Mothercare Pure Organic Cotton Baby Sleepsuits & Rompers (Pack of 3)',
    category: 'kids',
    categoryLabel: "Infant & Toddler Wear",
    brand: 'Mothercare',
    price: 999,
    originalPrice: 1799,
    discountPercent: 44,
    rating: 4.9,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Kids World',
    floor: 'Floor 1',
    inStock: 40,
    deliveryTime: 'Pan-India Free Shipping',
    tags: ['100% Organic', 'Newborn Essential'],
    unitOrSizeOptions: ['0-3 Months', '3-6 Months', '6-9 Months', '9-12 Months'],
    description: 'Ultra-soft GOTS-certified organic cotton full-sleeve sleepsuits with nickel-free popper fastenings and fold-over scratch mitts.',
    highlights: [
      '100% GOTS certified organic combed cotton',
      'Toe-safe feet design prevents loose threads',
      'Easy snap poppers for quick midnight diaper changes'
    ]
  },

  // ==========================================
  // 4. FOOTWEAR
  // ==========================================
  {
    id: 'prod-foot-01',
    name: 'Red Tape Men Memory Foam Lightweight Running Sports Shoes',
    category: 'footwear',
    categoryLabel: "Men's Sports Footwear",
    brand: 'Red Tape',
    price: 1399,
    originalPrice: 4299,
    discountPercent: 67,
    rating: 4.6,
    reviewsCount: 2450,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Red Tape Exclusive Outlet',
    floor: 'Floor 1',
    inStock: 50,
    deliveryTime: 'Pan-India 2-4 Days Shipping',
    tags: ['Mega Deal', 'Memory Foam', 'Top Seller'],
    isFeatured: true,
    unitOrSizeOptions: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    description: 'High performance lightweight running sneakers engineered with high-density memory foam insoles, breathable flyknit mesh, and shock-absorbing EVA outsoles.',
    highlights: [
      'High-bounce cushioned memory foam footbed',
      'Breathable seamless mesh upper keeps feet dry',
      'Slip-resistant textured EVA grooved sole'
    ]
  },
  {
    id: 'prod-foot-02',
    name: 'Mochi Men Handcrafted Genuine Leather Ethnic Juttis / Mojaris',
    category: 'footwear',
    categoryLabel: "Men's Ethnic Footwear",
    brand: 'Mochi',
    price: 1799,
    originalPrice: 3299,
    discountPercent: 45,
    rating: 4.8,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Mochi Shoes Store',
    floor: 'Floor 1',
    inStock: 22,
    deliveryTime: 'Pan-India 2-3 Days',
    tags: ['Festive Mojari', 'Genuine Leather'],
    unitOrSizeOptions: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    description: 'Artisanal royal tan leather mojari shoes hand-stitched with dabka and thread embroidery. Cushioned heel support prevents bite marks during long wedding ceremonies.',
    highlights: [
      '100% Genuine crust leather with soft lining',
      'Padded insole with arch and heel cushioning',
      'Matches perfectly with kurtas and sherwanis'
    ]
  },
  {
    id: 'prod-foot-03',
    name: 'Woodland Rugged Outdoor Water-Resistant Leather Trekking Boots',
    category: 'footwear',
    categoryLabel: "Outdoor Boots",
    brand: 'Woodland',
    price: 3499,
    originalPrice: 5495,
    discountPercent: 36,
    rating: 4.9,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Woodland Outdoor Store',
    floor: 'Floor 1',
    inStock: 18,
    deliveryTime: 'Pan-India Express Delivery',
    tags: ['Heavy Duty', 'Tough Terrain'],
    unitOrSizeOptions: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    description: 'Iconic camel nubuck leather high-ankle boots designed with deep lugged rubber outsoles for superior grip on rugged terrain and monsoon trails.',
    highlights: [
      'Nubuck leather with water-repellent treatment',
      'Vulcanized deep-tread rubber sole for zero slippage',
      'Padded ankle collar for fatigue-free hiking'
    ]
  },
  {
    id: 'prod-foot-04',
    name: 'Bata Comfit Women Floral Laser-Cut Cushioned Wedge Sandals',
    category: 'footwear',
    categoryLabel: "Women's Footwear",
    brand: 'Bata',
    price: 999,
    originalPrice: 1899,
    discountPercent: 47,
    rating: 4.7,
    reviewsCount: 620,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Bata Family Store',
    floor: 'Floor 1',
    inStock: 35,
    deliveryTime: 'Pan-India 2-4 Days Shipping',
    tags: ['Daily Comfort', 'Orthopedic Cushion'],
    unitOrSizeOptions: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    description: 'Ergonomically designed 2-inch wedge slip-on sandals featuring Comfit memory cushion base and laser-cut breathable strap.',
    highlights: [
      'Anatomically contoured arch support base',
      'Lightweight PU wedge sole with anti-skid bottom',
      'Ideal for teachers, working professionals, and daily market walks'
    ]
  },

  // ==========================================
  // 5. BIHAR HANDLOOM & ARTISAN HERITAGE
  // ==========================================
  {
    id: 'prod-bihar-01',
    name: 'Authentic Bhagalpur Handloom Pure Tussar Silk Saree with Zari Pallu',
    category: 'bihar-craft',
    categoryLabel: 'Made in Bihar Heritage',
    brand: 'Bihar Artisan Guild',
    price: 4599,
    originalPrice: 6999,
    discountPercent: 34,
    rating: 5.0,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1610030469856-7856c80c2f7b?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Made in Bihar Pavilion',
    floor: 'Floor 2',
    inStock: 15,
    deliveryTime: 'Pan-India Insured 2-3 Days • 2-Hour in Lakhisarai',
    tags: ['GI Tagged Origin', 'Silk Mark Certified', 'Artisan Direct'],
    isFeatured: true,
    isBiharSpecial: true,
    description: 'Handwoven in Bhagalpur (Silk City of Bihar) from wild forest tussar cocoons, featuring natural golden sheen and intricate hand-spun temple borders. Handcrafted by rural weavers under Ganesh Singh’s artisan initiative.',
    highlights: [
      '100% Pure Silk Mark Certified Tussar Silk',
      'Handspun organic texture with thermal balancing',
      'Direct revenue goes to traditional rural weaver families',
      'Includes matching unstitched blouse piece (80 cm)'
    ]
  },
  {
    id: 'prod-bihar-02',
    name: 'Handpainted Mithila Madhubani Pure Tussar Silk Dupatta (Peacock & Lotus)',
    category: 'bihar-craft',
    categoryLabel: 'Made in Bihar Art',
    brand: 'Mithila Kala Kendra',
    price: 2499,
    originalPrice: 3999,
    discountPercent: 38,
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Made in Bihar Pavilion',
    floor: 'Floor 2',
    inStock: 20,
    deliveryTime: 'Pan-India 2-4 Days Shipping',
    tags: ['Handpainted Art', 'Natural Vegetable Dyes', 'GI Certified'],
    isFeatured: true,
    isBiharSpecial: true,
    description: 'Magnificent 2.5-meter pure Tussar silk stole handpainted in Jitwarpur, Madhubani using traditional nibs and natural vegetable pigments. Depicts symbolic Mithila wedding peacocks, sun, and lotus motifs.',
    highlights: [
      'Pure organic Tussar silk fabric base (2.5 meters)',
      'Handpainted with nibs by national-award artisan craftswomen',
      'Colors derived from marigold flowers, turmeric, and lamp soot'
    ]
  },
  {
    id: 'prod-bihar-03',
    name: 'Traditional Sikki Grass Handwoven Golden Decorative Storage Box',
    category: 'bihar-craft',
    categoryLabel: 'Made in Bihar Handicrafts',
    brand: 'Sikki Crafts Cooperative',
    price: 799,
    originalPrice: 1299,
    discountPercent: 38,
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Made in Bihar Pavilion',
    floor: 'Floor 2',
    inStock: 30,
    deliveryTime: 'Pan-India 2-4 Days Shipping',
    tags: ['Eco Friendly', 'Golden Grass Craft'],
    isBiharSpecial: true,
    description: 'Hand-braided using wild golden Sikki grass found along the riverbanks of Bihar. Features traditional tribal dye patterns and a snug-fitting lid. Perfect for jewelry, pooja articles, or heritage home decor.',
    highlights: [
      '100% natural, biodegradable wild wetland river grass',
      'Naturally glossy golden sheen that never tarnishes',
      'Supports women self-help craft clusters in rural Bihar'
    ]
  },
  {
    id: 'prod-bihar-04',
    name: 'Framed Madhubani Heritage Canvas Wall Art (Tree of Life 18x24")',
    category: 'bihar-craft',
    categoryLabel: 'Fine Folk Art',
    brand: 'Mithila Kala Kendra',
    price: 1850,
    originalPrice: 2800,
    discountPercent: 34,
    rating: 5.0,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Made in Bihar Pavilion',
    floor: 'Floor 2',
    inStock: 12,
    deliveryTime: 'Pan-India Fragile Insured 3 Days',
    tags: ['Framed Wall Art', 'Spiritual Harmony'],
    isBiharSpecial: true,
    description: 'Authentic Kachni style Madhubani painting depicting the sacred Tree of Life and dancing peacocks, rendered by traditional craftswomen using bamboo nibs and natural vegetable pigments. Framed in elegant matte black frame with glass.',
    highlights: [
      'Size: 18x24 inches on premium handmade cotton paper',
      'Includes shatter-proof acrylic glass and sturdy wall hanging hooks',
      'Certificate of authenticity signed by local folk master'
    ]
  },

  // ==========================================
  // 6. ELECTRONICS & GADGETS
  // ==========================================
  {
    id: 'prod-elec-01',
    name: 'boAt Airdopes 141 ANC True Wireless Earbuds (42H Playtime)',
    category: 'electronics',
    categoryLabel: 'Audio & Wearables',
    brand: 'boAt',
    price: 1399,
    originalPrice: 3990,
    discountPercent: 65,
    rating: 4.8,
    reviewsCount: 3180,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Croma Electronics Hub',
    floor: 'Floor 1',
    inStock: 60,
    deliveryTime: 'Pan-India 2-3 Days • 2-Hour in Lakhisarai',
    tags: ['Active Noise Cancellation', '65% OFF', 'Official Warranty'],
    isFeatured: true,
    unitOrSizeOptions: ['Gunmetal Black', 'Cider Orange', 'Bold Blue'],
    description: '32dB Active Noise Cancellation earbuds with beast mode 50ms low latency for gaming, ENx quad mic technology for crystal calls, and ASAP Charge (10 mins = 150 mins playtime).',
    highlights: [
      'Up to 32dB Active Noise Cancellation (ANC)',
      'Total 42 hours playback with USB Type-C case',
      'IPX5 sweat and splash resistance',
      '1-Year official manufacturer warranty honored pan-India'
    ]
  },
  {
    id: 'prod-elec-02',
    name: 'Noise ColorFit Pulse 3 AMOLED Bluetooth Calling Smartwatch',
    category: 'electronics',
    categoryLabel: 'Wearables & Smartwatches',
    brand: 'Noise',
    price: 1799,
    originalPrice: 4999,
    discountPercent: 64,
    rating: 4.7,
    reviewsCount: 1840,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Croma Electronics Hub',
    floor: 'Floor 1',
    inStock: 42,
    deliveryTime: 'Pan-India 2-3 Days Delivery',
    tags: ['AMOLED Display', 'Bluetooth Calling'],
    unitOrSizeOptions: ['Jet Black Strap', 'Rose Gold Strap', 'Silver Grey Strap'],
    description: '1.96-inch curved AMOLED display with 500 nits brightness, TruSync Bluetooth calling with dialpad, 100+ sports modes, 24/7 SpO2 and heart rate monitor.',
    highlights: [
      '1.96" vivid Always-On AMOLED screen',
      'Crisp single-chip Bluetooth calling with noise reduction',
      '7-day battery life on typical usage',
      '150+ customizable cloud watch faces'
    ]
  },
  {
    id: 'prod-elec-03',
    name: 'JBL Flip 6 Portable Waterproof Bluetooth Speaker with Deep Bass',
    category: 'electronics',
    categoryLabel: 'Audio & Speakers',
    brand: 'JBL',
    price: 8999,
    originalPrice: 13999,
    discountPercent: 36,
    rating: 4.9,
    reviewsCount: 760,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Croma Electronics Hub',
    floor: 'Floor 1',
    inStock: 16,
    deliveryTime: 'Pan-India Express 2 Days',
    tags: ['IP67 Waterproof', 'PartyBoost', 'JBL Original Pro Sound'],
    unitOrSizeOptions: ['Midnight Black', 'Squad Camo', 'Fiery Red'],
    description: '2-way speaker system delivering loud, crystal clear, powerful sound. Race-track shaped woofer delivers exceptional low frequencies and midrange, while a separate tweeter produces crisp high frequencies.',
    highlights: [
      'IP67 waterproof and dustproof design',
      '12 Hours of continuous playtime on a single charge',
      'PartyBoost allows pairing two compatible JBL speakers'
    ]
  },
  {
    id: 'prod-elec-04',
    name: 'Xiaomi 20,000mAh 22.5W Ultra Fast Power Bank 3i (Triple Output)',
    category: 'electronics',
    categoryLabel: 'Mobile Accessories',
    brand: 'Xiaomi',
    price: 1899,
    originalPrice: 2499,
    discountPercent: 24,
    rating: 4.8,
    reviewsCount: 2190,
    image: 'https://images.unsplash.com/photo-1609592426815-51833d7b8cb2?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Croma Electronics Hub',
    floor: 'Floor 1',
    inStock: 55,
    deliveryTime: 'Pan-India 2-3 Days',
    tags: ['22.5W Fast Charge', 'Triple Output'],
    unitOrSizeOptions: ['Sandstone Black', 'Matte Blue'],
    description: 'High-capacity lithium polymer battery pack with 22.5W two-way fast charging. Capable of charging three devices simultaneously with 12 layers of advanced circuit protection.',
    highlights: [
      '20,000mAh high-density Li-Polymer battery',
      'Dual input (Type-C & Micro-USB) and triple output ports',
      'Smart power delivery supports phones, tablets, and smartwatches'
    ]
  },

  // ==========================================
  // 7. HOME & LIVING
  // ==========================================
  {
    id: 'prod-home-01',
    name: 'Bombay Dyeing 100% Pure Cotton 300 TC Double Bedsheet with 2 Pillow Covers',
    category: 'home-living',
    categoryLabel: 'Home Furnishings',
    brand: 'Bombay Dyeing',
    price: 1499,
    originalPrice: 2999,
    discountPercent: 50,
    rating: 4.8,
    reviewsCount: 540,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Living Pavilion',
    floor: 'Floor 2',
    inStock: 35,
    deliveryTime: 'Pan-India 2-4 Days Shipping',
    tags: ['100% Combed Cotton', '300 Thread Count', '50% OFF'],
    isFeatured: true,
    unitOrSizeOptions: ['King Size (108x108 in)', 'Queen Size (90x100 in)'],
    description: 'Luxuriously soft sateen weave cotton double bedsheet designed with traditional Mughal jaal motifs. Breathable, hypoallergenic, and colorfast even after 50+ machine washes.',
    highlights: [
      '100% long-staple combed cotton with 300 Thread Count',
      'Breathable, moisture-absorbent for Indian weather',
      'Includes 2 matching zippered standard pillow covers'
    ]
  },
  {
    id: 'prod-home-02',
    name: 'Brass Handcrafted Peacock Traditional Akhand Pooja Diya Lamp (12 Inches)',
    category: 'home-living',
    categoryLabel: 'Pooja & Festive Decor',
    brand: 'Lakhisarai Brass Artisans',
    price: 1299,
    originalPrice: 2199,
    discountPercent: 41,
    rating: 4.9,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Made in Bihar Pavilion',
    floor: 'Floor 2',
    inStock: 25,
    deliveryTime: 'Pan-India 2-3 Days Delivery',
    tags: ['Pure Brass', 'Diwali & Chhath Special'],
    description: 'Heavy gauge 100% solid virgin brass traditional oil diya crowned with a majestic sculpted peacock. Ideal for temple rooms, Diwali, Chhath Puja, and housewarming ceremonies.',
    highlights: [
      'Solid virgin cast brass with lacquer anti-tarnish finish',
      'Deep oil reservoir provides up to 18 hours of steady burning',
      'Heavy weighted circular base prevents accidental tipping'
    ]
  },
  {
    id: 'prod-home-03',
    name: 'Borosil 20-Piece Ethnic Opalware Break-Resistant Dinner Set',
    category: 'home-living',
    categoryLabel: 'Kitchen & Dining',
    brand: 'Borosil',
    price: 1999,
    originalPrice: 3490,
    discountPercent: 43,
    rating: 4.7,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Living Pavilion',
    floor: 'Floor 2',
    inStock: 20,
    deliveryTime: 'Pan-India Fragile Insured 3 Days',
    tags: ['Microwave Safe', 'Break Resistant'],
    description: '100% bone-ash free toughened opal glass dinner set adorned with gold rim ethnic patterns. Scratch resistant, microwave and dishwasher safe for daily dining.',
    highlights: [
      '100% Vegetarian (Bone ash free) opal glass',
      'Thermal shock resistant: can go straight into microwave',
      'Complete set: 6 full plates, 6 quarter plates, 6 veg bowls, 2 serving bowls'
    ]
  },

  // ==========================================
  // 8. BEAUTY & GROOMING
  // ==========================================
  {
    id: 'prod-beau-01',
    name: 'Kama Ayurveda Pure Kannauj Rose Water Facial Toner (200ml)',
    category: 'beauty',
    categoryLabel: 'Ayurvedic Skincare',
    brand: 'Kama Ayurveda',
    price: 1150,
    originalPrice: 1450,
    discountPercent: 21,
    rating: 4.9,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1608248597359-2917e8c33973?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Beauty Boutique',
    floor: 'Floor 1',
    inStock: 40,
    deliveryTime: 'Pan-India 2-3 Days Shipping',
    tags: ['100% Pure Steam Distilled', 'Cult Favorite'],
    isFeatured: true,
    description: 'Pure, steam-distilled water from Kannauj Taruni roses. Balances skin pH, minimizes enlarged pores, and delivers soothing hydration in hot Indian climates.',
    highlights: [
      'Zero alcohol, zero added chemicals or synthetic perfumes',
      'Naturally cooling and refreshing mist dispenser',
      'Suitable for all skin types, including sensitive acne-prone skin'
    ]
  },
  {
    id: 'prod-beau-02',
    name: 'Forest Essentials Soundarya Radiance 24K Gold Night Cream (50g)',
    category: 'beauty',
    categoryLabel: 'Luxury Skincare',
    brand: 'Forest Essentials',
    price: 3499,
    originalPrice: 4800,
    discountPercent: 27,
    rating: 4.8,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Beauty Boutique',
    floor: 'Floor 1',
    inStock: 18,
    deliveryTime: 'Pan-India Express 2 Days',
    tags: ['24K Bhasma', 'Anti-Ageing'],
    description: 'Infused with real 24 Karat gold bhasma, saffron, cold-pressed almond oil, and sandalwood to stimulate natural collagen regeneration and restore radiant skin glow.',
    highlights: [
      'Pure Ayurvedic formulation with 24K gold ash and Kashmiri saffron',
      'Firms skin texture and smoothens fine lines overnight',
      'Dermatologically tested and eco-certified'
    ]
  },
  {
    id: 'prod-beau-03',
    name: 'Beardo Godfather Beard Growth Oil & Wash Grooming Kit for Men',
    category: 'beauty',
    categoryLabel: "Men's Grooming",
    brand: 'Beardo',
    price: 699,
    originalPrice: 1250,
    discountPercent: 44,
    rating: 4.6,
    reviewsCount: 710,
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Smart Beauty Boutique',
    floor: 'Floor 1',
    inStock: 45,
    deliveryTime: 'Pan-India 2-3 Days Delivery',
    tags: ['Beard Growth', 'Almond & Argan Oil'],
    description: 'Comprehensive men’s grooming kit containing Godfather growth oil enriched with mineral oils, almond, and argan oil, paired with refreshing beard shampoo.',
    highlights: [
      'Nourishes root follicles for dense and even beard growth',
      'Eliminates beard itch, flakes, and rough texture',
      'Distinctive woody masculine fragrance'
    ]
  },

  // ==========================================
  // 9. REGIONAL DELICACIES & NUTRITION
  // ==========================================
  {
    id: 'prod-deli-01',
    name: 'Famous Barahiya Desi Ghee Kasar & Tilkut Traditional Sweets (1 Kg)',
    category: 'delicacies',
    categoryLabel: 'Authentic Bihar Sweets',
    brand: 'Taste of Barahiya',
    price: 480,
    originalPrice: 650,
    discountPercent: 26,
    rating: 5.0,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Taste of Bihar Pavilion',
    floor: 'Floor 3',
    inStock: 45,
    deliveryTime: 'Pan-India Vacuum Packed 2-3 Days • Same Day in Lakhisarai',
    tags: ['100% Pure Desi Ghee', 'Barahiya GI Heritage', 'Zero Preservatives'],
    isFeatured: true,
    isBiharSpecial: true,
    description: 'Renowned world-over from Barahiya (Lakhisarai). Handcrafted from roasted wheat semolina, coarse organic jaggery, cardamom seeds, and 100% pure desi cow ghee. Packed in airtight food-grade tin containers.',
    highlights: [
      'Made fresh daily using traditional iron kadhais in Barahiya',
      'Zero artificial flavors, chemicals, or refined sugars',
      'Vacuum sealed for 60-day crisp shelf life pan-India'
    ]
  },
  {
    id: 'prod-deli-02',
    name: 'Premium Mithila GI-Tagged Organic Jumbo Phool Makhana / Foxnuts (500g)',
    category: 'delicacies',
    categoryLabel: 'Bihar Superfood',
    brand: 'Mithila Makhana Farmers FPO',
    price: 549,
    originalPrice: 850,
    discountPercent: 35,
    rating: 4.9,
    reviewsCount: 680,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Made in Bihar Pavilion',
    floor: 'Floor 2',
    inStock: 60,
    deliveryTime: 'Pan-India 2-3 Days Shipping',
    tags: ['GI Tagged', 'Superfood', 'High Protein'],
    isFeatured: true,
    isBiharSpecial: true,
    description: 'Directly sourced from lotus wetlands of North Bihar. Extra-large 6+ caliber fluffy white foxnuts rich in magnesium, potassium, and plant protein. Perfect for healthy guilt-free evening snacking or fasting dishes.',
    highlights: [
      'GI-tagged Grade-A Jumbo 6+ caliber seeds',
      'Rich in calcium, antioxidants, and low glycemic index',
      'Direct farm-gate sourcing supports wetland farmers'
    ]
  },
  {
    id: 'prod-deli-03',
    name: 'Authentic Bhagalpur Katarni Flaked Rice (Chooda) - Aromatic GI Heritage (1 Kg)',
    category: 'delicacies',
    categoryLabel: 'Heritage Grains',
    brand: 'Angika Heritage Foods',
    price: 260,
    originalPrice: 380,
    discountPercent: 32,
    rating: 4.8,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Taste of Bihar Pavilion',
    floor: 'Floor 3',
    inStock: 50,
    deliveryTime: 'Pan-India 2-4 Days Delivery',
    tags: ['GI Tagged Rice', 'Naturally Aromatic'],
    isBiharSpecial: true,
    description: 'Renowned GI-tagged Katarni rice pounded into thin, crisp, naturally fragrant chooda. Famous throughout Bihar for breakfast with curd and jaggery or lightly roasted with mustard oil.',
    highlights: [
      'Naturally scented heritage paddy cultivated only in South Bihar',
      'Crisp texture that absorbs curd and spices without turning mushy',
      'Airtight resealable moisture-proof pouch'
    ]
  },
  {
    id: 'prod-deli-04',
    name: 'Muzaffarpur Pure Raw Shahi Litchi Forest Honey (500g Glass Jar)',
    category: 'delicacies',
    categoryLabel: 'Pure Natural Honey',
    brand: 'Bihar Apiary Board',
    price: 380,
    originalPrice: 550,
    discountPercent: 31,
    rating: 5.0,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    storeOrigin: 'Taste of Bihar Pavilion',
    floor: 'Floor 3',
    inStock: 35,
    deliveryTime: 'Pan-India 2-3 Days Shipping',
    tags: ['100% Raw Unpasteurized', 'Litchi Blossom Flavor'],
    isBiharSpecial: true,
    description: 'Monofloral raw honey harvested exclusively during spring blossoms in Muzaffarpur Shahi litchi orchards. Unfiltered, unheated, with subtle floral notes of ripe litchis.',
    highlights: [
      'NMR tested for 100% purity and zero sugar adulteration',
      'Retains natural pollen, enzymes, and therapeutic bee propolis',
      'Packaged in reusable heavy glass hexagonal bottle'
    ]
  }
];

// Initial pre-seeded orders for the current user's personal view
export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'SB-ORD-94812',
    orderDate: 'Today at 10:45 AM',
    items: [
      {
        productId: 'prod-deli-01',
        name: 'Famous Barahiya Desi Ghee Kasar & Tilkut Traditional Sweets (1 Kg)',
        price: 480,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
        storeOrigin: 'Taste of Bihar Pavilion'
      },
      {
        productId: 'prod-elec-01',
        name: 'boAt Airdopes 141 ANC True Wireless Earbuds (42H Playtime)',
        price: 1399,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
        storeOrigin: 'Croma Electronics Hub',
        selectedOption: 'Gunmetal Black'
      }
    ],
    subtotal: 1879,
    discount: 100,
    deliveryFee: 0,
    totalAmount: 1779,
    status: 'out_for_delivery',
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    deliveryAddress: {
      fullName: 'Ganesh Singh',
      phone: '+91 62044 12345',
      addressLine: 'Executive Suite #502, NH-80 Main Road',
      landmark: 'Near Lakhisarai District Court',
      city: 'Lakhisarai',
      pincode: '811311',
      deliveryMode: 'home-delivery'
    },
    estimatedDelivery: 'Today by 1:30 PM (Dispatched via Express Courier)',
    trackingSteps: [
      {
        title: 'Order Confirmed & Payment Verified',
        time: '10:45 AM',
        completed: true,
        description: 'Payment of ₹1,779 received via UPI (SB-PAY-6204)'
      },
      {
        title: 'Items Picked & Packed at Hub',
        time: '11:15 AM',
        completed: true,
        description: 'Dispatched with tracking ID BLUEDART-992140'
      },
      {
        title: 'Out for Delivery',
        time: '11:55 AM',
        completed: true,
        current: true,
        description: 'Courier partner is out for doorstep delivery'
      },
      {
        title: 'Delivered to Doorstep',
        time: 'Expected 1:30 PM',
        completed: false,
        description: 'Package will be handed over with OTP verification'
      }
    ]
  },
  {
    id: 'SB-ORD-88241',
    orderDate: 'Yesterday at 4:10 PM',
    items: [
      {
        productId: 'prod-bihar-01',
        name: 'Authentic Bhagalpur Handloom Pure Tussar Silk Saree with Zari Pallu',
        price: 4599,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469856-7856c80c2f7b?auto=format&fit=crop&w=800&q=80',
        storeOrigin: 'Made in Bihar Pavilion'
      }
    ],
    subtotal: 4599,
    discount: 500,
    deliveryFee: 0,
    totalAmount: 4099,
    status: 'delivered',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    deliveryAddress: {
      fullName: 'Ganesh Singh',
      phone: '+91 62044 12345',
      addressLine: 'Station Road, Near Kiul Junction',
      landmark: 'Opposite Kiul Rail Colony',
      city: 'Lakhisarai',
      pincode: '811310',
      deliveryMode: 'home-delivery'
    },
    estimatedDelivery: 'Delivered Yesterday at 6:25 PM',
    trackingSteps: [
      { title: 'Order Confirmed', time: 'Yesterday 4:10 PM', completed: true },
      { title: 'Packed at Bihar Handloom Pavilion', time: 'Yesterday 4:40 PM', completed: true },
      { title: 'Dispatched with Safe Handling', time: 'Yesterday 5:15 PM', completed: true },
      { title: 'Delivered Successfully to Customer', time: 'Yesterday 6:25 PM', completed: true }
    ]
  }
];

// Single customer profile (Private to current session)
export const DEFAULT_USER: UserProfile = {
  id: 'usr-customer-62044',
  name: 'Ganesh Singh',
  email: 'ganeshsingh62044@gmail.com',
  phone: '+91 62044 12345',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  memberTier: 'Platinum',
  points: 1250,
  bio: 'Patron and frequent shopper at Smart Bazzar. Enjoys Bhagalpur handloom, Croma electronics, and regional Bihar crafts.',
  dateOfBirth: '15 Aug 1986',
  occupation: 'Business & Agriculture Enterpriser',
  emergencyContact: '+91 94312 00000 (Family Emergency)',
  kycStatus: 'verified',
  documents: [
    {
      id: 'doc-gs-01',
      type: 'aadhaar',
      typeName: 'Aadhaar Card (UIDAI)',
      documentNumber: 'XXXX-XXXX-8921',
      fullName: 'Ganesh Singh',
      issueDate: '12 May 2012',
      expiryDate: 'Lifetime (UIDAI)',
      status: 'verified',
      notes: 'Biometrically verified via UIDAI e-KYC',
      uploadedAt: 'Verified 2024'
    },
    {
      id: 'doc-gs-02',
      type: 'pan',
      typeName: 'Permanent Account Number (PAN)',
      documentNumber: 'ABCPS1234F',
      fullName: 'Ganesh Singh',
      issueDate: '08 Mar 2008',
      expiryDate: 'Lifetime',
      status: 'verified',
      notes: 'Income Tax Department Government of India Verified',
      uploadedAt: 'Verified 2024'
    },
    {
      id: 'doc-gs-03',
      type: 'gstin',
      typeName: 'Commercial GSTIN Registration',
      documentNumber: '10ABCDE1234F1Z5',
      fullName: 'Smart Enterprises / Ganesh Singh',
      issueDate: '01 Jul 2017',
      expiryDate: 'Active Regular',
      status: 'active',
      notes: 'State: 10 - Bihar, Commercial Mall Unit',
      uploadedAt: 'Updated Jan 2025'
    },
    {
      id: 'doc-gs-04',
      type: 'smart_card',
      typeName: 'Smart Bazzar VIP Platinum Card',
      documentNumber: 'SB-VIP-PLT-001',
      fullName: 'Ganesh Singh',
      issueDate: '01 Jan 2025',
      expiryDate: '31 Dec 2030',
      status: 'active',
      notes: 'Priority 90-min delivery, Valet parking, VIP lounge access',
      uploadedAt: 'Issued Jan 2025'
    }
  ],
  savedAddresses: [
    {
      fullName: 'Ganesh Singh',
      phone: '+91 62044 12345',
      addressLine: 'Executive Suite #502, NH-80 Main Road',
      landmark: 'Near Lakhisarai District Court',
      city: 'Lakhisarai',
      pincode: '811311',
      deliveryMode: 'home-delivery'
    },
    {
      fullName: 'Ganesh Singh',
      phone: '+91 62044 12345',
      addressLine: 'Station Road, Near Kiul Junction Flyover',
      landmark: 'Railway Colony',
      city: 'Lakhisarai',
      pincode: '811310',
      deliveryMode: 'home-delivery'
    }
  ]
};

// Second sample customer profile for testing account isolation
export const PRIYA_USER: UserProfile = {
  id: 'usr-customer-94312',
  name: 'Priya Sharma',
  email: 'priyasharma.bihar@gmail.com',
  phone: '+91 94312 88990',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  memberTier: 'Gold',
  points: 580,
  bio: 'Patron of ethnic wear, designer kids dresses, and authentic Bhagalpur silk.',
  dateOfBirth: '24 Apr 1994',
  occupation: 'Education & Design Consultant',
  emergencyContact: '+91 98350 11223 (Emergency)',
  kycStatus: 'verified',
  documents: [
    {
      id: 'doc-ps-01',
      type: 'aadhaar',
      typeName: 'Aadhaar Card (UIDAI)',
      documentNumber: 'XXXX-XXXX-4491',
      fullName: 'Priya Sharma',
      issueDate: '19 Oct 2015',
      expiryDate: 'Lifetime (UIDAI)',
      status: 'verified',
      notes: 'Biometrically verified via UIDAI e-KYC',
      uploadedAt: 'Verified 2024'
    },
    {
      id: 'doc-ps-02',
      type: 'smart_card',
      typeName: 'Smart Bazzar Gold Privilege Card',
      documentNumber: 'SB-GOLD-88990',
      fullName: 'Priya Sharma',
      issueDate: '10 Feb 2024',
      expiryDate: '31 Dec 2027',
      status: 'active',
      notes: 'Gold member: 5% extra cashback on ethnic apparel and free express shipping',
      uploadedAt: 'Issued Feb 2024'
    }
  ],
  savedAddresses: [
    {
      fullName: 'Priya Sharma',
      phone: '+91 94312 88990',
      addressLine: 'House #42, Road No. 3, Kankarbagh',
      landmark: 'Near Colony Park',
      city: 'Patna',
      pincode: '800020',
      deliveryMode: 'home-delivery'
    }
  ]
};

export const PRIYA_ORDERS: CustomerOrder[] = [
  {
    id: 'SB-ORD-77102',
    orderDate: '2 days ago',
    items: [
      {
        productId: 'prod-women-01',
        name: 'Biba Festive Anarkali Kurta Set with Chiffon Dupatta',
        price: 2799,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        storeOrigin: 'Biba & Aurelia Boutique',
        selectedOption: 'M (38)'
      }
    ],
    subtotal: 2799,
    discount: 300,
    deliveryFee: 0,
    totalAmount: 2499,
    status: 'delivered',
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    deliveryAddress: {
      fullName: 'Priya Sharma',
      phone: '+91 94312 88990',
      addressLine: 'House #42, Road No. 3, Kankarbagh',
      landmark: 'Near Colony Park',
      city: 'Patna',
      pincode: '800020',
      deliveryMode: 'home-delivery'
    },
    estimatedDelivery: 'Delivered 2 days ago',
    trackingSteps: [
      { title: 'Order Confirmed', time: '2 days ago 11:00 AM', completed: true },
      { title: 'Dispatched via BlueDart Express', time: '2 days ago 2:00 PM', completed: true },
      { title: 'Delivered to Doorstep', time: 'Yesterday 3:30 PM', completed: true }
    ]
  }
];

export const PRESET_CUSTOMERS = [
  {
    user: DEFAULT_USER,
    orders: INITIAL_ORDERS,
    label: 'Ganesh Singh (+91 62044 12345)',
    description: 'Platinum Tier • Lakhisarai'
  },
  {
    user: PRIYA_USER,
    orders: PRIYA_ORDERS,
    label: 'Priya Sharma (+91 94312 88990)',
    description: 'Gold Tier • Patna'
  }
];

