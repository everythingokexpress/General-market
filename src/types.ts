export type ItemCondition = 'brand_new' | 'foreign_used' | 'nigerian_used';

export type UserRole = 'buyer' | 'seller' | 'dealer' | 'admin';

export type AccountType = 'individual' | 'dealer' | 'business';

export type ListingStatus = 'active' | 'pending' | 'paused' | 'rejected' | 'sold';

export type PromotionTier = 'none' | 'featured' | 'promoted' | 'vip';

export interface LocationInfo {
  country: string;
  state: string;
  city: string;
  area: string;
}

export interface SellerInfo {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  avatar: string;
  verified: boolean;
  verificationBadge: 'none' | 'phone_verified' | 'nin_verified' | 'cac_registered' | 'verified_dealer';
  rating: number;
  reviewCount: number;
  joinedDate: string;
  responseTime: string;
  accountType: AccountType;
  businessName?: string;
  location: string;
}

export interface CarDetails {
  make: string;
  model: string;
  year: number;
  mileage: number; // in kilometers
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  bodyType: 'SUV' | 'Sedan' | 'Hatchback' | 'Pickup' | 'Coupe' | 'Van' | 'Truck';
  color: string;
  engineSize?: string;
}

export interface PropertyDetails {
  propertyType: 'Flat/Apartment' | 'House/Duplex' | 'Commercial Space' | 'Land' | 'Shortlet';
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  serviced?: boolean;
  parkingSpaces?: number;
}

export interface ElectronicsDetails {
  brand: string;
  model?: string;
  storage?: string;
  ram?: string;
  simType?: string;
  screenSize?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  isNegotiable: boolean;
  category: string;
  subcategory: string;
  condition: ItemCondition;
  images: string[];
  location: LocationInfo;
  seller: SellerInfo;
  datePosted: string;
  views: number;
  status: ListingStatus;
  promotionTier: PromotionTier;
  carDetails?: CarDetails;
  propertyDetails?: PropertyDetails;
  electronicsDetails?: ElectronicsDetails;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isListingShare?: boolean;
}

export interface ChatConversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingPrice: number;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'message' | 'offer' | 'safety' | 'promotion' | 'system';
  link?: string;
}

export interface ReportedListing {
  id: string;
  listingId: string;
  listingTitle: string;
  reportedBy: string;
  reason: 'Scam / Fraud' | 'Prohibited item' | 'Inaccurate description' | 'Duplicate ad' | 'Harassment' | 'Other';
  details: string;
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
}

export interface MarketplaceStats {
  totalListings: number;
  activeSellers: number;
  totalMarketValue: number;
  dealsClosedToday: number;
  verifiedPercentage: number;
}
