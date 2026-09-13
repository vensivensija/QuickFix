import React from 'react';
import { Star, MapPin, Clock, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Professional } from '../../types';

export const FeaturedProfessionals: React.FC = () => {
  const { 
    professionals, 
    setActiveTab, 
    setSelectedProForView, 
    setSelectedProForBooking,
    setIsServiceRequestModalOpen
  } = useApp();

  // Show 4 top-rated / diverse professionals on the home page
  const featured = professionals.slice(0, 4);

  const handleViewProfile = (pro: Professional) => {
    setSelectedProForView(pro);
  };

  const handleBookNow = (pro: Professional) => {
    setSelectedProForBooking(pro);
    setIsServiceRequestModalOpen(true);
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-tealbrand-600 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Local Experts</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Highly Rated Professionals Near You
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Top reviewed technicians ready for doorstep dispatch with verified customer ratings.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('professionals')}
            className="text-sm font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1.5 self-start md:self-auto group"
          >
            <span>Compare All Professionals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Professional Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((pro) => (
            <div
              key={pro.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-5">
                {/* Header: Photo + Badges */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="relative">
                    <img
                      src={pro.profileImage}
                      alt={pro.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
                    />
                    {pro.availableNow && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Online & Available Now" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-base text-slate-900 truncate">
                        {pro.name}
                      </h3>
                      {pro.verified && (
                        <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0" />
                      )}
                    </div>
                    <span className="inline-block px-2 py-0.5 mt-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                      {pro.serviceCategoryName}
                    </span>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {pro.experienceYears} Years Exp.
                    </div>
                  </div>
                </div>

                {/* Rating & Reviews Bar */}
                <div className="flex items-center justify-between py-2.5 px-3 bg-slate-50 rounded-xl mb-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-slate-800">{pro.rating}</span>
                    <span className="text-slate-400">({pro.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-tealbrand-600" />
                    <span>{pro.distanceKm} km away</span>
                  </div>
                </div>

                {/* Status & Base Price */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Availability:</span>
                    <span className={`font-semibold ${
                      pro.availableNow ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {pro.availabilityStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Estimated Charge:</span>
                    <span className="text-sm font-bold text-slate-900">
                      ₹{pro.estimatedCharge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => handleViewProfile(pro)}
                  className="flex-1 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleBookNow(pro)}
                  className="flex-1 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Book Now
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
