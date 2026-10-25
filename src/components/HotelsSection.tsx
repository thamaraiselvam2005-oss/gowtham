import React, { useState } from 'react';
import { HOTELS, TOURIST_PLACES } from '../data/travelData';
import { Hotel, RoomType } from '../types/travel';
import {
  Star,
  MapPin,
  Utensils,
  Phone,
  Mail,
  CheckCircle2,
  Bookmark,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronRight,
  Info,
  Search,
  SlidersHorizontal,
  Wifi,
  Wind,
  Bath,
  Car,
  BellRing,
  Flame,
  AlertTriangle,
  Coffee
} from 'lucide-react';

interface HotelsSectionProps {
  selectedDestinationFilter: string;
  onSelectDestinationFilter: (destId: string) => void;
  favoriteHotelIds: string[];
  onToggleFavoriteHotel: (hotelId: string) => void;
  onBookHotel: (hotel: Hotel, room: RoomType) => void;
  onOpenContact?: () => void;
}

export const HotelsSection: React.FC<HotelsSectionProps> = ({
  selectedDestinationFilter,
  onSelectDestinationFilter,
  favoriteHotelIds,
  onToggleFavoriteHotel,
  onBookHotel,
  onOpenContact,
}) => {
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<string>('all');
  const [selectedFoodPref, setSelectedFoodPref] = useState<string>('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(15000);
  const [hotelActiveTabs, setHotelActiveTabs] = useState<Record<string, 'rooms' | 'food'>>({});

  // Helper for hotel tab
  const getHotelTab = (hotelId: string) => hotelActiveTabs[hotelId] || 'rooms';
  const setHotelTab = (hotelId: string, tab: 'rooms' | 'food') => {
    setHotelActiveTabs((prev) => ({ ...prev, [hotelId]: tab }));
  };

  // Available destination list with hotels
  const hotelDestinations = Array.from(new Set(HOTELS.map((h) => h.destinationId))).map(
    (destId) => {
      const place = TOURIST_PLACES.find((p) => p.id === destId);
      return { id: destId, name: place ? place.name : destId };
    }
  );

  // Filtered Hotels Logic
  const filteredHotels = HOTELS.filter((hotel) => {
    const matchesDest =
      selectedDestinationFilter === 'all' || hotel.destinationId === selectedDestinationFilter;

    const matchesSearch =
      searchQuery === '' ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.foodDining.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.facilities.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFacility =
      selectedFacility === 'all' ||
      (selectedFacility === 'ac' && hotel.hasAC) ||
      (selectedFacility === 'wifi' && hotel.hasWifi) ||
      (selectedFacility === 'bath' && hotel.hasAttachedBathroom) ||
      (selectedFacility === 'parking' && hotel.hasParking) ||
      (selectedFacility === 'roomService' && hotel.hasRoomService) ||
      (selectedFacility === 'hotWater' && hotel.hasHotWater);

    const matchesFood =
      selectedFoodPref === 'all' ||
      (selectedFoodPref === 'vegOnly' && hotel.foodDining.vegetarianAvailable && !hotel.foodDining.nonVegetarianAvailable) ||
      (selectedFoodPref === 'nonVeg' && hotel.foodDining.nonVegetarianAvailable) ||
      (selectedFoodPref === 'buffet' && hotel.foodDining.buffetAvailable) ||
      (selectedFoodPref === 'roomServiceMeal' && hotel.foodDining.roomServiceMealsAvailable);

    const lowestPrice = Math.min(...hotel.roomTypes.map((r) => r.pricePerNight));
    const matchesPrice = lowestPrice <= maxPriceFilter;

    return matchesDest && matchesSearch && matchesFacility && matchesFood && matchesPrice;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
          <span>Verified Accommodations & Hotel Dining</span>
          <span aria-hidden="true">·</span>
          <span>GJ Guide Masters Stay Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900">
          Hotels, Room Facilities & Authentic Menus
        </h2>
        <p className="text-sm text-neutral-600 mt-1 max-w-3xl leading-relaxed">
          Inspect accommodations near Ooty, Kodaikanal, Madurai, Rameswaram, Munnar, Alleppey, Kochi, and Wayanad. Compare essential room facilities (AC, Wi-Fi, Attached Bath, Parking, 24/7 Hot Water) and explore dedicated dining sections with authentic South Indian food offerings.
        </p>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-sm mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative flex items-center">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hotels, dishes (e.g. Savoy, Carlton, Jigarthanda, Karimeen)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-neutral-50 rounded-lg border border-neutral-200 focus:outline-none focus:border-emerald-700 transition-colors"
            />
          </div>

          {/* Facility Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 rounded-lg border border-neutral-200 focus:outline-none focus:border-emerald-700 transition-colors cursor-pointer"
            >
              <option value="all">All Room Facilities</option>
              <option value="ac">Air Conditioning (AC)</option>
              <option value="wifi">Free High-Speed Wi-Fi</option>
              <option value="bath">Attached Bathroom</option>
              <option value="parking">Complimentary Parking</option>
              <option value="roomService">24/7 Room Service</option>
              <option value="hotWater">24/7 Hot Water Facility</option>
            </select>
          </div>

          {/* Food Menu Filter */}
          <div className="md:col-span-4">
            <select
              value={selectedFoodPref}
              onChange={(e) => setSelectedFoodPref(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 rounded-lg border border-neutral-200 focus:outline-none focus:border-emerald-700 transition-colors cursor-pointer"
            >
              <option value="all">All Food & Cuisine Options</option>
              <option value="vegOnly">Pure Vegetarian Certified</option>
              <option value="nonVeg">Non-Vegetarian Available</option>
              <option value="buffet">Buffet Breakfast / Dining</option>
              <option value="roomServiceMeal">In-Room Dining / Room Service</option>
            </select>
          </div>
        </div>

        {/* Destination Pills Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-neutral-100">
          <span className="text-xs font-semibold text-neutral-400 mr-1 shrink-0">Destination:</span>
          <button
            onClick={() => onSelectDestinationFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedDestinationFilter === 'all'
                ? 'bg-neutral-900 text-white shadow-sm font-semibold'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            All Destinations ({HOTELS.length})
          </button>
          {hotelDestinations.map((d) => (
            <button
              key={d.id}
              onClick={() => onSelectDestinationFilter(d.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedDestinationFilter === d.id
                  ? 'bg-neutral-900 text-white shadow-sm font-semibold'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hotels Listing */}
      {filteredHotels.length > 0 ? (
        <div className="space-y-8">
          {filteredHotels.map((hotel) => {
            const isFavorited = favoriteHotelIds.includes(hotel.id);
            const lowestPrice = Math.min(...hotel.roomTypes.map((r) => r.pricePerNight));
            const currentTab = getHotelTab(hotel.id);

            return (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:border-neutral-300 transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Column: Visual Asset & Hotel Badges (4 cols) */}
                  <div className="lg:col-span-4 relative bg-neutral-100 aspect-[16/10] lg:aspect-auto">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {/* Verified vs Sample Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-neutral-900 text-[11px] font-medium px-2.5 py-1 rounded shadow-sm flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{hotel.badge || 'Verified Accommodation'}</span>
                    </div>

                    {/* Favorite Bookmark */}
                    <button
                      onClick={() => onToggleFavoriteHotel(hotel.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                        isFavorited
                          ? 'bg-emerald-800 text-white'
                          : 'bg-white/80 hover:bg-white text-neutral-700 shadow-sm'
                      }`}
                      title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>

                    {/* Price banner on mobile / image overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent p-4 text-white flex items-end justify-between">
                      <div>
                        <div className="text-[11px] text-neutral-300 font-mono">
                          {hotel.district} Dist · {hotel.city}
                        </div>
                        <div className="text-xs text-neutral-200">
                          {hotel.distanceFromCenterKm} km from landmark center
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-300 uppercase block">From</span>
                        <span className="text-lg font-bold font-display text-white tabular-nums">
                          ₹{lowestPrice.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-neutral-300"> / night</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Information, Room Facilities & Dedicated Food Section (8 cols) */}
                  <div className="lg:col-span-8 p-6 flex flex-col justify-between">
                    <div>
                      {/* Top Meta: Star Rating & Contact Details */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center text-amber-500">
                            {Array.from({ length: hotel.starRating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="font-semibold text-neutral-900">{hotel.rating} / 5.0</span>
                          <span className="text-neutral-400">({hotel.reviewCount} verified guest reviews)</span>
                        </div>

                        <div className="flex items-center gap-3 text-neutral-500 text-[11px] font-mono">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-emerald-700" />
                            <span>{hotel.contactPhone}</span>
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-700" />
                            <span>In: {hotel.checkInTime} / Out: {hotel.checkOutTime}</span>
                          </span>
                        </div>
                      </div>

                      {/* Hotel Name & Address */}
                      <div className="mt-3 mb-4">
                        <div className="text-[11px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">
                          {hotel.country} &gt; {hotel.stateId === 'tamil-nadu' ? 'Tamil Nadu' : 'Kerala'} &gt; {hotel.destinationName}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-900 mt-0.5">
                          {hotel.name}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                          <span>{hotel.address}</span>
                        </p>
                      </div>

                      {/* Required Room Facilities Badges Row */}
                      <div className="mb-5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                        <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                          Standard Room & Property Amenities:
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-neutral-800">
                          <div className="flex items-center gap-1.5">
                            <Wind className={`w-3.5 h-3.5 ${hotel.hasAC ? 'text-emerald-700' : 'text-neutral-400'}`} />
                            <span className={hotel.hasAC ? 'font-medium' : 'text-neutral-400 line-through'}>
                              Air Conditioning (AC)
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Wifi className={`w-3.5 h-3.5 ${hotel.hasWifi ? 'text-emerald-700' : 'text-neutral-400'}`} />
                            <span className={hotel.hasWifi ? 'font-medium' : 'text-neutral-400 line-through'}>
                              Free High-Speed Wi-Fi
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Bath className={`w-3.5 h-3.5 ${hotel.hasAttachedBathroom ? 'text-emerald-700' : 'text-neutral-400'}`} />
                            <span className={hotel.hasAttachedBathroom ? 'font-medium' : 'text-neutral-400 line-through'}>
                              Attached Bathroom
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Car className={`w-3.5 h-3.5 ${hotel.hasParking ? 'text-emerald-700' : 'text-neutral-400'}`} />
                            <span className={hotel.hasParking ? 'font-medium' : 'text-neutral-400 line-through'}>
                              Complimentary Parking
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <BellRing className={`w-3.5 h-3.5 ${hotel.hasRoomService ? 'text-emerald-700' : 'text-neutral-400'}`} />
                            <span className={hotel.hasRoomService ? 'font-medium' : 'text-neutral-400 line-through'}>
                              24/7 Room Service
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Flame className={`w-3.5 h-3.5 ${hotel.hasHotWater ? 'text-emerald-700' : 'text-neutral-400'}`} />
                            <span className={hotel.hasHotWater ? 'font-medium' : 'text-neutral-400 line-through'}>
                              24/7 Hot Water Facility
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Sub-Tabs: Rooms & Pricing VS Dedicated Food Menu */}
                      <div className="flex items-center gap-2 border-b border-neutral-200 mb-4">
                        <button
                          onClick={() => setHotelTab(hotel.id, 'rooms')}
                          className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                            currentTab === 'rooms'
                              ? 'border-emerald-800 text-neutral-900 font-bold'
                              : 'border-transparent text-neutral-500 hover:text-neutral-900'
                          }`}
                        >
                          Room Categories & Pricing ({hotel.roomTypes.length})
                        </button>
                        <button
                          onClick={() => setHotelTab(hotel.id, 'food')}
                          className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                            currentTab === 'food'
                              ? 'border-emerald-800 text-neutral-900 font-bold'
                              : 'border-transparent text-neutral-500 hover:text-neutral-900'
                          }`}
                        >
                          <Utensils className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Dedicated Food & Dining Menu</span>
                          {hotel.foodDining.isVerifiedMenu && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 rounded">
                              Verified
                            </span>
                          )}
                        </button>
                      </div>

                      {/* SUB-VIEW 1: ROOMS */}
                      {currentTab === 'rooms' && (
                        <div className="space-y-3">
                          {hotel.roomTypes.map((room, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                            >
                              <div className="space-y-1">
                                <div className="font-bold text-neutral-900 text-sm">{room.name}</div>
                                <div className="text-neutral-500 text-[11px]">
                                  Bed: <strong className="text-neutral-700">{room.bedType}</strong> · Capacity: <strong className="text-neutral-700">{room.capacity}</strong>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-neutral-600">
                                  {room.amenities.map((amenity, aIdx) => (
                                    <span key={aIdx} className="bg-white border border-neutral-200 px-2 py-0.5 rounded">
                                      {amenity}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-200 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                                <div>
                                  <div className="text-base font-bold font-display text-neutral-900 tabular-nums">
                                    ₹{room.pricePerNight.toLocaleString()}
                                  </div>
                                  <div className="text-[10px] text-neutral-400">per night + taxes</div>
                                </div>

                                <button
                                  onClick={() => onBookHotel(hotel, room)}
                                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                                >
                                  Reserve Room
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* SUB-VIEW 2: DEDICATED HOTEL FOOD SECTION */}
                      {currentTab === 'food' && (
                        <div className="space-y-4 text-xs animate-in fade-in">
                          {/* Menu Verification Disclaimer */}
                          <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                            hotel.foodDining.isVerifiedMenu
                              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                              : 'bg-amber-50/80 border-amber-200 text-amber-950'
                          }`}>
                            <Info className="w-4 h-4 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-bold text-xs">
                                {hotel.foodDining.isVerifiedMenu
                                  ? 'Verified Restaurant Menu & Ingredients'
                                  : 'Curated Sample Food Menu'}
                              </div>
                              <div className="text-[11px] mt-0.5 leading-relaxed">
                                {hotel.foodDining.menuDisclaimer ||
                                  'GJ Guide Masters inspects hotel kitchens directly. Sample prices and menu items reflect seasonal availability.'}
                              </div>
                            </div>
                          </div>

                          {/* Restaurant Info & Food Flags */}
                          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-neutral-50 rounded-lg">
                            <div>
                              <span className="text-neutral-400 text-[11px] block">In-House Restaurant</span>
                              <span className="font-bold text-neutral-900 text-sm">
                                {hotel.foodDining.restaurantName}
                              </span>
                              <span className="text-[11px] text-neutral-500 block">
                                Cuisines: {hotel.foodDining.cuisines.join(', ')}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                              {hotel.foodDining.vegetarianAvailable && (
                                <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                                  Pure Veg Options
                                </span>
                              )}
                              {hotel.foodDining.nonVegetarianAvailable && (
                                <span className="bg-neutral-200 text-neutral-800 font-semibold px-2 py-0.5 rounded">
                                  Non-Veg Dishes
                                </span>
                              )}
                              {hotel.foodDining.buffetAvailable && (
                                <span className="bg-neutral-100 border border-neutral-300 text-neutral-700 px-2 py-0.5 rounded">
                                  Buffet Available
                                </span>
                              )}
                              {hotel.foodDining.roomServiceMealsAvailable && (
                                <span className="bg-neutral-100 border border-neutral-300 text-neutral-700 px-2 py-0.5 rounded">
                                  24/7 Room-Service Meals
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Meal Breakdown Grid: Breakfast, Lunch, Dinner */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* Breakfast */}
                            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1.5">
                              <div className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                                <Coffee className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Breakfast Options</span>
                              </div>
                              <ul className="text-neutral-600 text-[11px] space-y-1">
                                {hotel.foodDining.breakfastOfferings.map((item, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-1">
                                    <span className="text-emerald-700 font-bold">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Lunch */}
                            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1.5">
                              <div className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                                <Utensils className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Lunch Offerings</span>
                              </div>
                              <ul className="text-neutral-600 text-[11px] space-y-1">
                                {hotel.foodDining.lunchOfferings.map((item, lIdx) => (
                                  <li key={lIdx} className="flex items-start gap-1">
                                    <span className="text-emerald-700 font-bold">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Dinner */}
                            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1.5">
                              <div className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Dinner Specialties</span>
                              </div>
                              <ul className="text-neutral-600 text-[11px] space-y-1">
                                {hotel.foodDining.dinnerOfferings.map((item, dIdx) => (
                                  <li key={dIdx} className="flex items-start gap-1">
                                    <span className="text-emerald-700 font-bold">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Signature Dishes */}
                          {hotel.foodDining.signatureDishes && hotel.foodDining.signatureDishes.length > 0 && (
                            <div className="space-y-2 pt-2">
                              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                                Chef’s Signature Local Dishes:
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {hotel.foodDining.signatureDishes.map((dish, sIdx) => (
                                  <div
                                    key={sIdx}
                                    className="p-3 bg-white rounded-lg border border-neutral-200 flex items-start justify-between gap-2"
                                  >
                                    <div>
                                      <div className="flex items-center gap-1.5">
                                        <span
                                          className={`w-2 h-2 rounded-full ${
                                            dish.type === 'veg' ? 'bg-emerald-600' : 'bg-red-600'
                                          }`}
                                        />
                                        <span className="font-bold text-neutral-900 text-xs">{dish.name}</span>
                                      </div>
                                      <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2">
                                        {dish.description}
                                      </p>
                                      <span className="text-[10px] text-emerald-800 font-mono mt-1 inline-block">
                                        {dish.cuisineTag}
                                      </span>
                                    </div>
                                    <span className="font-bold font-mono text-neutral-900 tabular-nums shrink-0">
                                      ₹{dish.price}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 space-y-4">
          <p className="text-neutral-600 text-sm">
            No hotels match your current filters. Try resetting the search or adjusting facility requirements.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFacility('all');
              setSelectedFoodPref('all');
              onSelectDestinationFilter('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
