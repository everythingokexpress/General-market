import React from 'react';
import {
  Sparkles,
  Car,
  Smartphone,
  Building2,
  Shirt,
  Armchair,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ListingCard } from './ListingCard';
import { MOCK_SELLERS } from '../data/mockListings';

export const HomeSections: React.FC = () => {
  const {
    listings,
    selectedCategory,
    setSelectedCategory,
    setCurrentView,
    searchQuery,
    selectedLocation
  } = useMarketplace();

  // If search query or single category is selected, show filtered view instead of full sections
  const isFiltering = !!searchQuery || !!selectedCategory || selectedLocation.state !== 'All Nigeria';

  if (isFiltering) {
    const filteredListings = listings.filter(item => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchSub = item.subcategory.toLowerCase().includes(q);
        const matchMake = item.carDetails?.make.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCat && !matchSub && !matchMake) {
          return false;
        }
      }

      if (selectedCategory && item.category !== selectedCategory) {
        return false;
      }

      if (selectedLocation.state && selectedLocation.state !== 'All Nigeria') {
        if (!item.location.state.toLowerCase().includes(selectedLocation.state.toLowerCase())) {
          return false;
        }
      }

      return item.status === 'active';
    });

    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Search Results ({filteredListings.length})
            </h2>
            <p className="text-xs text-slate-500">
              {searchQuery ? `Matching "${searchQuery}"` : 'Filtered marketplace listings'}
              {selectedLocation.state !== 'All Nigeria' ? ` in ${selectedLocation.state}` : ''}
            </p>
          </div>
          {(selectedCategory || searchQuery || selectedLocation.state !== 'All Nigeria') && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filteredListings.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
            <h3 className="font-bold text-base text-slate-800">No listings found</h3>
            <p className="text-xs text-slate-500 mt-1">Try searching with broader terms or choose "All Nigeria".</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredListings.map(item => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Structured Homepage Sections
  const featuredListings = listings.filter(l => l.promotionTier === 'vip' || l.promotionTier === 'featured');
  const carListings = listings.filter(l => l.category === 'cars-vehicles').slice(0, 4);
  const phoneElectronicsListings = listings.filter(l => l.category === 'phones-tablets' || l.category === 'computers-electronics').slice(0, 4);
  const propertyListings = listings.filter(l => l.category === 'property').slice(0, 4);
  const fashionListings = listings.filter(l => l.category === 'fashion-clothing').slice(0, 4);
  const homeFurnitureListings = listings.filter(l => l.category === 'home-furniture' || l.category === 'appliances').slice(0, 4);
  const recentlyAdded = [...listings].sort((a, b) => b.views - a.views).slice(0, 4);
  const verifiedSellersList = Object.values(MOCK_SELLERS).filter(s => s.verified);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-10">
      
      {/* 1. Featured Listings Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Featured Listings
              </h2>
              <p className="text-[11px] text-slate-500">
                Top verified deals in Nigeria
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {featuredListings.map(item => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* 2. Cars & Vehicles Section */}
      <section className="bg-slate-900 text-white -mx-3 sm:-mx-6 px-3 sm:px-6 py-8 rounded-3xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-600 rounded-xl">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-white">
                Cars & Vehicles Marketplace
              </h2>
              <p className="text-xs text-slate-300">
                Foreign Used (Tokunbo) & Verified Nigerian Used Cars
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('cars-vehicles');
              setCurrentView('cars');
            }}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View All Cars</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {carListings.map(item => (
            <ListingCard key={item.id} listing={item} variant="car_large" />
          ))}
        </div>
      </section>

      {/* 3. Phones & Electronics Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 text-blue-800 rounded-lg">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Phones & Electronics
              </h2>
              <p className="text-[11px] text-slate-500">
                Smartphones, MacBooks, gaming & accessories from Computer Village & beyond
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('phones-tablets');
            }}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
          >
            <span>See More</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {phoneElectronicsListings.map(item => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* 4. Property & Real Estate Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-100 text-purple-800 rounded-lg">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Property & Real Estate
              </h2>
              <p className="text-[11px] text-slate-500">
                Duplexes, serviced flats, shortlets & land in Lekki, Abuja, Port Harcourt
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCategory('property')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
          >
            <span>See More</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {propertyListings.map(item => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* 5. Fashion & Clothing Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-rose-100 text-rose-800 rounded-lg">
              <Shirt className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Fashion, Native Wear & Shoes
              </h2>
              <p className="text-[11px] text-slate-500">
                Bespoke senator kaftans, fabrics, sneakers and luxury accessories
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCategory('fashion-clothing')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
          >
            <span>See More</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {fashionListings.map(item => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* 6. Home & Furniture Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-teal-100 text-teal-800 rounded-lg">
              <Armchair className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Home, Furniture & Appliances
              </h2>
              <p className="text-[11px] text-slate-500">
                Living room suites, solar inverters, generators & home decor
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCategory('home-furniture')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
          >
            <span>See More</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {homeFurnitureListings.map(item => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* 7. Recently Added Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 text-slate-800 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Recently Added Listings
              </h2>
              <p className="text-[11px] text-slate-500">
                Freshly posted ads from sellers across Nigeria
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {recentlyAdded.map(item => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* 8. Verified Sellers Section */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Verified Nigerian Sellers & Dealers
              </h2>
              <p className="text-xs text-slate-500">
                Identity and CAC verified merchants with stellar ratings
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {verifiedSellersList.map(seller => (
            <div
              key={seller.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5 hover:bg-white hover:border-emerald-300 transition-all"
            >
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {seller.name}
                  </h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {seller.businessName || seller.location}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                  <span className="text-amber-500 font-bold">★ {seller.rating}</span>
                  <span>({seller.reviewCount} reviews)</span>
                  <span>•</span>
                  <span>{seller.responseTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
