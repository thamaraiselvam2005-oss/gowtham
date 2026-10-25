import React from 'react';
import { Bookmark, MapPin, Clock, ArrowRight, CheckCircle2, Ticket } from 'lucide-react';
import { TouristPlace } from '../types/travel';

interface DestinationCardProps {
  place: TouristPlace;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (place: TouristPlace) => void;
  onViewHotels: (destinationId: string) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  place,
  isSaved,
  onToggleSave,
  onSelect,
  onViewHotels,
}) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden flex flex-col hover:border-neutral-300 transition-all group shadow-sm">
      {/* Visual Asset Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={place.heroImage}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />

        {/* Data Source Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-neutral-800 text-[11px] font-medium px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
          {place.dataSource === 'verified' ? (
            <>
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Verified Destination</span>
            </>
          ) : (
            <span>Curated Guide</span>
          )}
        </div>

        {/* Wishlist Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(place.id);
          }}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            isSaved
              ? 'bg-emerald-800 text-white'
              : 'bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-900 shadow-sm'
          }`}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Bottom image overlay for duration and location */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/45 to-transparent p-3 text-white flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 font-medium truncate">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{place.district} Dist, {place.stateName}</span>
          </span>
          <span className="shrink-0 font-medium text-neutral-300 tabular-nums text-[11px]">
            {place.recommendedDuration}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Complete Location Hierarchy Breadcrumb (Country / State / District / City) */}
          <div className="text-[11px] font-mono text-emerald-800 mb-1.5 font-medium truncate">
            {place.country} &gt; {place.stateName} &gt; {place.district} Dist &gt; {place.city}
          </div>

          <h3 className="text-lg font-bold text-neutral-900 font-display mb-1 group-hover:text-emerald-800 transition-colors">
            {place.name}
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-3">
            {place.tagline}
          </p>

          {/* Key Quick Facts: Season & Category */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3 pb-3 border-b border-neutral-100">
            <span className="font-medium text-neutral-700">{place.category[0]}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{place.bestSeason.split('(')[0].trim()}</span>
          </div>
        </div>

        {/* Footer info & CTA */}
        <div>
          <div className="flex items-center justify-between text-xs mb-3">
            <div>
              <span className="text-neutral-400 text-[11px] block">Est. Daily Budget</span>
              <div className="font-semibold text-neutral-900 tabular-nums text-xs">
                ₹{place.estimatedExpensePerDay.min.toLocaleString()} – ₹{place.estimatedExpensePerDay.max.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <span className="text-neutral-400 text-[11px] block">Entry Fee</span>
              <div className="font-semibold text-neutral-900 tabular-nums text-xs">
                {place.entryFee.isFree ? 'Free Entry' : `₹${place.entryFee.amount}`}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onSelect(place)}
              className="w-full py-2 px-3 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewHotels(place.id)}
              className="w-full py-2 px-3 text-xs font-semibold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors text-center cursor-pointer"
            >
              Hotels & Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
