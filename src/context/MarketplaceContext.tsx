import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Listing,
  ListingStatus,
  PromotionTier,
  ChatConversation,
  ChatMessage,
  NotificationItem,
  ReportedListing,
  UserRole,
  AccountType
} from '../types';
import { INITIAL_LISTINGS, INITIAL_NOTIFICATIONS, MOCK_SELLERS } from '../data/mockListings';

export interface CarFilters {
  make?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  maxMileage?: number;
  transmission?: 'Automatic' | 'Manual' | '';
  fuelType?: string;
  bodyType?: string;
  condition?: 'brand_new' | 'foreign_used' | 'nigerian_used' | '';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  avatar: string;
  role: UserRole;
  accountType: AccountType;
  businessName?: string;
  verified: boolean;
  ninVerified: boolean;
  cacVerified: boolean;
  phoneVerified: boolean;
  emailVerified: boolean;
  joinedDate: string;
  rating: number;
  reviewCount: number;
  location: string;
  subscription: 'free' | 'pro' | 'dealer_enterprise';
  balanceNaira: number;
}

const DEFAULT_USER: UserProfile = {
  id: 'user-me',
  name: 'Tunde Adeleke',
  email: 'tunde.adeleke@gmail.com',
  phone: '+234 803 555 1290',
  whatsapp: '+234 803 555 1290',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  role: 'seller',
  accountType: 'individual',
  verified: true,
  ninVerified: true,
  cacVerified: false,
  phoneVerified: true,
  emailVerified: true,
  joinedDate: 'Member since 2023',
  rating: 4.8,
  reviewCount: 16,
  location: 'Ikeja, Lagos',
  subscription: 'free',
  balanceNaira: 15000
};

interface MarketplaceContextType {
  listings: Listing[];
  favorites: string[];
  searchQuery: string;
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  selectedLocation: { state: string; city: string; area: string };
  carFilters: CarFilters;
  currentUser: UserProfile;
  conversations: ChatConversation[];
  activeChatId: string | null;
  notifications: NotificationItem[];
  reportedListings: ReportedListing[];
  activeListingDetail: Listing | null;
  isSellModalOpen: boolean;
  isSafetyModalOpen: boolean;
  isAuthModalOpen: boolean;
  currentView: string;
  
  // Setters & Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string | null) => void;
  setSelectedSubcategory: (sub: string | null) => void;
  setSelectedLocation: (loc: { state: string; city: string; area: string }) => void;
  setCarFilters: React.Dispatch<React.SetStateAction<CarFilters>>;
  setCurrentView: (view: string) => void;
  setActiveListingDetail: (listing: Listing | null) => void;
  setIsSellModalOpen: (open: boolean) => void;
  setIsSafetyModalOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setActiveChatId: (id: string | null) => void;

  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
  addListing: (newListing: Omit<Listing, 'id' | 'datePosted' | 'views' | 'status'>) => Listing;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  changeListingStatus: (id: string, status: ListingStatus) => void;
  promoteListing: (id: string, tier: PromotionTier) => void;
  startChatWithSeller: (listing: Listing, initialMessage?: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  markNotifAsRead: (id: string) => void;
  reportListing: (listingId: string, reason: any, details: string) => void;
  
  // Admin actions
  adminApproveListing: (id: string) => void;
  adminRejectListing: (id: string) => void;
  adminToggleVerifySeller: (sellerId: string) => void;
  adminDismissReport: (reportId: string) => void;
  adminTakeActionReport: (reportId: string) => void;

  switchUserPersona: (role: UserRole) => void;
  upgradeSubscription: (plan: 'pro' | 'dealer_enterprise') => void;
  loginUser: (email: string, role?: UserRole, name?: string) => void;
  registerUser: (data: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    location?: string;
    businessName?: string;
  }) => void;
  logoutUser: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('gm_listings_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_LISTINGS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('gm_favorites_v1');
    return saved ? JSON.parse(saved) : ['car-1', 'phone-1'];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState({
    state: 'All Nigeria',
    city: '',
    area: ''
  });

  const [carFilters, setCarFilters] = useState<CarFilters>({
    make: '',
    model: '',
    minYear: undefined,
    maxYear: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    maxMileage: undefined,
    transmission: '',
    fuelType: '',
    bodyType: '',
    condition: ''
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('gm_user_v1');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [conversations, setConversations] = useState<ChatConversation[]>(() => {
    const saved = localStorage.getItem('gm_conversations_v1');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'chat-lexus',
        listingId: 'car-1',
        listingTitle: '2020 Lexus RX 350 F-Sport AWD (Direct Tokunbo)',
        listingImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400&auto=format&fit=crop&q=80',
        listingPrice: 34500000,
        buyerId: 'user-me',
        buyerName: 'Tunde Adeleke',
        buyerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        sellerId: 'seller-1',
        sellerName: 'Chukwuma Auto Empire',
        sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        lastMessage: 'Good day! Yes, the Lexus RX 350 is available for inspection at Berger Auto Market.',
        lastMessageTime: '15m ago',
        unreadCount: 1,
        messages: [
          {
            id: 'm1',
            senderId: 'user-me',
            senderName: 'Tunde Adeleke',
            text: 'Hello, is this 2020 Lexus RX 350 still available? What is your best last price in Naira?',
            timestamp: '11:20 AM'
          },
          {
            id: 'm2',
            senderId: 'seller-1',
            senderName: 'Chukwuma Auto Empire',
            text: 'Good day! Yes, the Lexus RX 350 is available for inspection at Berger Auto Market. All duty papers are clean and original. Best price is ₦33.8M for immediate closing.',
            timestamp: '11:32 AM'
          }
        ]
      }
    ];
  });

  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [reportedListings, setReportedListings] = useState<ReportedListing[]>([
    {
      id: 'rep-1',
      listingId: 'car-3',
      listingTitle: '2017 Mercedes-Benz C300 AMG Line',
      reportedBy: 'Kelechi O.',
      reason: 'Inaccurate description',
      details: 'Seller states mileage is 30,000km but title documents show 54,000km.',
      timestamp: 'Yesterday at 3:15 PM',
      status: 'open'
    }
  ]);

  const [activeListingDetail, setActiveListingDetail] = useState<Listing | null>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<string>('home'); // 'home' | 'cars' | 'categories' | 'messages' | 'account' | 'admin' | 'my-listings' | 'favorites'

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('gm_listings_v1', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('gm_favorites_v1', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('gm_conversations_v1', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('gm_user_v1', JSON.stringify(currentUser));
  }, [currentUser]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addListing = (newListingData: Omit<Listing, 'id' | 'datePosted' | 'views' | 'status'>): Listing => {
    const newId = `listing-${Date.now()}`;
    const newListing: Listing = {
      ...newListingData,
      id: newId,
      datePosted: 'Just now',
      views: 1,
      status: 'active'
    };

    setListings(prev => [newListing, ...prev]);

    // Send notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Listing Published Successfully!',
      message: `Your ad "${newListing.title}" is live on General Market.`,
      time: 'Just now',
      read: false,
      type: 'promotion'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newListing;
  };

  const updateListing = (id: string, updates: Partial<Listing>) => {
    setListings(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(item => item.id !== id));
    if (activeListingDetail?.id === id) {
      setActiveListingDetail(null);
    }
  };

  const changeListingStatus = (id: string, status: ListingStatus) => {
    setListings(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
    );
  };

  const promoteListing = (id: string, tier: PromotionTier) => {
    setListings(prev =>
      prev.map(item => (item.id === id ? { ...item, promotionTier: tier } : item))
    );
  };

  const startChatWithSeller = (listing: Listing, initialMessage?: string) => {
    const existing = conversations.find(c => c.listingId === listing.id && c.sellerId === listing.seller.id);
    if (existing) {
      setActiveChatId(existing.id);
      setCurrentView('messages');
      return;
    }

    const newChatId = `chat-${Date.now()}`;
    const firstMsgText = initialMessage || `Hello ${listing.seller.name}, I am interested in your "${listing.title}". Is it still available?`;
    
    const newConv: ChatConversation = {
      id: newChatId,
      listingId: listing.id,
      listingTitle: listing.title,
      listingImage: listing.images[0] || '',
      listingPrice: listing.price,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerAvatar: currentUser.avatar,
      sellerId: listing.seller.id,
      sellerName: listing.seller.name,
      sellerAvatar: listing.seller.avatar,
      lastMessage: firstMsgText,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          text: firstMsgText,
          timestamp: 'Just now'
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveChatId(newChatId);
    setCurrentView('messages');

    // Simulate realistic seller auto-acknowledgement after 2.5 seconds
    setTimeout(() => {
      setConversations(currentConvs =>
        currentConvs.map(conv => {
          if (conv.id === newChatId) {
            const replyMsg: ChatMessage = {
              id: `msg-rep-${Date.now()}`,
              senderId: listing.seller.id,
              senderName: listing.seller.name,
              text: `Hello! Yes, it is still available. You can contact or WhatsApp me on ${listing.seller.phone}. Where are you based?`,
              timestamp: 'Just now'
            };
            return {
              ...conv,
              lastMessage: replyMsg.text,
              lastMessageTime: 'Just now',
              messages: [...conv.messages, replyMsg]
            };
          }
          return conv;
        })
      );
    }, 2500);
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: 'Just now'
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text.trim(),
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );
  };

  const markNotifAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const reportListing = (listingId: string, reason: any, details: string) => {
    const listing = listings.find(l => l.id === listingId);
    const newReport: ReportedListing = {
      id: `rep-${Date.now()}`,
      listingId,
      listingTitle: listing ? listing.title : 'Listing #' + listingId,
      reportedBy: currentUser.name,
      reason,
      details,
      timestamp: 'Just now',
      status: 'open'
    };
    setReportedListings(prev => [newReport, ...prev]);
  };

  const adminApproveListing = (id: string) => {
    changeListingStatus(id, 'active');
  };

  const adminRejectListing = (id: string) => {
    changeListingStatus(id, 'rejected');
  };

  const adminToggleVerifySeller = (sellerId: string) => {
    setListings(prev =>
      prev.map(l => {
        if (l.seller.id === sellerId) {
          return {
            ...l,
            seller: {
              ...l.seller,
              verified: !l.seller.verified,
              verificationBadge: !l.seller.verified ? 'verified_dealer' : 'none'
            }
          };
        }
        return l;
      })
    );
  };

  const adminDismissReport = (reportId: string) => {
    setReportedListings(prev =>
      prev.map(r => (r.id === reportId ? { ...r, status: 'dismissed' } : r))
    );
  };

  const adminTakeActionReport = (reportId: string) => {
    const report = reportedListings.find(r => r.id === reportId);
    if (report) {
      changeListingStatus(report.listingId, 'rejected');
      setReportedListings(prev =>
        prev.map(r => (r.id === reportId ? { ...r, status: 'resolved' } : r))
      );
    }
  };

  const switchUserPersona = (role: UserRole) => {
    if (role === 'admin') {
      setCurrentUser(prev => ({
        ...prev,
        role: 'admin',
        name: 'General Market Admin',
        accountType: 'business'
      }));
    } else if (role === 'dealer') {
      setCurrentUser(prev => ({
        ...prev,
        role: 'dealer',
        name: 'Chukwuma Auto Empire',
        accountType: 'dealer',
        businessName: 'Chukwuma Autos Ltd (Verified)',
        subscription: 'dealer_enterprise'
      }));
    } else if (role === 'seller') {
      setCurrentUser(prev => ({
        ...prev,
        role: 'seller',
        name: 'Tunde Adeleke (Verified Seller)',
        accountType: 'individual',
        subscription: 'pro'
      }));
    } else {
      setCurrentUser(prev => ({
        ...prev,
        role: 'buyer',
        name: 'Amaka Obi',
        accountType: 'individual',
        subscription: 'free'
      }));
    }
  };

  const upgradeSubscription = (plan: 'pro' | 'dealer_enterprise') => {
    setCurrentUser(prev => ({
      ...prev,
      subscription: plan
    }));
  };

  const loginUser = (email: string, role: UserRole = 'seller', name?: string) => {
    const defaultNames: Record<UserRole, string> = {
      buyer: 'Amaka Obi',
      seller: 'Tunde Adeleke',
      dealer: 'Chukwuma Auto Empire',
      admin: 'General Market Admin'
    };
    const displayName = name && name.trim() ? name : defaultNames[role] || email.split('@')[0];

    setCurrentUser({
      id: `user-${Date.now()}`,
      name: displayName,
      email: email,
      phone: '+234 803 555 1290',
      whatsapp: '+234 803 555 1290',
      avatar: role === 'dealer'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
        : role === 'buyer'
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: role,
      accountType: role === 'dealer' ? 'dealer' : role === 'admin' ? 'business' : 'individual',
      businessName: role === 'dealer' ? 'Chukwuma Autos Ltd (Verified)' : undefined,
      verified: true,
      ninVerified: true,
      cacVerified: role === 'dealer' || role === 'admin',
      phoneVerified: true,
      emailVerified: true,
      joinedDate: 'Joined today',
      rating: 5.0,
      reviewCount: 4,
      location: 'Lagos, Nigeria',
      subscription: role === 'dealer' ? 'dealer_enterprise' : role === 'seller' ? 'pro' : 'free',
      balanceNaira: 25000
    });
  };

  const registerUser = (data: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    location?: string;
    businessName?: string;
  }) => {
    setCurrentUser({
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      whatsapp: data.phone,
      avatar: data.role === 'buyer'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: data.role,
      accountType: data.role === 'dealer' ? 'dealer' : 'individual',
      businessName: data.businessName,
      verified: true,
      ninVerified: true,
      cacVerified: data.role === 'dealer',
      phoneVerified: true,
      emailVerified: true,
      joinedDate: 'Joined today',
      rating: 5.0,
      reviewCount: 0,
      location: data.location || 'Lagos, Nigeria',
      subscription: data.role === 'dealer' ? 'dealer_enterprise' : 'free',
      balanceNaira: 5000
    });
  };

  const logoutUser = () => {
    setCurrentUser({
      id: 'guest',
      name: 'Guest User',
      email: 'guest@generalmarket.ng',
      phone: '+234 000 000 0000',
      whatsapp: '+234 000 000 0000',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'buyer',
      accountType: 'individual',
      verified: false,
      ninVerified: false,
      cacVerified: false,
      phoneVerified: false,
      emailVerified: false,
      joinedDate: 'Not signed in',
      rating: 0,
      reviewCount: 0,
      location: 'Nigeria',
      subscription: 'free',
      balanceNaira: 0
    });
  };

  return (
    <MarketplaceContext.Provider
      value={{
        listings,
        favorites,
        searchQuery,
        selectedCategory,
        selectedSubcategory,
        selectedLocation,
        carFilters,
        currentUser,
        conversations,
        activeChatId,
        notifications,
        reportedListings,
        activeListingDetail,
        isSellModalOpen,
        isSafetyModalOpen,
        isAuthModalOpen,
        currentView,
        setSearchQuery,
        setSelectedCategory,
        setSelectedSubcategory,
        setSelectedLocation,
        setCarFilters,
        setCurrentView,
        setActiveListingDetail,
        setIsSellModalOpen,
        setIsSafetyModalOpen,
        setIsAuthModalOpen,
        setActiveChatId,
        toggleFavorite,
        isFavorite,
        addListing,
        updateListing,
        deleteListing,
        changeListingStatus,
        promoteListing,
        startChatWithSeller,
        sendMessage,
        markNotifAsRead,
        reportListing,
        adminApproveListing,
        adminRejectListing,
        adminToggleVerifySeller,
        adminDismissReport,
        adminTakeActionReport,
        switchUserPersona,
        upgradeSubscription,
        loginUser,
        registerUser,
        logoutUser
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return ctx;
};
