import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  Upload, 
  Check, 
  ShieldAlert, 
  ArrowRight,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SERVICE_CATEGORIES } from '../../data/categories';
import { ServiceCategoryType } from '../../types';

interface ServiceRequestModalProps {
  onProceedToConfirmation?: (formData: {
    categorySlug: string;
    location: string;
    address: string;
    problemDescription: string;
    isUrgent: boolean;
    problemImage?: string;
    preferredDate: string;
    preferredTime: string;
  }) => void;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({ onProceedToConfirmation }) => {
  const { 
    isServiceRequestModalOpen, 
    setIsServiceRequestModalOpen, 
    selectedCategory, 
    setSelectedCategory,
    selectedProForBooking,
    userLocation,
    setUserLocation,
    setActiveTab,
    setSearchQuery
  } = useApp();

  const [categorySlug, setCategorySlug] = useState<string>('plumbing');
  const [address, setAddress] = useState<string>('Flat 402, Sunshine Residency, Central Avenue');
  const [currentLoc, setCurrentLoc] = useState<string>(userLocation);
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [isUrgent, setIsUrgent] = useState<boolean>(true);
  const [problemImage, setProblemImage] = useState<string | undefined>(undefined);
  const [preferredDate, setPreferredDate] = useState<string>('Today');
  const [preferredTime, setPreferredTime] = useState<string>('Immediate (Next 30-45 mins)');

  // Sync category if passed
  useEffect(() => {
    if (selectedProForBooking) {
      setCategorySlug(selectedProForBooking.serviceCategory);
    } else if (selectedCategory) {
      setCategorySlug(selectedCategory);
    }
  }, [selectedCategory, selectedProForBooking, isServiceRequestModalOpen]);

  if (!isServiceRequestModalOpen) return null;

  // Quick prompt suggestions based on category
  const getProblemSuggestions = (slug: string) => {
    switch (slug) {
      case 'plumbing':
        return ['Main pipe leakage under bathroom basin', 'Severe kitchen sink blockage', 'Water tap broken and running continuously'];
      case 'electrical':
        return ['Main switchboard spark and burning smell', 'Frequent MCB breaker tripping', 'Ceiling fan stopped spinning suddenly'];
      case 'tyre-puncture':
        return ['Flat tyre on right front wheel', 'Emergency stepney tyre swap needed', 'Tubeless puncture repair at doorstep'];
      case 'water-pipe':
        return ['Water gushing from overhead tank pipe', 'Concealed wall leakage dampening bedroom', 'Broken elbow joint on terrace'];
      case 'vehicle-repair':
        return ['Car battery completely drained, need jumpstart', 'Bike engine failing to ignite', 'Sudden brake pedal stiffness'];
      case 'ac-repair':
        return ['AC blowing warm air, zero cooling', 'Water dripping from indoor split unit', 'Strange rattling noise from outdoor fan'];
      default:
        return ['Unexpected appliance breakdown', 'Urgent inspection and repair needed'];
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProblemImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemDescription.trim()) {
      alert('Please describe your problem briefly.');
      return;
    }

    setUserLocation(currentLoc);

    if (onProceedToConfirmation) {
      onProceedToConfirmation({
        categorySlug,
        location: currentLoc,
        address,
        problemDescription,
        isUrgent,
        problemImage,
        preferredDate,
        preferredTime
      });
    } else {
      // Close modal and filter directory
      setIsServiceRequestModalOpen(false);
      setSelectedCategory(categorySlug);
      setActiveTab('professionals');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold">
                {selectedProForBooking ? `Book ${selectedProForBooking.name}` : 'Request a Service Professional'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Fill in your problem details for fast doorstep dispatch
            </p>
          </div>

          <button
            onClick={() => setIsServiceRequestModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs text-slate-800 flex-1">
          
          {/* Selected Pro Card preview (if booking specific pro) */}
          {selectedProForBooking && (
            <div className="p-3.5 bg-brand-50/80 rounded-2xl border border-brand-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedProForBooking.profileImage}
                  alt={selectedProForBooking.name}
                  className="w-11 h-11 rounded-xl object-cover border border-brand-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{selectedProForBooking.name}</h4>
                  <p className="text-[11px] text-slate-600">{selectedProForBooking.serviceCategoryName} • {selectedProForBooking.rating} ★</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Est. Rate</span>
                <span className="font-extrabold text-sm text-brand-700">₹{selectedProForBooking.estimatedCharge}</span>
              </div>
            </div>
          )}

          {/* 1. Service Category Selection */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider block">
              1. Service Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {SERVICE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name} (Starts ₹{cat.basePrice})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Location & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider block">
                2. Current Location / Area <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-brand-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={currentLoc}
                  onChange={(e) => setCurrentLoc(e.target.value)}
                  placeholder="e.g. Downtown Central"
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider block">
                Door / Street Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/Flat No, Street or Landmark"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* 3. Problem Description & Suggestions */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700 uppercase tracking-wider">
                3. Describe Your Problem <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] text-slate-400">Be as specific as possible</span>
            </div>
            
            <textarea
              required
              rows={3}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Describe the issue (e.g. Kitchen pipe burst, water gushing under the sink cabinet)..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 self-center">Suggestions:</span>
              {getProblemSuggestions(categorySlug).map((suggestion, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setProblemDescription(suggestion)}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-[10px] text-slate-600 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Problem Urgency Toggle */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider block">
              4. Problem Urgency
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => {
                  setIsUrgent(true);
                  setPreferredDate('Today');
                  setPreferredTime('Immediate (within 30-45 mins)');
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                  isUrgent 
                    ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isUrgent ? 'text-rose-600' : 'text-slate-400'}`} />
                <div>
                  <h5 className="font-bold text-xs">Urgent Problem</h5>
                  <p className="text-[10px] text-slate-500">Send available nearby professional immediately</p>
                </div>
              </div>

              <div
                onClick={() => {
                  setIsUrgent(false);
                  setPreferredDate('Today');
                  setPreferredTime('Afternoon (2 PM - 5 PM)');
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                  !isUrgent 
                    ? 'bg-brand-50 border-brand-400 text-brand-900 shadow-xs' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Clock className={`w-4 h-4 mt-0.5 flex-shrink-0 ${!isUrgent ? 'text-brand-600' : 'text-slate-400'}`} />
                <div>
                  <h5 className="font-bold text-xs">Normal / Scheduled</h5>
                  <p className="text-[10px] text-slate-500">Pick preferred time slot today or tomorrow</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Date & Time Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider block">
                5. Preferred Date
              </label>
              <select
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Day after Tomorrow">Day after Tomorrow</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider block">
                Preferred Time
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Immediate (within 30-45 mins)">Immediate (within 30-45 mins)</option>
                <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                <option value="Evening (3 PM - 7 PM)">Evening (3 PM - 7 PM)</option>
              </select>
            </div>
          </div>

          {/* 6. Optional Image Upload */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider block">
              6. Problem Photo (Optional)
            </label>
            <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] text-slate-500">
                  {problemImage ? 'Photo attached successfully' : 'Upload photo of leak, damage, or fault'}
                </span>
              </div>
              <label className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-[11px] font-bold cursor-pointer transition-colors">
                <span>Browse</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {problemImage && (
              <div className="relative mt-2 w-20 h-20 rounded-xl overflow-hidden border border-slate-200">
                <img src={problemImage} alt="Uploaded problem" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setProblemImage(undefined)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Footer Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
            >
              {selectedProForBooking ? (
                <>
                  <span>Proceed to Booking Summary</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Find Nearby Professionals</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
