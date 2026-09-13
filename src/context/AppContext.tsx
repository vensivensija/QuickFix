import React, { createContext, useContext, useState, useEffect } from 'react';
import { Professional, Booking, User, UserRole, AppNotification, BookingStatus, Review } from '../types';
import { SAMPLE_PROFESSIONALS } from '../data/sampleProfessionals';
import { SAMPLE_BOOKINGS } from '../data/sampleBookings';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  professionals: Professional[];
  bookings: Booking[];
  notifications: AppNotification[];
  userLocation: string;
  setUserLocation: (loc: string) => void;
  createBooking: (data: {
    professional: Professional;
    serviceType: string;
    address: string;
    problemDescription: string;
    isUrgent: boolean;
    preferredDate: string;
    preferredTime: string;
    problemImage?: string;
  }) => Booking;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  rateBooking: (bookingId: string, rating: number, comment: string) => void;
  registerCustomer: (data: { name: string; email: string; phone: string }) => void;
  registerProfessional: (data: {
    name: string;
    email: string;
    phone: string;
    category: string;
    experience: number;
    location: string;
    charge: number;
  }) => void;
  loginUser: (email: string, role: UserRole) => boolean;
  logoutUser: () => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  addNotification: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'alert', bookingId?: string) => void;
  getProfessionalById: (id: string) => Professional | undefined;
  // Navigation helpers
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProForBooking: Professional | null;
  setSelectedProForBooking: (pro: Professional | null) => void;
  selectedProForView: Professional | null;
  setSelectedProForView: (pro: Professional | null) => void;
  isServiceRequestModalOpen: boolean;
  setIsServiceRequestModalOpen: (open: boolean) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalInitialRole: UserRole;
  setAuthModalInitialRole: (role: UserRole) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_CUSTOMER: User = {
  id: 'user-customer-1',
  name: 'Alex Mercer',
  email: 'alex.mercer@example.com',
  phone: '+91 98765 43210',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
};

const DEMO_PRO_USER: User = {
  id: 'user-pro-1',
  name: 'Arun Kumar',
  email: 'arun.kumar.fix@example.com',
  phone: '+91 98451 22301',
  role: 'professional',
  professionalId: 'pro-1',
  avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120&auto=format&fit=crop&q=80'
};

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Booking Assigned',
    message: 'Your service professional Arun Kumar is on the way to your location.',
    time: '20 mins ago',
    read: false,
    type: 'info',
    bookingId: 'QF-78214'
  },
  {
    id: 'notif-2',
    title: 'Booking Accepted',
    message: 'Rajesh Verma accepted your Water Pipe Leakage request for tomorrow.',
    time: '2 hours ago',
    read: true,
    type: 'success',
    bookingId: 'QF-65490'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('quickfix_role') as UserRole) || 'customer';
  });

  const [currentUser, setCurrentUserState] = useState<User>(() => {
    const saved = localStorage.getItem('quickfix_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEMO_CUSTOMER;
  });

  const [professionals, setProfessionals] = useState<Professional[]>(() => {
    const saved = localStorage.getItem('quickfix_professionals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return SAMPLE_PROFESSIONALS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('quickfix_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return SAMPLE_BOOKINGS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('quickfix_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [userLocation, setUserLocation] = useState<string>('Downtown Central, Sector 4');

  // Navigation & UI state
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProForBooking, setSelectedProForBooking] = useState<Professional | null>(null);
  const [selectedProForView, setSelectedProForView] = useState<Professional | null>(null);
  const [isServiceRequestModalOpen, setIsServiceRequestModalOpen] = useState<boolean>(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<UserRole>('customer');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('quickfix_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('quickfix_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('quickfix_professionals', JSON.stringify(professionals));
  }, [professionals]);

  useEffect(() => {
    localStorage.setItem('quickfix_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('quickfix_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'professional') {
      // If user isn't already a professional, switch to demo pro
      if (currentUser.role !== 'professional') {
        setCurrentUserState(DEMO_PRO_USER);
      }
    } else {
      if (currentUser.role !== 'customer') {
        setCurrentUserState(DEMO_CUSTOMER);
      }
    }
  };

  const setCurrentUser = (user: User) => {
    setCurrentUserState(user);
    setRoleState(user.role);
  };

  const addNotification = (
    title: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'alert' = 'info',
    bookingId?: string
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      message,
      time: 'Just now',
      read: false,
      type,
      bookingId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const getProfessionalById = (id: string) => {
    return professionals.find(p => p.id === id);
  };

  const createBooking = (data: {
    professional: Professional;
    serviceType: string;
    address: string;
    problemDescription: string;
    isUrgent: boolean;
    preferredDate: string;
    preferredTime: string;
    problemImage?: string;
  }): Booking => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingId = `QF-${randomSuffix}`;

    const newBooking: Booking = {
      id: bookingId,
      customerId: currentUser.id,
      customerName: currentUser.name || 'Customer',
      customerPhone: currentUser.phone || '+91 98765 00000',
      professionalId: data.professional.id,
      professionalName: data.professional.name,
      professionalCategory: data.professional.serviceCategoryName,
      professionalPhone: data.professional.phone,
      professionalImage: data.professional.profileImage,
      serviceType: data.serviceType || `${data.professional.serviceCategoryName} Assistance`,
      location: userLocation,
      address: data.address,
      problemDescription: data.problemDescription,
      isUrgent: data.isUrgent,
      problemImage: data.problemImage,
      preferredDate: data.preferredDate || 'Today',
      preferredTime: data.preferredTime || (data.isUrgent ? 'Immediate' : 'Anytime today'),
      estimatedPrice: data.professional.estimatedCharge,
      status: 'Requested',
      createdAt: 'Just now',
      rated: false
    };

    setBookings(prev => [newBooking, ...prev]);

    // Add notification
    addNotification(
      'Booking Request Sent',
      `Your booking request #${bookingId} has been sent to ${data.professional.name}.`,
      'info',
      bookingId
    );

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          const updated = { ...b, status };
          if (status === 'Completed') {
            updated.completedAt = 'Just now';
          }
          return updated;
        }
        return b;
      })
    );

    const booking = bookings.find(b => b.id === bookingId);
    const proName = booking?.professionalName || 'Your service professional';

    // Dispatch appropriate notification as requested in prompt
    let title = 'Booking Status Updated';
    let msg = `Your booking status is now: ${status}`;
    let type: 'info' | 'success' | 'warning' | 'alert' = 'info';

    if (status === 'Accepted') {
      title = 'Booking Accepted';
      msg = `Your booking has been accepted by ${proName}.`;
      type = 'success';
    } else if (status === 'Professional On The Way') {
      title = 'Professional On The Way';
      msg = `Your service professional ${proName} is on the way to your location.`;
      type = 'info';
    } else if (status === 'Service In Progress') {
      title = 'Service Started';
      msg = `Your service has started with ${proName}.`;
      type = 'info';
    } else if (status === 'Completed') {
      title = 'Service Completed';
      msg = `Your service has been completed. Please rate and review ${proName}.`;
      type = 'success';
    } else if (status === 'Cancelled') {
      title = 'Booking Cancelled';
      msg = `Booking #${bookingId} has been cancelled.`;
      type = 'warning';
    }

    addNotification(title, msg, type, bookingId);
  };

  const rateBooking = (bookingId: string, rating: number, comment: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    // Update booking rating state
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          return {
            ...b,
            rated: true,
            userReview: { rating, comment }
          };
        }
        return b;
      })
    );

    // Update the professional's rating, review count, and reviews list
    setProfessionals(prev =>
      prev.map(pro => {
        if (pro.id === booking.professionalId) {
          const newReview: Review = {
            id: `rev-${Date.now()}`,
            customerName: currentUser.name,
            rating,
            comment,
            date: 'Just now',
            serviceName: booking.serviceType
          };

          const newTotalReviews = pro.reviewCount + 1;
          const newAvgRating = Number(
            ((pro.rating * pro.reviewCount + rating) / newTotalReviews).toFixed(1)
          );

          return {
            ...pro,
            rating: newAvgRating,
            reviewCount: newTotalReviews,
            reviews: [newReview, ...pro.reviews]
          };
        }
        return pro;
      })
    );

    addNotification(
      'Review Submitted',
      `Thank you! Your feedback for ${booking.professionalName} has been recorded.`,
      'success',
      bookingId
    );
  };

  const registerCustomer = (data: { name: string; email: string; phone: string }) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
    };
    setCurrentUser(newUser);
    setRoleState('customer');
    addNotification('Account Created', `Welcome to QuickFix, ${data.name}!`, 'success');
  };

  const registerProfessional = (data: {
    name: string;
    email: string;
    phone: string;
    category: string;
    experience: number;
    location: string;
    charge: number;
  }) => {
    const proId = `pro-${Date.now()}`;
    const newPro: Professional = {
      id: proId,
      name: data.name,
      serviceCategory: (data.category.toLowerCase().replace(/\s+/g, '-') as any),
      serviceCategoryName: data.category,
      rating: 5.0,
      reviewCount: 0,
      experienceYears: data.experience,
      distanceKm: 1.5,
      location: data.location || userLocation,
      availableNow: true,
      availabilityStatus: 'Available Now',
      estimatedCharge: data.charge,
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      phone: data.phone,
      email: data.email,
      about: `Dedicated ${data.category} specialist with ${data.experience} years of field experience in quick on-site diagnostics and high-standard repairs.`,
      verified: true,
      emergencyReady: true,
      completedJobsCount: 0,
      servicesOffered: [
        { title: `Standard ${data.category} Diagnostics & Repair`, price: data.charge }
      ],
      reviews: []
    };

    setProfessionals(prev => [newPro, ...prev]);

    const proUser: User = {
      id: `user-pro-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'professional',
      professionalId: proId,
      avatar: newPro.profileImage
    };

    setCurrentUser(proUser);
    setRoleState('professional');
    setActiveTab('pro-dashboard');
    addNotification('Professional Profile Live', `Your profile as a ${data.category} specialist is now active!`, 'success');
  };

  const loginUser = (email: string, targetRole: UserRole): boolean => {
    if (targetRole === 'professional') {
      const match = professionals.find(p => p.email.toLowerCase() === email.toLowerCase());
      if (match) {
        const proUser: User = {
          id: `user-${match.id}`,
          name: match.name,
          email: match.email,
          phone: match.phone,
          role: 'professional',
          professionalId: match.id,
          avatar: match.profileImage
        };
        setCurrentUser(proUser);
        setRoleState('professional');
        setActiveTab('pro-dashboard');
        addNotification('Logged In', `Welcome back, ${match.name}!`, 'info');
        return true;
      } else {
        // Log in as demo pro
        setCurrentUser(DEMO_PRO_USER);
        setRoleState('professional');
        setActiveTab('pro-dashboard');
        addNotification('Logged In', `Welcome back, ${DEMO_PRO_USER.name}!`, 'info');
        return true;
      }
    } else {
      // Customer
      const custUser: User = {
        ...DEMO_CUSTOMER,
        email: email || DEMO_CUSTOMER.email
      };
      setCurrentUser(custUser);
      setRoleState('customer');
      addNotification('Logged In', `Welcome back, ${custUser.name}!`, 'info');
      return true;
    }
  };

  const logoutUser = () => {
    setCurrentUser(DEMO_CUSTOMER);
    setRoleState('customer');
    setActiveTab('home');
    addNotification('Logged Out', 'You have been logged out successfully.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        setCurrentUser,
        professionals,
        bookings,
        notifications,
        userLocation,
        setUserLocation,
        createBooking,
        updateBookingStatus,
        rateBooking,
        registerCustomer,
        registerProfessional,
        loginUser,
        logoutUser,
        markNotificationAsRead,
        clearNotifications,
        addNotification,
        getProfessionalById,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProForBooking,
        setSelectedProForBooking,
        selectedProForView,
        setSelectedProForView,
        isServiceRequestModalOpen,
        setIsServiceRequestModalOpen,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalInitialRole,
        setAuthModalInitialRole
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
