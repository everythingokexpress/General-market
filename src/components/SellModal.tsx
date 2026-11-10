import React, { useState } from 'react';
import {
  X,
  Upload,
  Camera,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  MapPin,
  Tag,
  ShieldCheck,
  Eye,
  Plus,
  Trash2
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { NIGERIAN_LOCATIONS } from '../data/locations';
import { useMarketplace } from '../context/MarketplaceContext';
import { ItemCondition, PromotionTier } from '../types';

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_PHOTO_PRESETS: Record<string, string[]> = {
  'cars-vehicles': [
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80'
  ],
  'phones-tablets': [
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80'
  ],
  'computers-electronics': [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
  ],
  'property': [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80'
  ],
  'fashion-clothing': [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80'
  ],
  'agriculture-farm': [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80'
  ]
};

export const SellModal: React.FC<SellModalProps> = ({ isOpen, onClose }) => {
  const { addListing, currentUser } = useMarketplace();

  // Current Step: 1 to 10
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [categoryId, setCategoryId] = useState('phones-tablets');
  const [subcategory, setSubcategory] = useState('iPhones');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'
  ]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [condition, setCondition] = useState<ItemCondition>('brand_new');
  const [state, setState] = useState('Lagos');
  const [city, setCity] = useState('Ikeja');
  const [area, setArea] = useState('Computer Village');
  const [sellerName, setSellerName] = useState(currentUser.name);
  const [sellerPhone, setSellerPhone] = useState(currentUser.phone);
  const [sellerWhatsApp, setSellerWhatsApp] = useState(currentUser.whatsapp);
  const [promotionTier, setPromotionTier] = useState<PromotionTier>('none');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentCategoryObj = CATEGORIES.find(c => c.id === categoryId);
  const currentStateObj = NIGERIAN_LOCATIONS.find(s => s.name === state);

  const handleNext = () => {
    if (currentStep < 10) {
      setCurrentStep(s => s + 1);
    } else {
      handlePublish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(s => s - 1);
    }
  };

  const handleAddSamplePhoto = () => {
    const presets = SAMPLE_PHOTO_PRESETS[categoryId] || [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ];
    const nextImg = presets[images.length % presets.length];
    setImages(prev => [...prev, nextImg]);
  };

  const handleRemovePhoto = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    const finalPrice = typeof price === 'number' ? price : 50000;
    const finalTitle = title.trim() || 'Quality ' + (currentCategoryObj?.name || 'Item');
    const finalDesc = description.trim() || 'In clean working condition. Contact for fast inspection and deal.';

    addListing({
      title: finalTitle,
      description: finalDesc,
      price: finalPrice,
      isNegotiable,
      category: categoryId,
      subcategory: subcategory || currentCategoryObj?.subcategories[0] || 'General',
      condition,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'],
      location: {
        country: 'Nigeria',
        state,
        city: city || 'Ikeja',
        area: area || ''
      },
      seller: {
        id: currentUser.id,
        name: sellerName || currentUser.name,
        phone: sellerPhone || currentUser.phone,
        whatsapp: sellerWhatsApp || currentUser.whatsapp,
        avatar: currentUser.avatar,
        verified: currentUser.verified,
        verificationBadge: currentUser.verified ? 'nin_verified' : 'none',
        rating: 5.0,
        reviewCount: 1,
        joinedDate: 'Joined recently',
        responseTime: 'Replies quickly',
        accountType: currentUser.accountType,
        location: `${city || 'Ikeja'}, ${state}`
      },
      promotionTier
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setCurrentStep(1);
    }, 2000);
  };

  const stepsHeadlines = [
    '1. Select Category',
    '2. Upload Photos',
    '3. Product Title',
    '4. Description',
    '5. Price in Naira',
    '6. Condition',
    '7. Nigerian Location',
    '8. Contact Info',
    '9. Promotion & Boost',
    '10. Preview & Publish'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              10-Step Sell Wizard
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
              {stepsHeadlines[currentStep - 1]}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 shrink-0">
          <div
            className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 10) * 100}%` }}
          />
        </div>

        {/* Step Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-12 text-center space-y-3 animate-in zoom-in-90">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Your Listing is Now Live!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Nigerian buyers can now see and contact you for "{title || 'your product'}".
              </p>
            </div>
          ) : (
            <>
              {/* STEP 1: CATEGORY */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">Select the right category for your item:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setCategoryId(cat.id);
                          setSubcategory(cat.subcategories[0] || '');
                        }}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                          categoryId === cat.id
                            ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className="text-2xl">{cat.emoji}</span>
                        <span className="text-xs leading-snug">{cat.name}</span>
                      </button>
                    ))}
                  </div>

                  {currentCategoryObj && currentCategoryObj.subcategories.length > 0 && (
                    <div className="pt-2">
                      <label className="text-xs font-bold text-slate-700 block mb-1">Subcategory:</label>
                      <select
                        value={subcategory}
                        onChange={e => setSubcategory(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        {currentCategoryObj.subcategories.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: MULTIPLE PHOTOS */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Add Product Photos</h4>
                      <p className="text-[11px] text-slate-500">First photo will be the main cover image.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddSamplePhoto}
                      className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Sample Photo
                    </button>
                  </div>

                  {/* Photo Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded-md opacity-90 hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-1 left-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Cover
                          </span>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddSamplePhoto}
                      className="aspect-square rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 flex flex-col items-center justify-center p-3 text-slate-400 hover:text-emerald-600 transition-colors"
                    >
                      <Camera className="w-6 h-6 mb-1" />
                      <span className="text-[11px] font-bold">Upload</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: TITLE */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-700 block">Product Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. 2018 Toyota Camry SE Tokunbo / iPhone 15 Pro Max 256GB"
                    className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
                  />
                  <p className="text-[11px] text-slate-400">
                    Include brand, model, and key spec for 5x more clicks.
                  </p>
                </div>
              )}

              {/* STEP 4: DESCRIPTION */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-700 block">Detailed Description</label>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe condition, specifications, reason for sale, accessories included, and pickup availability..."
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
                  />
                </div>
              )}

              {/* STEP 5: PRICE */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-700 block">Price in Nigerian Naira (₦)</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-lg font-bold text-emerald-700">₦</span>
                    <input
                      type="number"
                      value={price}
                      onChange={e => setPrice(e.target.value ? Number(e.target.value) : '')}
                      placeholder="e.g. 1500000"
                      className="w-full text-base font-bold pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={isNegotiable}
                      onChange={e => setIsNegotiable(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300"
                    />
                    <span className="text-xs font-bold text-slate-700">Price is Negotiable</span>
                  </label>
                </div>
              )}

              {/* STEP 6: CONDITION */}
              {currentStep === 6 && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 block">Item Condition</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'brand_new', title: 'Brand New', desc: 'Unopened, never used, sealed in packaging' },
                      { id: 'foreign_used', title: 'Foreign Used (Tokunbo)', desc: 'Imported from USA/UK/Europe, cleanly maintained' },
                      { id: 'nigerian_used', title: 'Nigerian Used', desc: 'Previously used locally in Nigeria, in working order' }
                    ].map(cond => (
                      <button
                        key={cond.id}
                        type="button"
                        onClick={() => setCondition(cond.id as ItemCondition)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          condition === cond.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{cond.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{cond.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 7: LOCATION */}
              {currentStep === 7 && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 block">Location in Nigeria</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">State</label>
                      <select
                        value={state}
                        onChange={e => {
                          setState(e.target.value);
                          const st = NIGERIAN_LOCATIONS.find(s => s.name === e.target.value);
                          if (st && st.popularCities.length > 0) {
                            setCity(st.popularCities[0]);
                          }
                        }}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        {NIGERIAN_LOCATIONS.map(s => (
                          <option key={s.code} value={s.name}>{s.name} State</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">City / Town</label>
                      <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="e.g. Ikeja, Lekki, Wuse"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Area / Landmark</label>
                    <input
                      type="text"
                      value={area}
                      onChange={e => setArea(e.target.value)}
                      placeholder="e.g. Computer Village, Allen Ave, Admiralty Way"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* STEP 8: SELLER / CONTACT INFO */}
              {currentStep === 8 && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 block">Seller & Contact Details</label>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Your Name / Business</label>
                    <input
                      type="text"
                      value={sellerName}
                      onChange={e => setSellerName(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={sellerPhone}
                        onChange={e => setSellerPhone(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">WhatsApp Number</label>
                      <input
                        type="tel"
                        value={sellerWhatsApp}
                        onChange={e => setSellerWhatsApp(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 9: MONETIZATION & PROMOTION */}
              {currentStep === 9 && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 block">Boost Your Ad Visibility</label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      { id: 'none', name: 'Standard Free', price: 'FREE', desc: 'Regular marketplace placement, active for 30 days' },
                      { id: 'featured', name: 'Featured Listing', price: '₦2,500', desc: 'Highlighted with badge, 5x more views on homepage and categories' },
                      { id: 'vip', name: 'VIP Top Ad', price: '₦5,000', desc: 'Top of category search results, VIP badge, SMS instant lead alert' }
                    ].map(tier => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setPromotionTier(tier.id as PromotionTier)}
                        className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          promotionTier === tier.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            {tier.name}
                            {tier.id === 'vip' && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                          </div>
                          <div className="text-[11px] text-slate-500">{tier.desc}</div>
                        </div>
                        <span className="text-xs font-black text-emerald-700 bg-white px-2 py-1 rounded-lg border border-slate-200">
                          {tier.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 10: PREVIEW & PUBLISH */}
              {currentStep === 10 && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex gap-4">
                    <img
                      src={images[0]}
                      alt="Preview"
                      className="w-24 h-24 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {condition === 'brand_new' ? 'Brand New' : condition === 'foreign_used' ? 'Tokunbo' : 'Nigerian Used'}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 mt-1 truncate">
                        {title || 'Untitled Product'}
                      </h4>
                      <p className="text-base font-black text-emerald-700 mt-0.5">
                        ₦{(price || 50000).toLocaleString()} {isNegotiable ? '(Negotiable)' : ''}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {area ? `${area}, ` : ''}{city}, {state} State
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900">
                    <strong>Ready to publish!</strong> Your listing will be visible to thousands of buyers in Nigeria immediately.
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Controls */}
        {!isSuccess && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 transition-colors ${
                currentStep === 1 ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{currentStep === 10 ? 'Publish Listing' : 'Next Step'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
