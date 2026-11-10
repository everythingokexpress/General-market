import React, { useState } from 'react';
import {
  X,
  Heart,
  Share2,
  MapPin,
  Clock,
  Eye,
  ShieldCheck,
  Phone,
  MessageSquare,
  AlertTriangle,
  Flag,
  Car,
  Building2,
  Smartphone,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { Listing } from '../types';
import { useMarketplace } from '../context/MarketplaceContext';

interface ProductDetailModalProps {
  listing: Listing;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ listing, onClose }) => {
  const {
    isFavorite,
    toggleFavorite,
    startChatWithSeller,
    reportListing,
    setIsSafetyModalOpen
  } = useMarketplace();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportReason, setReportReason] = useState<any>('Scam / Fraud');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [customOfferPrice, setCustomOfferPrice] = useState('');

  const favorite = isFavorite(listing.id);

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const conditionLabel = {
    brand_new: 'Brand New (0 km / Unopened)',
    foreign_used: 'Foreign Used (Tokunbo)',
    nigerian_used: 'Nigerian Used'
  }[listing.condition] || 'Used';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    reportListing(listing.id, reportReason, reportDetails || 'User flagged as suspicious');
    setReportSuccess(true);
    setTimeout(() => {
      setIsReporting(false);
      setReportSuccess(false);
    }, 2000);
  };

  const handleQuickOffer = (offerPct: number) => {
    const offerAmt = Math.round(listing.price * offerPct);
    const msg = `Hello ${listing.seller.name}, I am interested in your "${listing.title}". Would you accept ₦${offerAmt.toLocaleString()}?`;
    startChatWithSeller(listing, msg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Listing ID: #{listing.id.toUpperCase()}
            </span>
            {listing.promotionTier === 'vip' && (
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <Sparkles className="w-2.5 h-2.5" />
                VIP Ad
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full text-slate-600 hover:bg-slate-200 transition-colors relative"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-7 right-0 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>
            <button
              onClick={() => toggleFavorite(listing.id)}
              className="p-1.5 rounded-full text-slate-600 hover:text-rose-500 hover:bg-slate-200 transition-colors"
              title="Save Item"
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Photos & Main Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Gallery Section */}
            <div>
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={listing.images[activeImageIndex] || listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />

                {listing.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(i => (i === 0 ? listing.images.length - 1 : i - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(i => (i === listing.images.length - 1 ? 0 : i + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {activeImageIndex + 1} / {listing.images.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              {listing.images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx ? 'border-emerald-600 scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Main Details & Price */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
                    {conditionLabel}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {listing.datePosted}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {listing.views} views
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  {listing.title}
                </h1>

                {/* Price Display in Naira */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                    {formatPrice(listing.price)}
                  </span>
                  {listing.isNegotiable && (
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                      Negotiable
                    </span>
                  )}
                </div>

                {/* Location */}
                <div className="mt-3 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {listing.location.area ? `${listing.location.area}, ` : ''}{listing.location.city}, {listing.location.state} State, Nigeria
                  </span>
                </div>

                {/* Quick Negotiation Offers */}
                {listing.isNegotiable && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-600 mb-2">
                      Make a quick offer to the seller:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleQuickOffer(0.95)}
                        className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                      >
                        ₦{Math.round(listing.price * 0.95).toLocaleString()} (-5%)
                      </button>
                      <button
                        onClick={() => handleQuickOffer(0.9)}
                        className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                      >
                        ₦{Math.round(listing.price * 0.9).toLocaleString()} (-10%)
                      </button>
                      <button
                        onClick={() => handleQuickOffer(0.85)}
                        className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                      >
                        ₦{Math.round(listing.price * 0.85).toLocaleString()} (-15%)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Primary Contact CTAs */}
              <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    startChatWithSeller(listing);
                    onClose();
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start Chat with Seller</span>
                </button>

                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{showPhone ? listing.seller.phone : 'Show Seller Phone Number'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Detailed Specs (if Car, Property, or Phone) */}
          {listing.carDetails && (
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
              <h3 className="font-extrabold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <Car className="w-4 h-4 text-emerald-600" />
                <span>Vehicle Specifications & Features</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Make</span>
                  <span className="font-bold text-slate-900">{listing.carDetails.make}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Model</span>
                  <span className="font-bold text-slate-900">{listing.carDetails.model}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Year</span>
                  <span className="font-bold text-slate-900">{listing.carDetails.year}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Mileage</span>
                  <span className="font-bold text-slate-900">{listing.carDetails.mileage.toLocaleString()} km</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Transmission</span>
                  <span className="font-bold text-slate-900">{listing.carDetails.transmission}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Fuel Type</span>
                  <span className="font-bold text-slate-900">{listing.carDetails.fuelType}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Body Type</span>
                  <span className="font-bold text-slate-900">{listing.carDetails.bodyType}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Color</span>
                  <span className="font-bold text-slate-900">{listing.carDetails.color}</span>
                </div>
              </div>
            </div>
          )}

          {listing.propertyDetails && (
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
              <h3 className="font-extrabold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Property Features</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Property Type</span>
                  <span className="font-bold text-slate-900">{listing.propertyDetails.propertyType}</span>
                </div>
                {listing.propertyDetails.bedrooms && (
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Bedrooms</span>
                    <span className="font-bold text-slate-900">{listing.propertyDetails.bedrooms} Rooms</span>
                  </div>
                )}
                {listing.propertyDetails.bathrooms && (
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Bathrooms</span>
                    <span className="font-bold text-slate-900">{listing.propertyDetails.bathrooms} Baths</span>
                  </div>
                )}
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Serviced</span>
                  <span className="font-bold text-slate-900">{listing.propertyDetails.serviced ? 'Yes (24/7 Power)' : 'No'}</span>
                </div>
              </div>
            </div>
          )}

          {listing.electronicsDetails && (
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
              <h3 className="font-extrabold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Technical Specifications</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Brand</span>
                  <span className="font-bold text-slate-900">{listing.electronicsDetails.brand}</span>
                </div>
                {listing.electronicsDetails.storage && (
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Storage</span>
                    <span className="font-bold text-slate-900">{listing.electronicsDetails.storage}</span>
                  </div>
                )}
                {listing.electronicsDetails.ram && (
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">RAM</span>
                    <span className="font-bold text-slate-900">{listing.electronicsDetails.ram}</span>
                  </div>
                )}
                {listing.electronicsDetails.screenSize && (
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Display</span>
                    <span className="font-bold text-slate-900">{listing.electronicsDetails.screenSize}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-2">Description</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              {listing.description}
            </p>
          </div>

          {/* Seller Profile Card */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={listing.seller.avatar}
                alt={listing.seller.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20 shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-900">{listing.seller.name}</h4>
                  {listing.seller.verified && (
                    <span className="inline-flex items-center gap-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{listing.seller.businessName || listing.seller.location}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                  <span>★ {listing.seller.rating} ({listing.seller.reviewCount} reviews)</span>
                  <span>•</span>
                  <span>{listing.seller.responseTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  startChatWithSeller(listing);
                  onClose();
                }}
                className="flex-1 sm:flex-none bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Message Seller
              </button>
            </div>
          </div>

          {/* Nigerian Trust & Safety Notice Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <h4 className="font-bold text-amber-950 mb-1">
                General Market Safety Tip for Nigerian Buyers
              </h4>
              <p className="text-amber-800 leading-relaxed mb-2">
                • <strong>Do not send upfront deposits or delivery fees</strong> before you have physically inspected and verified the item and seller documents.
                <br />
                • Meet in public daylight places (shopping malls, fuel stations, tech plazas).
                <br />
                • For vehicles and phones, confirm VIN customs papers and IMEI status before payment.
              </p>
              <button
                onClick={() => setIsSafetyModalOpen(true)}
                className="text-emerald-700 font-bold underline cursor-pointer"
              >
                Read Full Safety Guide →
              </button>
            </div>
          </div>

          {/* Report Listing Button */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => setIsReporting(true)}
              className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Report this listing as suspicious</span>
            </button>
          </div>

          {/* Report Form Drawer if triggered */}
          {isReporting && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
              {reportSuccess ? (
                <div className="flex items-center gap-2 text-rose-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-rose-600" />
                  <span>Thank you! Your report has been flagged for our moderation team.</span>
                </div>
              ) : (
                <form onSubmit={handleSendReport} className="space-y-3">
                  <h4 className="font-bold text-xs text-rose-950">Report Reason:</h4>
                  <select
                    value={reportReason}
                    onChange={e => setReportReason(e.target.value as any)}
                    className="w-full text-xs p-2 bg-white border border-rose-200 rounded-lg text-slate-800"
                  >
                    <option value="Scam / Fraud">Scam / Requesting upfront deposit</option>
                    <option value="Prohibited item">Prohibited or illegal item</option>
                    <option value="Inaccurate description">Inaccurate description or price</option>
                    <option value="Duplicate ad">Duplicate ad</option>
                    <option value="Harassment">Offensive or inappropriate</option>
                  </select>
                  <textarea
                    rows={2}
                    placeholder="Provide details for the admin review..."
                    value={reportDetails}
                    onChange={e => setReportDetails(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-rose-200 rounded-lg"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsReporting(false)}
                      className="text-xs px-3 py-1.5 text-slate-600 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-xs px-4 py-1.5 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700"
                    >
                      Submit Report
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
