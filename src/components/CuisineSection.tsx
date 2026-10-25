import React, { useState } from 'react';
import { HOTELS } from '../data/travelData';
import { Utensils, Check, Sparkles, MapPin, Tag } from 'lucide-react';

interface CuisineSectionProps {
  onSelectHotelForDining: (destinationId: string) => void;
}

export const CuisineSection: React.FC<CuisineSectionProps> = ({
  onSelectHotelForDining,
}) => {
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  // Aggregate signature dishes from hotels
  const allDishes = HOTELS.flatMap((hotel) =>
    hotel.foodDining.signatureDishes.map((dish) => ({
      ...dish,
      hotelName: hotel.name,
      hotelId: hotel.id,
      destinationName: hotel.destinationName,
      destinationId: hotel.destinationId,
      restaurantName: hotel.foodDining.restaurantName,
    }))
  );

  const filteredDishes =
    dietaryFilter === 'all'
      ? allDishes
      : allDishes.filter((d) => d.type === dietaryFilter);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
            <span>Culinary Discovery Guide</span>
            <span aria-hidden="true">·</span>
            <span>Flavors of Kerala & Beyond</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900">
            Authentic Regional Cuisine & Dining
          </h2>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
            Explore authentic delicacies prepared with freshly crushed Tellicherry peppercorns, fresh coconut cream, and fragrant Malabar spices at hotel dining rooms and homestays.
          </p>
        </div>

        {/* Dietary Filter Segmented Control */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1.5 rounded-lg shrink-0">
          <button
            onClick={() => setDietaryFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              dietaryFilter === 'all'
                ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            All Specialties ({allDishes.length})
          </button>
          <button
            onClick={() => setDietaryFilter('veg')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              dietaryFilter === 'veg'
                ? 'bg-white text-emerald-800 shadow-sm font-semibold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Vegetarian ({allDishes.filter((d) => d.type === 'veg').length})
          </button>
          <button
            onClick={() => setDietaryFilter('non-veg')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              dietaryFilter === 'non-veg'
                ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Non-Veg & Seafood ({allDishes.filter((d) => d.type === 'non-veg').length})
          </button>
        </div>
      </div>

      {/* Regional Culinary Highlights Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs">
          <div className="text-xs font-mono font-bold text-emerald-800 uppercase mb-1">
            01. Sadhya & Vegetarian Tradition
          </div>
          <h4 className="font-display font-bold text-neutral-900 text-base mb-1">
            The Grand Banana Leaf Feast
          </h4>
          <p className="text-xs text-neutral-600 leading-relaxed">
            A ceremonial vegetarian spread served during Onam and temple festivals with red rice, Avial, Thoran, Kalan, Olan, and payasam puddings.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs">
          <div className="text-xs font-mono font-bold text-emerald-800 uppercase mb-1">
            02. Backwaters & Coastal Seafood
          </div>
          <h4 className="font-display font-bold text-neutral-900 text-base mb-1">
            Karimeen & Coconut Curries
          </h4>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Fresh pearl spot fish, prawns, and crab caught fresh from Vembanad lagoon, wrapped in banana leaf and simmered in kokum-spiced gravies.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs">
          <div className="text-xs font-mono font-bold text-emerald-800 uppercase mb-1">
            03. High Range & Hill Spices
          </div>
          <h4 className="font-display font-bold text-neutral-900 text-base mb-1">
            Munnar & Wayanad Harvests
          </h4>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Farm-to-table dining incorporating green cardamom, single-origin cinnamon, cloves, freshly tapped coconut toddy, and aromatic Wayanad rice.
          </p>
        </div>
      </div>

      {/* Dishes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDishes.map((dish, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border border-neutral-200 bg-white flex flex-col justify-between hover:border-neutral-300 transition-all shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      dish.type === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}
                  />
                  <span>{dish.cuisineTag}</span>
                </span>
                <span className="text-sm font-bold text-neutral-900 font-mono tabular-nums">
                  ₹{dish.price}
                </span>
              </div>

              <h4 className="text-base font-bold font-display text-neutral-900 mb-2">
                {dish.name}
              </h4>

              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {dish.description}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
              <div>
                <div className="text-neutral-500 text-[11px]">Served at:</div>
                <div className="font-medium text-neutral-900">{dish.restaurantName}</div>
                <div className="text-neutral-500 text-[11px] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  <span>{dish.destinationName}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectHotelForDining(dish.destinationId)}
                className="px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
              >
                View Stays
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
