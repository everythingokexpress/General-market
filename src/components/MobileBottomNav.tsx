import React from 'react';
import { Home, Grid, PlusCircle, MessageSquare, User } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const MobileBottomNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    conversations,
    setIsSellModalOpen
  } = useMarketplace();

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-2 shadow-lg">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
            currentView === 'home' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => setCurrentView('categories')}
          className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
            currentView === 'categories' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span>Categories</span>
        </button>

        {/* Sell Button Center Action */}
        <button
          onClick={() => setIsSellModalOpen(true)}
          className="flex flex-col items-center -mt-5"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-700/30 border-2 border-white transform active:scale-95 transition-transform">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-emerald-700 mt-0.5">Sell</span>
        </button>

        {/* Messages */}
        <button
          onClick={() => setCurrentView('messages')}
          className={`relative flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
            currentView === 'messages' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span>Messages</span>
          {totalUnread > 0 && (
            <span className="absolute top-0 right-3 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalUnread}
            </span>
          )}
        </button>

        {/* Account */}
        <button
          onClick={() => setCurrentView('account')}
          className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
            currentView === 'account' || currentView === 'my-listings' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Account</span>
        </button>

      </div>
    </nav>
  );
};
