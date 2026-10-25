import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StateExplorer } from './components/StateExplorer';
import { DestinationCard } from './components/DestinationCard';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { HotelsSection } from './components/HotelsSection';
import { HotelBookingModal } from './components/HotelBookingModal';
import { CuisineSection } from './components/CuisineSection';
import { TravelGuidelinesSection } from './components/TravelGuidelinesSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { RecommendationsEngine } from './components/RecommendationsEngine';
import { TripPlanner } from './components/TripPlanner';
import { MapExplorerModal } from './components/MapExplorerModal';
import { UserProfileModal } from './components/UserProfileModal';
import { TechArchitectureModal } from './components/TechArchitectureModal';
import { TouristPlace, Hotel, RoomType, UserProfile, TripPlan, TravelEnquiry, BusinessDetails } from './types/travel';
import {
  getStoredUserProfile,
  getStoredDestinations,
  getStoredHotels,
  getStoredEnquiries,
  getStoredBusinessInfo,
  toggleSavedDestination,
  toggleFavoriteHotel,
  addSavedTripPlan,
  removeSavedTripPlan,
  addUserReview,
  saveUserProfile
} from './utils/storage';
import {
  MapPin,
  Compass,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Layers,
  Heart,
  Calendar,
  Building,
  Utensils,
  BookOpen
} from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [selectedStateId, setSelectedStateId] = useState<string>('tamil-nadu');

  // Synchronized Storage State
  const [destinations, setDestinations] = useState<TouristPlace[]>(getStoredDestinations);
  const [hotels, setHotels] = useState<Hotel[]>(getStoredHotels);
  const [enquiries, setEnquiries] = useState<TravelEnquiry[]>(getStoredEnquiries);
  const [businessInfo, setBusinessInfo] = useState<BusinessDetails>(getStoredBusinessInfo);
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredUserProfile);

  // Search & Filter State for Destinations Catalog
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('All');

  // Modals & Active Selections
  const [activeDestinationModal, setActiveDestinationModal] = useState<TouristPlace | null>(null);
  const [selectedHotelForBooking, setSelectedHotelForBooking] = useState<{ hotel: Hotel; room: RoomType } | null>(null);
  const [hotelDestinationFilter, setHotelDestinationFilter] = useState<string>('all');
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Refresh reactive data when Admin updates records
  const handleRefreshData = () => {
    setDestinations([...getStoredDestinations()]);
    setHotels([...getStoredHotels()]);
    setEnquiries([...getStoredEnquiries()]);
    setBusinessInfo({ ...getStoredBusinessInfo() });
  };

  // Sync profile changes
  const handleToggleSaveDestination = (id: string) => {
    const updated = toggleSavedDestination(id);
    setUserProfile({ ...updated });
  };

  const handleToggleFavoriteHotel = (id: string) => {
    const updated = toggleFavoriteHotel(id);
    setUserProfile({ ...updated });
  };

  const handleSaveTripPlan = (plan: TripPlan) => {
    const updated = addSavedTripPlan(plan);
    setUserProfile({ ...updated });
  };

  const handleRemoveTripPlan = (id: string) => {
    const updated = removeSavedTripPlan(id);
    setUserProfile({ ...updated });
  };

  const handleAddReview = (review: { placeId: string; placeName: string; rating: number; comment: string }) => {
    const updated = addUserReview(review);
    setUserProfile({ ...updated });
  };

  const handleUpdateProfile = (name: string, email: string) => {
    const updated = { ...userProfile, name, email };
    saveUserProfile(updated);
    setUserProfile(updated);
  };

  // Filtered destination list
  const filteredDestinations = destinations.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.activities.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategoryFilter === 'All' ||
      place.category.some((c) => c.toLowerCase() === selectedCategoryFilter.toLowerCase());

    const matchesState =
      selectedStateFilter === 'All' ||
      place.stateId === selectedStateFilter;

    return matchesSearch && matchesCategory && matchesState;
  });

  const featuredTamilNaduPlaces = destinations.filter((p) => p.stateId === 'tamil-nadu');
  const featuredKeralaPlaces = destinations.filter((p) => p.stateId === 'kerala');

  // Cross-component handlers
  const handleViewHotelsForPlace = (destinationId: string) => {
    setHotelDestinationFilter(destinationId);
    setActiveTab('hotels');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTripPlanForPlace = (destinationId: string) => {
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userProfile={userProfile}
        businessInfo={businessInfo}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenTripPlanner={() => {
          setActiveTab('planner');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Body Router */}
      <main className="flex-1">
        {/* TAB 1: EXPLORE & HOMEPAGE */}
        {activeTab === 'explore' && (
          <div>
            {/* Hero Section with prominent Explore Destinations and Contact Us buttons */}
            <HeroSection
              businessInfo={businessInfo}
              onSearch={(query, cat) => {
                setSearchQuery(query);
                setSelectedCategoryFilter(cat);
                const resultsElement = document.getElementById('destinations-catalog');
                resultsElement?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectState={(stateId) => {
                setSelectedStateId(stateId);
                setActiveTab('states');
              }}
              onOpenTripPlanner={() => {
                setActiveTab('planner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreDestinations={() => {
                const resultsElement = document.getElementById('destinations-catalog');
                resultsElement?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenContact={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Quick Strategic Callout: Trichy Headquarters & Regional Circuits */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 font-bold font-display text-sm">
                    GJ
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      <span>Headquarters & Travel Desk</span>
                      <span aria-hidden="true">·</span>
                      <span>Trichy District, Tamil Nadu</span>
                    </div>
                    <h3 className="text-base font-bold font-display text-neutral-900 mt-0.5">
                      {businessInfo.address}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Direct phone assistance:{' '}
                      <strong className="font-mono text-neutral-800">{businessInfo.phone}</strong> · Operating{' '}
                      {businessInfo.workingHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => {
                      setActiveTab('guidelines');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Travel Guidelines
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    Enquiry Desk
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Map & Route Exploration Callout Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-neutral-800">
                <div className="space-y-1 max-w-2xl text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    <Compass className="w-4 h-4" />
                    <span>Geographic Route Visualizer</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    Explore Tamil Nadu & Kerala on Interactive Map
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm font-light">
                    View GPS pins for Ooty, Kodaikanal, Madurai, Rameswaram, Munnar, Alleppey, and calculate travel routes from Trichy HQ.
                  </p>
                </div>

                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open Interactive Map</span>
                </button>
              </div>
            </div>

            {/* 2. Destination Catalog Section with State & Category Filters */}
            <section id="destinations-catalog" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
                    <span>Curated Destinations</span>
                    <span aria-hidden="true">·</span>
                    <span>Organized by Country, State, District & City</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900">
                    Discover Tourist Places
                  </h2>
                  <p className="text-sm text-neutral-600 mt-1">
                    Detailed insights on entry fees, opening hours, best seasons, estimated expenses, and recommended durations.
                  </p>
                </div>

                {/* State & Category Filter Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* State selector */}
                  <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg text-xs font-medium">
                    <button
                      onClick={() => setSelectedStateFilter('All')}
                      className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                        selectedStateFilter === 'All'
                          ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      All States
                    </button>
                    <button
                      onClick={() => setSelectedStateFilter('tamil-nadu')}
                      className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                        selectedStateFilter === 'tamil-nadu'
                          ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Tamil Nadu
                    </button>
                    <button
                      onClick={() => setSelectedStateFilter('kerala')}
                      className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                        selectedStateFilter === 'kerala'
                          ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Kerala
                    </button>
                  </div>

                  {/* Category Filter Buttons */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 bg-neutral-100 p-1 rounded-lg">
                    {['All', 'Hill Station', 'Heritage & Culture', 'Backwaters', 'Beach & Coastal'].map(
                      (category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategoryFilter(category)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                            selectedCategoryFilter === category
                              ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                              : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                        >
                          {category}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Destinations Grid */}
              {filteredDestinations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredDestinations.map((place) => (
                    <DestinationCard
                      key={place.id}
                      place={place}
                      isSaved={userProfile.savedDestinationIds.includes(place.id)}
                      onToggleSave={handleToggleSaveDestination}
                      onSelect={(p) => setActiveDestinationModal(p)}
                      onViewHotels={handleViewHotelsForPlace}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200">
                  <p className="text-neutral-600 text-sm">
                    No destinations match your search term "{searchQuery}". Try searching for Ooty, Madurai, Munnar, or Alleppey.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategoryFilter('All');
                      setSelectedStateFilter('All');
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </section>

            {/* 3. Featured Tamil Nadu Showcase */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
                    <span>Tamil Nadu Heritage & Hills</span>
                    <span aria-hidden="true">·</span>
                    <span>Nilgiris · Dindigul · Madurai · Ramanathapuram</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-neutral-900">
                    Ooty, Kodaikanal, Madurai & Rameswaram
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedStateFilter('tamil-nadu');
                    const resultsElement = document.getElementById('destinations-catalog');
                    resultsElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>Filter Tamil Nadu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredTamilNaduPlaces.slice(0, 4).map((place) => (
                  <DestinationCard
                    key={place.id}
                    place={place}
                    isSaved={userProfile.savedDestinationIds.includes(place.id)}
                    onToggleSave={handleToggleSaveDestination}
                    onSelect={(p) => setActiveDestinationModal(p)}
                    onViewHotels={handleViewHotelsForPlace}
                  />
                ))}
              </div>
            </section>

            {/* 4. Travel Recommendations Engine Section */}
            <div className="bg-neutral-100/70 border-y border-neutral-200 py-8">
              <RecommendationsEngine
                onSelectDestination={(p) => setActiveDestinationModal(p)}
                onStartItineraryForRoute={(destId) => {
                  setActiveTab('planner');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>

            {/* 5. Kerala Signature Destinations */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
                    <span>Kerala Signature Escapes</span>
                    <span aria-hidden="true">·</span>
                    <span>Munnar · Alleppey · Kochi · Wayanad</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-neutral-900">
                    God’s Own Country Highlights
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedStateFilter('kerala');
                    const resultsElement = document.getElementById('destinations-catalog');
                    resultsElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>Filter Kerala</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredKeralaPlaces.slice(0, 4).map((place) => (
                  <DestinationCard
                    key={place.id}
                    place={place}
                    isSaved={userProfile.savedDestinationIds.includes(place.id)}
                    onToggleSave={handleToggleSaveDestination}
                    onSelect={(p) => setActiveDestinationModal(p)}
                    onViewHotels={handleViewHotelsForPlace}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: HOTELS & ROOM FACILITIES */}
        {activeTab === 'hotels' && (
          <HotelsSection
            selectedDestinationFilter={hotelDestinationFilter}
            onSelectDestinationFilter={(id) => setHotelDestinationFilter(id)}
            favoriteHotelIds={userProfile.favoriteHotelIds}
            onToggleFavoriteHotel={handleToggleFavoriteHotel}
            onBookHotel={(hotel, room) => setSelectedHotelForBooking({ hotel, room })}
            onOpenContact={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB 3: FOOD & DINING */}
        {activeTab === 'cuisine' && (
          <CuisineSection
            onSelectHotelForDining={(destId) => {
              setHotelDestinationFilter(destId);
              setActiveTab('hotels');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB 4: TRAVEL GUIDELINES */}
        {activeTab === 'guidelines' && (
          <TravelGuidelinesSection
            onSelectDestination={(place) => setActiveDestinationModal(place)}
            onOpenTripPlanner={() => {
              setActiveTab('planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB 5: TRIP PLANNER */}
        {activeTab === 'planner' && (
          <TripPlanner
            initialDestinationId="madurai"
            initialDurationDays={4}
            onSavePlan={handleSaveTripPlan}
            savedPlans={userProfile.savedPlans}
          />
        )}

        {/* TAB 6: CONTACT & ENQUIRY */}
        {activeTab === 'contact' && (
          <ContactSection
            businessInfo={businessInfo}
            onEnquirySubmitted={handleRefreshData}
            onExploreDestinations={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB 7: STATES & REGIONS */}
        {activeTab === 'states' && (
          <StateExplorer
            selectedStateId={selectedStateId}
            onSelectState={(stateId) => setSelectedStateId(stateId)}
            savedDestinationIds={userProfile.savedDestinationIds}
            onToggleSaveDestination={handleToggleSaveDestination}
            onSelectDestination={(p) => setActiveDestinationModal(p)}
            onViewHotels={handleViewHotelsForPlace}
          />
        )}
      </main>

      {/* Modern, Human Editorial Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-neutral-100">
            {/* Business Info Column (5 cols) */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs font-display">
                  GJ
                </div>
                <span className="text-xl font-bold font-display text-neutral-900 tracking-tight">
                  {businessInfo.name}
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
                Professional tourism guide agency serving travelers discovering Tamil Nadu and Kerala. Verified accommodations, inspected room facilities, authentic regional food menus, and practical guidelines.
              </p>

              <div className="pt-2 text-xs text-neutral-600 space-y-1.5">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <span>{businessInfo.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span className="font-mono font-medium">Helpline: {businessInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>{businessInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>{businessInfo.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Quick Links Column (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Navigation & Portals
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600">
                <button
                  onClick={() => {
                    setActiveTab('explore');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Destinations
                </button>
                <button
                  onClick={() => {
                    setActiveTab('hotels');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Hotels & Stays
                </button>
                <button
                  onClick={() => {
                    setActiveTab('cuisine');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Hotel Food Menus
                </button>
                <button
                  onClick={() => {
                    setActiveTab('guidelines');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Travel Guidelines
                </button>
                <button
                  onClick={() => {
                    setActiveTab('planner');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Trip Planner
                </button>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Contact Desk
                </button>
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="text-left font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                >
                  Admin Console
                </button>
                <button
                  onClick={() => setIsArchitectureModalOpen(true)}
                  className="text-left text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Django Specs
                </button>
              </div>
            </div>

            {/* Quality & Trust Badges (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Verification Standard
              </div>
              <div className="text-xs text-neutral-600 space-y-2">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Inspected hotel room amenities: AC, Wi-Fi, attached baths & hot water</span>
                </div>
                <div className="flex items-start gap-2">
                  <Utensils className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Verified restaurant menus distinguished from reference sample data</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Trichy Headquarters on Thuraiyur Main Road</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div>
              © 2026 <strong className="text-neutral-800">{businessInfo.name}</strong> · Registered Tourism Portal · Trichy District, Tamil Nadu
            </div>
            <div className="font-mono text-[11px] text-neutral-400">
              Verified Records · SQLite / PostgreSQL Architecture · Python Django
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Destination Detail Modal */}
      <DestinationDetailModal
        place={activeDestinationModal}
        onClose={() => setActiveDestinationModal(null)}
        isSaved={activeDestinationModal ? userProfile.savedDestinationIds.includes(activeDestinationModal.id) : false}
        onToggleSave={handleToggleSaveDestination}
        onViewHotels={handleViewHotelsForPlace}
        onStartTripPlan={handleStartTripPlanForPlace}
      />

      {/* 2. Hotel Booking Simulator Modal */}
      <HotelBookingModal
        hotel={selectedHotelForBooking ? selectedHotelForBooking.hotel : null}
        room={selectedHotelForBooking ? selectedHotelForBooking.room : null}
        onClose={() => setSelectedHotelForBooking(null)}
        onConfirmBooking={(booking) => {
          // Booking recorded in state
        }}
      />

      {/* 3. Interactive Map Explorer Modal */}
      <MapExplorerModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onSelectPlace={(place) => {
          setIsMapModalOpen(false);
          setActiveDestinationModal(place);
        }}
      />

      {/* 4. User Profile & Account Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onSelectDestination={(place) => {
          setIsProfileModalOpen(false);
          setActiveDestinationModal(place);
        }}
        onRemoveSavedDestination={handleToggleSaveDestination}
        onRemoveFavoriteHotel={handleToggleFavoriteHotel}
        onRemoveTripPlan={handleRemoveTripPlan}
        onAddReview={handleAddReview}
        onUpdateProfileName={handleUpdateProfile}
      />

      {/* 5. System Architecture & Tech Specs Modal (Django / PostgreSQL / Python) */}
      <TechArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
        businessInfo={businessInfo}
      />

      {/* 6. Secure Admin Dashboard */}
      {isAdminModalOpen && (
        <AdminDashboard
          destinations={destinations}
          hotels={hotels}
          enquiries={enquiries}
          businessInfo={businessInfo}
          onRefreshData={handleRefreshData}
          onClose={() => setIsAdminModalOpen(false)}
        />
      )}
    </div>
  );
}
