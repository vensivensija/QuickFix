import React, { useState, useRef, useEffect } from 'react';
import { 
  Wrench, 
  AlertCircle, 
  Bell, 
  User as UserIcon, 
  Menu, 
  X, 
  CheckCircle, 
  ShieldAlert, 
  Briefcase, 
  LogOut, 
  MapPin,
  Calendar,
  Layers,
  Search,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    currentUser, 
    notifications, 
    markNotificationAsRead, 
    clearNotifications,
    activeTab, 
    setActiveTab, 
    bookings,
    userLocation,
    setUserLocation,
    setIsEmergencyModalOpen,
    setIsAuthModalOpen,
    setAuthModalInitialRole,
    logoutUser
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const activeBookingsCount = bookings.filter(b => 
    b.status !== 'Completed' && b.status !== 'Cancelled'
  ).length;

  // Locations list for quick selector
  const availableLocations = [
    'Downtown Central, Sector 4',
    'Green Valley, 5th Main Road',
    'Tech Hub Corridor, Phase 2',
    'Riverside Heights, North Block',
    'Metro Station Road, South City'
  ];

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setIsLocationPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Banner for Demo Role Switching */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">Interactive Mode:</span>
          <span>Viewing as <strong className="text-white capitalize">{role}</strong> ({currentUser.name})</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="hidden md:inline text-slate-400">Switch workspace view:</span>
          <button
            onClick={() => {
              const newRole = role === 'customer' ? 'professional' : 'customer';
              setRole(newRole);
              if (newRole === 'professional') {
                setActiveTab('pro-dashboard');
              } else {
                setActiveTab('home');
              }
            }}
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              role === 'customer' 
                ? 'bg-brand-600 hover:bg-brand-500 text-white' 
                : 'bg-tealbrand-600 hover:bg-tealbrand-500 text-white'
            }`}
          >
            {role === 'customer' ? (
              <>
                <Briefcase className="w-3 h-3" />
                Switch to Professional Mode
              </>
            ) : (
              <>
                <UserIcon className="w-3 h-3" />
                Switch to Customer Mode
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActiveTab('home')} 
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-brand-600 to-tealbrand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 rotate-45" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                    Quick<span className="text-brand-600">Fix</span>
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                  Nearby Trusted Pros
                </p>
              </div>
            </button>

            {/* Quick Location Dropdown */}
            <div className="relative hidden lg:block" ref={locationRef}>
              <button
                onClick={() => setIsLocationPickerOpen(!isLocationPickerOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs text-slate-700 transition-colors border border-slate-200"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                <span className="font-medium max-w-[150px] truncate">{userLocation}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {isLocationPickerOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95">
                  <p className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                    Select Your Location
                  </p>
                  {availableLocations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setUserLocation(loc);
                        setIsLocationPickerOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between ${
                        userLocation === loc 
                          ? 'bg-brand-50 text-brand-700 font-semibold' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{loc}</span>
                      {userLocation === loc && <Check className="w-3.5 h-3.5 text-brand-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'home' 
                  ? 'text-brand-600 bg-brand-50 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'services' 
                  ? 'text-brand-600 bg-brand-50 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('professionals')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'professionals' 
                  ? 'text-brand-600 bg-brand-50 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Find Professionals
            </button>

            {role === 'customer' && (
              <button
                onClick={() => setActiveTab('my-bookings')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  activeTab === 'my-bookings' 
                    ? 'text-brand-600 bg-brand-50 font-semibold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                My Bookings
                {activeBookingsCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-brand-600 text-white rounded-full">
                    {activeBookingsCount}
                  </span>
                )}
              </button>
            )}

            {role === 'professional' && (
              <button
                onClick={() => setActiveTab('pro-dashboard')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'pro-dashboard' 
                    ? 'text-tealbrand-700 bg-tealbrand-50 font-semibold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Pro Dashboard
              </button>
            )}

            <button
              onClick={() => setActiveTab('about')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'about' 
                  ? 'text-brand-600 bg-brand-50 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Emergency Help Button */}
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 shadow-sm flex items-center gap-1.5 transition-all animate-pulse"
              title="Click for urgent on-demand assistance"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">Emergency Help</span>
              <span className="sm:hidden">SOS</span>
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors focus:outline-none"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                  <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                      <p className="text-xs text-slate-500">{notifications.length} alerts</p>
                    </div>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="text-xs text-brand-600 hover:text-brand-800 font-medium"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.bookingId) {
                              if (role === 'professional') {
                                setActiveTab('pro-dashboard');
                              } else {
                                setActiveTab('my-bookings');
                              }
                            }
                            setIsNotificationsOpen(false);
                          }}
                          className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                            !n.read ? 'bg-blue-50/40' : ''
                          }`}
                        >
                          <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                            !n.read ? 'bg-brand-600' : 'bg-transparent'
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-semibold text-slate-900">{n.title}</h5>
                              <span className="text-[10px] text-slate-400">{n.time}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile / Auth Menu */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors focus:outline-none"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-slate-200"
                />
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-semibold text-slate-800 leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-500 capitalize">
                    {currentUser.role}
                  </div>
                </div>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-brand-50 text-brand-700">
                      Role: {role}
                    </span>
                  </div>

                  {role === 'customer' ? (
                    <button
                      onClick={() => {
                        setActiveTab('my-bookings');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      My Bookings ({bookings.length})
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveTab('pro-dashboard');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      Pro Dashboard
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const nextRole = role === 'customer' ? 'professional' : 'customer';
                      setRole(nextRole);
                      setActiveTab(nextRole === 'professional' ? 'pro-dashboard' : 'home');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-brand-700 hover:bg-brand-50 rounded-lg flex items-center gap-2 font-medium"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    Switch to {role === 'customer' ? 'Professional' : 'Customer'}
                  </button>

                  <div className="my-1 border-t border-slate-100"></div>

                  <button
                    onClick={() => {
                      setAuthModalInitialRole('customer');
                      setIsAuthModalOpen(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    Switch User / Sign In
                  </button>

                  <button
                    onClick={() => {
                      logoutUser();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="p-3 bg-slate-50 rounded-xl mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span className="font-semibold">{userLocation}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveTab('home');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
              activeTab === 'home' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              setActiveTab('services');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
              activeTab === 'services' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700'
            }`}
          >
            Services Catalog
          </button>
          <button
            onClick={() => {
              setActiveTab('professionals');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
              activeTab === 'professionals' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700'
            }`}
          >
            Find Professionals
          </button>
          
          {role === 'customer' && (
            <button
              onClick={() => {
                setActiveTab('my-bookings');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                activeTab === 'my-bookings' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700'
              }`}
            >
              <span>My Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="px-2 py-0.5 text-xs bg-brand-600 text-white rounded-full font-bold">
                  {activeBookingsCount}
                </span>
              )}
            </button>
          )}

          {role === 'professional' && (
            <button
              onClick={() => {
                setActiveTab('pro-dashboard');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === 'pro-dashboard' ? 'bg-tealbrand-50 text-tealbrand-700 font-bold' : 'text-slate-700'
              }`}
            >
              Professional Dashboard
            </button>
          )}

          <button
            onClick={() => {
              setActiveTab('about');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
              activeTab === 'about' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700'
            }`}
          >
            About QuickFix
          </button>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsEmergencyModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-rose-600 text-white font-bold text-sm shadow flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              Emergency Help (SOS)
            </button>

            <button
              onClick={() => {
                setAuthModalInitialRole('customer');
                setIsAuthModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs text-center"
            >
              Sign In / Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
