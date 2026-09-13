import React from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Briefcase, 
  Award, 
  Calendar 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Professional } from '../../types';

export const ProfessionalProfileModal: React.FC = () => {
  const { 
    selectedProForView, 
    setSelectedProForView, 
    setSelectedProForBooking, 
    setIsServiceRequestModalOpen 
  } = useApp();

  if (!selectedProForView) return null;

  const pro = selectedProForView;

  const handleBookNow = () => {
    setSelectedProForBooking(pro);
    setSelectedProForView(null);
    setIsServiceRequestModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Modal Close Button */}
        <button
          onClick={() => setSelectedProForView(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/40 hover:bg-slate-900/60 text-white flex items-center justify-center transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header / Banner */}
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-tealbrand-900 text-white p-6 sm:p-8 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={pro.profileImage}
                alt={pro.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white/20 shadow-xl"
              />
              {pro.availableNow && (
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-400 border-2 border-slate-900 rounded-full" title="Available Now" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight truncate">
                  {pro.name}
                </h2>
                {pro.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-200">
                <span className="px-2.5 py-0.5 rounded-md bg-white/10 font-semibold text-white">
                  {pro.serviceCategoryName}
                </span>
                <span>•</span>
                <span>{pro.experienceYears} Years Experience</span>
                <span>•</span>
                <span>{pro.completedJobsCount}+ Jobs Done</span>
              </div>

              <div className="flex items-center gap-3 mt-3 text-xs">
                <div className="flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span className="font-bold text-white">{pro.rating}</span>
                  <span className="text-slate-300">({pro.reviewCount} Reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-tealbrand-400" />
                  <span>{pro.distanceKm} km away</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1 text-slate-800">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
              <span className="text-[11px] text-slate-500 block">Estimated Charge</span>
              <span className="text-lg font-extrabold text-slate-900">₹{pro.estimatedCharge}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
              <span className="text-[11px] text-slate-500 block">Availability</span>
              <span className={`text-xs font-bold block mt-1 ${
                pro.availableNow ? 'text-emerald-600' : 'text-amber-600'
              }`}>
                {pro.availabilityStatus}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
              <span className="text-[11px] text-slate-500 block">Experience</span>
              <span className="text-lg font-extrabold text-slate-900">{pro.experienceYears} Yrs</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
              <span className="text-[11px] text-slate-500 block">Proximity</span>
              <span className="text-lg font-extrabold text-slate-900">{pro.distanceKm} km</span>
            </div>
          </div>

          {/* Location details */}
          <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
            <span>Service Base Station: <strong className="text-slate-800">{pro.location}</strong></span>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              About the Professional
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-200/60">
              {pro.about}
            </p>
          </div>

          {/* Services Offered */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Services Offered & Pricing
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
              {pro.servicesOffered.map((svc, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{svc.title}</h4>
                    {svc.description && (
                      <p className="text-[11px] text-slate-500 mt-0.5">{svc.description}</p>
                    )}
                  </div>
                  <span className="text-xs font-bold text-brand-600 flex-shrink-0 ml-3">
                    ₹{svc.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Customer Reviews ({pro.reviews.length})
              </h3>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{pro.rating} Overall Rating</span>
              </div>
            </div>

            {pro.reviews.length === 0 ? (
              <p className="text-xs text-slate-400 italic p-4 bg-slate-50 rounded-xl text-center">
                No reviews yet for this professional. Be the first to book and rate!
              </p>
            ) : (
              <div className="space-y-3">
                {pro.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{rev.customerName}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(rev.rating)
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <span className="inline-block px-1.5 py-0.2 rounded bg-slate-200/60 text-slate-600 text-[10px] mb-1.5">
                      {rev.serviceName}
                    </span>
                    <p className="text-slate-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer with Book Now */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-500 block">Base Consultation Charge</span>
            <span className="text-xl font-extrabold text-slate-900">₹{pro.estimatedCharge}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedProForView(null)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
            >
              Close
            </button>
            <button
              onClick={handleBookNow}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/25 transition-all"
            >
              Book Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
