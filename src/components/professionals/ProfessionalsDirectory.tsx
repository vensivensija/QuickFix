import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  ChevronDown,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SERVICE_CATEGORIES } from '../../data/categories';
import { Professional } from '../../types';

export const ProfessionalsDirectory: React.FC = () => {
  const { 
    professionals, 
    userLocation, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery, 
    setSearchQuery,
    setSelectedProForView,
    setSelectedProForBooking,
    setIsServiceRequestModalOpen
  } = useApp();

  // Sorting state
  // Supported sort options: 'highest-rating' | 'lowest-rating' | 'nearest' | 'lowest-price' | 'most-reviewed' | 'available-now'
  const [sortBy, setSortBy] = useState<string>('highest-rating');

  // Filter states
  const [minRating, setMinRating] = useState<number>(0);
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [onlyAvailableNow, setOnlyAvailableNow] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Filter & Sort logic
  const filteredAndSortedProfessionals = useMemo(() => {
    return professionals
      .filter((pro) => {
        // Search query filter (matches name, category name, about, or services offered)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesCategory = pro.serviceCategoryName.toLowerCase().includes(q) || 
                                  pro.serviceCategory.toLowerCase().includes(q);
          const matchesName = pro.name.toLowerCase().includes(q);
          const matchesAbout = pro.about.toLowerCase().includes(q);
          const matchesServices = pro.servicesOffered.some(s => s.title.toLowerCase().includes(q));
          
          if (!matchesCategory && !matchesName && !matchesAbout && !matchesServices) {
            return false;
          }
        }

        // Selected category pill filter
        if (selectedCategory && selectedCategory !== 'all') {
          if (pro.serviceCategory !== selectedCategory) {
            return false;
          }
        }

        // Rating filter
        if (minRating > 0 && pro.rating < minRating) {
          return false;
        }

        // Distance filter
        if (pro.distanceKm > maxDistance) {
          return false;
        }

        // Price filter
        if (pro.estimatedCharge > maxPrice) {
          return false;
        }

        // Available Now filter
        if (onlyAvailableNow && !pro.availableNow) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'highest-rating':
            return b.rating - a.rating;
          case 'lowest-rating':
            return a.rating - b.rating;
          case 'nearest':
            return a.distanceKm - b.distanceKm;
          case 'lowest-price':
            return a.estimatedCharge - b.estimatedCharge;
          case 'most-reviewed':
            return b.reviewCount - a.reviewCount;
          case 'available-now':
            // Available now first, then by rating
            if (a.availableNow === b.availableNow) {
              return b.rating - a.rating;
            }
            return a.availableNow ? -1 : 1;
          default:
            return 0;
        }
      });
  }, [professionals, searchQuery, selectedCategory, minRating, maxDistance, maxPrice, onlyAvailableNow, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setMinRating(0);
    setMaxDistance(10);
    setMaxPrice(1000);
    setOnlyAvailableNow(false);
    setSortBy('highest-rating');
  };

  const handleViewProfile = (pro: Professional) => {
    setSelectedProForView(pro);
  };

  const handleBookNow = (pro: Professional) => {
    setSelectedProForBooking(pro);
    setIsServiceRequestModalOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Nearby Service Professionals
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Comparing available verified technicians near <strong className="text-slate-800">{userLocation}</strong>
              </p>
            </div>

            {/* Total count badge */}
            <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
              Showing {filteredAndSortedProfessionals.length} Professionals
            </div>
          </div>

          {/* Search bar & Category Pills */}
          <div className="mt-6 space-y-3">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search professionals by service (e.g. Plumber, Electrician, Tyre Puncture, AC Repair, Water Pipe Leakage)..."
                className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category horizontal scroll pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                  !selectedCategory 
                    ? 'bg-brand-600 text-white shadow-xs' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Categories
              </button>
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                    selectedCategory === cat.slug 
                      ? 'bg-brand-600 text-white shadow-xs' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle & Sort Bar */}
        <div className="flex sm:hidden items-center justify-between gap-2 mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex-1 py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 shadow-xs"
          >
            <Filter className="w-3.5 h-3.5 text-brand-600" />
            <span>Filters ({minRating > 0 || maxDistance < 10 || maxPrice < 1000 || onlyAvailableNow ? 'Active' : 'All'})</span>
          </button>
          
          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 appearance-none focus:outline-none shadow-xs"
            >
              <option value="highest-rating">Sort: Highest Rating</option>
              <option value="lowest-rating">Sort: Lowest Rating</option>
              <option value="nearest">Sort: Nearest</option>
              <option value="lowest-price">Sort: Lowest Price</option>
              <option value="most-reviewed">Sort: Most Reviewed</option>
              <option value="available-now">Sort: Available Now</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Main Grid: Sidebar Filters + Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Filters Sidebar (Desktop + Mobile Collapsible) */}
          <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-6`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-600" />
                <h3 className="font-bold text-sm text-slate-900">Filters</h3>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-brand-600 hover:text-brand-800 font-medium flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Desktop Sort Dropdown */}
            <div className="hidden sm:block space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="highest-rating">Highest Rating</option>
                <option value="lowest-rating">Lowest Rating</option>
                <option value="nearest">Nearest First</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="most-reviewed">Most Reviewed</option>
                <option value="available-now">Available Now</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Availability
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyAvailableNow}
                  onChange={(e) => setOnlyAvailableNow(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <span className="font-medium">Show "Available Now" Only</span>
              </label>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Customer Rating
              </label>
              <div className="space-y-1.5">
                {[
                  { label: 'All Ratings (Diverse)', val: 0 },
                  { label: '4.5 ★ & above', val: 4.5 },
                  { label: '4.0 ★ & above', val: 4.0 },
                  { label: '3.5 ★ & above', val: 3.5 }
                ].map((r) => (
                  <button
                    key={r.val}
                    onClick={() => setMinRating(r.val)}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                      minRating === r.val 
                        ? 'bg-brand-50 text-brand-700 font-bold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{r.label}</span>
                    {minRating === r.val && <Check className="w-3.5 h-3.5 text-brand-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Distance Radius
                </label>
                <span className="text-xs font-bold text-tealbrand-700">
                  Within {maxDistance} km
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={maxDistance}
                onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                className="w-full accent-tealbrand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 km</span>
                <span>5 km</span>
                <span>10 km</span>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Max Estimated Price
                </label>
                <span className="text-xs font-bold text-brand-700">
                  Up to ₹{maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹150</span>
                <span>₹500</span>
                <span>₹1000</span>
              </div>
            </div>

            {/* Note about realistic ratings */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
              <p className="flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-brand-600 flex-shrink-0 mt-0.5" />
                <span>QuickFix lists professionals with diverse ratings, prices, and proximity so you can choose the best balance for your budget and speed.</span>
              </p>
            </div>

          </div>

          {/* Professionals List Section (3 columns on desktop) */}
          <div className="lg:col-span-3 space-y-4">
            
            {filteredAndSortedProfessionals.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  No professionals match your current filters
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting the maximum distance, clearing search queries, or resetting rating filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-2 px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {filteredAndSortedProfessionals.map((pro) => (
                  <div
                    key={pro.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <div className="p-5">
                      
                      {/* Top Row: Photo + Name + Category + Experience */}
                      <div className="flex items-start gap-3.5 mb-3.5">
                        <div className="relative flex-shrink-0">
                          <img
                            src={pro.profileImage}
                            alt={pro.name}
                            className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
                          />
                          {pro.availableNow ? (
                            <span 
                              className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" 
                              title="Available Now" 
                            />
                          ) : (
                            <span 
                              className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-500 border-2 border-white rounded-full" 
                              title="Busy / Scheduled" 
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-base text-slate-900 truncate">
                              {pro.name}
                            </h3>
                            {pro.verified && (
                              <span title="Verified Background">
                                <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0" />
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-semibold text-xs text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
                              {pro.serviceCategoryName}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {pro.experienceYears} yrs exp.
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-500 mt-1 truncate">
                            {pro.location}
                          </p>
                        </div>
                      </div>

                      {/* Middle Row: Rating & Distance & Availability Pill */}
                      <div className="grid grid-cols-2 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl mb-3 text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span className="font-bold text-slate-900">{pro.rating}</span>
                          </div>
                          <span className="text-slate-500 text-[11px]">({pro.reviewCount} Reviews)</span>
                        </div>

                        <div className="flex items-center justify-end gap-1 text-slate-600 font-medium text-[11px]">
                          <MapPin className="w-3.5 h-3.5 text-tealbrand-600" />
                          <span>{pro.distanceKm} km Away</span>
                        </div>
                      </div>

                      {/* Status & Estimated Charge */}
                      <div className="flex items-center justify-between text-xs py-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500">Status:</span>
                          <span className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                            pro.availableNow 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {pro.availabilityStatus}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">Estimated Charge</span>
                          <span className="text-base font-extrabold text-slate-900">
                            ₹{pro.estimatedCharge}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="p-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => handleViewProfile(pro)}
                        className="flex-1 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors text-center"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => handleBookNow(pro)}
                        className="flex-1 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs transition-colors text-center"
                      >
                        Book Now
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
