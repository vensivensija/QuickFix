import React, { useState } from 'react';
import { Star, X, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';

interface RatingReviewModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const RatingReviewModal: React.FC<RatingReviewModalProps> = ({ booking, onClose }) => {
  const { rateBooking } = useApp();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('Please write a short comment about the service experience.');
      return;
    }

    rateBooking(booking.id, rating, comment.trim());
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">Rate & Review Service</h3>
            <p className="text-xs text-slate-400">Share your feedback to help other users</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Review Submitted!</h4>
            <p className="text-xs text-slate-600">
              Your {rating}-star rating and feedback have been added to {booking.professionalName}'s profile.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs text-slate-800">
            
            {/* Professional Card Mini */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <img
                src={booking.professionalImage}
                alt={booking.professionalName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900">{booking.professionalName}</h4>
                <p className="text-slate-500 text-[11px]">{booking.professionalCategory}</p>
                <span className="text-[10px] text-slate-400">Job: {booking.serviceType}</span>
              </div>
            </div>

            {/* Star Rating Selector */}
            <div className="text-center space-y-2 py-2">
              <label className="font-bold text-xs text-slate-700 uppercase tracking-wider block">
                How would you rate the service?
              </label>
              
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1.5 focus:outline-none transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="text-xs font-bold text-slate-700">
                {rating === 5 && 'Excellent - Highly Recommended'}
                {rating === 4 && 'Very Good - Satisfied'}
                {rating === 3 && 'Average - Met Expectations'}
                {rating === 2 && 'Poor - Needed Improvement'}
                {rating === 1 && 'Terrible - Unsatisfactory'}
              </div>
            </div>

            {/* Review Comment Textarea */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider block">
                Write Your Review <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience (e.g., Arrived promptly, diagnosed the issue cleanly, friendly and fair pricing)..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/25 transition-all"
              >
                Submit Feedback & Rating
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
