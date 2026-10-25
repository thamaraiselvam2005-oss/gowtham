import React from 'react';
import { STATES_AND_REGIONS, TOURIST_PLACES } from '../data/travelData';
import { StateRegion, TouristPlace } from '../types/travel';
import { DestinationCard } from './DestinationCard';
import { MapPin, Calendar, Sparkles } from 'lucide-react';

interface StateExplorerProps {
  selectedStateId: string;
  onSelectState: (stateId: string) => void;
  savedDestinationIds: string[];
  onToggleSaveDestination: (id: string) => void;
  onSelectDestination: (place: TouristPlace) => void;
  onViewHotels: (destinationId: string) => void;
}

export const StateExplorer: React.FC<StateExplorerProps> = ({
  selectedStateId,
  onSelectState,
  savedDestinationIds,
  onToggleSaveDestination,
  onSelectDestination,
  onViewHotels,
}) => {
  const currentState =
    STATES_AND_REGIONS.find((s) => s.id === selectedStateId) || STATES_AND_REGIONS[0];

  const destinationsInState = TOURIST_PLACES.filter(
    (place) => place.stateId === currentState.id
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
          <span>Explore by Region & State</span>
          <span aria-hidden="true">·</span>
          <span>India & International</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900">
          Select a State or Destination Circuit
        </h2>
        <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
          Choose a region below to inspect curated tourist hubs, local attractions, genuine hotels, and authentic culinary traditions.
        </p>
      </div>

      {/* Horizontal State Selection Carousel / Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-10">
        {STATES_AND_REGIONS.map((state) => {
          const isSelected = state.id === currentState.id;
          return (
            <button
              key={state.id}
              onClick={() => onSelectState(state.id)}
              className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-700 bg-emerald-50/50 shadow-sm'
                  : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <div>
                <div className="text-[10px] font-mono uppercase text-neutral-500 font-semibold mb-0.5">
                  {state.country === 'India' ? 'State' : 'World'}
                </div>
                <div
                  className={`font-semibold text-sm leading-snug font-display ${
                    isSelected ? 'text-emerald-950 font-bold' : 'text-neutral-900'
                  }`}
                >
                  {state.name}
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                <span className="tabular-nums">{state.destinationsCount} Hubs</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected State Showcase Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl overflow-hidden border border-neutral-800 mb-10 relative">
        <div className="absolute inset-0 opacity-20">
          <img
            src={currentState.image}
            alt={currentState.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 p-6 sm:p-8 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <span>{currentState.country} Destination Spotlight</span>
            <span aria-hidden="true">·</span>
            <span>{currentState.tagline}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
            {currentState.name} Tourist Hubs
          </h3>

          <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
            {currentState.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300 pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Capital / Gateway: <strong>{currentState.capital}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Best Visiting Window: <strong>{currentState.bestSeason}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid inside the Selected State */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold font-display text-neutral-900">
            Major Tourist Destinations in {currentState.name} ({destinationsInState.length})
          </h4>
          <span className="text-xs text-neutral-500">
            Click any destination to view fees, hours, activities & verified hotels
          </span>
        </div>

        {destinationsInState.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationsInState.map((place) => (
              <DestinationCard
                key={place.id}
                place={place}
                isSaved={savedDestinationIds.includes(place.id)}
                onToggleSave={onToggleSaveDestination}
                onSelect={onSelectDestination}
                onViewHotels={onViewHotels}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-neutral-200">
            <p className="text-neutral-600 text-sm">
              Additional destinations for {currentState.name} are being indexed in the catalog.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
