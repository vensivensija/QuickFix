import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Star, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Calendar, 
  AlertTriangle, 
  Navigation, 
  Play, 
  Check, 
  ShieldCheck,
  Power
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Booking, BookingStatus } from '../../types';

export const ProfessionalDashboard: React.FC = () => {
  const { 
    currentUser, 
    bookings, 
    updateBookingStatus, 
    professionals, 
    userLocation,
    setActiveTab
  } = useApp();

  // Find corresponding professional profile
  const proProfile = professionals.find(p => p.id === currentUser.professionalId) || professionals[0];
  const [isAvailable, setIsAvailable] = useState<boolean>(proProfile?.availableNow ?? true);

  // Relevant bookings for this professional (or all bookings matching their category for comprehensive demo)
  const proBookings = bookings.filter(b => 
    b.professionalId === proProfile.id || 
    b.professionalCategory.toLowerCase() === proProfile.serviceCategoryName.toLowerCase()
  );

  // Pending requests (Requested)
  const pendingRequests = proBookings.filter(b => b.status === 'Requested');

  // Active / Ongoing (Accepted, On the Way, Service in Progress)
  const activeBookings = proBookings.filter(b => 
    b.status === 'Accepted' || b.status === 'Professional On The Way' || b.status === 'Service In Progress'
  );

  // Completed services
  const completedBookings = proBookings.filter(b => b.status === 'Completed');

  // Total earnings: sum of completed jobs
  const totalEarnings = completedBookings.reduce((sum, b) => sum + (b.estimatedPrice || proProfile.estimatedCharge), 0);

  const handleStatusChange = (bookingId: string, nextStatus: BookingStatus) => {
    updateBookingStatus(bookingId, nextStatus);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Card */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={proProfile.profileImage}
                  alt={proProfile.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-md"
                />
                <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-900 ${
                  isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
                }`} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold">{proProfile.name}</h1>
                  <span className="text-[11px] font-bold bg-tealbrand-500/20 text-tealbrand-300 px-2 py-0.5 rounded-full border border-tealbrand-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Pro Partner
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {proProfile.serviceCategoryName} Specialist • {proProfile.experienceYears} Years Experience
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-400" />
                    {proProfile.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {proProfile.rating} ({proProfile.reviewCount} Reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Availability Switch */}
            <div className="flex items-center gap-4 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 self-start md:self-auto">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Duty Status</span>
                <span className={`text-xs font-bold ${isAvailable ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isAvailable ? 'Online & Available' : 'Busy / On Break'}
                </span>
              </div>
              <button
                onClick={() => setIsAvailable(!isAvailable)}
                className={`p-2.5 rounded-xl text-white transition-colors flex items-center gap-1.5 text-xs font-bold ${
                  isAvailable ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                <Power className="w-4 h-4" />
                <span>{isAvailable ? 'Active' : 'Offline'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* 5 Stats Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          
          {/* Total Bookings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Bookings</span>
              <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{proBookings.length}</div>
            <span className="text-[11px] text-slate-500">All-time customer requests</span>
          </div>

          {/* Pending Requests */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Requests</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-amber-600">{pendingRequests.length}</div>
            <span className="text-[11px] text-slate-500">Awaiting your response</span>
          </div>

          {/* Completed Services */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-emerald-600">{completedBookings.length}</div>
            <span className="text-[11px] text-slate-500">Successful fixes</span>
          </div>

          {/* Average Rating */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Rating</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{proProfile.rating} ★</div>
            <span className="text-[11px] text-slate-500">{proProfile.reviewCount} customer reviews</span>
          </div>

          {/* Earnings Overview */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Earnings</span>
              <div className="w-8 h-8 rounded-xl bg-tealbrand-50 text-tealbrand-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-tealbrand-700">₹{totalEarnings}</div>
            <span className="text-[11px] text-slate-500">From completed services</span>
          </div>

        </div>

        {/* Section 1: New Service Requests (Pending) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                New Incoming Requests ({pendingRequests.length})
              </h2>
              <p className="text-xs text-slate-500">Review nearby customer requests and accept or reject.</p>
            </div>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-xs text-slate-500">
              No new pending service requests right now. Keep your duty status Online!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.map((req) => (
                <div key={req.id} className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-xs space-y-4">
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
                        Action Required • #{req.id}
                      </span>
                      <h3 className="font-extrabold text-base text-slate-900 mt-1">
                        {req.serviceType}
                      </h3>
                      <p className="text-xs font-semibold text-slate-700">
                        Customer: {req.customerName} ({req.customerPhone})
                      </p>
                    </div>

                    {req.isUrgent && (
                      <span className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-extrabold rounded-full flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        Urgent Problem
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                    {req.problemDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-tealbrand-600" />
                      <span className="truncate">{req.address}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-600" />
                      <span>{req.preferredDate} • {req.preferredTime}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-900">
                      Est. Payout: <strong className="text-brand-700">₹{req.estimatedPrice}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStatusChange(req.id, 'Cancelled')}
                        className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleStatusChange(req.id, 'Accepted')}
                        className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        Accept Request
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Active / Ongoing Bookings (Lifecycle actions) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Active & Ongoing Jobs ({activeBookings.length})
              </h2>
              <p className="text-xs text-slate-500">Update status as you proceed to customer's location.</p>
            </div>
          </div>

          {activeBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-xs text-slate-500">
              No jobs currently in progress.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeBookings.map((job) => (
                <div key={job.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400">Booking #{job.id}</span>
                      <h3 className="font-extrabold text-base text-slate-900">{job.serviceType}</h3>
                      <p className="text-xs text-slate-600">Customer: <strong>{job.customerName}</strong> ({job.customerPhone})</p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-brand-700 border border-brand-200">
                      Status: {job.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-tealbrand-600 inline mr-1" />
                    <strong>Address:</strong> {job.address}
                  </div>

                  {/* Professional Status Progression Action Buttons */}
                  <div className="p-3 bg-slate-100 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Update Service Progress
                    </span>

                    <div className="flex flex-wrap items-center gap-2">
                      {job.status === 'Accepted' && (
                        <button
                          onClick={() => handleStatusChange(job.id, 'Professional On The Way')}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Mark "On the Way"</span>
                        </button>
                      )}

                      {job.status === 'Professional On The Way' && (
                        <button
                          onClick={() => handleStatusChange(job.id, 'Service In Progress')}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Mark "Service Started"</span>
                        </button>
                      )}

                      {job.status === 'Service In Progress' && (
                        <button
                          onClick={() => handleStatusChange(job.id, 'Completed')}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark "Completed"</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Booking History Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Booking History ({completedBookings.length} Completed)
              </h2>
              <p className="text-xs text-slate-500">Past service logs and customer ratings.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            {completedBookings.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No completed jobs recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 overflow-x-auto text-xs">
                {completedBookings.map((b) => (
                  <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">#{b.id}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          Completed
                        </span>
                        <span className="text-slate-400">{b.completedAt || b.createdAt}</span>
                      </div>
                      <h4 className="font-semibold text-slate-800">{b.serviceType}</h4>
                      <p className="text-[11px] text-slate-500">Customer: {b.customerName} • {b.address}</p>
                    </div>

                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                      <span className="font-extrabold text-sm text-slate-900">₹{b.estimatedPrice}</span>
                      {b.rated && b.userReview ? (
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{b.userReview.rating} ★ Customer Feedback</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">No review submitted yet</span>
                      )}
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
