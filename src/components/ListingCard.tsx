import React, { useState } from 'react';
import {
  Heart,
  MapPin,
  Eye,
  Clock,
  ShieldCheck,
  Phone,
  MessageSquare,
  Sparkles,
  Award,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { Listing } from '../types';
import { useMarketplace } from '../context/MarketplaceContext';

interface ListingCardProps {
  listing: Listing;
  variant?: 'standard' | 'car_large' | 'compact';
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, variant = 'standard' }) => {
  const {
    isFavorite,
    toggleFavorite,
    setActiveListingDetail,
    startChatWithSeller
  } = useMarketplace();

  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);

  const favorite = isFavorite(listing.id);

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const conditionLabel = {
    brand_new: 'Brand New',
    foreign_used: 'Foreign Used (Tokunbo)',
    nigerian_used: 'Nigerian Used'
  }[listing.condition] || 'Used';

  const conditionColor = {
    brand_new: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    foreign_used: 'bg-blue-100 text-blue-800 border-blue-200',
    nigerian_used: 'bg-amber-100 text-amber-800 border-amber-200'
  }[listing.condition] || 'bg-slate-100 text-slate-800';

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPhone(!showPhone);
  };

  const handleChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    startChatWithSeller(listing);
  };

  if (variant === 'car_large') {
    return (
      <div
        onClick={() => setActiveListingDetail(listing)}
        className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-xl transition-all duration-200 overflow-hidden cursor-pointer flex flex-col md:flex-row"
      >
        {/* Car Image (Larger) */}
        <div className="relative w-full md:w-80 h-56 md:h-auto overflow-hidden bg-slate-100 shrink-0">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Promotion / Featured Badge */}
          {listing.promotionTier === 'vip' && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              VIP Top Ad
            </span>
          )}
          {listing.promotionTier === 'featured' && (
            <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              Featured
            </span>
          )}

          {/* Condition Tag */}
          <span className={`absolute bottom-3 left-3 text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${conditionColor}`}>
            {conditionLabel}
          </span>

          {/* Favorite Toggle */}
          <button
            onClick={e => {
              e.stopPropagation();
              toggleFavorite(listing.id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500 shadow-sm transition-colors"
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Details Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {listing.title}
              </h3>
            </div>

            {/* Price */}
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-emerald-700">
                {formatPrice(listing.price)}
              </span>
              {listing.isNegotiable && (
                <span className="text-xs text-slate-700 font-medium bg-slate-100 px-2 py-0.5 rounded">
                  Negotiable
                </span>
              )}
            </div>

            {/* Car Quick Specs Grid */}
            {listing.carDetails && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-700 text-[10px] block">Year:</span>
                  <span className="font-bold text-slate-900">{listing.carDetails.year}</span>
                </div>
                <div>
                  <span className="text-slate-700 text-[10px] block">Mileage:</span>
                  <span className="font-bold text-slate-900">{listing.carDetails.mileage.toLocaleString()} km</span>
                </div>
                <div>
                  <span className="text-slate-700 text-[10px] block">Transmission:</span>
                  <span className="font-bold text-slate-900">{listing.carDetails.transmission}</span>
                </div>
                <div>
                  <span className="text-slate-700 text-[10px] block">Fuel Type:</span>
                  <span className="font-bold text-slate-900">{listing.carDetails.fuelType}</span>
                </div>
              </div>
            )}

            {/* Location & Metadata */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-slate-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {listing.location.area ? `${listing.location.area}, ` : ''}{listing.location.city}, {listing.location.state}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {listing.datePosted}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {listing.views} views
              </span>
            </div>
          </div>

          {/* Seller & Action Buttons Bar */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <img
                src={listing.seller.avatar}
                alt={listing.seller.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-emerald-500/20"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-800">{listing.seller.name}</span>
                  {listing.seller.verified && (
                    <span title="Verified Seller">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-700 font-medium">{listing.seller.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCall}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{showPhone ? listing.seller.phone : 'Call Seller'}</span>
              </button>
              <button
                onClick={handleChat}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Marketplace Card
  return (
    <div
      onClick={() => setActiveListingDetail(listing)}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Product Photo */}
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Promotion Badge */}
          {listing.promotionTier === 'vip' && (
            <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              VIP
            </span>
          )}
          {listing.promotionTier === 'featured' && (
            <span className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              Featured
            </span>
          )}

          {/* Condition Badge */}
          <span className={`absolute bottom-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md border ${conditionColor}`}>
            {conditionLabel}
          </span>

          {/* Favorite Toggle */}
          <button
            onClick={e => {
              e.stopPropagation();
              toggleFavorite(listing.id);
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500 shadow-sm transition-colors"
            title="Save to Favorites"
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-3.5">
          {/* Price */}
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
              {formatPrice(listing.price)}
            </span>
            {listing.isNegotiable && (
              <span className="text-[10px] text-slate-700 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">
                Negotiable
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mt-1 font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 leading-snug">
            {listing.title}
          </h3>

          {/* Location */}
          <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-700 truncate">
            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="truncate">
              {listing.location.city}, {listing.location.state}
            </span>
          </div>

          {/* Date & Views */}
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-700">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-700" />
              {listing.datePosted}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-slate-700" />
              {listing.views} views
            </span>
          </div>
        </div>
      </div>

      {/* Seller & Action Footer */}
      <div className="p-3 bg-slate-50/70 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 truncate">
            <img
              src={listing.seller.avatar}
              alt={listing.seller.name}
              className="w-5 h-5 rounded-full object-cover shrink-0"
            />
            <span className="text-[11px] font-bold text-slate-700 truncate">
              {listing.seller.name}
            </span>
            {listing.seller.verified && (
              <span title="Verified Seller" className="shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </span>
            )}
          </div>
        </div>

        {/* Contact and Chat Buttons */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={handleCall}
            className="bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-bold py-1.5 px-2 rounded-lg border border-slate-200 flex items-center justify-center gap-1 transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-600" />
            <span className="truncate">{showPhone ? listing.seller.phone : 'Call'}</span>
          </button>
          <button
            onClick={handleChat}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 transition-colors shadow-xs"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};
