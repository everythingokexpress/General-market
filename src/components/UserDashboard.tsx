import React, { useState } from 'react';
import {
  User,
  Store,
  Heart,
  Bell,
  Settings,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  PauseCircle,
  PlayCircle,
  Trash2,
  RefreshCw,
  Edit,
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  Briefcase,
  LogIn,
  LogOut,
  UserPlus,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Car,
  Check,
  AlertCircle,
  MapPin,
  Building2,
  KeyRound,
  X
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ListingCard } from './ListingCard';
import { PromotionTier, UserRole } from '../types';
import { NIGERIAN_LOCATIONS } from '../data/locations';

export const UserDashboard: React.FC = () => {
  const {
    currentUser,
    listings,
    favorites,
    notifications,
    markNotifAsRead,
    changeListingStatus,
    deleteListing,
    promoteListing,
    setIsSellModalOpen,
    upgradeSubscription,
    setCurrentView,
    loginUser,
    registerUser,
    logoutUser,
    switchUserPersona,
    setIsAuthModalOpen
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'listings' | 'saved' | 'notifications' | 'seller_stats' | 'subscription' | 'settings' | 'auth'>(
    currentUser.id === 'guest' ? 'auth' : 'listings'
  );

  // Auth Section State
  const [authSubMode, setAuthSubMode] = useState<'signin' | 'signup'>('signin');
  const [signinMethod, setSigninMethod] = useState<'email' | 'phone'>('email');
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPhone, setSigninPhone] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign up state
  const [signupRole, setSignupRole] = useState<UserRole>('seller');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupState, setSignupState] = useState('Lagos');
  const [signupCity, setSignupCity] = useState('Ikeja');
  const [signupBusinessName, setSignupBusinessName] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupVerifyNin, setSignupVerifyNin] = useState(true);
  const [signupTerms, setSignupTerms] = useState(true);

  // Feedback and OTP state
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotOtpSent, setForgotOtpSent] = useState(false);

  // Available cities for selected state
  const currentStateData = NIGERIAN_LOCATIONS.find(s => s.name === signupState);
  const availableCities = currentStateData ? currentStateData.popularCities : ['Ikeja', 'Lekki'];

  // Listings posted by current user or mock seller
  const myListings = listings.filter(l => l.seller.id === currentUser.id || l.seller.name.includes(currentUser.name));
  const savedListings = listings.filter(l => favorites.includes(l.id));

  const totalViews = myListings.reduce((sum, l) => sum + l.views, 0);

  const handlePromoteQuick = (id: string, tier: PromotionTier) => {
    promoteListing(id, tier);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);
    const identifier = signinMethod === 'email' ? signinEmail : signinPhone;
    if (!identifier.trim()) {
      setFeedbackMsg({
        type: 'error',
        text: `Please enter your ${signinMethod === 'email' ? 'email address' : 'Nigerian phone number'}.`
      });
      return;
    }
    if (!signinPassword) {
      setFeedbackMsg({
        type: 'error',
        text: 'Please enter your account password.'
      });
      return;
    }

    loginUser(identifier.trim(), 'seller');
    setFeedbackMsg({
      type: 'success',
      text: `Signed in successfully as ${identifier}! Your account dashboard is ready.`
    });
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 4500);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);
    if (!signupName.trim()) {
      setFeedbackMsg({ type: 'error', text: 'Please enter your full name.' });
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setFeedbackMsg({ type: 'error', text: 'Please provide a valid email address.' });
      return;
    }
    if (!signupPhone.trim()) {
      setFeedbackMsg({ type: 'error', text: 'Please provide your Nigerian phone number (+234).' });
      return;
    }
    if (signupPassword.length < 6) {
      setFeedbackMsg({ type: 'error', text: 'Password must contain at least 6 characters.' });
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setFeedbackMsg({ type: 'error', text: 'Passwords do not match. Please verify and try again.' });
      return;
    }
    if (!signupTerms) {
      setFeedbackMsg({ type: 'error', text: 'Please agree to the General Market trading terms.' });
      return;
    }

    registerUser({
      name: signupName.trim(),
      email: signupEmail.trim(),
      phone: signupPhone.trim(),
      role: signupRole,
      location: `${signupCity}, ${signupState}`,
      businessName: signupRole === 'dealer' ? (signupBusinessName || `${signupName} Motors`) : undefined
    });

    setFeedbackMsg({
      type: 'success',
      text: `Welcome to General Market, ${signupName}! Your ${signupRole.toUpperCase()} account has been created.`
    });
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 5000);
  };

  const handleQuickPersona = (role: UserRole) => {
    switchUserPersona(role);
    setFeedbackMsg({
      type: 'success',
      text: `Switched active profile to ${role.toUpperCase()}.`
    });
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 3500);
  };

  const handleSignOut = () => {
    logoutUser();
    setActiveTab('auth');
    setFeedbackMsg({
      type: 'success',
      text: 'You have signed out. You are currently viewing General Market as a Guest.'
    });
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-500/20 shadow-sm"
            />
            {currentUser.verified && (
              <span className="absolute bottom-0 right-0 p-1 bg-emerald-600 text-white rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">{currentUser.name}</h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                {currentUser.role} Account
              </span>
            </div>
            <p className="text-xs text-slate-500">{currentUser.phone} • {currentUser.email}</p>
            <div className="mt-1.5 flex flex-wrap gap-2 text-[11px]">
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                {currentUser.joinedDate}
              </span>
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                ★ {currentUser.rating} ({currentUser.reviewCount} reviews)
              </span>
              <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded uppercase text-[10px]">
                Plan: {currentUser.subscription.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('auth')}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              activeTab === 'auth'
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In or Sign Up</span>
          </button>
          <button
            onClick={() => setIsSellModalOpen(true)}
            className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            + Post Ad
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className="flex-1 md:flex-none bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upgrade</span>
          </button>
          {currentUser.id !== 'guest' && (
            <button
              onClick={handleSignOut}
              className="p-2.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-xl transition-colors shrink-0"
              title="Sign Out to Guest"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Guest Mode Notice */}
      {currentUser.id === 'guest' && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-xs shrink-0">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">You are browsing General Market as a Guest</h3>
              <p className="text-xs text-slate-600 mt-0.5">Sign in to manage your active listings, save favorite cars and phones, or create a verified merchant profile.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => {
                setAuthSubMode('signin');
                setActiveTab('auth');
              }}
              className="flex-1 sm:flex-none px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthSubMode('signup');
                setActiveTab('auth');
              }}
              className="flex-1 sm:flex-none px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl"
            >
              Create Account
            </button>
          </div>
        </div>
      )}

      {/* Feedback Toast Banner */}
      {feedbackMsg && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 animate-in fade-in-50 ${
          feedbackMsg.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-rose-50 border-rose-200 text-rose-900'
        }`}>
          <div className="flex items-center gap-2.5">
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span className="text-xs font-bold">{feedbackMsg.text}</span>
          </div>
          <button
            onClick={() => setFeedbackMsg(null)}
            className="p-1 hover:bg-black/5 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-1 text-xs font-bold text-slate-500">
        <button
          onClick={() => setActiveTab('auth')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'auth'
              ? 'border-emerald-600 text-emerald-700 font-extrabold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In / Sign Up</span>
          {currentUser.id === 'guest' && (
            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded-full">
              Guest
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'listings'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>My Listings ({myListings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'saved'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Items ({savedListings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('seller_stats')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'seller_stats'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Seller Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('subscription')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'subscription'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Monetization & Plans</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'settings'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Verification & Settings</span>
        </button>
      </div>

      {/* TAB CONTENT: MY LISTINGS */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">
              Manage Your Posted Ads ({myListings.length})
            </h2>
            <p className="text-xs text-slate-500">
              Edit, pause, renew or boost your ads
            </p>
          </div>

          {myListings.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
              <Store className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-800">You have no active ads yet</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">Post an ad for free in 60 seconds.</p>
              <button
                onClick={() => setIsSellModalOpen(true)}
                className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Post an Ad Now
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {myListings.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.images[0]}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          item.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {item.status}
                        </span>
                        {item.promotionTier === 'vip' && (
                          <span className="text-[10px] font-black text-amber-600 flex items-center gap-0.5">
                            <Sparkles className="w-3 h-3" /> VIP Active
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate mt-1">
                        {item.title}
                      </h4>
                      <p className="text-xs font-black text-emerald-700">
                        ₦{item.price.toLocaleString()}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {item.views} total views • {item.location.city}, {item.location.state}
                      </span>
                    </div>
                  </div>

                  {/* Seller Action Controls */}
                  <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                    {item.status === 'active' ? (
                      <button
                        onClick={() => changeListingStatus(item.id, 'paused')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1"
                        title="Pause Ad"
                      >
                        <PauseCircle className="w-3.5 h-3.5" />
                        <span>Pause</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => changeListingStatus(item.id, 'active')}
                        className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1"
                        title="Resume Ad"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>Activate</span>
                      </button>
                    )}

                    <button
                      onClick={() => handlePromoteQuick(item.id, 'vip')}
                      className="bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Boost VIP</span>
                    </button>

                    <button
                      onClick={() => deleteListing(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: SAVED / FAVORITES */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-800">
            Saved / Favorite Items ({savedListings.length})
          </h2>
          {savedListings.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-800">No saved items yet</h3>
              <p className="text-xs text-slate-500 mt-1">
                Tap the heart icon on any product card to save it for later inspection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {savedListings.map(item => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: SELLER ANALYTICS */}
      {activeTab === 'seller_stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">Active Listings</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {myListings.filter(l => l.status === 'active').length}
              </span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">Total Ad Impressions</span>
              <span className="text-2xl font-black text-emerald-700 mt-1 block">
                {totalViews.toLocaleString()}
              </span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">Buyer Chats & Leads</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                48
              </span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">Seller Rating</span>
              <span className="text-2xl font-black text-amber-500 mt-1 block">
                ★ 4.8 / 5.0
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-extrabold text-sm text-slate-900 mb-2">Tips to Sell 3x Faster</h3>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
              <li>Upload at least 3 high-resolution photos in good lighting.</li>
              <li>Always specify if the item is Foreign Used (Tokunbo) or Nigerian Used.</li>
              <li>Include your location landmark in Lagos, Abuja, or other Nigerian commercial hubs.</li>
              <li>Respond to buyer chat messages within 15 minutes to secure deals.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MONETIZATION & SUBSCRIPTIONS */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-xl font-black text-slate-900">General Market Merchant Plans</h3>
            <p className="text-xs text-slate-500 mt-1">
              Grow your sales with verified dealer badges, unlimited listings, and top search placements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Free Plan</span>
                <h4 className="text-xl font-black text-slate-900 mt-1">₦0 / Month</h4>
                <p className="text-xs text-slate-500 mt-2">For private individuals selling personal items.</p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">✓ Up to 5 active listings</li>
                  <li className="flex items-center gap-2">✓ Standard chat messaging</li>
                  <li className="flex items-center gap-2">✓ Standard placement</li>
                </ul>
              </div>
              <button
                disabled
                className="mt-6 w-full py-2.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-xl"
              >
                Current Plan
              </button>
            </div>

            {/* Pro Merchant */}
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-600 shadow-lg relative flex flex-col justify-between">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Pro Merchant</span>
                <h4 className="text-xl font-black text-slate-900 mt-1">₦15,000 / Month</h4>
                <p className="text-xs text-slate-500 mt-2">For electronics, phones, fashion and boutique stores.</p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">✓ Up to 50 active listings</li>
                  <li className="flex items-center gap-2">✓ 5 Free Featured Ad Boosts</li>
                  <li className="flex items-center gap-2">✓ Verified Business Badge (CAC)</li>
                  <li className="flex items-center gap-2">✓ Priority customer phone support</li>
                </ul>
              </div>
              <button
                onClick={() => upgradeSubscription('pro')}
                className="mt-6 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-xs transition-colors"
              >
                Subscribe to Pro
              </button>
            </div>

            {/* Enterprise Dealer */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Auto & Real Estate Dealer</span>
                <h4 className="text-xl font-black text-slate-900 mt-1">₦45,000 / Month</h4>
                <p className="text-xs text-slate-500 mt-2">For car dealerships, importers, and real estate developers.</p>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">✓ Unlimited car and property listings</li>
                  <li className="flex items-center gap-2">✓ Verified Car Dealer Gold Badge</li>
                  <li className="flex items-center gap-2">✓ Top homepage & car marketplace banner</li>
                  <li className="flex items-center gap-2">✓ Direct WhatsApp lead integration</li>
                </ul>
              </div>
              <button
                onClick={() => upgradeSubscription('dealer_enterprise')}
                className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl shadow-xs transition-colors"
              >
                Upgrade to Dealer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">Your Notifications</h2>
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            {notifications.map(n => (
              <div
                key={n.id}
                onClick={() => markNotifAsRead(n.id)}
                className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                  !n.read ? 'bg-emerald-50/50' : 'hover:bg-slate-50'
                }`}
              >
                <Bell className={`w-4 h-4 shrink-0 mt-0.5 ${!n.read ? 'text-emerald-600' : 'text-slate-400'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-900">{n.title}</h4>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: SETTINGS & VERIFICATION */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-extrabold text-sm text-slate-900 mb-4">
              Nigerian Trust & Identity Verification
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">National Identification Number (NIN)</h4>
                  <p className="text-[11px] text-slate-500">Linked to official NIMC database for seller trust.</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-lg">
                  Verified ✓
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Nigerian Phone Number (+234)</h4>
                  <p className="text-[11px] text-slate-500">OTP SMS authentication verified.</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-lg">
                  Verified ✓
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">CAC Business Registration (Corporate)</h4>
                  <p className="text-[11px] text-slate-500">For registered Nigerian enterprises and car dealers.</p>
                </div>
                <button className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-3 py-1 rounded-lg cursor-pointer">
                  Upload CAC
                </button>
              </div>
            </div>
          </div>

          {/* Account Credentials & Switch Section in Settings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Account Credentials & Access</h3>
                <p className="text-xs text-slate-500 mt-0.5">Manage your login details, security credentials, and active session</p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                currentUser.id === 'guest' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {currentUser.id === 'guest' ? 'Guest Browsing' : 'Active Session'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold block text-[11px]">Primary Email</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{currentUser.email}</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold block text-[11px]">Nigerian Phone Number</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{currentUser.phone}</span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setAuthSubMode('signin');
                  setActiveTab('auth');
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In with Another Account</span>
              </button>
              <button
                onClick={() => {
                  setAuthSubMode('signup');
                  setActiveTab('auth');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create New Account</span>
              </button>
              {currentUser.id !== 'guest' && (
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-rose-600 hover:bg-rose-50 border border-rose-200 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors ml-auto"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SIGN IN / SIGN UP (AUTH SECTION) */}
      {activeTab === 'auth' && (
        <div className="space-y-6">
          {/* Active Session Status Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Current Session:</span>
                  <span className="text-sm font-black text-slate-900">{currentUser.name}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{currentUser.email} • {currentUser.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              {currentUser.id !== 'guest' ? (
                <button
                  onClick={handleSignOut}
                  className="w-full md:w-auto px-4 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out to Guest</span>
                </button>
              ) : (
                <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Currently Browsing as Guest
                </span>
              )}
            </div>
          </div>

          {/* Auth Card Container */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden max-w-2xl mx-auto">
            {/* Mode Switcher Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5">
              <button
                type="button"
                onClick={() => {
                  setAuthSubMode('signin');
                  setFeedbackMsg(null);
                }}
                className={`flex-1 py-3 text-xs font-black rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  authSubMode === 'signin'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Your Account</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthSubMode('signup');
                  setFeedbackMsg(null);
                }}
                className={`flex-1 py-3 text-xs font-black rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  authSubMode === 'signup'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Free Account (Sign Up)</span>
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {/* SUB-TAB 1: SIGN IN */}
              {authSubMode === 'signin' && (
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <h2 className="text-xl font-black text-slate-900">Welcome Back to General Market</h2>
                    <p className="text-xs text-slate-500">Sign in using your verified email or Nigerian phone number</p>
                  </div>

                  {/* Method selector */}
                  <div className="flex items-center justify-center gap-2 bg-slate-100 p-1 rounded-xl max-w-xs mx-auto">
                    <button
                      type="button"
                      onClick={() => setSigninMethod('email')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        signinMethod === 'email' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Email Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setSigninMethod('phone')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        signinMethod === 'phone' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Nigerian Phone (+234)
                    </button>
                  </div>

                  <form onSubmit={handleSignIn} className="space-y-4">
                    {signinMethod === 'email' ? (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            value={signinEmail}
                            onChange={e => setSigninEmail(e.target.value)}
                            placeholder="e.g. tunde@generalmarket.ng"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nigerian Phone Number (+234)
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            value={signinPhone}
                            onChange={e => setSigninPhone(e.target.value)}
                            placeholder="e.g. +234 803 123 4567"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700">
                          Account Password
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setIsForgotModalOpen(true);
                            setForgotOtpSent(false);
                            setForgotInput(signinMethod === 'email' ? signinEmail : signinPhone);
                          }}
                          className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={signinPassword}
                          onChange={e => setSigninPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={e => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>Remember my login on this device</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Sign In to General Market</span>
                    </button>
                  </form>

                  {/* One-Click Fast Personas */}
                  <div className="pt-5 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Instant 1-Click Nigerian Demo Accounts
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Fast Switch
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleQuickPersona('seller')}
                        className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 rounded-xl text-left transition-all group cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                            Tunde Adeleke
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Verified Seller
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">Computer Village, Ikeja, Lagos</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickPersona('dealer')}
                        className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 rounded-xl text-left transition-all group cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                            Chukwuma Auto Empire
                          </span>
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Car Dealer
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">Berger Auto Market, Lagos</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickPersona('buyer')}
                        className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 rounded-xl text-left transition-all group cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                            Amaka Obi
                          </span>
                          <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Buyer
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">Lekki Phase 1, Lagos</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickPersona('admin')}
                        className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 rounded-xl text-left transition-all group cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                            General Market Admin
                          </span>
                          <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Trust & Safety
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">Moderation & Verification Team</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: SIGN UP */}
              {authSubMode === 'signup' && (
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <h2 className="text-xl font-black text-slate-900">Join General Market</h2>
                    <p className="text-xs text-slate-500">Create a verified account to buy, sell, and discover deals across Nigeria</p>
                  </div>

                  {/* Role Selector Cards */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Select Account Type:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSignupRole('seller')}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          signupRole === 'seller'
                            ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Store className={`w-4 h-4 ${signupRole === 'seller' ? 'text-emerald-600' : 'text-slate-400'}`} />
                          <span className="font-bold text-xs text-slate-900">Verified Seller</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Sell electronics, fashion, goods across Nigeria.</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSignupRole('dealer')}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          signupRole === 'dealer'
                            ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Car className={`w-4 h-4 ${signupRole === 'dealer' ? 'text-emerald-600' : 'text-slate-400'}`} />
                          <span className="font-bold text-xs text-slate-900">Auto Dealership</span>
                        </div>
                        <p className="text-[11px] text-slate-500">List Tokunbo & Nigerian used cars with dealer badge.</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSignupRole('buyer')}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          signupRole === 'buyer'
                            ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <User className={`w-4 h-4 ${signupRole === 'buyer' ? 'text-emerald-600' : 'text-slate-400'}`} />
                          <span className="font-bold text-xs text-slate-900">Shopper / Buyer</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Browse verified ads, chat safely, and save items.</p>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={signupName}
                          onChange={e => setSignupName(e.target.value)}
                          placeholder="e.g. Babatunde Fashola"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                      </div>

                      {signupRole === 'dealer' && (
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Dealership / Business Name
                          </label>
                          <input
                            type="text"
                            value={signupBusinessName}
                            onChange={e => setSignupBusinessName(e.target.value)}
                            placeholder="e.g. Berger Prime Motors"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={signupEmail}
                          onChange={e => setSignupEmail(e.target.value)}
                          placeholder="babatunde@example.ng"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nigerian Phone (+234) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={signupPhone}
                          onChange={e => setSignupPhone(e.target.value)}
                          placeholder="+234 802 345 6789"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Location fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          State in Nigeria
                        </label>
                        <select
                          value={signupState}
                          onChange={e => {
                            setSignupState(e.target.value);
                            const stateObj = NIGERIAN_LOCATIONS.find(s => s.name === e.target.value);
                            if (stateObj && stateObj.popularCities.length > 0) {
                              setSignupCity(stateObj.popularCities[0]);
                            }
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        >
                          {NIGERIAN_LOCATIONS.map(s => (
                            <option key={s.code} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          City / Market Area
                        </label>
                        <select
                          value={signupCity}
                          onChange={e => setSignupCity(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        >
                          {availableCities.map(c => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Password (min. 6 chars) *
                        </label>
                        <input
                          type="password"
                          required
                          value={signupPassword}
                          onChange={e => setSignupPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Confirm Password *
                        </label>
                        <input
                          type="password"
                          required
                          value={signupConfirmPassword}
                          onChange={e => setSignupConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Trust verification option */}
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 space-y-2 text-xs">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={signupVerifyNin}
                          onChange={e => setSignupVerifyNin(e.target.checked)}
                          className="mt-0.5 w-4 h-4 text-emerald-600 rounded"
                        />
                        <div>
                          <span className="font-bold text-slate-900 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            Enable NIMC National Identity (NIN) Instant Trust Badge
                          </span>
                          <p className="text-[11px] text-slate-600">
                            Adds a verified green badge to your profile, increasing buyer inquiries by up to 3x.
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="text-xs">
                      <label className="flex items-start gap-2 cursor-pointer text-slate-600">
                        <input
                          type="checkbox"
                          checked={signupTerms}
                          onChange={e => setSignupTerms(e.target.checked)}
                          className="mt-0.5 w-4 h-4 text-emerald-600 rounded"
                        />
                        <span>
                          I agree to General Market's Nigerian anti-scam rules, escrow policies, and Terms of Use.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Create General Market Account</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Simulated Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
                <KeyRound className="w-4 h-4" />
                <span>Password Recovery (Nigeria SMS / Email)</span>
              </div>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!forgotOtpSent ? (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600">
                  Enter your registered Nigerian mobile number (+234) or email address. We'll send a 6-digit verification code.
                </p>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone or Email</label>
                  <input
                    type="text"
                    value={forgotInput}
                    onChange={e => setForgotInput(e.target.value)}
                    placeholder="+234 803 123 4567 or you@mail.ng"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setForgotOtpSent(true)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Send Verification Code (SMS OTP)
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-center">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">SMS OTP Dispatched</h4>
                <p className="text-slate-600 text-xs">
                  We sent an SMS with OTP code <strong className="text-emerald-700">GM-849201</strong> to <strong>{forgotInput || '+234 803 123 4567'}</strong>.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500">
                  Use code <span className="font-mono font-bold text-slate-800">849201</span> to log into your account immediately.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotModalOpen(false);
                    setFeedbackMsg({
                      type: 'success',
                      text: 'OTP code verified! You can now access your account.'
                    });
                  }}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
