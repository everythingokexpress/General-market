export interface CategoryItem {
  id: string;
  name: string;
  iconName: string;
  emoji: string;
  description: string;
  count: number;
  featured?: boolean;
  subcategories: string[];
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cars-vehicles',
    name: 'Cars & Vehicles',
    iconName: 'Car',
    emoji: '🚗',
    description: 'Tokunbo, Nigerian used, brand new cars, buses, trucks & spare parts',
    count: 14250,
    featured: true,
    subcategories: [
      'Cars',
      'SUVs & Crossovers',
      'Buses & Microbuses',
      'Trucks & Trailers',
      'Auto Spare Parts & Accessories',
      'Heavy Equipment',
      'Boats & Watercraft'
    ]
  },
  {
    id: 'property',
    name: 'Property & Real Estate',
    iconName: 'Building2',
    emoji: '🏠',
    description: 'Houses, flats, serviced apartments, land for sale & commercial properties',
    count: 9840,
    featured: true,
    subcategories: [
      'Flats & Apartments for Rent',
      'Houses & Duplexes for Sale',
      'Land & Plots',
      'Shortlet & Serviced Apartments',
      'Commercial Property & Offices',
      'Event Centers & Venues'
    ]
  },
  {
    id: 'phones-tablets',
    name: 'Phones & Tablets',
    iconName: 'Smartphone',
    emoji: '📱',
    description: 'Smartphones, iPhones, Samsung, tablets, smart watches & accessories',
    count: 22600,
    featured: true,
    subcategories: [
      'Mobile Phones',
      'iPhones',
      'Android Phones',
      'Tablets & iPads',
      'Smart Watches & Trackers',
      'Phone Accessories & Cases',
      'Power Banks & Chargers'
    ]
  },
  {
    id: 'computers-electronics',
    name: 'Computers & Electronics',
    iconName: 'Laptop',
    emoji: '💻',
    description: 'Laptops, MacBooks, gaming rigs, audio systems, TVs & cameras',
    count: 15300,
    featured: true,
    subcategories: [
      'Laptops & Notebooks',
      'MacBooks',
      'Desktop Computers & Monitors',
      'Computer Accessories & Keyboards',
      'TVs, Audio & Home Theaters',
      'Cameras & Drones',
      'Solar Systems & Inverters'
    ]
  },
  {
    id: 'home-furniture',
    name: 'Home & Furniture',
    iconName: 'Armchair',
    emoji: '🪑',
    description: 'Living room sofas, beds, wardrobes, office desks & interior decor',
    count: 8120,
    featured: true,
    subcategories: [
      'Living Room Furniture',
      'Bedroom Furniture & Mattresses',
      'Office & Workspace Furniture',
      'Kitchen & Dining Sets',
      'Lighting & Chandeliers',
      'Rugs & Curtains'
    ]
  },
  {
    id: 'fashion-clothing',
    name: 'Fashion & Clothing',
    iconName: 'Shirt',
    emoji: '👗',
    description: 'Traditional native wear, shoes, bags, wristwatches, jewelry & fabrics',
    count: 19400,
    featured: true,
    subcategories: [
      'Men\'s Clothing & Native Wear',
      'Women\'s Fashion & Dresses',
      'Shoes & Sneakers',
      'Bags & Luggage',
      'Watches & Jewelry',
      'Fabrics & Lace Materials',
      'Perfumes & Fragrances'
    ]
  },
  {
    id: 'appliances',
    name: 'Appliances',
    iconName: 'Refrigerator',
    emoji: '⚙️',
    description: 'Refrigerators, washing machines, generators, deep freezers & microwaves',
    count: 6750,
    featured: false,
    subcategories: [
      'Refrigerators & Freezers',
      'Washing Machines & Dryers',
      'Generators & Power Solutions',
      'Air Conditioners & Fans',
      'Microwaves & Cookers',
      'Small Kitchen Appliances'
    ]
  },
  {
    id: 'agriculture-farm',
    name: 'Agriculture & Farm Products',
    iconName: 'Wheat',
    emoji: '🌾',
    description: 'Farm produce, yams, grains, livestock, poultry, feeds & farm equipment',
    count: 5320,
    featured: false,
    subcategories: [
      'Grains, Rice & Tubers',
      'Livestock & Poultry',
      'Fish & Aquaculture',
      'Animal Feeds & Supplements',
      'Tractors & Farm Machinery',
      'Seeds & Fertilizers',
      'Palm Oil & Processing'
    ]
  },
  {
    id: 'tools-equipment',
    name: 'Tools & Equipment',
    iconName: 'Wrench',
    emoji: '🛠️',
    description: 'Power tools, welding machines, industrial machinery & construction gear',
    count: 3410,
    featured: false,
    subcategories: [
      'Power Tools & Drills',
      'Welding & Fabrication',
      'Safety & Workwear Gear',
      'Hand Tools & Toolboxes',
      'Electrical Tools & Meters',
      'Industrial Machinery'
    ]
  },
  {
    id: 'motorcycles',
    name: 'Motorcycles',
    iconName: 'Bike',
    emoji: '🏍️',
    description: 'Power bikes, delivery scooters, commercial motorcycles & helmets',
    count: 2890,
    featured: false,
    subcategories: [
      'Delivery Scooters & Bikes',
      'Power Bikes & Cruisers',
      'Commercial Motorcycles (Okada)',
      'Tricycles (Keke Napep)',
      'Bicycle & Electric Bikes',
      'Helmets & Riding Gear'
    ]
  },
  {
    id: 'baby-kids',
    name: 'Baby & Kids',
    iconName: 'Baby',
    emoji: '👶',
    description: 'Strollers, baby clothes, toys, cribs, baby food & school essentials',
    count: 4150,
    featured: false,
    subcategories: [
      'Baby Strollers & Car Seats',
      'Baby Clothing & Shoes',
      'Cribs, Cots & Nursery',
      'Toys & Games',
      'Maternity Care & Nursing'
    ]
  },
  {
    id: 'jobs-services',
    name: 'Jobs & Services',
    iconName: 'Briefcase',
    emoji: '💼',
    description: 'Artisans, web design, plumbing, event catering, driver & tutor jobs',
    count: 7300,
    featured: false,
    subcategories: [
      'Artisans & Handyman Services',
      'Tech & Web Development',
      'Catering & Event Planning',
      'Cleaning & Fumigation',
      'Logistics & Delivery Services',
      'Driver & Security Jobs',
      'Tutoring & Lessons'
    ]
  },
  {
    id: 'pets-animals',
    name: 'Pets & Animals',
    iconName: 'Dog',
    emoji: '🐕',
    description: 'Dogs, Boerboel, German Shepherd, puppies, pet food & veterinary care',
    count: 1980,
    featured: false,
    subcategories: [
      'Dogs & Puppies',
      'Cats & Kittens',
      'Birds & Parrots',
      'Pet Food & Accessories',
      'Cages & Kennels'
    ]
  },
  {
    id: 'other',
    name: 'Other',
    iconName: 'Package',
    emoji: '📦',
    description: 'Books, musical instruments, art, collectibles and general merchandise',
    count: 3100,
    featured: false,
    subcategories: [
      'Musical Instruments & Pianos',
      'Books & Stationery',
      'Art & Collectibles',
      'Luggage & Travel Bags',
      'General Merchandise'
    ]
  }
];
