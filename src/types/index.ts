export type ServiceCategoryType = 
  | 'plumbing'
  | 'electrical'
  | 'tyre-puncture'
  | 'vehicle-repair'
  | 'ac-repair'
  | 'refrigerator'
  | 'washing-machine'
  | 'appliance'
  | 'carpenter'
  | 'cleaning'
  | 'water-pipe'
  | 'emergency-repair';

export interface ServiceCategory {
  id: string;
  name: string;
  slug: ServiceCategoryType;
  icon: string;
  description: string;
  popular: boolean;
  emergency: boolean;
  basePrice: number;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
}

export interface ServiceItem {
  title: string;
  price: number;
  description?: string;
}

export interface Professional {
  id: string;
  name: string;
  serviceCategory: ServiceCategoryType;
  serviceCategoryName: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  distanceKm: number;
  location: string;
  availableNow: boolean;
  availabilityStatus: 'Available Now' | 'Busy' | 'Available in 1 hr' | 'Available Tomorrow';
  estimatedCharge: number;
  profileImage: string;
  phone: string;
  email: string;
  about: string;
  servicesOffered: ServiceItem[];
  verified: boolean;
  emergencyReady: boolean;
  reviews: Review[];
  completedJobsCount: number;
}

export type BookingStatus = 
  | 'Requested'
  | 'Accepted'
  | 'Professional On The Way'
  | 'Service In Progress'
  | 'Completed'
  | 'Cancelled';

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  professionalId: string;
  professionalName: string;
  professionalCategory: string;
  professionalPhone: string;
  professionalImage: string;
  serviceType: string;
  location: string;
  address: string;
  problemDescription: string;
  isUrgent: boolean;
  problemImage?: string;
  preferredDate: string;
  preferredTime: string;
  estimatedPrice: number;
  status: BookingStatus;
  createdAt: string;
  completedAt?: string;
  rated: boolean;
  userReview?: {
    rating: number;
    comment: string;
  };
}

export type UserRole = 'customer' | 'professional';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  professionalId?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
  bookingId?: string;
}
