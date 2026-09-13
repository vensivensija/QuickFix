import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  Receipt,
  Phone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Professional, Booking } from '../../types';

interface BookingConfirmationModalProps {
  bookingDraft: {
    professional: Professional;
    serviceType: string;
    location: string;
    address: string;
    problemDescription: string;
    isUrgent: boolean;
    problemImage?: string;
    preferredDate: string;
    preferredTime: string;
  } | null;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  bookingDraft,
  onClose
}) => {
  const { createBooking, setActiveTab, setSelectedProForBooking } = useApp();
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!bookingDraft) return null;

  const pro = bookingDraft.professional;

  const handleConfirm = () => {
    setIsSubmitting(true);
    // Simulate brief network submission
    setTimeout(() => {
      const created = createBooking({
        professional: pro,
        serviceType: bookingDraft.serviceType,
        address: bookingDraft.address,
        problemDescription: bookingDraft.problemDescription,
        isUrgent: bookingDraft.isUrgent,
        preferredDate: bookingDraft.preferredDate,
        preferredTime: bookingDraft.preferredTime,
        problemImage: bookingDraft.problemImage
      });
      setConfirmedBooking(created);
      setIsSubmitting(false);
    }, 600);
  };

  const handleFinish = () => {
    setSelectedProForBooking(null);
    onClose();
    setActiveTab('my-bookings');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* If already confirmed, display success screen */}
        {confirmedBooking ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Booking ID: {confirmedBooking.id}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Booking Confirmed Successfully.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                Your request has been dispatched to <strong>{pro.name}</strong>. You can monitor the real-time arrival status and contact the technician in My Bookings.
              </p>
            </div>

            {/* Quick summary box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Professional:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.professionalName} ({pro.serviceCategoryName})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.preferredDate} • {confirmedBooking.preferredTime}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="text-slate-500">Est. Service Charge:</span>
                <span className="font-extrabold text-brand-700">₹{confirmedBooking.estimatedPrice}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>Track Booking Status in My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Confirmation details before booking */
          <>
            {/* Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Booking Review & Summary</h2>
                <p className="text-xs text-slate-400">Verify your service details before confirming</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-slate-800 flex-1">
              
              {/* Selected Professional Card */}
              <div className="p-4 bg-brand-50/70 rounded-2xl border border-brand-200 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={pro.profileImage}
                    alt={pro.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-brand-200"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-brand-600 tracking-wider">Selected Professional</span>
                    <h4 className="text-base font-extrabold text-slate-900">{pro.name}</h4>
                    <p className="text-[11px] text-slate-600">
                      {pro.serviceCategoryName} • {pro.rating} ★ ({pro.reviewCount} Reviews)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Distance</span>
                  <span className="font-bold text-tealbrand-700">{pro.distanceKm} km away</span>
                </div>
              </div>

              {/* Service & Problem Details */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Service Requested</span>
                  <p className="text-sm font-bold text-slate-900">{bookingDraft.serviceType}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Problem Description</span>
                  <p className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 leading-relaxed">
                    {bookingDraft.problemDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Location</span>
                    <div className="flex items-center gap-1 text-slate-800 font-semibold mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-600" />
                      <span className="truncate">{bookingDraft.location}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{bookingDraft.address}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Date & Time</span>
                    <div className="flex items-center gap-1 text-slate-800 font-semibold mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-brand-600" />
                      <span>{bookingDraft.preferredDate}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{bookingDraft.preferredTime}</p>
                  </div>
                </div>

                {bookingDraft.isUrgent && (
                  <div className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    <span>Urgent SOS Dispatch Flagged (Priority Arrival)</span>
                  </div>
                )}
              </div>

              {/* Price & Billing Summary */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                  <Receipt className="w-4 h-4 text-brand-600" />
                  <span>Estimated Price Breakdown</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Base Diagnostics & Service Visit</span>
                  <span className="font-semibold text-slate-900">₹{pro.estimatedCharge}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Convenience & Booking Fee</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>

                <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
                  <span>Total Estimated Cost</span>
                  <span className="text-base text-brand-700">₹{pro.estimatedCharge}</span>
                </div>

                <p className="text-[10px] text-slate-400 pt-1">
                  * Pay securely via Cash or UPI directly to the professional after service completion.
                </p>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Confirming Booking...</span>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
