import React from 'react';
import { User, Bookmark, Compass, FileCode, Shield, Phone, MapPin } from 'lucide-react';
import { UserProfile, BusinessDetails } from '../types/travel';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProfile: UserProfile;
  businessInfo: BusinessDetails;
  onOpenProfile: () => void;
  onOpenArchitecture: () => void;
  onOpenAdmin: () => void;
  onOpenTripPlanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userProfile,
  businessInfo,
  onOpenProfile,
  onOpenArchitecture,
  onOpenAdmin,
  onOpenTripPlanner,
}) => {
  const totalSaved = userProfile.savedDestinationIds.length + userProfile.favoriteHotelIds.length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* Mini top trust ribbon with business location & phone */}
      <div className="bg-neutral-900 text-neutral-300 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-400 font-display">GJ Guide Masters</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="flex items-center gap-1 text-neutral-300">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>{businessInfo.address}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-neutral-200">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="font-mono">Helpline: {businessInfo.phone}</span>
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <button
              onClick={() => setActiveTab('contact')}
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Enquiry Desk
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => setActiveTab('explore')}
          className="text-xl font-bold tracking-tight text-neutral-900 font-display whitespace-nowrap shrink-0 text-left hover:text-emerald-800 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs font-display">
            GJ
          </span>
          <span>{businessInfo.name}</span>
        </button>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-neutral-600">
          <button
            onClick={() => setActiveTab('explore')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 py-1 border-b-2 cursor-pointer ${
              activeTab === 'explore' ? 'text-neutral-900 border-emerald-700 font-semibold' : 'border-transparent'
            }`}
          >
            Destinations
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 py-1 border-b-2 cursor-pointer ${
              activeTab === 'hotels' ? 'text-neutral-900 border-emerald-700 font-semibold' : 'border-transparent'
            }`}
          >
            Hotels & Facilities
          </button>
          <button
            onClick={() => setActiveTab('cuisine')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 py-1 border-b-2 cursor-pointer ${
              activeTab === 'cuisine' ? 'text-neutral-900 border-emerald-700 font-semibold' : 'border-transparent'
            }`}
          >
            Hotel Food Menus
          </button>
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 py-1 border-b-2 cursor-pointer ${
              activeTab === 'guidelines' ? 'text-neutral-900 border-emerald-700 font-semibold' : 'border-transparent'
            }`}
          >
            Travel Guidelines
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 py-1 border-b-2 cursor-pointer ${
              activeTab === 'planner' ? 'text-neutral-900 border-emerald-700 font-semibold' : 'border-transparent'
            }`}
          >
            Trip Planner
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 py-1 border-b-2 cursor-pointer ${
              activeTab === 'contact' ? 'text-neutral-900 border-emerald-700 font-semibold' : 'border-transparent'
            }`}
          >
            Contact Us
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenAdmin}
            title="Open Admin Dashboard to manage destinations, hotels, room facilities and food menus"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-800" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          <button
            onClick={onOpenArchitecture}
            title="View Django Backend & Full-Stack Specs"
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Django Specs</span>
          </button>

          <button
            onClick={onOpenProfile}
            title="User Profile & Wishlists"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-300 hover:border-neutral-400 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">{userProfile.name.split(' ')[0]}</span>
            {totalSaved > 0 && (
              <span className="font-mono text-[11px] bg-neutral-200 text-neutral-800 rounded px-1.5 py-0.2">
                {totalSaved}
              </span>
            )}
          </button>

          <button
            onClick={onOpenTripPlanner}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-md shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Plan A Trip
          </button>
        </div>
      </div>

      {/* Mobile nav subbar */}
      <div className="md:hidden flex items-center justify-around border-t border-neutral-200 px-2 py-2 bg-neutral-50 text-xs overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('explore')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'explore' ? 'bg-neutral-900 text-white font-medium' : 'text-neutral-600'
          }`}
        >
          Destinations
        </button>
        <button
          onClick={() => setActiveTab('hotels')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'hotels' ? 'bg-neutral-900 text-white font-medium' : 'text-neutral-600'
          }`}
        >
          Hotels
        </button>
        <button
          onClick={() => setActiveTab('cuisine')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'cuisine' ? 'bg-neutral-900 text-white font-medium' : 'text-neutral-600'
          }`}
        >
          Food
        </button>
        <button
          onClick={() => setActiveTab('guidelines')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'guidelines' ? 'bg-neutral-900 text-white font-medium' : 'text-neutral-600'
          }`}
        >
          Guidelines
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'contact' ? 'bg-neutral-900 text-white font-medium' : 'text-neutral-600'
          }`}
        >
          Contact
        </button>
        <button
          onClick={onOpenAdmin}
          className="px-2 py-1 rounded text-emerald-800 font-semibold bg-emerald-50"
        >
          Admin
        </button>
      </div>
    </header>
  );
};
