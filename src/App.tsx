import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { ServicesCatalogPage } from './components/services/ServicesCatalogPage';
import { ProfessionalsDirectory } from './components/professionals/ProfessionalsDirectory';
import { ProfessionalProfileModal } from './components/professionals/ProfessionalProfileModal';
import { ServiceRequestModal } from './components/booking/ServiceRequestModal';
import { BookingConfirmationModal } from './components/booking/BookingConfirmationModal';
import { MyBookingsPage } from './components/bookings/MyBookingsPage';
import { ProfessionalDashboard } from './components/professional/ProfessionalDashboard';
import { EmergencyHelpModal } from './components/emergency/EmergencyHelpModal';
import { AuthModal } from './components/auth/AuthModal';
import { AboutPage } from './components/about/AboutPage';
import { Professional } from './types';

const MainLayout: React.FC = () => {
  const { 
    activeTab, 
    selectedProForBooking, 
    professionals, 
    isServiceRequestModalOpen, 
    setIsServiceRequestModalOpen 
  } = useApp();

  // Booking draft passed from ServiceRequestModal into BookingConfirmationModal
  const [bookingDraft, setBookingDraft] = useState<{
    professional: Professional;
    serviceType: string;
    location: string;
    address: string;
    problemDescription: string;
    isUrgent: boolean;
    problemImage?: string;
    preferredDate: string;
    preferredTime: string;
  } | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleProceedToConfirmation = (formData: {
    categorySlug: string;
    location: string;
    address: string;
    problemDescription: string;
    isUrgent: boolean;
    problemImage?: string;
    preferredDate: string;
    preferredTime: string;
  }) => {
    // If a professional was selected, use them; otherwise pick closest available for that category
    let pro = selectedProForBooking;
    if (!pro) {
      pro = professionals.find(p => p.serviceCategory === formData.categorySlug && p.availableNow) || 
            professionals.find(p => p.serviceCategory === formData.categorySlug) || 
            professionals[0];
    }

    setBookingDraft({
      professional: pro,
      serviceType: `${pro.serviceCategoryName} Service Request`,
      location: formData.location,
      address: formData.address,
      problemDescription: formData.problemDescription,
      isUrgent: formData.isUrgent,
      problemImage: formData.problemImage,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime
    });

    setIsServiceRequestModalOpen(false);
    setIsConfirmationOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'services' && <ServicesCatalogPage />}
        {activeTab === 'professionals' && <ProfessionalsDirectory />}
        {activeTab === 'my-bookings' && <MyBookingsPage />}
        {activeTab === 'pro-dashboard' && <ProfessionalDashboard />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <ProfessionalProfileModal />
      
      <ServiceRequestModal 
        onProceedToConfirmation={handleProceedToConfirmation} 
      />

      {isConfirmationOpen && (
        <BookingConfirmationModal
          bookingDraft={bookingDraft}
          onClose={() => {
            setIsConfirmationOpen(false);
            setBookingDraft(null);
          }}
        />
      )}

      <EmergencyHelpModal />
      <AuthModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
