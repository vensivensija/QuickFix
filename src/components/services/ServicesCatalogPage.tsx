import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../data/categories';
import { CategoryIcon } from '../common/CategoryIcon';
import { useApp } from '../../context/AppContext';

export const ServicesCatalogPage: React.FC = () => {
  const { setSelectedCategory, setActiveTab, setIsServiceRequestModalOpen, setIsEmergencyModalOpen } = useApp();
  const [filter, setFilter] = useState<'all' | 'emergency' | 'popular'>('all');
  const [term, setTerm] = useState('');

  const filteredCategories = SERVICE_CATEGORIES.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(term.toLowerCase()) || 
                          cat.description.toLowerCase().includes(term.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'emergency') return cat.emergency;
    if (filter === 'popular') return cat.popular;
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            All Service Categories
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            QuickFix provides expert doorstep assistance across 12 essential home, automotive, and emergency repair domains.
          </p>

          {/* Search bar & filter tabs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Filter services..."
                className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
              />
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filter === 'all' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All (12)
              </button>
              <button
                onClick={() => setFilter('popular')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filter === 'popular' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Most Popular
              </button>
              <button
                onClick={() => setFilter('emergency')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filter === 'emergency' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Emergency Ready
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-xs">
                    <CategoryIcon iconName={cat.slug} className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {cat.emergency && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                        Urgent Available
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-500">
                      Starts ₹{cat.basePrice}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setActiveTab('professionals');
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold text-center transition-colors"
                >
                  View Nearby Pros
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setIsServiceRequestModalOpen(true);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center transition-colors shadow-xs"
                >
                  Request Service
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
