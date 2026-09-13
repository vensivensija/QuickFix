import React from 'react';
import { HeroSection } from './HeroSection';
import { EmergencyBanner } from './EmergencyBanner';
import { PopularCategories } from './PopularCategories';
import { HowItWorks } from './HowItWorks';
import { FeaturedProfessionals } from './FeaturedProfessionals';
import { Testimonials } from './Testimonials';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <EmergencyBanner />
      <PopularCategories />
      <HowItWorks />
      <FeaturedProfessionals />
      <Testimonials />
    </div>
  );
};
