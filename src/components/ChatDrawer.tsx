import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  X,
  Phone,
  ShieldAlert,
  AlertTriangle,
  CheckCheck,
  Flag,
  UserX,
  Store,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const ChatDrawer: React.FC = () => {
  const {
    conversations,
    activeChatId,
    setActiveChatId,
    sendMessage,
    currentUser,
    setCurrentView,
    reportListing
  } = useMarketplace();

  const [inputText, setInputText] = useState('');
  const [showBlockAlert, setShowBlockAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeChatId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputText);
    setInputText('');
  };

  const handleQuickChip = (chipText: string) => {
    if (!activeConv) return;
    sendMessage(activeConv.id, chipText);
  };

  const handleBlockUser = () => {
    setShowBlockAlert(true);
    setTimeout(() => setShowBlockAlert(false), 3000);
  };

  if (!activeConv && conversations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-xs my-8">
        <Store className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800">No Messages Yet</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          Click "Chat Seller" on any listing to start an instant inquiry.
        </p>
        <button
          onClick={() => setCurrentView('home')}
          className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
        >
          Browse Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col md:flex-row h-[78vh]">
        
        {/* Left: Conversations List */}
        <div className={`w-full md:w-80 border-r border-slate-200 flex flex-col ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="font-extrabold text-sm text-slate-900">Conversations</h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {conversations.length} Active
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.map(conv => {
              const isSelected = activeConv?.id === conv.id;
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveChatId(conv.id)}
                  className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors ${
                    isSelected ? 'bg-emerald-50/70 border-l-4 border-emerald-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={conv.sellerAvatar}
                    alt={conv.sellerName}
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{conv.sellerName}</h4>
                      <span className="text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-emerald-800 truncate mt-0.5">
                      {conv.listingTitle}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat View */}
        {activeConv && (
          <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
            
            {/* Chat Header with Listing Info Card */}
            <div className="p-3 sm:p-4 bg-white border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => setActiveChatId(null)}
                  className="md:hidden p-1 text-slate-500 hover:text-slate-800"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <img
                  src={activeConv.sellerAvatar}
                  alt={activeConv.sellerName}
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-emerald-500/30"
                />

                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {activeConv.sellerName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Online
                    </span>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-[10px] text-slate-500">Verified Seller</span>
                  </div>
                </div>
              </div>

              {/* Chat Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleBlockUser}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Block / Report User"
                >
                  <UserX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Attached Listing Card Banner */}
            <div className="bg-emerald-50/90 border-b border-emerald-100 px-4 py-2 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 truncate">
                <img
                  src={activeConv.listingImage}
                  alt=""
                  className="w-9 h-9 rounded-lg object-cover border border-emerald-200 shrink-0"
                />
                <div className="truncate">
                  <p className="font-bold text-slate-900 truncate">{activeConv.listingTitle}</p>
                  <p className="text-[11px] font-black text-emerald-700">
                    ₦{activeConv.listingPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Scam Warning Notice Bar */}
            <div className="bg-amber-50 px-4 py-1.5 border-b border-amber-200 flex items-center gap-2 text-[11px] text-amber-900 font-medium">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                Safety First: Never send money or advance fees before inspecting this item physically in public.
              </span>
            </div>

            {/* Feedback alert if blocked */}
            {showBlockAlert && (
              <div className="m-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-center gap-2 animate-in fade-in">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>User blocked and flagged for General Market admin review.</span>
              </div>
            )}

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeConv.messages.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                        isMe
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5 px-1 flex items-center gap-1">
                      {msg.timestamp}
                      {isMe && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-1.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-slate-400 text-[10px] shrink-0">Quick ask:</span>
              <button
                type="button"
                onClick={() => handleQuickChip('Is this still available for physical inspection?')}
                className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap"
              >
                Is it still available?
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip('What is your best last price in Naira?')}
                className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap"
              >
                Last price?
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip('Where in Nigeria can we meet for physical inspection?')}
                className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap"
              >
                Meeting location?
              </button>
            </div>

            {/* Chat Input Field */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Type your message to seller..."
                className="flex-1 text-xs sm:text-sm px-4 py-2.5 bg-slate-100 rounded-xl focus:bg-white border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white p-2.5 rounded-xl transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
