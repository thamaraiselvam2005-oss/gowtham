import React, { useState } from 'react';
import { Search, MapPin, Compass, ArrowRight, Phone, Building } from 'lucide-react';
import { BusinessDetails } from '../types/travel';

interface HeroSectionProps {
  businessInfo: BusinessDetails;
  onSearch: (query: string, category: string) => void;
  onSelectState?: (stateId: string) => void;
  onOpenTripPlanner: () => void;
  onExploreDestinations: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  businessInfo,
  onSearch,
  onSelectState,
  onOpenTripPlanner,
  onExploreDestinations,
  onOpenContact,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Hill Station',
    'Heritage & Culture',
    'Backwaters',
    'Beach & Coastal',
    'Wildlife & Sanctuary',
    'Waterfalls & Trekking',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, selectedCategory);
  };

  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white">
      {/* Background Image Container with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/ooty_nilgiri_hills_1792907280955.jpg"
          alt="Scenic Ooty Nilgiri hills with tea gardens and morning mist in Tamil Nadu"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-900/65 to-neutral-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          {/* Business identity kicker */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide uppercase text-emerald-300 mb-4">
            <span className="font-display text-white bg-emerald-900/80 px-2.5 py-0.5 rounded border border-emerald-700/50">
              {businessInfo.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>Trichy District, Tamil Nadu</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-emerald-200">Phone: {businessInfo.phone}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight text-white leading-tight mb-5 text-balance">
            Discover Iconic Tourist Destinations across Tamil Nadu & Kerala
          </h1>

          <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-6 max-w-2xl font-light">
            Your all-in-one travel guide. Explore Ooty, Kodaikanal, Madurai, Rameswaram, Munnar, and Alleppey with verified hotel accommodations, room amenities, authentic food menus, and practical travel guidelines.
          </p>

          {/* Prominent Action Buttons (Explore Destinations & Contact Us) */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <button
              type="button"
              onClick={onExploreDestinations}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Destinations</span>
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Contact Us</span>
            </button>

            <button
              type="button"
              onClick={onOpenTripPlanner}
              className="px-5 py-3 text-xs sm:text-sm font-medium text-neutral-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <span>Custom Itinerary Builder</span>
              <ArrowRight className="w-3.5 h-3.5 inline ml-1.5" />
            </button>
          </div>

          {/* Search Box Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-neutral-900 shadow-2xl border border-neutral-100">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative flex items-center">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search destinations, districts (e.g., Ooty, Madurai, Munnar, Nilgiris)..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white rounded-lg border border-neutral-200 focus:outline-none focus:border-emerald-700 transition-colors"
                />
              </div>

              <div className="sm:w-52">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white rounded-lg border border-neutral-200 focus:outline-none focus:border-emerald-700 transition-colors cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Find Places</span>
              </button>
            </form>

            {/* Quick Suggestions / Core Destinations */}
            <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs text-neutral-600">
              <span className="font-medium text-neutral-400">Featured places:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('Ooty');
                  onSearch('Ooty', 'All');
                }}
                className="hover:text-emerald-800 underline decoration-neutral-300 underline-offset-2 transition-colors cursor-pointer"
              >
                Ooty (Nilgiris)
              </button>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('Kodaikanal');
                  onSearch('Kodaikanal', 'All');
                }}
                className="hover:text-emerald-800 underline decoration-neutral-300 underline-offset-2 transition-colors cursor-pointer"
              >
                Kodaikanal
              </button>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('Madurai');
                  onSearch('Madurai', 'All');
                }}
                className="hover:text-emerald-800 underline decoration-neutral-300 underline-offset-2 transition-colors cursor-pointer"
              >
                Madurai (Meenakshi Temple)
              </button>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('Rameswaram');
                  onSearch('Rameswaram', 'All');
                }}
                className="hover:text-emerald-800 underline decoration-neutral-300 underline-offset-2 transition-colors cursor-pointer"
              >
                Rameswaram (Pamban Bridge)
              </button>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('Munnar');
                  onSearch('Munnar', 'All');
                }}
                className="hover:text-emerald-800 underline decoration-neutral-300 underline-offset-2 transition-colors cursor-pointer"
              >
                Munnar
              </button>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('Alleppey');
                  onSearch('Alleppey', 'All');
                }}
                className="hover:text-emerald-800 underline decoration-neutral-300 underline-offset-2 transition-colors cursor-pointer"
              >
                Alleppey
              </button>
            </div>
          </div>
        </div>

        {/* Feature KPI Strip below Hero - Clean, unboxed text */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-neutral-200">
          <div>
            <div className="text-2xl font-bold font-display text-white tabular-nums">Tamil Nadu & Kerala</div>
            <div className="text-xs text-neutral-300 mt-1">Hierarchical Country, State, District & City Guide</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-white tabular-nums">Room Facilities</div>
            <div className="text-xs text-neutral-300 mt-1">AC, Wi-Fi, Attached Baths, Hot Water, Parking & Service</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-white tabular-nums">Authentic Menus</div>
            <div className="text-xs text-neutral-300 mt-1">Breakfast, Lunch, Dinner, Veg/Non-Veg & Local Cuisine</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-white tabular-nums">Trichy HQ</div>
            <div className="text-xs text-neutral-300 mt-1">Thuraiyur Main Road · Helpline: 123345678</div>
          </div>
        </div>
      </div>
    </section>
  );
};
