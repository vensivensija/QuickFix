import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, ShieldCheck, Clock, Star, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroSection: React.FC = () => {
  const { 
    setActiveTab, 
    userLocation, 
    setUserLocation, 
    searchQuery, 
    setSearchQuery,
    setSelectedCategory,
    setIsEmergencyModalOpen
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');
  const [localLoc, setLocalLoc] = useState(userLocation);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    if (localLoc.trim()) {
      setUserLocation(localLoc.trim());
    }
    setActiveTab('professionals');
  };

  const quickPills = [
    { label: 'Plumber', cat: 'plumbing' },
    { label: 'Electrician', cat: 'electrical' },
    { label: 'Tyre Puncture', cat: 'tyre-puncture' },
    { label: 'Water Pipe Leakage', cat: 'water-pipe' },
    { label: 'AC Repair', cat: 'ac-repair' },
    { label: 'Vehicle Breakdown', cat: 'vehicle-repair' }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 -z-10 w-80 h-80 bg-tealbrand-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/70 border border-brand-200 text-brand-800 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Fast, Reliable Nearby Service Professionals on Demand</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Quick Help When <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-tealbrand-600">You Need It.</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Find and book trusted nearby service professionals quickly during unexpected daily emergencies like burst water pipes, electrical short circuits, tyre punctures, and sudden appliance breakdowns.
          </p>

          {/* Search & Location Box */}
          <div className="pt-2">
            <form 
              onSubmit={handleSearchSubmit}
              className="bg-white p-2 sm:p-3 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto"
            >
              {/* Service Input */}
              <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl">
                <Search className="w-5 h-5 text-brand-600 flex-shrink-0" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="What service do you need? (e.g. Plumber, AC Repair)"
                  className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 font-medium"
                />
              </div>

              <div className="hidden md:block w-px bg-slate-200 self-stretch my-1"></div>

              {/* Location Input */}
              <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl md:w-64">
                <MapPin className="w-5 h-5 text-tealbrand-600 flex-shrink-0" />
                <input
                  type="text"
                  value={localLoc}
                  onChange={(e) => setLocalLoc(e.target.value)}
                  placeholder="Your Location / Area"
                  className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 font-medium truncate"
                />
              </div>

              {/* Find Services Button */}
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-all flex-shrink-0"
              >
                <span>Find Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Popular Service Pills */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Popular Searches:</span>
              {quickPills.map((pill) => (
                <button
                  key={pill.label}
                  onClick={() => {
                    setSelectedCategory(pill.cat);
                    setSearchQuery(pill.label);
                    setActiveTab('professionals');
                  }}
                  className="px-3 py-1 rounded-full bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200 shadow-xs transition-colors font-medium"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 grid grid-cols-3 gap-4 max-w-xl mx-auto border-t border-slate-200/70 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-900 font-bold text-lg sm:text-xl">
                <Clock className="w-4 h-4 text-brand-600" />
                <span>25 Mins</span>
              </div>
              <span className="text-xs text-slate-500">Average Arrival</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-200">
              <div className="flex items-center gap-1 text-slate-900 font-bold text-lg sm:text-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100%</span>
              </div>
              <span className="text-xs text-slate-500">Verified Pros</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-900 font-bold text-lg sm:text-xl">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>4.8 / 5</span>
              </div>
              <span className="text-xs text-slate-500">Customer Rating</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
