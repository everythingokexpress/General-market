import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { useMarketplace } from '../context/MarketplaceContext';
import { ChevronRight, Store, ArrowLeft } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const {
    setSelectedCategory,
    setSelectedSubcategory,
    setCurrentView
  } = useMarketplace();

  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const handleSelectSub = (catId: string, sub: string) => {
    setSelectedCategory(catId);
    setSelectedSubcategory(sub);
    if (catId === 'cars-vehicles') {
      setCurrentView('cars');
    } else {
      setCurrentView('home');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Browse All Marketplace Categories
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Discover verified Nigerian listings organized by department
          </p>
        </div>
        <button
          onClick={() => setCurrentView('home')}
          className="text-xs font-bold text-slate-600 hover:text-emerald-700 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map(cat => {
          const isExpanded = expandedCat === cat.id;
          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3">
                  <div className="text-3xl p-2 bg-slate-50 rounded-2xl border border-slate-100 shrink-0">
                    {cat.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-900 truncate">{cat.name}</h3>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {cat.count.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Subcategories list */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  {cat.subcategories.slice(0, isExpanded ? undefined : 4).map(sub => (
                    <button
                      key={sub}
                      onClick={() => handleSelectSub(cat.id, sub)}
                      className="w-full text-left text-xs text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60 px-2 py-1 rounded-lg flex items-center justify-between transition-colors"
                    >
                      <span className="truncate">{sub}</span>
                      <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                    </button>
                  ))}

                  {cat.subcategories.length > 4 && (
                    <button
                      onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                      className="text-[11px] font-bold text-emerald-600 hover:underline pt-1 px-2 block"
                    >
                      {isExpanded ? 'Show less' : `+${cat.subcategories.length - 4} more subcategories`}
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSubcategory(null);
                    if (cat.id === 'cars-vehicles') {
                      setCurrentView('cars');
                    } else {
                      setCurrentView('home');
                    }
                  }}
                  className="w-full py-2 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  Explore {cat.name}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
