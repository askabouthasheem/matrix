export interface School {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  emailDomain: string;
  activeSellersCount: number;
  logo: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  banner: string;
  schoolShortName: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  totalSales: number;
  trustScore: number;
  responseTime: string;
  whatsappCatalogUrl: string;
  ownerName: string;
  ownerEmail: string;
  joinedDate: string;
}

export interface Listing {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  type: 'PRODUCT' | 'SERVICE' | 'TRAINING';
  categoryId: string;
  categoryName: string;
  schoolId: string;
  schoolShortName: string;
  brandId: string;
  brandName: string;
  brandLogo: string;
  brandTrustScore: number;
  brandResponseTime: string;
  images: string[];
  stock: number;
  isAvailableToday: boolean;
  isFeatured: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'MODERATION';
  views: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerName: string;
  buyerEmail: string;
  buyerSchool: string;
  sellerName: string;
  brandName: string;
  listingTitle: string;
  listingImage: string;
  listingType: 'PRODUCT' | 'SERVICE' | 'TRAINING';
  quantity: number;
  amount: number;
  escrowStatus: 'HELD_IN_ESCROW' | 'RELEASED_TO_SELLER' | 'REFUNDED' | 'PENDING';
  fulfillmentType: 'PICKUP' | 'DELIVERY';
  deliveryLocation: string;
  status: 'PENDING' | 'CONFIRMED' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED';
  paymentRef: string;
  paymentProvider: 'Paystack' | 'Flutterwave';
  createdAt: string;
}

export interface Review {
  id: string;
  listingId: string;
  listingTitle: string;
  buyerName: string;
  buyerAvatar: string;
  buyerSchool: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  attachmentUrl?: string;
}

export interface Conversation {
  id: string;
  otherPartyName: string;
  otherPartyAvatar: string;
  otherPartyRole: 'SELLER' | 'BUYER';
  brandName?: string;
  listingTitle?: string;
  listingPrice?: number;
  listingImage?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface SellerApplication {
  id: string;
  applicantName: string;
  email: string;
  schoolName: string;
  schoolShortName: string;
  storeName: string;
  category: string;
  studentIdCardUrl: string;
  businessDescription: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
}

export const SCHOOLS: School[] = [
  {
    id: "sch_unilag",
    name: "University of Lagos",
    shortName: "UNILAG",
    city: "Akoka, Lagos",
    state: "Lagos",
    emailDomain: "unilag.edu.ng",
    activeSellersCount: 342,
    logo: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "sch_lasu",
    name: "Lagos State University",
    shortName: "LASU",
    city: "Ojo, Lagos",
    state: "Lagos",
    emailDomain: "lasu.edu.ng",
    activeSellersCount: 218,
    logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "sch_ui",
    name: "University of Ibadan",
    shortName: "UI",
    city: "Ibadan",
    state: "Oyo",
    emailDomain: "ui.edu.ng",
    activeSellersCount: 185,
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "sch_uniosun",
    name: "Osun State University",
    shortName: "UNIOSUN",
    city: "Osogbo",
    state: "Osun",
    emailDomain: "uniosun.edu.ng",
    activeSellersCount: 94,
    logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "sch_fountain",
    name: "Fountain University",
    shortName: "FOUNTAIN",
    city: "Osogbo",
    state: "Osun",
    emailDomain: "fountain.edu.ng",
    activeSellersCount: 62,
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&auto=format&fit=crop&q=80"
  }
];

export const CATEGORIES: Category[] = [
  {
    id: "cat_tech",
    name: "Gadgets & Tech",
    slug: "gadgets-tech",
    icon: "Smartphone",
    description: "Phones, powerbanks, airpods, chargers & laptops"
  },
  {
    id: "cat_fashion",
    name: "Fashion & Thrift",
    slug: "fashion-thrift",
    icon: "Shirt",
    description: "Campus drip, Senegalese wear, sneakers & vintage finds"
  },
  {
    id: "cat_beauty",
    name: "Beauty & Hair",
    slug: "beauty-hair",
    icon: "Sparkles",
    description: "Braid installs, skincare, wigs, lashes & perfumes"
  },
  {
    id: "cat_food",
    name: "Food & Pastries",
    slug: "food-pastries",
    icon: "Utensils",
    description: "Hostel parfait, small chops, cakes & fresh meal prep"
  },
  {
    id: "cat_services",
    name: "Campus Services",
    slug: "campus-services",
    icon: "Briefcase",
    description: "Graphics design, video editing, laundry & tech help"
  },
  {
    id: "cat_trainings",
    name: "Trainings & Skills",
    slug: "trainings-skills",
    icon: "GraduationCap",
    description: "UI/UX, Coding, Hair braiding & Forex bootcamps"
  },
  {
    id: "cat_hostel",
    name: "Hostel Essentials",
    slug: "hostel-essentials",
    icon: "Home",
    description: "Rechargeable fans, mirrors, lamps & bedding"
  }
];

export const BRANDS: Brand[] = [
  {
    id: "brand_tobi_tech",
    name: "Tobi Tech Hub",
    slug: "tobi-tech-hub",
    description: "Verified campus laptop & powerbank plug. Guaranteed warranty on all UK-used MacBooks and original Anker powerbanks. Pickup at Moremi Hall or Faculty of Science.",
    logo: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200&auto=format&fit=crop&q=80",
    schoolShortName: "UNILAG",
    isVerified: true,
    rating: 4.9,
    reviewCount: 48,
    totalSales: 132,
    trustScore: 98,
    responseTime: "< 10 mins",
    whatsappCatalogUrl: "https://wa.me/2348123456789",
    ownerName: "Tobi Adebayo",
    ownerEmail: "tobi.adebayo@unilag.edu.ng",
    joinedDate: "October 2025"
  },
  {
    id: "brand_amina_glam",
    name: "Amina Glam & Braids",
    slug: "amina-glam-braids",
    description: "Professional knotless braids, bohemian braids & wig revamps in UNILAG. Hostel home service available! Book your session before exams.",
    logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&auto=format&fit=crop&q=80",
    schoolShortName: "UNILAG",
    isVerified: true,
    rating: 4.95,
    reviewCount: 64,
    totalSales: 189,
    trustScore: 99,
    responseTime: "< 5 mins",
    whatsappCatalogUrl: "https://wa.me/2348198765432",
    ownerName: "Amina Bello",
    ownerEmail: "amina.bello@unilag.edu.ng",
    joinedDate: "August 2025"
  },
  {
    id: "brand_deji_kicks",
    name: "Deji Kicks & Thrift",
    slug: "deji-kicks-thrift",
    description: "First-grade vintage tees, Nike Air Forces, Dunks & varsity jackets for LASU trendsetters. Same-day delivery across Ojo campus!",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&auto=format&fit=crop&q=80",
    schoolShortName: "LASU",
    isVerified: true,
    rating: 4.8,
    reviewCount: 37,
    totalSales: 94,
    trustScore: 96,
    responseTime: "< 15 mins",
    whatsappCatalogUrl: "https://wa.me/2348033334444",
    ownerName: "Deji Okafor",
    ownerEmail: "deji.okafor@lasu.edu.ng",
    joinedDate: "November 2025"
  },
  {
    id: "brand_tasty_bites",
    name: "TastyBites UNILAG",
    slug: "tastybites-unilag",
    description: "Creamy layered Fruit Parfait, Small Chops packages, and fresh Chilled Zobo. Delivered straight to your faculty or hall of residence!",
    logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=80",
    schoolShortName: "UNILAG",
    isVerified: true,
    rating: 4.9,
    reviewCount: 82,
    totalSales: 310,
    trustScore: 99,
    responseTime: "< 5 mins",
    whatsappCatalogUrl: "https://wa.me/2348055556666",
    ownerName: "Blessing Eze",
    ownerEmail: "blessing.eze@unilag.edu.ng",
    joinedDate: "July 2025"
  },
  {
    id: "brand_oluwa_pixels",
    name: "OluwaPixels Studio",
    slug: "oluwapixels-studio",
    description: "UI Ibadan's premiere campus photographer & graphics wizard. Graduation shoots, birthday portraits, event banners & flyer design.",
    logo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80",
    schoolShortName: "UI",
    isVerified: true,
    rating: 4.88,
    reviewCount: 29,
    totalSales: 76,
    trustScore: 97,
    responseTime: "< 20 mins",
    whatsappCatalogUrl: "https://wa.me/2348077778888",
    ownerName: "Oluwaseun Alabi",
    ownerEmail: "seun.alabi@ui.edu.ng",
    joinedDate: "January 2026"
  }
];

export const LISTINGS: Listing[] = [
  {
    id: "list_1",
    title: "Anker 20,000mAh PowerCore 22.5W Fast Power Bank (Original)",
    slug: "anker-20000mah-fast-power-bank",
    description: "Brand new Anker 20,000mAh Power Bank with 22.5W fast charging output. Can charge an iPhone 14 up to 4.5 times or a Samsung S23 3.8 times. Essential for lightouts in hostel! Comes with 6 months warranty. Pickup at UNILAG Faculty of Engineering or Moremi Car Park.",
    price: 24500,
    originalPrice: 29000,
    type: "PRODUCT",
    categoryId: "cat_tech",
    categoryName: "Gadgets & Tech",
    schoolId: "sch_unilag",
    schoolShortName: "UNILAG",
    brandId: "brand_tobi_tech",
    brandName: "Tobi Tech Hub",
    brandLogo: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&auto=format&fit=crop&q=80",
    brandTrustScore: 98,
    brandResponseTime: "< 10 mins",
    images: [
      "https://images.unsplash.com/photo-1609592424074-12ee49ef7ee2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 14,
    isAvailableToday: true,
    isFeatured: true,
    status: "ACTIVE",
    views: 420,
    rating: 4.9,
    reviewCount: 22,
    createdAt: "2026-02-10T10:00:00Z"
  },
  {
    id: "list_2",
    title: "Knotless French Curl Braids (Full Hair + Extensions Included)",
    slug: "knotless-french-curl-braids",
    description: "Get flawless French Curl Knotless Braids done by an experienced campus stylist! Service includes hair washing, blow-drying, premium extensions (any color of your choice), and edge styling. Takes approx 3.5 hours. Hostel room service available inside UNILAG campus.",
    price: 18000,
    originalPrice: 22000,
    type: "SERVICE",
    categoryId: "cat_beauty",
    categoryName: "Beauty & Hair",
    schoolId: "sch_unilag",
    schoolShortName: "UNILAG",
    brandId: "brand_amina_glam",
    brandName: "Amina Glam & Braids",
    brandLogo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    brandTrustScore: 99,
    brandResponseTime: "< 5 mins",
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 5,
    isAvailableToday: true,
    isFeatured: true,
    status: "ACTIVE",
    views: 890,
    rating: 5.0,
    reviewCount: 41,
    createdAt: "2026-02-12T14:30:00Z"
  },
  {
    id: "list_3",
    title: "Vintage Oversized Nike Varsity Jacket (Grade 1 Thrift)",
    slug: "vintage-nike-varsity-jacket",
    description: "Pure Grade 1 UK Thrift vintage leather-sleeved varsity jacket. Deep navy blue with white leather trim. Fits size M to XL comfortably. Clean condition 9.5/10. Available for immediate pickup at LASU Main Gate or Faculty of Arts.",
    price: 16500,
    originalPrice: 20000,
    type: "PRODUCT",
    categoryId: "cat_fashion",
    categoryName: "Fashion & Thrift",
    schoolId: "sch_lasu",
    schoolShortName: "LASU",
    brandId: "brand_deji_kicks",
    brandName: "Deji Kicks & Thrift",
    brandLogo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    brandTrustScore: 96,
    brandResponseTime: "< 15 mins",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 2,
    isAvailableToday: true,
    isFeatured: true,
    status: "ACTIVE",
    views: 310,
    rating: 4.8,
    reviewCount: 15,
    createdAt: "2026-02-14T09:15:00Z"
  },
  {
    id: "list_4",
    title: "Jumbo Greek Yogurt Fruit Parfait (500ml with Granola & Honey)",
    slug: "jumbo-greek-yogurt-fruit-parfait",
    description: "Rich, thick, unsweetened Greek Yogurt layered with fresh strawberries, red grapes, kiwi, crunchy homemade granola, and organic honey drizzle. Prepared fresh every morning! Chilled delivery to all UNILAG hostels & faculties.",
    price: 3500,
    originalPrice: 4000,
    type: "PRODUCT",
    categoryId: "cat_food",
    categoryName: "Food & Pastries",
    schoolId: "sch_unilag",
    schoolShortName: "UNILAG",
    brandId: "brand_tasty_bites",
    brandName: "TastyBites UNILAG",
    brandLogo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&auto=format&fit=crop&q=80",
    brandTrustScore: 99,
    brandResponseTime: "< 5 mins",
    images: [
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 25,
    isAvailableToday: true,
    isFeatured: false,
    status: "ACTIVE",
    views: 1250,
    rating: 4.9,
    reviewCount: 56,
    createdAt: "2026-02-15T07:00:00Z"
  },
  {
    id: "list_5",
    title: "Apple MacBook Pro 13\" (M1 Chip, 8GB RAM, 256GB SSD) - UK Used",
    slug: "apple-macbook-pro-13-m1",
    description: "Direct UK-used Apple MacBook Pro M1 2020. Space Gray, 92% battery health, crisp TrueTone Retina display, TouchBar working 100%. Ideal for computer science students, video editors, and tech founders. Includes original 61W USB-C charger and laptop sleeve. Tested with 30-day money back guarantee!",
    price: 520000,
    originalPrice: 580000,
    type: "PRODUCT",
    categoryId: "cat_tech",
    categoryName: "Gadgets & Tech",
    schoolId: "sch_unilag",
    schoolShortName: "UNILAG",
    brandId: "brand_tobi_tech",
    brandName: "Tobi Tech Hub",
    brandLogo: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&auto=format&fit=crop&q=80",
    brandTrustScore: 98,
    brandResponseTime: "< 10 mins",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 3,
    isAvailableToday: true,
    isFeatured: true,
    status: "ACTIVE",
    views: 1450,
    rating: 5.0,
    reviewCount: 18,
    createdAt: "2026-02-01T11:00:00Z"
  },
  {
    id: "list_6",
    title: "4-Week Practical UI/UX Design Bootcamp (Figma to Portfolio)",
    slug: "ui-ux-design-bootcamp-uniosun",
    description: "Intensive 4-week hybrid training taught by an active product designer. Learn Figma, Wireframing, UX Research, Prototyping & Design Systems. Graduate with 2 real-world portfolio case studies and certificate. Weekend live sessions + daily Slack mentorship.",
    price: 15000,
    originalPrice: 25000,
    type: "TRAINING",
    categoryId: "cat_trainings",
    categoryName: "Trainings & Skills",
    schoolId: "sch_uniosun",
    schoolShortName: "UNIOSUN",
    brandId: "brand_oluwa_pixels",
    brandName: "OluwaPixels Studio",
    brandLogo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    brandTrustScore: 97,
    brandResponseTime: "< 20 mins",
    images: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 15,
    isAvailableToday: false,
    isFeatured: true,
    status: "ACTIVE",
    views: 640,
    rating: 4.85,
    reviewCount: 12,
    createdAt: "2026-02-05T16:00:00Z"
  },
  {
    id: "list_7",
    title: "Rechargeable Solar Fan with LED Light & Phone Charger (Hostel Spec)",
    slug: "rechargeable-solar-fan-hostel",
    description: "12-inch 3-speed quiet solar rechargeable fan. Lasts 9 to 14 hours on low speed. Has built-in bright LED lamp and USB port to charge phones during overnight lightouts. A must-have for all UNILAG & UI hostel residents!",
    price: 22000,
    originalPrice: 26000,
    type: "PRODUCT",
    categoryId: "cat_hostel",
    categoryName: "Hostel Essentials",
    schoolId: "sch_ui",
    schoolShortName: "UI",
    brandId: "brand_tobi_tech",
    brandName: "Tobi Tech Hub",
    brandLogo: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&auto=format&fit=crop&q=80",
    brandTrustScore: 98,
    brandResponseTime: "< 10 mins",
    images: [
      "https://images.unsplash.com/photo-1618941723380-4591a2992923?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1585336261026-8f5786372969?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 8,
    isAvailableToday: true,
    isFeatured: false,
    status: "ACTIVE",
    views: 520,
    rating: 4.7,
    reviewCount: 19,
    createdAt: "2026-02-08T12:00:00Z"
  },
  {
    id: "list_8",
    title: "Campus Graduation & Birthday Portrait Photography Session",
    slug: "campus-portrait-photography-session",
    description: "1-hour creative outdoor or hostel portrait photography session across UI Ibadan campus. Includes 10 professionally retouched high-resolution digital images, express 48-hour delivery, and free short video reel for Instagram/TikTok.",
    price: 25000,
    originalPrice: 35000,
    type: "SERVICE",
    categoryId: "cat_services",
    categoryName: "Campus Services",
    schoolId: "sch_ui",
    schoolShortName: "UI",
    brandId: "brand_oluwa_pixels",
    brandName: "OluwaPixels Studio",
    brandLogo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    brandTrustScore: 97,
    brandResponseTime: "< 20 mins",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 10,
    isAvailableToday: true,
    isFeatured: true,
    status: "ACTIVE",
    views: 780,
    rating: 4.95,
    reviewCount: 26,
    createdAt: "2026-02-11T15:20:00Z"
  }
];

export const ORDERS: Order[] = [
  {
    id: "ord_101",
    orderNumber: "CH-2026-8891",
    buyerName: "Chioma Nwosu",
    buyerEmail: "chioma.n@unilag.edu.ng",
    buyerSchool: "UNILAG",
    sellerName: "Tobi Adebayo",
    brandName: "Tobi Tech Hub",
    listingTitle: "Anker 20,000mAh PowerCore 22.5W Fast Power Bank",
    listingImage: "https://images.unsplash.com/photo-1609592424074-12ee49ef7ee2?w=400&auto=format&fit=crop&q=80",
    listingType: "PRODUCT",
    quantity: 1,
    amount: 24500,
    escrowStatus: "HELD_IN_ESCROW",
    fulfillmentType: "PICKUP",
    deliveryLocation: "Moremi Hall Car Park, UNILAG",
    status: "CONFIRMED",
    paymentRef: "PAYSTACK_REF_881920",
    paymentProvider: "Paystack",
    createdAt: "2026-02-14T11:20:00Z"
  },
  {
    id: "ord_102",
    orderNumber: "CH-2026-9042",
    buyerName: "Farouq Ibrahim",
    buyerEmail: "farouq.i@unilag.edu.ng",
    buyerSchool: "UNILAG",
    sellerName: "Amina Bello",
    brandName: "Amina Glam & Braids",
    listingTitle: "Knotless French Curl Braids",
    listingImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&auto=format&fit=crop&q=80",
    listingType: "SERVICE",
    quantity: 1,
    amount: 18000,
    escrowStatus: "RELEASED_TO_SELLER",
    fulfillmentType: "DELIVERY",
    deliveryLocation: "Biobaku Hostel Room 204",
    status: "COMPLETED",
    paymentRef: "PAYSTACK_REF_990142",
    paymentProvider: "Paystack",
    createdAt: "2026-02-10T14:00:00Z"
  },
  {
    id: "ord_103",
    orderNumber: "CH-2026-9115",
    buyerName: "Kelechi Amadi",
    buyerEmail: "kelechi.a@lasu.edu.ng",
    buyerSchool: "LASU",
    sellerName: "Deji Okafor",
    brandName: "Deji Kicks & Thrift",
    listingTitle: "Vintage Oversized Nike Varsity Jacket",
    listingImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop&q=80",
    listingType: "PRODUCT",
    quantity: 1,
    amount: 16500,
    escrowStatus: "HELD_IN_ESCROW",
    fulfillmentType: "PICKUP",
    deliveryLocation: "LASU Main Gate",
    status: "PENDING",
    paymentRef: "PAYSTACK_REF_771802",
    paymentProvider: "Paystack",
    createdAt: "2026-02-15T09:45:00Z"
  }
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: "conv_1",
    otherPartyName: "Tobi Adebayo (Tobi Tech Hub)",
    otherPartyAvatar: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&auto=format&fit=crop&q=80",
    otherPartyRole: "SELLER",
    brandName: "Tobi Tech Hub",
    listingTitle: "Anker 20,000mAh PowerCore Fast Power Bank",
    listingPrice: 24500,
    listingImage: "https://images.unsplash.com/photo-1609592424074-12ee49ef7ee2?w=200&auto=format&fit=crop&q=80",
    lastMessage: "Hi! Yes, I have 3 units left in stock. I can meet you at Moremi in 20 mins.",
    lastMessageTime: "10:45 AM",
    unreadCount: 1,
    messages: [
      {
        id: "msg_1",
        senderId: "buyer_me",
        senderName: "Chioma",
        text: "Hello Tobi, is the Anker 20,000mAh powerbank still available for pickup today at Moremi?",
        timestamp: "10:40 AM",
        isRead: true
      },
      {
        id: "msg_2",
        senderId: "brand_tobi_tech",
        senderName: "Tobi Adebayo",
        text: "Hi! Yes, I have 3 units left in stock. I can meet you at Moremi in 20 mins.",
        timestamp: "10:45 AM",
        isRead: false
      }
    ]
  },
  {
    id: "conv_2",
    otherPartyName: "Amina Bello (Amina Glam)",
    otherPartyAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    otherPartyRole: "SELLER",
    brandName: "Amina Glam & Braids",
    listingTitle: "Knotless French Curl Braids",
    listingPrice: 18000,
    listingImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&auto=format&fit=crop&q=80",
    lastMessage: "Thank you so much! Please don't forget to leave a review on my store profile.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: "msg_3",
        senderId: "buyer_me",
        senderName: "Chioma",
        text: "Love the braids so much! People in my hostel keep asking for your link.",
        timestamp: "Yesterday 4:00 PM",
        isRead: true
      },
      {
        id: "msg_4",
        senderId: "brand_amina_glam",
        senderName: "Amina Bello",
        text: "Thank you so much! Please don't forget to leave a review on my store profile.",
        timestamp: "Yesterday 4:12 PM",
        isRead: true
      }
    ]
  }
];

export const SELLER_APPLICATIONS: SellerApplication[] = [
  {
    id: "app_201",
    applicantName: "Segun Arinze",
    email: "segun.arinze@lasu.edu.ng",
    schoolName: "Lagos State University",
    schoolShortName: "LASU",
    storeName: "Segun Campus Perfumes & Scents",
    category: "Beauty & Hair",
    studentIdCardUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
    businessDescription: "Selling long-lasting oil perfumes, designer body mists and Arabian scents for LASU students at affordable rates.",
    status: "PENDING",
    submittedAt: "2026-02-14T16:20:00Z"
  },
  {
    id: "app_202",
    applicantName: "Halima Sani",
    email: "halima.sani@fountain.edu.ng",
    schoolName: "Fountain University",
    schoolShortName: "FOUNTAIN",
    storeName: "Halima Hijab & Abaya Hub",
    category: "Fashion & Thrift",
    studentIdCardUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
    businessDescription: "Custom modest fashion, chiffon silk hijabs, inner caps, and embellished abayas designed specifically for Fountain Uni students.",
    status: "PENDING",
    submittedAt: "2026-02-15T08:10:00Z"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev_1",
    listingId: "list_1",
    listingTitle: "Anker 20,000mAh Power Bank",
    buyerName: "Kehinde S.",
    buyerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    buyerSchool: "UNILAG",
    rating: 5,
    comment: "Tobi delivered the powerbank in less than 15 minutes at Faculty of Engineering. Original packaging, charges my phone rapidly. 100% recommended seller!",
    createdAt: "2 days ago"
  },
  {
    id: "rev_2",
    listingId: "list_2",
    listingTitle: "Knotless French Curl Braids",
    buyerName: "Damilola A.",
    buyerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    buyerSchool: "UNILAG",
    rating: 5,
    comment: "Amina is so gentle with hair edges and super fast! She came to Biobaku hostel right on time. Will definitely book again.",
    createdAt: "4 days ago"
  }
];
