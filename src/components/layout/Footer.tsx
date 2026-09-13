import React from 'react';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedCategory, setIsEmergencyModalOpen } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-tealbrand-400 flex items-center justify-center text-white shadow-md">
                <Wrench className="w-5 h-5 rotate-45" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Quick<span className="text-brand-400">Fix</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              QuickFix connects people with trusted, verified local service professionals within minutes during unforeseen daily emergencies and household breakdowns.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>100% English Platform • Verified Professionals</span>
            </div>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-400" />
                <span>24/7 Helpline: 1800-200-FIXNOW (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400" />
                <span>support@quickfix-app.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>Operating across major metropolitan zones & suburbs</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Top Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => { setSelectedCategory('plumbing'); setActiveTab('professionals'); }}
                  className="hover:text-white transition-colors"
                >
                  Plumbing Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('electrical'); setActiveTab('professionals'); }}
                  className="hover:text-white transition-colors"
                >
                  Electrical Faults & Wiring
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('tyre-puncture'); setActiveTab('professionals'); }}
                  className="hover:text-white transition-colors"
                >
                  Tyre Puncture & Roadside
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('water-pipe'); setActiveTab('professionals'); }}
                  className="hover:text-white transition-colors"
                >
                  Water Pipe Leakage Fix
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('ac-repair'); setActiveTab('professionals'); }}
                  className="hover:text-white transition-colors"
                >
                  AC Maintenance & Repair
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('vehicle-repair'); setActiveTab('professionals'); }}
                  className="hover:text-white transition-colors"
                >
                  Vehicle Breakdown
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: How It Works & Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors">
                  All Service Categories
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('professionals')} className="hover:text-white transition-colors">
                  Compare Professionals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('my-bookings')} className="hover:text-white transition-colors">
                  Track My Bookings
                </button>
              </li>
              <li>
                <button onClick={() => setIsEmergencyModalOpen(true)} className="text-rose-400 hover:text-rose-300 font-bold transition-colors">
                  Emergency Help (SOS)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">
                  About QuickFix
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Service Guarantee */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Trust & Safety
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <span className="font-semibold text-white block mb-1">Standard Pricing</span>
                <span>Transparent rates with no hidden surprise costs.</span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <span className="font-semibold text-white block mb-1">Verified Background</span>
                <span>ID verified and background-checked technicians.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} QuickFix Technologies Inc. All rights reserved. English Only Service.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Safety Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
