import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Droplets, 
  Zap, 
  Disc, 
  Car, 
  Clock, 
  MapPin, 
  Star, 
  ArrowRight,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Professional } from '../../types';

export const EmergencyHelpModal: React.FC = () => {
  const { 
    isEmergencyModalOpen, 
    setIsEmergencyModalOpen, 
    professionals, 
    userLocation,
    setSelectedProForBooking,
    setIsServiceRequestModalOpen,
    createBooking,
    setActiveTab
  } = useApp();

  const [emergencyType, setEmergencyType] = useState<string>('water-pipe');
  const [sosDispatchedBookingId, setSosDispatchedBookingId] = useState<string | null>(null);

  if (!isEmergencyModalOpen) return null;

  const emergencyOptions = [
    { slug: 'water-pipe', title: 'Water Pipe Leakage', icon: Droplets, color: 'text-blue-500 bg-blue-50 border-blue-200' },
    { slug: 'electrical', title: 'Electrical Fault', icon: Zap, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { slug: 'tyre-puncture', title: 'Tyre Puncture', icon: Disc, color: 'text-slate-700 bg-slate-100 border-slate-300' },
    { slug: 'vehicle-repair', title: 'Vehicle Breakdown', icon: Car, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  ];

  // Prioritize nearby and currently available professionals for the chosen emergency type
  const matchingPros = professionals
    .filter(p => p.serviceCategory === emergencyType)
    .sort((a, b) => {
      // First available now
      if (a.availableNow !== b.availableNow) {
        return a.availableNow ? -1 : 1;
      }
      // Then closest distance
      return a.distanceKm - b.distanceKm;
    });

  const closestAvailablePro = matchingPros[0];

  const handleInstantDispatch = (pro: Professional) => {
    const defaultProblem = emergencyType === 'water-pipe' 
      ? 'Emergency water pipe burst, urgent help needed!' 
      : emergencyType === 'electrical' 
      ? 'Critical electrical sparking / short circuit fault' 
      : emergencyType === 'tyre-puncture' 
      ? 'Urgent roadside tyre puncture assistance' 
      : 'Urgent roadside vehicle breakdown';

    const booking = createBooking({
      professional: pro,
      serviceType: `Emergency ${pro.serviceCategoryName} Assistance`,
      address: userLocation,
      problemDescription: defaultProblem,
      isUrgent: true,
      preferredDate: 'Today',
      preferredTime: 'Immediate SOS Arrival (Next 20-30 mins)'
    });

    setSosDispatchedBookingId(booking.id);
  };

  const handleFinish = () => {
    setIsEmergencyModalOpen(false);
    setSosDispatchedBookingId(null);
    setActiveTab('my-bookings');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-rose-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Header with SOS aesthetic */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-lg animate-pulse">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">Emergency Assistance (SOS)</h2>
                <p className="text-xs text-rose-200">
                  Instant priority connection with nearest available technicians
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEmergencyModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {sosDispatchedBookingId ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
                Emergency Dispatch ID: #{sosDispatchedBookingId}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Technician Dispatched on Priority!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                {closestAvailablePro?.name} has accepted the urgent alert and is navigating to <strong>{userLocation}</strong>.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/25 transition-all"
            >
              Track Technician Arrival in My Bookings
            </button>
          </div>
        ) : (
          <div className="overflow-y-auto p-6 space-y-6 flex-1 text-xs text-slate-800">
            
            {/* Step 1: Select Emergency Category */}
            <div>
              <label className="font-bold text-slate-700 uppercase tracking-wider block mb-2">
                1. Select Emergency Category:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {emergencyOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = emergencyType === opt.slug;
                  return (
                    <button
                      key={opt.slug}
                      onClick={() => setEmergencyType(opt.slug)}
                      className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                        isSelected 
                          ? 'bg-rose-50 border-rose-500 shadow-sm font-bold text-rose-900 ring-2 ring-rose-300' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${opt.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] leading-tight mt-1">{opt.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fast Dispatch Highlight Card */}
            {closestAvailablePro && (
              <div className="bg-gradient-to-r from-rose-50 to-amber-50 p-4 rounded-2xl border border-rose-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-rose-700 font-bold text-xs uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                    <span>Closest Available Professional</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {closestAvailablePro.availabilityStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={closestAvailablePro.profileImage}
                      alt={closestAvailablePro.name}
                      className="w-12 h-12 rounded-xl object-cover border border-rose-200"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{closestAvailablePro.name}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <span>{closestAvailablePro.rating} ★ ({closestAvailablePro.reviewCount})</span>
                        <span>•</span>
                        <span className="font-bold text-rose-700">{closestAvailablePro.distanceKm} km Away</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Est. Base Charge</span>
                    <span className="text-base font-extrabold text-slate-900">₹{closestAvailablePro.estimatedCharge}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleInstantDispatch(closestAvailablePro)}
                  className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-500/30 flex items-center justify-center gap-2 transition-all"
                >
                  <span>1-Tap Express Emergency Dispatch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Alternative Nearby Professionals */}
            <div>
              <h4 className="font-bold text-slate-700 uppercase tracking-wider text-xs mb-3">
                All Ranked Nearby Responders ({matchingPros.length})
              </h4>

              <div className="space-y-2.5">
                {matchingPros.map((pro) => (
                  <div
                    key={pro.id}
                    className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between hover:border-brand-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={pro.profileImage}
                        alt={pro.name}
                        className="w-11 h-11 rounded-xl object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h5 className="font-bold text-slate-900">{pro.name}</h5>
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                            pro.availableNow ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {pro.availabilityStatus}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {pro.distanceKm} km away • {pro.experienceYears} yrs exp • {pro.rating} ★
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProForBooking(pro);
                        setIsEmergencyModalOpen(false);
                        setIsServiceRequestModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors"
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
