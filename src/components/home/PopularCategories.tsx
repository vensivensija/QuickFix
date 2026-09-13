import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../data/categories';
import { CategoryIcon } from '../common/CategoryIcon';
import { useApp } from '../../context/AppContext';
import { ServiceCategory } from '../../types';

export const PopularCategories: React.FC = () => {
  const { setSelectedCategory, setActiveTab, setIsServiceRequestModalOpen } = useApp();

  const handleCategoryClick = (category: ServiceCategory) => {
    setSelectedCategory(category.slug);
    setActiveTab('professionals');
  };

  const handleQuickRequest = (category: ServiceCategory, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategory(category.slug);
    setIsServiceRequestModalOpen(true);
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Service Directory</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore All Service Categories
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              From emergency water leaks to electronic appliance repairs, select a category to view verified technicians near you.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory(null);
              setActiveTab('services');
            }}
            className="text-sm font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1.5 self-start md:self-auto group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 12 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {SERVICE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className="group bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-brand-500 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              {/* Emergency indicator badge if urgent */}
              {cat.emergency && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-4 ring-rose-50" title="Emergency Available" />
              )}

              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors flex items-center justify-center mb-3 shadow-xs">
                  <CategoryIcon iconName={cat.slug} className="w-6 h-6" />
                </div>

                <h3 className="font-bold text-sm text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1 mb-1">
                  {cat.name}
                </h3>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">From</span>
                  <span className="text-xs font-bold text-slate-800">₹{cat.basePrice}</span>
                </div>

                <button
                  onClick={(e) => handleQuickRequest(cat, e)}
                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 text-brand-600 text-[11px] font-semibold transition-colors"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
