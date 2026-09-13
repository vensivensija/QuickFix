import React from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Award,
  Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutPage: React.FC = () => {
  const { setActiveTab, setIsEmergencyModalOpen } = useApp();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/70 border border-brand-200 text-brand-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>About QuickFix Platform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Reliable Emergency Help for Every Household Crisis
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            QuickFix is a modern service-booking platform built to eliminate the stress of unexpected daily problems—such as gushing water pipe leaks, sudden electrical failures, roadside tyre punctures, vehicle breakdowns, and appliance malfunctions.
          </p>
        </div>

        {/* Core Mission Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Our Core Purpose</span>
            <h2 className="text-2xl font-bold text-slate-900">
              Connecting You with Nearby Pros in Minutes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Instead of frantically searching social media groups or calling disconnected phone numbers, QuickFix matches you with real-time available professionals nearby, sorted by authentic customer reviews, transparent pricing, verified badges, and travel distance.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl w-fit border border-emerald-200">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Standard English Only Platform</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <Clock className="w-6 h-6 text-brand-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-900">25-30 Min Arrival</h3>
              <p className="text-[11px] text-slate-500 mt-1">Hyper-local dispatch for urgent home breakdowns</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-900">Verified Pros</h3>
              <p className="text-[11px] text-slate-500 mt-1">Background checked with genuine customer reviews</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <Award className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="font-bold text-sm text-slate-900">Diverse Ratings</h3>
              <p className="text-[11px] text-slate-500 mt-1">Transparent score comparison across budget tiers</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <Users className="w-6 h-6 text-tealbrand-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-900">Two-Way Portal</h3>
              <p className="text-[11px] text-slate-500 mt-1">Seamless workflows for customers & technicians</p>
            </div>
          </div>
        </div>

        {/* Roles Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">For Customers</h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                <span>Search 12+ categories & filter by ratings, proximity, and price.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                <span>Specify problem urgency (Urgent SOS vs Scheduled).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                <span>Live progress tracking from "Accepted" to "Completed".</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                <span>Submit 1-5 star ratings and reviews that directly update profile ratings.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-tealbrand-50 text-tealbrand-600 flex items-center justify-center">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">For Service Professionals</h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-tealbrand-600 flex-shrink-0 mt-0.5" />
                <span>Dedicated partner dashboard with real-time incoming booking queue.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-tealbrand-600 flex-shrink-0 mt-0.5" />
                <span>One-click actions: Accept, Reject, Mark On the Way, Started, and Completed.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-tealbrand-600 flex-shrink-0 mt-0.5" />
                <span>Duty status toggle: switch between "Available Now" and "Busy".</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-tealbrand-600 flex-shrink-0 mt-0.5" />
                <span>Track earnings overview, job history, and customer reviews.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 bg-gradient-to-r from-brand-900 to-tealbrand-900 rounded-3xl text-white space-y-4">
          <h3 className="text-2xl font-bold">Experience QuickFix Today</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Book a trusted local technician or switch to professional mode to test the incoming request lifecycle.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('professionals')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition-all"
            >
              Explore Nearby Professionals
            </button>
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all"
            >
              Emergency Assistance (SOS)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
