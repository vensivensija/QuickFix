import React from 'react';
import { ShieldAlert, Droplets, Zap, Disc, Car, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmergencyBanner: React.FC = () => {
  const { setIsEmergencyModalOpen, setSelectedCategory, setActiveTab } = useApp();

  const emergencyItems = [
    { name: 'Water Leakage', icon: Droplets, cat: 'water-pipe', color: 'from-blue-500 to-cyan-500' },
    { name: 'Electrical Fault', icon: Zap, cat: 'electrical', color: 'from-amber-500 to-yellow-500' },
    { name: 'Tyre Puncture', icon: Disc, cat: 'tyre-puncture', color: 'from-slate-700 to-slate-900' },
    { name: 'Vehicle Breakdown', icon: Car, cat: 'vehicle-repair', color: 'from-rose-500 to-red-600' }
  ];

  return (
    <section className="py-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-brand-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          
          {/* Subtle emergency background pattern */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <ShieldAlert className="w-80 h-80" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
            
            {/* Text header */}
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                Emergency Rapid Response
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Facing an Urgent Problem Right Now?
              </h3>
              <p className="text-sm text-slate-300">
                Water pipe burst, sudden electrical sparks, flat tyre, or broken engine? Get instant priority dispatch for available nearby professionals.
              </p>
            </div>

            {/* Quick action cards */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {emergencyItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setSelectedCategory(item.cat);
                      setIsEmergencyModalOpen(true);
                    }}
                    className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs text-center flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 group"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow`}>
                      <Icon className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                    </div>
                    <span className="text-xs font-semibold text-white leading-tight">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-rose-300 font-medium group-hover:underline">
                      Express Help →
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Action Button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all hover:translate-x-0.5"
              >
                <span>SOS Emergency Help</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
