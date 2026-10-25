import React, { useState } from 'react';
import { TOURIST_PLACES } from '../data/travelData';
import { TouristPlace } from '../types/travel';
import {
  Compass,
  Bus,
  CloudSun,
  Shirt,
  ShieldAlert,
  HeartHandshake,
  Baby,
  Accessibility,
  Route,
  ArrowRight,
  MapPin,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface TravelGuidelinesSectionProps {
  onSelectDestination?: (place: TouristPlace) => void;
  onOpenTripPlanner?: () => void;
}

export const TravelGuidelinesSection: React.FC<TravelGuidelinesSectionProps> = ({
  onSelectDestination,
  onOpenTripPlanner,
}) => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('madurai');
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'transport' | 'clothing' | 'safety' | 'customs' | 'accessibility'
  >('all');

  const selectedPlace = TOURIST_PLACES.find((p) => p.id === selectedPlaceId) || TOURIST_PLACES[0];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
          <span>Practical Travel Advisory</span>
          <span aria-hidden="true">·</span>
          <span>GJ Guide Masters Editorial Guidelines</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-neutral-900 tracking-tight">
          South India Travel Guidelines & Best Practices
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
          Essential insights into temple dress codes, hill station weather, local transportation networks, safety precautions, cultural etiquette, and accessible routes across Tamil Nadu and Kerala.
        </p>
      </div>

      {/* Destination Selector Tabs */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          Select Destination for Tailored Guidelines:
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {TOURIST_PLACES.map((place) => (
            <button
              key={place.id}
              onClick={() => setSelectedPlaceId(place.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedPlaceId === place.id
                  ? 'bg-neutral-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{place.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({place.stateName.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Overview Card for the Selected Place */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto bg-neutral-100">
            <img
              src={selectedPlace.heroImage}
              alt={selectedPlace.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider">
                {selectedPlace.country} · {selectedPlace.stateName} · {selectedPlace.district} District
              </span>
              <h2 className="text-2xl font-bold font-display">{selectedPlace.name}</h2>
              <p className="text-xs text-neutral-200 mt-1 line-clamp-2">{selectedPlace.tagline}</p>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mb-3">
                <span className="font-semibold text-neutral-900">Visiting Season:</span>
                <span>{selectedPlace.bestSeason}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-neutral-900">Recommended Duration:</span>
                <span>{selectedPlace.recommendedDuration}</span>
              </div>

              <h3 className="text-lg font-bold font-display text-neutral-900 mb-2">
                Destination Summary & Travel Context
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {selectedPlace.description}
              </p>
            </div>

            {/* Quick KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-100 text-xs">
              <div>
                <span className="text-neutral-400 block text-[11px]">Entry Fee</span>
                <span className="font-semibold text-neutral-900">
                  {selectedPlace.entryFee.isFree ? 'Free Access' : `₹${selectedPlace.entryFee.amount}`}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Daily Expense</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  ₹{selectedPlace.estimatedExpensePerDay.min} – ₹{selectedPlace.estimatedExpensePerDay.max}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Ideal Audience</span>
                <span className="font-semibold text-neutral-900">
                  {selectedPlace.suitableFor.slice(0, 2).join(', ')}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Coordinates</span>
                <span className="font-mono font-medium text-neutral-700 text-[11px]">
                  {selectedPlace.coordinates.lat.toFixed(2)}°N, {selectedPlace.coordinates.lng.toFixed(2)}°E
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {onSelectDestination && (
                <button
                  onClick={() => onSelectDestination(selectedPlace)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>View Full Details & Hotels</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {onOpenTripPlanner && (
                <button
                  onClick={onOpenTripPlanner}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  Create Day-by-Day Plan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 8 Practical Guideline Cards */}
      <div className="space-y-6 mb-12">
        <h3 className="text-xl font-bold font-display text-neutral-900">
          Core Guidelines for {selectedPlace.name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Local Transportation */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-800">
              <Bus className="w-5 h-5" />
              <h4 className="font-bold font-display text-base text-neutral-900">
                1. Local Transportation
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {selectedPlace.travelGuidelines?.transportation ||
                'Local taxis, TNSTC / KSRTC express buses, and auto-rickshaws connect major transit hubs. For hill stations, experienced drivers are recommended for hairpin turns.'}
            </p>
            <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-500 font-mono">
              Transit tip: Inquire at government prepaid auto/taxi counters at railway stations to avoid inflated fares.
            </div>
          </div>

          {/* 2. Weather & Climate */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-800">
              <CloudSun className="w-5 h-5" />
              <h4 className="font-bold font-display text-base text-neutral-900">
                2. Weather & Seasonality
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {selectedPlace.travelGuidelines?.weather ||
                'Pleasant post-monsoon and winter months offer clear skies and comfortable walking temperatures. Carry rain protection during southwest or northeast monsoon periods.'}
            </p>
            <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-500">
              Peak Season: <span className="font-semibold text-neutral-800">{selectedPlace.bestSeason}</span>
            </div>
          </div>

          {/* 3. Clothing & Temple Dress Code */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-800">
              <Shirt className="w-5 h-5" />
              <h4 className="font-bold font-display text-base text-neutral-900">
                3. Clothing & Temple Dress Code
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {selectedPlace.travelGuidelines?.clothing ||
                'For temples: Men must wear dhoti or formal trousers; women must wear sarees, salwar suits, or churidars (no shorts or sleeveless tops). For hill stations like Ooty & Munnar, warm woolen layers and walking shoes are necessary.'}
            </p>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
              <span>Dhoti and saree rental stalls are available outside major temple towers if needed.</span>
            </div>
          </div>

          {/* 4. Safety & Health Instructions */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-800">
              <ShieldAlert className="w-5 h-5" />
              <h4 className="font-bold font-display text-base text-neutral-900">
                4. Safety & Health Protocols
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {selectedPlace.travelGuidelines?.safety ||
                'Drink packaged or verified RO filtered water. Carry basic motion sickness medication for hill ghat roads. In coastal areas like Dhanushkodi, heed warning flags regarding oceanic currents.'}
            </p>
            <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-500">
              Emergency numbers: Police: 100 / 112 | Tourist Helpline: 1363 | Medical Emergency: 108
            </div>
          </div>

          {/* 5. Local Customs & Etiquette */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-800">
              <HeartHandshake className="w-5 h-5" />
              <h4 className="font-bold font-display text-base text-neutral-900">
                5. Local Customs & Etiquette
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {selectedPlace.travelGuidelines?.customs ||
                'Always remove footwear before entering temple sanctums, traditional homes, and heritage shrines. Maintain silence during prayer services. Traditional meals on banana leaves are customarily eaten with the right hand.'}
            </p>
            <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-500">
              Photography: Strictly prohibited inside temple inner sanctums. Allowed in outer corridors.
            </div>
          </div>

          {/* 6. Family-Friendly Activities */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-800">
              <Baby className="w-5 h-5" />
              <h4 className="font-bold font-display text-base text-neutral-900">
                6. Family-Friendly Highlights
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {selectedPlace.travelGuidelines?.familyFriendly ||
                'Excellent for multi-generational families. Activities include scenic boat rides, botanical gardens, toy train steam journeys, palace light shows, and chocolate factory tours.'}
            </p>
            <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-500">
              Kids favorite: Nilgiri toy train steam engine, lake pedal boating, and Kathakali makeup shows.
            </div>
          </div>

          {/* 7. Accessibility & Mobility */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-800">
              <Accessibility className="w-5 h-5" />
              <h4 className="font-bold font-display text-base text-neutral-900">
                7. Accessibility & Senior Citizen Mobility
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {selectedPlace.travelGuidelines?.accessibility ||
                'Most botanical parks, lake promenades, and palace courtyards feature paved, barrier-free pathways. Wheelchair assistance can be requested at temple administrative offices and major railway stations.'}
            </p>
            <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-500">
              Battery-operated buggy cars are available at Mattupetty Dam, Banasura Dam, and Madurai railway terminal.
            </div>
          </div>

          {/* 8. Suggested Travel Routes */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-800">
              <Route className="w-5 h-5" />
              <h4 className="font-bold font-display text-base text-neutral-900">
                8. Suggested Travel Routes from Trichy HQ
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {selectedPlace.travelGuidelines?.suggestedRoutes ||
                'Conveniently accessible from GJ Guide Masters office on Thuraiyur Main Road, Trichy via NH 38, NH 45, or state expressways.'}
            </p>
            <div className="p-3 bg-emerald-50 text-emerald-900 rounded-lg text-xs font-medium">
              GJ Guide Masters drivers offer customized private point-to-point drop and multi-day packages.
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Multi-Destination Master Routes */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Master Itinerary Blueprints</span>
          </div>
          <h3 className="text-2xl font-bold font-display">
            Recommended South India Travel Routes
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            Carefully curated road routes connecting our flagship destinations with minimal transit fatigue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Route 1 */}
          <div className="bg-neutral-800/80 rounded-xl p-5 border border-neutral-700 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase">Route A · 4 Days</span>
              <h4 className="text-base font-bold font-display text-white mt-1">
                The Great Temple & Island Circuit
              </h4>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Trichy (Thuraiyur HQ) → Madurai (Meenakshi Temple) → Rameswaram (Pamban Bridge & 22 Wells) → Karaikudi (Chettinad Mansions).
              </p>
            </div>
            <div className="text-xs text-emerald-300 font-medium pt-2 border-t border-neutral-700">
              Ideal for: Spiritual Pilgrimage, Heritage Lovers & Architecture
            </div>
          </div>

          {/* Route 2 */}
          <div className="bg-neutral-800/80 rounded-xl p-5 border border-neutral-700 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase">Route B · 5 Days</span>
              <h4 className="text-base font-bold font-display text-white mt-1">
                The Western Ghats Misty Hill Tour
              </h4>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Trichy HQ → Dindigul → Kodaikanal (Lake & Pine Forests) → Munnar (Tea Hills & Eravikulam) → Kochi.
              </p>
            </div>
            <div className="text-xs text-emerald-300 font-medium pt-2 border-t border-neutral-700">
              Ideal for: Couples, Families & Cool Mountain Climate
            </div>
          </div>

          {/* Route 3 */}
          <div className="bg-neutral-800/80 rounded-xl p-5 border border-neutral-700 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase">Route C · 6 Days</span>
              <h4 className="text-base font-bold font-display text-white mt-1">
                The Classic Kerala Backwaters & Heritage
              </h4>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Kochi (Spice Docks & Net Fishing) → Munnar (Tea Estates) → Thekkady (Tiger Reserve) → Alleppey (Houseboat Cruise).
              </p>
            </div>
            <div className="text-xs text-emerald-300 font-medium pt-2 border-t border-neutral-700">
              Ideal for: Nature Lovers, Slow Travel & Authentic Cuisine
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
