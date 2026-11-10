import React from 'react';
import { CATEGORIES } from '../data/categories';
import { useMarketplace } from '../context/MarketplaceContext';
import { ChevronRight } from 'lucide-react';

export const CategoryPills: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    setSelectedSubcategory,
    setCurrentView
  } = useMarketplace();

  const handleSelectCategory = (catId: string) => {
    if (selectedCategory === catId) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(catId);
      setSelectedSubcategory(null);
      if (catId === 'cars-vehicles') {
        // give user option to either see in grid or dedicated car market
      }
    }
  };

  return (
    <div className="bg-white border-b border-slate-200/80 py-4 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span>Explore Categories</span>
            <span className="text-xs font-normal text-slate-700">
              ({CATEGORIES.length} main markets)
            </span>
          </h2>
          <button
            onClick={() => setCurrentView('categories')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable / Wrap Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="text-2xl mb-1 filter drop-shadow-xs">{cat.emoji}</div>
                <span className={`text-xs font-bold leading-tight truncate w-full ${
                  isSelected ? 'text-emerald-800' : 'text-slate-800'
                }`}>
                  {cat.name}
                </span>
                <span className="text-[10px] text-slate-700 mt-0.5">
                  {cat.count.toLocaleString()} ads
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
