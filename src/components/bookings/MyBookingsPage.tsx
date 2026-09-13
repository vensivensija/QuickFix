import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  Truck,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Booking, BookingStatus } from '../../types';
import { RatingReviewModal } from './RatingReviewModal';

export const MyBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus, setActiveTab } = useApp();
  
  // Tab options: 'upcoming' | 'ongoing' | 'completed' | 'cancelled' | 'all'
  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'ongoing' | 'completed' | 'cancelled'>('ongoing');
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);
  const [contactModalBooking, setContactModalBooking] = useState<Booking | null>(null);

  // Classify bookings
  const ongoingBookings = bookings.filter(b => 
    b.status === 'Requested' || b.status === 'Accepted' || b.status === 'Professional On The Way' || b.status === 'Service In Progress'
  );
  
  const upcomingBookings = bookings.filter(b => 
    b.status === 'Requested' || b.status === 'Accepted'
  );

  const completedBookings = bookings.filter(b => b.status === 'Completed');
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled');

  const getDisplayedBookings = () => {
    switch (activeSubTab) {
      case 'ongoing':
        return ongoingBookings;
      case 'upcoming':
        return upcomingBookings;
      case 'completed':
        return completedBookings;
      case 'cancelled':
        return cancelledBookings;
      default:
        return bookings;
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Requested':
        return {
          label: 'Requested',
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500'
        };
      case 'Accepted':
        return {
          label: 'Accepted',
          bg: 'bg-blue-50 text-brand-700 border-brand-200',
          dot: 'bg-brand-600'
        };
      case 'Professional On The Way':
        return {
          label: 'Professional On The Way',
          bg: 'bg-cyan-50 text-cyan-700 border-cyan-200 animate-pulse',
          dot: 'bg-cyan-500'
        };
      case 'Service In Progress':
        return {
          label: 'Service In Progress',
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dot: 'bg-indigo-600'
        };
      case 'Completed':
        return {
          label: 'Completed',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'Cancelled':
        return {
          label: 'Cancelled',
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500'
        };
    }
  };

  const statusProgression: BookingStatus[] = [
    'Requested',
    'Accepted',
    'Professional On The Way',
    'Service In Progress',
    'Completed'
  ];

  const getStepIndex = (status: BookingStatus) => {
    return statusProgression.indexOf(status);
  };

  const displayedList = getDisplayedBookings();

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Bookings
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Track live service status, communicate with technicians, and review completed jobs.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('professionals')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Book Another Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Status Navigation Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs mb-6 flex overflow-x-auto gap-1">
          <button
            onClick={() => setActiveSubTab('ongoing')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2 ${
              activeSubTab === 'ongoing'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span>Ongoing Services</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeSubTab === 'ongoing' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {ongoingBookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('upcoming')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2 ${
              activeSubTab === 'upcoming'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span>Upcoming Bookings</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeSubTab === 'upcoming' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {upcomingBookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('completed')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2 ${
              activeSubTab === 'completed'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span>Completed Services</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeSubTab === 'completed' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {completedBookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('cancelled')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2 ${
              activeSubTab === 'cancelled'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span>Cancelled</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeSubTab === 'cancelled' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {cancelledBookings.length}
            </span>
          </button>
        </div>

        {/* Bookings List */}
        {displayedList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Calendar className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 capitalize">
                No {activeSubTab} bookings found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You do not have any requests under this section right now.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('professionals')}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Services & Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedList.map((booking) => {
              const statusMeta = getStatusBadge(booking.status);
              const currentStep = getStepIndex(booking.status);

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="p-5 sm:p-6">
                    
                    {/* Top Row: Booking ID, Timestamp, Status Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900">
                          Booking ID: #{booking.id}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">{booking.createdAt}</span>
                      </div>

                      {/* Status Label Badge */}
                      <div className={`px-3 py-1 rounded-full border text-xs font-extrabold flex items-center gap-1.5 ${statusMeta.bg}`}>
                        <span className={`w-2 h-2 rounded-full ${statusMeta.dot}`} />
                        <span>{statusMeta.label}</span>
                      </div>
                    </div>

                    {/* Middle Row: Pro Info + Problem Details */}
                    <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Pro Details */}
                      <div className="flex items-start gap-3.5 md:col-span-1">
                        <img
                          src={booking.professionalImage}
                          alt={booking.professionalName}
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Assigned Professional
                          </span>
                          <h3 className="font-extrabold text-base text-slate-900 truncate">
                            {booking.professionalName}
                          </h3>
                          <p className="text-xs font-medium text-brand-600">
                            {booking.professionalCategory}
                          </p>
                          <button
                            onClick={() => setContactModalBooking(booking)}
                            className="mt-1.5 text-xs text-brand-600 hover:text-brand-800 font-semibold flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Contact Pro</span>
                          </button>
                        </div>
                      </div>

                      {/* Problem & Location Details */}
                      <div className="space-y-2 md:col-span-2 text-xs">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Service</span>
                          <h4 className="font-bold text-sm text-slate-900">{booking.serviceType}</h4>
                        </div>

                        <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 leading-relaxed text-xs">
                          {booking.problemDescription}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-600 pt-1 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-brand-600" />
                            <span>{booking.preferredDate} • {booking.preferredTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-tealbrand-600" />
                            <span>{booking.address}</span>
                          </div>
                          <div className="font-bold text-slate-900">
                            Estimated: <span className="text-brand-700">₹{booking.estimatedPrice}</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Status Progress Tracker (if not cancelled) */}
                    {booking.status !== 'Cancelled' && (
                      <div className="pt-4 border-t border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                          Live Booking Tracker
                        </span>

                        <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
                          {statusProgression.map((step, idx) => {
                            const isPassed = currentStep >= idx;
                            const isCurrent = currentStep === idx;

                            return (
                              <div key={step} className="flex flex-col items-center">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mb-1.5 transition-colors ${
                                  isCurrent 
                                    ? 'bg-brand-600 text-white ring-4 ring-brand-100' 
                                    : isPassed 
                                      ? 'bg-emerald-500 text-white' 
                                      : 'bg-slate-200 text-slate-500'
                                }`}>
                                  {isPassed && !isCurrent ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                  ) : (
                                    <span>{idx + 1}</span>
                                  )}
                                </div>
                                <span className={`line-clamp-2 leading-tight ${
                                  isCurrent ? 'font-bold text-brand-700' : isPassed ? 'font-semibold text-slate-800' : 'text-slate-400'
                                }`}>
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Customer Review Card (if already rated) */}
                    {booking.rated && booking.userReview && (
                      <div className="mt-4 p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-amber-900">Your Submitted Review:</span>
                          <div className="flex items-center">
                            {[...Array(booking.userReview.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-700 italic">"{booking.userReview.comment}"</p>
                      </div>
                    )}

                  </div>

                  {/* Actions Bar */}
                  <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    
                    {/* Action buttons depending on status */}
                    <div className="flex items-center gap-2">
                      {booking.status === 'Completed' && !booking.rated && (
                        <button
                          onClick={() => setSelectedBookingForReview(booking)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                        >
                          <Star className="w-3.5 h-3.5 fill-white" />
                          <span>Rate & Review Professional</span>
                        </button>
                      )}

                      {(booking.status === 'Requested' || booking.status === 'Accepted') && (
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to cancel this booking request?')) {
                              updateBookingStatus(booking.id, 'Cancelled');
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-semibold transition-colors"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>

                    {/* Demo Helper: Advance status directly if testing */}
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 ml-auto">
                      <span>Pro Status Workflow:</span>
                      <span className="font-semibold text-slate-700">{booking.status}</span>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Review Modal */}
      {selectedBookingForReview && (
        <RatingReviewModal
          booking={selectedBookingForReview}
          onClose={() => setSelectedBookingForReview(null)}
        />
      )}

      {/* Contact Pro Modal */}
      {contactModalBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <img
              src={contactModalBooking.professionalImage}
              alt={contactModalBooking.professionalName}
              className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-brand-500"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900">{contactModalBooking.professionalName}</h3>
              <p className="text-xs text-slate-500">{contactModalBooking.professionalCategory} Technician</p>
            </div>
            
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-600" />
                <span className="font-bold text-slate-900">{contactModalBooking.professionalPhone}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Direct phone line active for booking #{contactModalBooking.id}.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setContactModalBooking(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
              <a
                href={`tel:${contactModalBooking.professionalPhone}`}
                className="flex-1 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
