import React, { useState } from 'react';
import { X, MapPin, Compass, Navigation, ArrowRight, ExternalLink } from 'lucide-react';
import { TOURIST_PLACES } from '../data/travelData';
import { TouristPlace } from '../types/travel';

interface MapExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlace: (place: TouristPlace) => void;
}

export const MapExplorerModal: React.FC<MapExplorerModalProps> = ({
  isOpen,
  onClose,
  onSelectPlace,
}) => {
  if (!isOpen) return null;

  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('munnar');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const selectedPlace =
    TOURIST_PLACES.find((p) => p.id === selectedPlaceId) || TOURIST_PLACES[0];

  const filteredPlaces =
    filterCategory === 'all'
      ? TOURIST_PLACES
      : TOURIST_PLACES.filter((p) =>
          p.category.some((c) => c.toLowerCase().includes(filterCategory.toLowerCase()))
        );

  // Approximate relative coordinates for an interactive SVG map of South India / Kerala
  // Lat bounds roughly 8.0 to 12.0 N, Lng roughly 75.0 to 77.5 E
  const getMapPosition = (lat: number, lng: number) => {
    // Top-left = 12.5°N, 75.0°E; Bottom-right = 8.0°N, 78.0°E
    const minLat = 8.0;
    const maxLat = 12.5;
    const minLng = 75.0;
    const maxLng = 78.0;

    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;

    return {
      top: `${Math.max(5, Math.min(95, y))}%`,
      left: `${Math.max(5, Math.min(95, x))}%`,
    };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Map & Route Explorer</span>
            </div>
            <h3 className="text-xl font-bold font-display text-neutral-900 mt-0.5">
              Geographic Destinations & Travel Corridors
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-2.5 bg-neutral-50 border-b border-neutral-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-semibold text-neutral-600 shrink-0">Filter Map:</span>
          {['all', 'Hill Station', 'Backwaters', 'Beach', 'Wildlife', 'Heritage'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-md capitalize whitespace-nowrap transition-colors ${
                filterCategory === cat
                  ? 'bg-neutral-900 text-white font-medium'
                  : 'text-neutral-600 hover:bg-neutral-200/60'
              }`}
            >
              {cat === 'all' ? 'All Pins' : cat}
            </button>
          ))}
        </div>

        {/* Map Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* SVG Visual Map Surface (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900 p-6 relative flex flex-col justify-between overflow-hidden min-h-[360px]">
            {/* Background subtle topographic grid */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Stylized Western Ghats / Arabian Sea contour */}
            <div className="absolute top-4 left-4 text-xs font-mono text-neutral-500">
              ARABIAN SEA (WEST)
            </div>
            <div className="absolute top-4 right-4 text-xs font-mono text-neutral-500">
              WESTERN GHATS (EAST)
            </div>

            {/* Interactive Pins Container */}
            <div className="relative w-full h-[380px] my-auto">
              {filteredPlaces.map((p) => {
                const pos = getMapPosition(p.coordinates.lat, p.coordinates.lng);
                const isSelected = p.id === selectedPlaceId;

                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlaceId(p.id)}
                    style={{ top: pos.top, left: pos.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-10'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full shadow-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-emerald-500 text-neutral-950 ring-4 ring-emerald-500/30'
                          : 'bg-white text-neutral-900 group-hover:bg-emerald-100'
                      }`}
                    >
                      <MapPin className="w-4 h-4 fill-current" />
                    </div>
                    <span
                      className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold px-2 py-0.5 rounded shadow-sm ${
                        isSelected
                          ? 'bg-emerald-400 text-neutral-950'
                          : 'bg-neutral-800/90 text-neutral-200'
                      }`}
                    >
                      {p.name.split('(')[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="relative z-10 flex items-center justify-between text-[11px] text-neutral-400 pt-3 border-t border-neutral-800">
              <span>Coordinates: South India / Kerala Corridor</span>
              <span className="font-mono text-emerald-400">Click any pin for route specs</span>
            </div>
          </div>

          {/* Selected Pin Details (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-white overflow-y-auto space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100">
                <img
                  src={selectedPlace.heroImage}
                  alt={selectedPlace.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-neutral-900/80 text-white text-[10px] px-2 py-0.5 rounded">
                  {selectedPlace.stateName}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span className="font-mono tabular-nums">
                    {selectedPlace.coordinates.lat.toFixed(4)}°N, {selectedPlace.coordinates.lng.toFixed(4)}°E
                  </span>
                  <span>·</span>
                  <span>{selectedPlace.recommendedDuration}</span>
                </div>
                <h4 className="text-xl font-bold font-display text-neutral-900 mt-0.5">
                  {selectedPlace.name}
                </h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  {selectedPlace.tagline}
                </p>
              </div>

              {/* Road & Transit Connections */}
              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs space-y-1.5">
                <div className="font-semibold text-neutral-900">Direct Route Connections:</div>
                <div className="text-[11px] text-neutral-600 space-y-1">
                  {selectedPlace.nearbyAttractions.slice(0, 3).map((near, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>To {near.name}</span>
                      <span className="font-mono font-medium text-emerald-800">
                        ~{near.distanceKm} km
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => {
                  onClose();
                  onSelectPlace(selectedPlace);
                }}
                className="w-full py-2.5 px-4 font-semibold text-xs text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Open Full Destination Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${selectedPlace.name}, ${selectedPlace.stateName}, India`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Navigate on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
