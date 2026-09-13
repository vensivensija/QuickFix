import React from 'react';
import { 
  CheckCircle2, 
  Search, 
  MapPin, 
  FileText, 
  Users, 
  Star, 
  CalendarCheck 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { setActiveTab } = useApp();

  const steps = [
    {
      step: '1',
      title: 'Select a Service',
      desc: 'Choose from plumbing, electrical, puncture, vehicle breakdown, appliances, and more.',
      icon: Search,
      badge: 'Step 1'
    },
    {
      step: '2',
      title: 'Enter Your Location',
      desc: 'Provide your current address or area so nearby service professionals can find you.',
      icon: MapPin,
      badge: 'Step 2'
    },
    {
      step: '3',
      title: 'Describe Your Problem',
      desc: 'Specify the issue, choose urgent or normal schedule, and optionally attach a photo.',
      icon: FileText,
      badge: 'Step 3'
    },
    {
      step: '4',
      title: 'View Nearby Professionals',
      desc: 'Browse verified service providers currently active and stationed in your radius.',
      icon: Users,
      badge: 'Step 4'
    },
    {
      step: '5',
      title: 'Compare Ratings & Reviews',
      desc: 'Check experience, authentic customer ratings, response time, and transparent prices.',
      icon: Star,
      badge: 'Step 5'
    },
    {
      step: '6',
      title: 'Book a Professional',
      desc: 'Confirm your booking, track real-time arrival status, and pay safely upon completion.',
      icon: CalendarCheck,
      badge: 'Step 6'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tealbrand-50 border border-tealbrand-200 text-tealbrand-700 text-xs font-bold uppercase tracking-wider">
            <span>Simple 6-Step Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How QuickFix Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Get your sudden household and vehicle problems solved in minutes without the headache of calling unverified numbers.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={s.step} 
                className="relative bg-slate-50 hover:bg-brand-50/40 p-6 rounded-2xl border border-slate-200/80 hover:border-brand-300 transition-all group"
              >
                {/* Number & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700">
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setActiveTab('professionals')}
            className="px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-500/20 transition-all inline-flex items-center gap-2"
          >
            <span>Start Finding Nearby Professionals</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
