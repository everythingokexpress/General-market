import React, { useState } from 'react';
import {
  Search,
  MapPin,
  MessageSquare,
  Heart,
  PlusCircle,
  User,
  ShieldCheck,
  ChevronDown,
  Car,
  Bell,
  SlidersHorizontal,
  X,
  Store,
  Briefcase,
  LogIn,
  LogOut
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { NIGERIAN_LOCATIONS, POPULAR_LOCATIONS } from '../data/locations';
import { CATEGORIES } from '../data/categories';

export const Navbar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setSelectedSubcategory,
    selectedLocation,
    setSelectedLocation,
    favorites,
    conversations,
    notifications,
    currentUser,
    switchUserPersona,
    setCurrentView,
    currentView,
    setIsSellModalOpen,
    setIsSafetyModalOpen,
    setIsAuthModalOpen,
    logoutUser
  } = useMarketplace();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const totalUnreadMessages = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentView !== 'home' && currentView !== 'cars') {
      setCurrentView('home');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top Nigerian Trust & Safety Notice Bar */}
      <div className="bg-emerald-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-emerald-700/80 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
              Nigeria Safe Trade
            </span>
            <span className="text-emerald-100 hidden sm:inline">
              Protect your funds: Always inspect goods physically in a safe public spot before making payment.
            </span>
            <span className="text-emerald-100 sm:hidden">
              Always inspect goods before payment.
            </span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200 shrink-0">
            <button
              onClick={() => setIsSafetyModalOpen(true)}
              className="hover:text-white underline text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              Safety Tips
            </button>
            <span className="text-emerald-500 hidden md:inline">|</span>
            {/* Quick Persona Switcher for demonstration */}
            <div className="hidden md:flex items-center gap-1 text-[11px]">
              <span className="text-emerald-300">View as:</span>
              <button
                onClick={() => switchUserPersona('buyer')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${currentUser.role === 'buyer' ? 'bg-emerald-600 text-white font-bold' : 'hover:text-white'}`}
              >
                Buyer
              </button>
              <button
                onClick={() => switchUserPersona('seller')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${currentUser.role === 'seller' ? 'bg-emerald-600 text-white font-bold' : 'hover:text-white'}`}
              >
                Seller
              </button>
              <button
                onClick={() => switchUserPersona('dealer')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${currentUser.role === 'dealer' ? 'bg-emerald-600 text-white font-bold' : 'hover:text-white'}`}
              >
                Auto Dealer
              </button>
              <button
                onClick={() => switchUserPersona('admin')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${currentUser.role === 'admin' ? 'bg-amber-400 text-slate-900 font-bold' : 'hover:text-amber-200'}`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setCurrentView('home');
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setSearchQuery('');
              }}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white font-extrabold shadow-sm shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Store className="w-5 h-5 text-emerald-200" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                    General<span className="text-emerald-600">Market</span>
                  </span>
                  <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                    NG
                  </span>
                </div>
                <span className="text-[10px] text-slate-700 font-medium tracking-wide">
                  Buy. Sell. Find Anything.
                </span>
              </div>
            </button>

            {/* Categories Quick Dropdown Trigger (Desktop) */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-700" />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in-50">
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    All Categories
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSelectedSubcategory(null);
                          setIsCategoryDropdownOpen(false);
                          setCurrentView('home');
                        }}
                        className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2.5 hover:bg-emerald-50 hover:text-emerald-700 transition-colors ${
                          selectedCategory === cat.id ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <span className="text-lg">{cat.emoji}</span>
                        <span className="truncate">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dedicated Cars Marketplace Tab */}
            <button
              onClick={() => {
                setSelectedCategory('cars-vehicles');
                setCurrentView('cars');
              }}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentView === 'cars'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-emerald-700'
              }`}
            >
              <Car className="w-4 h-4 text-emerald-600" />
              <span>Cars Marketplace</span>
            </button>
          </div>

          {/* Location Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-2 rounded-lg border border-slate-200/80 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <div className="text-left truncate max-w-[90px] sm:max-w-[130px]">
                <span className="font-semibold text-slate-800">
                  {selectedLocation.city ? `${selectedLocation.city}, ` : ''}{selectedLocation.state}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <div className="flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="What are you looking for? (e.g. Toyota Camry, iPhone 15, Lekki Flat)"
                className="w-full pl-10 pr-24 py-2.5 bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-700 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-600 absolute left-3.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-18 text-slate-600 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-xs"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Messages */}
            <button
              onClick={() => setCurrentView('messages')}
              className={`relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors ${
                currentView === 'messages' ? 'bg-emerald-50 text-emerald-700' : ''
              }`}
              title="Messages"
            >
              <MessageSquare className="w-5 h-5" />
              {totalUnreadMessages > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {totalUnreadMessages}
                </span>
              )}
            </button>

            {/* Saved Items */}
            <button
              onClick={() => setCurrentView('favorites')}
              className={`relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors ${
                currentView === 'favorites' ? 'bg-emerald-50 text-emerald-700' : ''
              }`}
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* User Account / Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <span className="hidden xl:inline text-xs font-bold text-slate-700 truncate max-w-[100px]">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-700 hidden sm:inline" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in-50">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                      {currentUser.verified && (
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate">{currentUser.phone}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium capitalize">
                        Role: {currentUser.role}
                      </span>
                    </div>
                  </div>

                  <div className="py-1 text-xs">
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-800 font-bold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogIn className="w-4 h-4 text-emerald-600" />
                      Sign In or Sign Up
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('account');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      My Profile & Settings
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('my-listings');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <Store className="w-4 h-4 text-slate-500" />
                      My Listings & Ads
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-amber-50 text-amber-900 font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4 text-amber-600" />
                      Admin Moderation Panel
                    </button>
                    {currentUser.id !== 'guest' && (
                      <button
                        onClick={() => {
                          logoutUser();
                          setIsUserMenuOpen(false);
                          setCurrentView('account');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 font-medium flex items-center gap-2 border-t border-slate-100 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        Sign Out (Guest Mode)
                      </button>
                    )}
                  </div>

                  <div className="border-t border-slate-100 px-4 py-2 bg-slate-50/50">
                    <p className="text-[11px] font-bold text-slate-600 mb-1.5">Switch Persona:</p>
                    <div className="grid grid-cols-2 gap-1 text-[11px]">
                      <button
                        onClick={() => {
                          switchUserPersona('buyer');
                          setIsUserMenuOpen(false);
                        }}
                        className="p-1 text-center bg-white border border-slate-200 rounded hover:border-emerald-500 text-slate-700 font-medium"
                      >
                        Buyer
                      </button>
                      <button
                        onClick={() => {
                          switchUserPersona('seller');
                          setIsUserMenuOpen(false);
                        }}
                        className="p-1 text-center bg-white border border-slate-200 rounded hover:border-emerald-500 text-slate-700 font-medium"
                      >
                        Seller
                      </button>
                      <button
                        onClick={() => {
                          switchUserPersona('dealer');
                          setIsUserMenuOpen(false);
                        }}
                        className="p-1 text-center bg-white border border-slate-200 rounded hover:border-emerald-500 text-slate-700 font-medium"
                      >
                        Auto Dealer
                      </button>
                      <button
                        onClick={() => {
                          switchUserPersona('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="p-1 text-center bg-amber-100 border border-amber-300 rounded hover:border-amber-500 text-amber-900 font-bold"
                      >
                        Admin
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sell an Item CTA Button */}
            <button
              onClick={() => setIsSellModalOpen(true)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md shadow-emerald-700/20 hover:shadow-lg hover:shadow-emerald-700/30 flex items-center gap-1.5 transition-all cursor-pointer transform active:scale-95 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell an Item</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (under header) */}
      <div className="p-2 sm:p-3 bg-white border-t border-slate-100 md:hidden">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search cars, phones, electronics, farm..."
            className="w-full pl-9 pr-20 py-2 bg-slate-100 text-slate-900 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
          />
          <Search className="w-4 h-4 text-slate-700 absolute left-3" />
          <button
            type="submit"
            className="absolute right-1 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
          >
            Search
          </button>
        </form>
      </div>

      {/* Location Picker Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Select Nigerian Location</h3>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="p-1 rounded-lg text-slate-700 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-xs text-slate-700 mb-3">
                Choose state to see listings near your location in Nigeria:
              </p>

              {/* Popular quick locations */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {POPULAR_LOCATIONS.map(locName => (
                  <button
                    key={locName}
                    onClick={() => {
                      setSelectedLocation({
                        state: locName,
                        city: '',
                        area: ''
                      });
                      setIsLocationModalOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedLocation.state === locName
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {locName}
                  </button>
                ))}
              </div>

              {/* All States */}
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-60 overflow-y-auto divide-y divide-slate-100">
                {NIGERIAN_LOCATIONS.map(st => (
                  <div key={st.code} className="p-2.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedLocation({
                            state: st.name,
                            city: '',
                            area: ''
                          });
                          setIsLocationModalOpen(false);
                        }}
                        className="font-bold text-sm text-slate-800 hover:text-emerald-700 text-left"
                      >
                        {st.name} State
                      </button>
                    </div>
                    {/* Popular cities in this state */}
                    <div className="mt-1 flex flex-wrap gap-1">
                      {st.popularCities.slice(0, 5).map(city => (
                        <button
                          key={city}
                          onClick={() => {
                            setSelectedLocation({
                              state: st.name,
                              city,
                              area: ''
                            });
                            setIsLocationModalOpen(false);
                          }}
                          className="text-[11px] text-slate-700 hover:text-emerald-700 bg-slate-100 px-2 py-0.5 rounded"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedLocation({
                    state: 'All Nigeria',
                    city: '',
                    area: ''
                  });
                  setIsLocationModalOpen(false);
                }}
                className="text-xs text-slate-700 hover:text-slate-800 font-medium"
              >
                Reset to All Nigeria
              </button>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
