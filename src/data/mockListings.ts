import { Listing, SellerInfo } from '../types';

export const MOCK_SELLERS: Record<string, SellerInfo> = {
  'seller-1': {
    id: 'seller-1',
    name: 'Chukwuma Auto Empire',
    phone: '+234 803 245 8891',
    whatsapp: '+234 803 245 8891',
    email: 'sales@chukwumaautos.ng',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    verificationBadge: 'verified_dealer',
    rating: 4.9,
    reviewCount: 142,
    joinedDate: 'Joined March 2021',
    responseTime: 'Typically replies in 10 mins',
    accountType: 'dealer',
    businessName: 'Chukwuma Autos Ltd (CAC Registered: RC 159230)',
    location: 'Berger Auto Market, Ikeja, Lagos'
  },
  'seller-2': {
    id: 'seller-2',
    name: 'TechHub Computer Village',
    phone: '+234 814 901 3322',
    whatsapp: '+234 814 901 3322',
    email: 'info@techhubikeja.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true,
    verificationBadge: 'cac_registered',
    rating: 4.8,
    reviewCount: 98,
    joinedDate: 'Joined August 2022',
    responseTime: 'Typically replies within 5 mins',
    accountType: 'business',
    businessName: 'TechHub Gadgets & Systems',
    location: 'Otigba Street, Computer Village, Ikeja, Lagos'
  },
  'seller-3': {
    id: 'seller-3',
    name: 'Lekki Prime Properties',
    phone: '+234 701 882 4490',
    whatsapp: '+234 701 882 4490',
    email: 'concierge@lekkiprime.ng',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: true,
    verificationBadge: 'cac_registered',
    rating: 5.0,
    reviewCount: 64,
    joinedDate: 'Joined January 2020',
    responseTime: 'Typically replies in 30 mins',
    accountType: 'business',
    businessName: 'Lekki Prime Realtors Ltd',
    location: 'Admiralty Way, Lekki Phase 1, Lagos'
  },
  'seller-4': {
    id: 'seller-4',
    name: 'Ibrahim Danladi',
    phone: '+234 802 771 9904',
    whatsapp: '+234 802 771 9904',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    verified: true,
    verificationBadge: 'nin_verified',
    rating: 4.7,
    reviewCount: 29,
    joinedDate: 'Joined November 2023',
    responseTime: 'Typically replies in 15 mins',
    accountType: 'individual',
    location: 'Wuse 2, Abuja (FCT)'
  },
  'seller-5': {
    id: 'seller-5',
    name: 'Benue Agro Direct Supply',
    phone: '+234 816 555 4321',
    whatsapp: '+234 816 555 4321',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    verified: true,
    verificationBadge: 'nin_verified',
    rating: 4.9,
    reviewCount: 88,
    joinedDate: 'Joined June 2021',
    responseTime: 'Typically replies in 1 hour',
    accountType: 'business',
    businessName: 'Benue Agro Allied Cooperative',
    location: 'Mile 12 Market Hub, Lagos & Makurdi'
  },
  'seller-6': {
    id: 'seller-6',
    name: 'Royal Heritage Sartorial',
    phone: '+234 809 333 1188',
    whatsapp: '+234 809 333 1188',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verified: true,
    verificationBadge: 'cac_registered',
    rating: 4.9,
    reviewCount: 112,
    joinedDate: 'Joined February 2022',
    responseTime: 'Typically replies in 20 mins',
    accountType: 'business',
    businessName: 'Royal Heritage Designs',
    location: 'Commercial Avenue, Yaba, Lagos'
  }
};

export const INITIAL_LISTINGS: Listing[] = [
  // 1. CAR: Lexus RX 350
  {
    id: 'car-1',
    title: '2020 Lexus RX 350 F-Sport AWD (Direct Tokunbo / Custom Duty Paid)',
    description: 'Clean foreign used 2020 Lexus RX 350 F-Sport edition. Pristine red leather interior, panoramic roof, navigation system, blind spot monitor, power tailgate, genuine low mileage. All original customs papers and clearance certificates available for verification. Buy and drive with zero issues.',
    price: 34500000,
    isNegotiable: true,
    category: 'cars-vehicles',
    subcategory: 'SUVs & Crossovers',
    condition: 'foreign_used',
    images: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&auto=format&fit=crop&q=80'
    ],
    location: {
      country: 'Nigeria',
      state: 'Lagos',
      city: 'Ikeja',
      area: 'Berger Auto Market'
    },
    seller: MOCK_SELLERS['seller-1'],
    datePosted: '2 hours ago',
    views: 480,
    status: 'active',
    promotionTier: 'vip',
    carDetails: {
      make: 'Lexus',
      model: 'RX 350',
      year: 2020,
      mileage: 48500,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      bodyType: 'SUV',
      color: 'Pearl White',
      engineSize: '3.5L V6'
    },
    tags: ['Tokunbo', 'Customs Paid', 'Lexus', 'SUV', 'F-Sport']
  },

  // 2. CAR: Toyota Camry 2018
  {
    id: 'car-2',
    title: '2018 Toyota Camry SE (Foreign Used / Extremely Clean Condition)',
    description: 'Direct Tokunbo 2018 Toyota Camry Sport Edition. Super fuel-efficient 4-cylinder engine, sharp metallic gray exterior with dark sport alloy rims, reverse camera, lane assist, Bluetooth audio. Perfect suspension and chilling AC. Serious buyers only.',
    price: 19800000,
    isNegotiable: true,
    category: 'cars-vehicles',
    subcategory: 'Cars',
    condition: 'foreign_used',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=900&auto=format&fit=crop&q=80'
    ],
    location: {
      country: 'Nigeria',
      state: 'Abuja (FCT)',
      city: 'Wuse',
      area: 'Wuse 2'
    },
    seller: MOCK_SELLERS['seller-4'],
    datePosted: '5 hours ago',
    views: 312,
    status: 'active',
    promotionTier: 'featured',
    carDetails: {
      make: 'Toyota',
      model: 'Camry',
      year: 2018,
      mileage: 62000,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      bodyType: 'Sedan',
      color: 'Metallic Grey',
      engineSize: '2.5L 4-Cylinder'
    },
    tags: ['Toyota', 'Tokunbo', 'Camry', 'Fuel Saver']
  },

  // 3. CAR: Mercedes-Benz C300 2017
  {
    id: 'car-3',
    title: '2017 Mercedes-Benz C300 AMG Line (Full Option Panoramic)',
    description: 'Foreign used Mercedes-Benz C300 4MATIC AMG Line. Burmester premium sound system, dual panoramic sunroof, ambient interior lighting, keyless push button start, clean Carfax report with no flood or frame damage. Ready for physical inspection in Lekki.',
    price: 24500000,
    isNegotiable: true,
    category: 'cars-vehicles',
    subcategory: 'Cars',
    condition: 'foreign_used',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=900&auto=format&fit=crop&q=80'
    ],
    location: {
      country: 'Nigeria',
      state: 'Lagos',
      city: 'Lekki',
      area: 'Lekki Phase 1'
    },
    seller: MOCK_SELLERS['seller-1'],
    datePosted: '1 day ago',
    views: 890,
    status: 'active',
    promotionTier: 'promoted',
    carDetails: {
      make: 'Mercedes-Benz',
      model: 'C300',
      year: 2017,
      mileage: 54000,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      bodyType: 'Sedan',
      color: 'Obsidian Black',
      engineSize: '2.0L Turbo'
    },
    tags: ['Benz', 'AMG', 'C300', 'Luxury', 'Tokunbo']
  },

  // 4. PHONE: iPhone 15 Pro Max
  {
    id: 'phone-1',
    title: 'Apple iPhone 15 Pro Max 256GB Natural Titanium (Brand New Sealed)',
    description: 'Factory sealed, brand new Apple iPhone 15 Pro Max 256GB. Dual SIM (eSIM + Nano SIM physical), 1 Year Apple Global Warranty. Comes with original sealed box and official store receipt from Computer Village.',
    price: 1580000,
    isNegotiable: false,
    category: 'phones-tablets',
    subcategory: 'iPhones',
    condition: 'brand_new',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1695048065050-8b65b6ff9a46?w=900&auto=format&fit=crop&q=80'
    ],
    location: {
      country: 'Nigeria',
      state: 'Lagos',
      city: 'Ikeja',
      area: 'Computer Village'
    },
    seller: MOCK_SELLERS['seller-2'],
    datePosted: 'Today',
    views: 1250,
    status: 'active',
    promotionTier: 'vip',
    electronicsDetails: {
      brand: 'Apple',
      model: 'iPhone 15 Pro Max',
      storage: '256GB',
      ram: '8GB',
      simType: 'Physical Nano-SIM + eSIM',
      screenSize: '6.7 inch Super Retina XDR'
    },
    tags: ['iPhone', 'Apple', 'Brand New', 'Computer Village']
  },

  // 5. PHONE: Samsung S24 Ultra
  {
    id: 'phone-2',
    title: 'Samsung Galaxy S24 Ultra 5G 512GB Titanium Black (Open Box)',
    description: 'Direct foreign open box Samsung S24 Ultra with S-Pen. Snapdragon 8 Gen 3, 512GB internal storage, 12GB RAM, 200MP camera with Galaxy AI. 100% battery health, zero scratches, includes fast charging cable.',
    price: 1390000,
    isNegotiable: true,
    category: 'phones-tablets',
    subcategory: 'Android Phones',
    condition: 'foreign_used',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=900&auto=format&fit=crop&q=80'
    ],
    location: {
      country: 'Nigeria',
      state: 'Abuja (FCT)',
      city: 'Wuse',
      area: 'Wuse Zone 4'
    },
    seller: MOCK_SELLERS['seller-4'],
    datePosted: '3 hours ago',
    views: 410,
    status: 'active',
    promotionTier: 'featured',
    electronicsDetails: {
      brand: 'Samsung',
      model: 'Galaxy S24 Ultra',
      storage: '512GB',
      ram: '12GB',
      screenSize: '6.8 inch AMOLED 2X'
    },
    tags: ['Samsung', 'S24 Ultra', '5G', 'Galaxy AI']
  },

  // 6. PROPERTY: Luxury 4-Bedroom Semi-Detached Duplex Lekki
  {
    id: 'prop-1',
    title: 'Luxury 4-Bedroom Semi-Detached Duplex with BQ (Governor’s Consent)',
    description: 'Newly finished modern 4-Bedroom semi-detached duplex in a gated, fully secured estate in Lekki Phase 1. Features: fully fitted Italian kitchen with heat extractor & microwave, all rooms ensuite with walk-in closet, stamped concrete floor, swimming pool, 24/7 power supply & clean treated water.',
    price: 260000000,
    isNegotiable: true,
    category: 'property',
    subcategory: 'Houses & Duplexes for Sale',
    condition: 'brand_new',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&auto=format&fit=crop&q=80'
    ],
    location: {
      country: 'Nigeria',
      state: 'Lagos',
      city: 'Lekki',
      area: 'Lekki Phase 1'
    },
    seller: MOCK_SELLERS['seller-3'],
    datePosted: 'Yesterday',
    views: 1840,
    status: 'active',
    promotionTier: 'vip',
    propertyDetails: {
      propertyType: 'House/Duplex',
      bedrooms: 4,
      bathrooms: 5,
      furnished: false,
      serviced: true,
      parkingSpaces: 4
    },
    tags: ['Lekki', 'Duplex', 'Lagos Property', 'Governors Consent']
  },

  // 7. PROPERTY: 3-Bedroom Serviced Apartment in Victoria Island
  {
    id: 'prop-2',
    title: 'Executive 3-Bedroom Serviced Apartment (Waterfront View, Swimming Pool)',
    description: 'Furnished luxury 3-Bedroom apartment in Victoria Island. High-speed elevators, Olympic size swimming pool, fitness gym, 24-hour round the clock security and power backup. Rent is ₦14,000,000 per annum + ₦2.5M service charge.',
    price: 14000000,
    isNegotiable: false,
    category: 'property',
    subcategory: 'Flats & Apartments for Rent',
    condition: 'brand_new',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&auto=format&fit=crop&q=80'
    ],
    location: {
      country: 'Nigeria',
      state: 'Lagos',
      city: 'Victoria Island',
      area: 'Adeola Odeku'
    },
    seller: MOCK_SELLERS['seller-3'],
    datePosted: '2 days ago',
    views: 940,
    status: 'active',
    promotionTier: 'featured',
    propertyDetails: {
      propertyType: 'Flat/Apartment',
      bedrooms: 3,
      bathrooms: 3,
      furnished: true,
      serviced: true,
      parkingSpaces: 2
    },
    tags: ['VI Rent', 'Serviced', 'Victoria Island', 'Luxury Apartment']
  },

  // 8. ELECTRONICS: MacBook Pro M3
  {
    id: 'comp-1',
    title: 'Apple MacBook Pro 16" M3 Max 36GB RAM 1TB SSD Space Black',
    description: 'Pristine UK used Apple MacBook Pro 16-inch with M3 Max chip (14-core CPU, 30-core GPU). 36GB unified memory, 1TB lightning-fast SSD, Liquid Retina XDR display, cycle count only 18. Comes with original MagSafe 140W fast charger.',
    price: 3200000,
    isNegotiable: true,
    category: 'computers-electronics',
    subcategory: 'MacBooks',
    condition: 'foreign_used',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900&auto=format&fit=crop&q=80'
    ],
    location: {
      country: 'Nigeria',
      state: 'Lagos',
      city: 'Ikeja',
      area: 'Computer Village'
    },
    seller: MOCK_SELLERS['seller-2'],
    datePosted: '6 hours ago',
    views: 640,
    status: 'active',
    promotionTier: 'featured',
    electronicsDetails: {
      brand: 'Apple',
      model: 'MacBook Pro 16" M3 Max',
      storage: '1TB SSD',
      ram: '36GB Unified RAM',
      screenSize: '16.2 inch Liquid Retina XDR'
    },
    tags: ['MacBook', 'M3 Max', 'Apple', 'Space Black']
  },

  // 9. AGRICULTURE: Benue Yams
  {
    id: 'agro-1',
    title: 'Fresh Giant Benue White Tubers of Yam (Wholesale Batch 100 Tubers)',
    description: 'Direct harvest from farms in Zaki Biam, Benue State. Premium giant floury white yams. Ideal for hotels, restaurants, boarding schools, and retail sellers. Same day delivery available across Lagos, Abuja, and Port Harcourt terminals.',
    price: 280000,
    isNegotiable: true,
    category: 'agriculture-farm',
    subcategory: 'Grains, Rice & Tubers',
    condition: 'brand_new',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80'
    ],
    location: {
      country: 'Nigeria',
      state: 'Lagos',
      city: 'Ikeja',
      area: 'Mile 12 Market Hub'
    },
    seller: MOCK_SELLERS['seller-5'],
    datePosted: 'Today',
    views: 520,
    status: 'active',
    promotionTier: 'featured',
    tags: ['Benue Yam', 'Wholesale', 'Farm Produce', 'Zaki Biam']
  },

  // 10. FASHION: Handcrafted Men's Kaftan Senator Native
  {
    id: 'fash-1',
    title: 'Luxury 3-Piece Men’s Senator Kaftan & Agbada Set (Cashmere Wool)',
    description: 'Bespoke tailoring handcrafted with 100% Italian Super 150s cashmere wool. Features detailed embroidery neckline, sharp fitting trousers, and matching cap. Available in sizes 40 to 48 or custom measurement within 48 hours.',
    price: 75000,
    isNegotiable: false,
    category: 'fashion-clothing',
    subcategory: 'Men\'s Clothing & Native Wear',
    condition: 'brand_new',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop&q=80'
    ],
    location: {
      country: 'Nigeria',
      state: 'Lagos',
      city: 'Yaba',
      area: 'Commercial Avenue'
    },
    seller: MOCK_SELLERS['seller-6'],
    datePosted: '4 hours ago',
    views: 310,
    status: 'active',
    promotionTier: 'featured',
    tags: ['Senator', 'Native', 'Men Fashion', 'Cashmere', 'Agbada']
  },

  // 11. HOME & FURNITURE: 7-Seater Modern Sectional Sofa
  {
    id: 'furn-1',
    title: '7-Seater L-Shaped Italian Leather Living Room Sofa Set + Center Table',
    description: 'Custom handcrafted modern living room set. Premium Turkish water-resistant velvet & genuine leather trim, high-density orthopedic foam with 5-year sagging guarantee. Free delivery within Lagos island and Ikeja.',
    price: 850000,
    isNegotiable: true,
    category: 'home-furniture',
    subcategory: 'Living Room Furniture',
    condition: 'brand_new',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&auto=format&fit=crop&q=80'
    ],
    location: {
      country: 'Nigeria',
      state: 'Rivers',
      city: 'Port Harcourt',
      area: 'Trans-Amadi'
    },
    seller: MOCK_SELLERS['seller-6'],
    datePosted: '1 day ago',
    views: 470,
    status: 'active',
    promotionTier: 'promoted',
    tags: ['Furniture', 'Living Room', 'Leather Sofa', 'Port Harcourt']
  },

  // 12. APPLIANCE: 5KVA Solar Inverter System
  {
    id: 'app-1',
    title: '5KVA/48V Pure Sine Wave Hybrid Solar Inverter System + Lithium Battery',
    description: 'Say goodbye to NEPA blackouts and expensive petrol generator costs! Complete setup includes 5KVA Felicity hybrid inverter, 10KWh 48V Lithium-ion LiFePO4 battery pack, and 8 Monocrystalline 550W Tier-1 solar panels. Powers refrigerators, ACs, TVs, and water pumps.',
    price: 2950000,
    isNegotiable: true,
    category: 'appliances',
    subcategory: 'Generators & Power Solutions',
    condition: 'brand_new',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=900&auto=format&fit=crop&q=80'
    ],
    location: {
      country: 'Nigeria',
      state: 'Oyo',
      city: 'Ibadan',
      area: 'Ring Road'
    },
    seller: MOCK_SELLERS['seller-2'],
    datePosted: '1 day ago',
    views: 780,
    status: 'active',
    promotionTier: 'featured',
    tags: ['Solar', 'Inverter', '5KVA', 'Lithium Battery', 'Power']
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New Message on Lexus RX 350',
    message: 'Chukwuma Auto Empire sent you a price quote and video inspection link.',
    time: '10m ago',
    read: false,
    type: 'message' as const
  },
  {
    id: 'notif-2',
    title: 'Price Drop Alert',
    message: '2018 Toyota Camry SE dropped in price from ₦21M to ₦19.8M!',
    time: '2h ago',
    read: false,
    type: 'offer' as const
  },
  {
    id: 'notif-3',
    title: 'General Market Safety Tip',
    message: 'Never make upfront bank transfers before physically checking the item and verifying papers in a public spot.',
    time: '1d ago',
    read: true,
    type: 'safety' as const
  }
];
