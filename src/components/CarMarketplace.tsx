import React, { useState, useMemo } from 'react';
import {
  Car,
  Filter,
  ArrowUpDown,
  RotateCcw,
  Fuel,
  Gauge,
  Calendar,
  Sparkles,
  Search,
  CheckCircle2,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ListingCard } from './ListingCard';
import { NIGERIAN_LOCATIONS } from '../data/locations';

const CAR_MAKES = [
  'All Makes',
  'Toyota',
  'Lexus',
  'Mercedes-Benz',
  'Honda',
  'Hyundai',
  'Ford',
  'Kia',
  'BMW',
  'Land Rover / Range Rover',
  'Nissan',
  'Audi'
];

const BODY_TYPES = [
  'All Body Types',
  'SUV',
  'Sedan',
  'Hatchback',
  'Pickup',
  'Coupe',
  'Van',
  'Truck'
];

const YEARS = Array.from({ length: 25 }, (_, i) => 2025 - i);

export const CarMarketplace: React.FC = () => {
  const {
    listings,
    carFilters,
    setCarFilters,
    selectedLocation,
    setSelectedLocation,
    setIsSellModalOpen
  } = useMarketplace();

  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'year_new' | 'mileage_low'>('recommended');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const resetFilters = () => {
    setCarFilters({
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
  };

  // Filter listings for cars
  const carListings = useMemo(() => {
    return listings.filter(item => {
      // Must be cars category
      if (item.category !== 'cars-vehicles') return false;

      // Location filter
      if (selectedLocation.state && selectedLocation.state !== 'All Nigeria') {
        if (!item.location.state.toLowerCase().includes(selectedLocation.state.toLowerCase())) {
          return false;
        }
      }

      // Car Make
      if (carFilters.make && carFilters.make !== 'All Makes') {
        if (!item.carDetails?.make?.toLowerCase().includes(carFilters.make.toLowerCase()) &&
            !item.title.toLowerCase().includes(carFilters.make.toLowerCase())) {
          return false;
        }
      }

      // Model
      if (carFilters.model) {
        if (!item.carDetails?.model?.toLowerCase().includes(carFilters.model.toLowerCase()) &&
            !item.title.toLowerCase().includes(carFilters.model.toLowerCase())) {
          return false;
        }
      }

      // Year
      if (carFilters.minYear && item.carDetails?.year && item.carDetails.year < carFilters.minYear) {
        return false;
      }
      if (carFilters.maxYear && item.carDetails?.year && item.carDetails.year > carFilters.maxYear) {
        return false;
      }

      // Price
      if (carFilters.minPrice && item.price < carFilters.minPrice) {
        return false;
      }
      if (carFilters.maxPrice && item.price > carFilters.maxPrice) {
        return false;
      }

      // Max Mileage
      if (carFilters.maxMileage && item.carDetails?.mileage && item.carDetails.mileage > carFilters.maxMileage) {
        return false;
      }

      // Transmission
      if (carFilters.transmission && item.carDetails?.transmission !== carFilters.transmission) {
        return false;
      }

      // Fuel
      if (carFilters.fuelType && carFilters.fuelType !== 'All' && item.carDetails?.fuelType !== carFilters.fuelType) {
        return false;
      }

      // Body Type
      if (carFilters.bodyType && carFilters.bodyType !== 'All Body Types' && item.carDetails?.bodyType !== carFilters.bodyType) {
        return false;
      }

      // Condition
      if (carFilters.condition && item.condition !== carFilters.condition) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'year_new') return (b.carDetails?.year || 0) - (a.carDetails?.year || 0);
      if (sortBy === 'mileage_low') return (a.carDetails?.mileage || 999999) - (b.carDetails?.mileage || 999999);
      return (b.promotionTier === 'vip' ? 2 : b.promotionTier === 'featured' ? 1 : 0) -
             (a.promotionTier === 'vip' ? 2 : a.promotionTier === 'featured' ? 1 : 0);
    });
  }, [listings, carFilters, selectedLocation, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
      
      {/* Car Marketplace Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white mb-8 overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-emerald-500/30">
            <Car className="w-3.5 h-3.5" />
            <span>Dedicated Autos & Vehicles Market</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Find Clean Tokunbo & Nigerian Used Cars
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mb-5">
            Verified dealers, custom duty certified, low mileage inspections across Lagos, Abuja, Port Harcourt and nationwide.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setCarFilters(f => ({ ...f, condition: 'foreign_used' }))}
              className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              Direct Foreign Used (Tokunbo)
            </button>
            <button
              onClick={() => setCarFilters(f => ({ ...f, bodyType: 'SUV' }))}
              className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              SUVs & Crossovers
            </button>
            <button
              onClick={() => setCarFilters(f => ({ ...f, make: 'Toyota' }))}
              className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              Toyota Camry & Corolla
            </button>
            <button
              onClick={() => setCarFilters(f => ({ ...f, make: 'Lexus' }))}
              className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              Lexus RX 350 / ES 350
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter & Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Filter Sidebar (Desktop) */}
        <div className="hidden lg:block bg-white p-5 rounded-2xl border border-slate-200 shadow-xs h-fit space-y-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span>Vehicle Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-slate-700 hover:text-emerald-700 flex items-center gap-1 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Condition: Tokunbo / Brand New / Nigerian Used */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Condition</label>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { id: '', label: 'All Conditions' },
                { id: 'foreign_used', label: 'Foreign Used (Tokunbo)' },
                { id: 'nigerian_used', label: 'Nigerian Used' },
                { id: 'brand_new', label: 'Brand New (0 km)' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setCarFilters(f => ({ ...f, condition: opt.id as any }))}
                  className={`text-left text-xs px-3 py-2 rounded-lg font-medium transition-colors ${
                    carFilters.condition === opt.id
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-300'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Make */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Make / Brand</label>
            <select
              value={carFilters.make || 'All Makes'}
              onChange={e => setCarFilters(f => ({ ...f, make: e.target.value === 'All Makes' ? '' : e.target.value }))}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
            >
              {CAR_MAKES.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>

          {/* Model input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Model</label>
            <input
              type="text"
              value={carFilters.model || ''}
              onChange={e => setCarFilters(f => ({ ...f, model: e.target.value }))}
              placeholder="e.g. Camry, RX 350, C300, Civic"
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
            />
          </div>

          {/* Year Range */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Year of Manufacture</label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={carFilters.minYear || ''}
                onChange={e => setCarFilters(f => ({ ...f, minYear: e.target.value ? Number(e.target.value) : undefined }))}
                className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="">From Year</option>
                {YEARS.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <select
                value={carFilters.maxYear || ''}
                onChange={e => setCarFilters(f => ({ ...f, maxYear: e.target.value ? Number(e.target.value) : undefined }))}
                className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="">To Year</option>
                {YEARS.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range in Naira */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Price Range (₦)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min ₦"
                value={carFilters.minPrice || ''}
                onChange={e => setCarFilters(f => ({ ...f, minPrice: e.target.value ? Number(e.target.value) : undefined }))}
                className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
              <input
                type="number"
                placeholder="Max ₦"
                value={carFilters.maxPrice || ''}
                onChange={e => setCarFilters(f => ({ ...f, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
                className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* Max Mileage */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Max Mileage (km)</label>
            <select
              value={carFilters.maxMileage || ''}
              onChange={e => setCarFilters(f => ({ ...f, maxMileage: e.target.value ? Number(e.target.value) : undefined }))}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="">Any Mileage</option>
              <option value="30000">Under 30,000 km</option>
              <option value="60000">Under 60,000 km</option>
              <option value="100000">Under 100,000 km</option>
              <option value="150000">Under 150,000 km</option>
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Transmission</label>
            <div className="grid grid-cols-2 gap-1.5">
              {['Automatic', 'Manual'].map(tr => (
                <button
                  key={tr}
                  onClick={() => setCarFilters(f => ({ ...f, transmission: f.transmission === tr ? '' : tr as any }))}
                  className={`text-xs py-2 rounded-lg font-medium border ${
                    carFilters.transmission === tr
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tr}
                </button>
              ))}
            </div>
          </div>

          {/* Body Type */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Body Type</label>
            <select
              value={carFilters.bodyType || 'All Body Types'}
              onChange={e => setCarFilters(f => ({ ...f, bodyType: e.target.value === 'All Body Types' ? '' : e.target.value }))}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              {BODY_TYPES.map(bt => (
                <option key={bt} value={bt}>{bt}</option>
              ))}
            </select>
          </div>

          {/* Nigerian Location State */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Location in Nigeria</label>
            <select
              value={selectedLocation.state}
              onChange={e => setSelectedLocation({ ...selectedLocation, state: e.target.value })}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="All Nigeria">All Nigeria</option>
              {NIGERIAN_LOCATIONS.map(st => (
                <option key={st.name} value={st.name}>{st.name} State</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Listings Column */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Action & Sorting Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">
                {carListings.length} Vehicles Available
              </span>
              {selectedLocation.state !== 'All Nigeria' && (
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                  in {selectedLocation.state}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="lg:hidden bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5 text-emerald-600" />
                <span>Filters</span>
              </button>

              {/* Sorting */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs py-1.5 px-2.5 rounded-xl"
                >
                  <option value="recommended">Featured First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="year_new">Year: Newest First</option>
                  <option value="mileage_low">Lowest Mileage</option>
                </select>
              </div>
            </div>
          </div>

          {/* Car Listing Showcase Cards */}
          {carListings.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
              <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">No vehicles matched these filters</h3>
              <p className="text-xs text-slate-500 mb-4">Try clearing some of the vehicle make, year or mileage filters.</p>
              <button
                onClick={resetFilters}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {carListings.map(carItem => (
                <ListingCard
                  key={carItem.id}
                  listing={carItem}
                  variant="car_large"
                />
              ))}
            </div>
          )}

          {/* Sell Car CTA Banner */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-emerald-950">
                Are you a Car Dealer or Private Owner in Nigeria?
              </h4>
              <p className="text-xs text-emerald-800">
                List your car on General Market and reach over 250,000 verified Nigerian car buyers today.
              </p>
            </div>
            <button
              onClick={() => setIsSellModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm whitespace-nowrap cursor-pointer"
            >
              Post Car for Free
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Filter Modal/Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Filter className="w-4 h-4 text-emerald-600" />
                <span>Filter Vehicles</span>
              </div>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="text-xs text-slate-500 font-bold"
              >
                Close
              </button>
            </div>

            {/* Same filters in mobile view */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Make</label>
              <select
                value={carFilters.make || 'All Makes'}
                onChange={e => setCarFilters(f => ({ ...f, make: e.target.value === 'All Makes' ? '' : e.target.value }))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                {CAR_MAKES.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Condition</label>
              <select
                value={carFilters.condition || ''}
                onChange={e => setCarFilters(f => ({ ...f, condition: e.target.value as any }))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="">All Conditions</option>
                <option value="foreign_used">Foreign Used (Tokunbo)</option>
                <option value="nigerian_used">Nigerian Used</option>
                <option value="brand_new">Brand New</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Max Price (₦)</label>
              <input
                type="number"
                placeholder="e.g. 25,000,000"
                value={carFilters.maxPrice || ''}
                onChange={e => setCarFilters(f => ({ ...f, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={() => {
                  resetFilters();
                  setIsFilterDrawerOpen(false);
                }}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
