import React from 'react';
import { Search, MapPin, PlusCircle, ShieldCheck, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const SearchHero: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    setSelectedCategory,
    setIsSellModalOpen,
    setCurrentView
  } = useMarketplace();

  const handleQuickTag = (tag: string, categoryId?: string) => {
    setSearchQuery(tag);
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-800/60 border border-emerald-700/50 rounded-full px-3.5 py-1 text-xs text-emerald-200 mb-4 backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wide">Nigeria's Modern Open Marketplace</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
          Buy. Sell. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Find Anything</span> in Nigeria.
        </h1>
        <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto mb-7 font-normal">
          Direct deals between verified Nigerian buyers and sellers. Cars, phones, property, electronics, farm produce, fashion, and services.
        </p>

        {/* Primary Search Box Container */}
        <div className="bg-white/95 p-2 sm:p-2.5 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 text-slate-900 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            
            {/* Search Input */}
            <div className="flex-1 relative flex items-center">
              <Search className="w-5 h-5 text-slate-700 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="What are you looking for? (e.g. Toyota Camry, iPhone 15, Lekki Flat)"
                className="w-full pl-11 pr-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-700 text-sm font-medium focus:outline-hidden"
              />
            </div>

            {/* Location Pill */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border border-slate-200/60">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[120px]">
                {selectedLocation.state}
              </span>
            </div>

            {/* Action Buttons inside Hero Search */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentView('home');
                }}
                className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Search</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSellModalOpen(true)}
                className="sm:hidden bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-bold px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-1"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Sell</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Search Trending Tags */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-emerald-300/80 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Trending:
          </span>
          <button
            onClick={() => handleQuickTag('Toyota Camry', 'cars-vehicles')}
            className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-full transition-colors"
          >
            Toyota Camry
          </button>
          <button
            onClick={() => handleQuickTag('iPhone 15 Pro Max', 'phones-tablets')}
            className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-full transition-colors"
          >
            iPhone 15 Pro Max
          </button>
          <button
            onClick={() => handleQuickTag('Lekki Duplex', 'property')}
            className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-full transition-colors"
          >
            Lekki Duplex
          </button>
          <button
            onClick={() => handleQuickTag('Tokunbo SUV', 'cars-vehicles')}
            className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-full transition-colors"
          >
            Tokunbo SUV
          </button>
          <button
            onClick={() => handleQuickTag('Benue Yam', 'agriculture-farm')}
            className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-full transition-colors"
          >
            Benue Yam Wholesale
          </button>
        </div>

        {/* Hero Features / Trust Badges */}
        <div className="mt-8 pt-6 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="flex items-center gap-2 text-emerald-100 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Free to Post Ads</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-100 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Verified Nigerian Sellers</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-100 text-xs">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Direct In-App Chat & Calls</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-100 text-xs">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>36 States & FCT Abuja</span>
          </div>
        </div>

      </div>
    </div>
  );
};
