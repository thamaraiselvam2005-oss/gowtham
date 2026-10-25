import React, { useState } from 'react';
import { TOURIST_PLACES, HOTELS, SAMPLE_ITINERARIES } from '../data/travelData';
import { TripPlan, DayItinerary, DayItineraryPlace, DayItineraryMeal } from '../types/travel';
import {
  Calendar,
  Clock,
  MapPin,
  Utensils,
  Hotel as HotelIcon,
  Sparkles,
  Download,
  BookmarkCheck,
  Check,
  Plus,
  Trash2,
  Printer
} from 'lucide-react';

interface TripPlannerProps {
  initialDestinationId?: string;
  initialDurationDays?: number;
  onSavePlan: (plan: TripPlan) => void;
  savedPlans: TripPlan[];
}

export const TripPlanner: React.FC<TripPlannerProps> = ({
  initialDestinationId = 'munnar',
  initialDurationDays = 5,
  onSavePlan,
  savedPlans,
}) => {
  // Input form state
  const [destinationId, setDestinationId] = useState<string>(initialDestinationId);
  const [startDate, setStartDate] = useState<string>('2026-11-10');
  const [totalDays, setTotalDays] = useState<number>(initialDurationDays);
  const [travelers, setTravelers] = useState<number>(2);
  const [budgetTier, setBudgetTier] = useState<'budget' | 'moderate' | 'luxury'>('moderate');
  const [companionType, setCompanionType] = useState<'Solo' | 'Couple' | 'Family' | 'Friends'>('Couple');
  const [foodPreference, setFoodPreference] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    'Tea estate walk',
    'Houseboat cruise',
    'Wildlife safari',
    'Local food tasting'
  ]);

  // Current working itinerary
  const [currentItinerary, setCurrentItinerary] = useState<TripPlan>(SAMPLE_ITINERARIES[0]);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  const availableActivities = [
    'Tea estate walk',
    'Houseboat cruise',
    'Wildlife safari',
    'Beach sunset',
    'Ayurvedic massage',
    'Kathakali cultural dance',
    'Spice plantation tour',
    'Cave & waterfall hike',
    'Local food tasting'
  ];

  const handleToggleActivity = (act: string) => {
    setSelectedActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  // Generate day-by-day plan algorithm
  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();

    const dest = TOURIST_PLACES.find((p) => p.id === destinationId) || TOURIST_PLACES[0];
    const relatedHotels = HOTELS.filter((h) => h.destinationId === destinationId);
    const chosenHotel = relatedHotels[0] || HOTELS[0];
    const chosenRoom =
      budgetTier === 'luxury' && chosenHotel.roomTypes.length > 1
        ? chosenHotel.roomTypes[1]
        : chosenHotel.roomTypes[0];

    const generatedDays: DayItinerary[] = [];
    const baseDate = new Date(startDate);

    for (let day = 1; day <= totalDays; day++) {
      const placesForDay: DayItineraryPlace[] = [];
      const mealsForDay: DayItineraryMeal[] = [];

      // Day specific logic
      if (day === 1) {
        placesForDay.push(
          {
            placeId: dest.id,
            name: `${dest.name} Arrival & Scenic Orientation`,
            timeSlot: '11:30 AM – 1:30 PM',
            duration: '2 hrs',
            entryFee: 0,
            notes: 'Check into hotel, enjoy welcome fresh tender coconut water and orientation walk.',
            category: 'Arrival'
          },
          {
            placeId: dest.id,
            name: dest.activities[0] || 'Local Sightseeing & Viewpoint',
            timeSlot: '3:30 PM – 5:30 PM',
            duration: '2 hrs',
            entryFee: dest.entryFee.isFree ? 0 : dest.entryFee.amount,
            notes: 'Unwind amidst local greenery and scenic sunset vistas.',
            category: 'Sightseeing'
          }
        );
      } else if (day === totalDays) {
        placesForDay.push(
          {
            placeId: dest.id,
            name: 'Local Spice Market & Souvenir Shopping',
            timeSlot: '9:30 AM – 11:30 AM',
            duration: '2 hrs',
            entryFee: 0,
            notes: 'Pick up fresh green cardamom, pepper, artisanal tea, and banana chips.',
            category: 'Shopping'
          },
          {
            placeId: dest.id,
            name: 'Farewell Scenic Viewpoint & Airport Transit',
            timeSlot: '1:00 PM – 3:30 PM',
            duration: '2.5 hrs',
            entryFee: 0,
            notes: 'Pack luggage and depart for airport/railway junction.',
            category: 'Departure'
          }
        );
      } else {
        const actIndex = (day - 2) % dest.activities.length;
        const nearAttract = dest.nearbyAttractions[(day - 2) % dest.nearbyAttractions.length];

        placesForDay.push(
          {
            placeId: dest.id,
            name: dest.activities[actIndex] || `${dest.name} Exploration`,
            timeSlot: '8:30 AM – 11:30 AM',
            duration: '3 hrs',
            entryFee: dest.entryFee.isFree ? 0 : dest.entryFee.amount,
            notes: 'Optimal morning lighting for photography and pleasant temperatures.',
            category: 'Activity'
          },
          {
            placeId: dest.id,
            name: nearAttract ? nearAttract.name : `${dest.name} Leisure & Culture`,
            timeSlot: '2:30 PM – 5:30 PM',
            duration: '3 hrs',
            entryFee: 50,
            notes: nearAttract ? nearAttract.description : 'Explore adjacent viewpoints and nature paths.',
            category: 'Excursion'
          }
        );
      }

      // Meal recommendations
      const dishVeg = chosenHotel.foodDining.signatureDishes.find((d) => d.type === 'veg');
      const dishNonVeg = chosenHotel.foodDining.signatureDishes.find((d) => d.type === 'non-veg');
      const chosenLunchDish =
        foodPreference === 'veg'
          ? dishVeg?.name || 'Kerala Sadhya Feast'
          : dishNonVeg?.name || 'Kerala Fish Curry / Chicken Roast';

      mealsForDay.push(
        {
          mealType: 'Breakfast',
          restaurantName: `${chosenHotel.name} Dining`,
          dishRecommendation:
            foodPreference === 'veg'
              ? 'Appam with Vegetable Stew & Filter Coffee'
              : 'Appam with Egg Roast / Puttu & Kadala',
          isVegetarianOptionAvailable: true,
          estimatedCost: budgetTier === 'luxury' ? 450 : 250
        },
        {
          mealType: 'Lunch',
          restaurantName: `${chosenHotel.foodDining.restaurantName}`,
          dishRecommendation: chosenLunchDish,
          isVegetarianOptionAvailable: true,
          estimatedCost: budgetTier === 'luxury' ? 850 : 450
        },
        {
          mealType: 'Dinner',
          restaurantName: 'Heritage Courtyard Dining',
          dishRecommendation:
            foodPreference === 'veg'
              ? 'Malabar Parotta with Paneer / Kootu Curry & Payasam'
              : 'Malabar Parotta with Tellicherry Pepper Chicken & Payasam',
          isVegetarianOptionAvailable: true,
          estimatedCost: budgetTier === 'luxury' ? 950 : 550
        }
      );

      const dayMealsCost = mealsForDay.reduce((acc, m) => acc + m.estimatedCost * travelers, 0);
      const dayEntryCost = placesForDay.reduce((acc, p) => acc + p.entryFee * travelers, 0);
      const dayStayCost = day < totalDays ? chosenRoom.pricePerNight : 0;
      const dayTotal = dayStayCost + dayMealsCost + dayEntryCost + 600 * travelers; // transit buffer

      generatedDays.push({
        dayNumber: day,
        title: `Day 0${day}: ${placesForDay[0].name.split('&')[0].trim()}`,
        summary: `Full-day exploration in and around ${dest.name} tailored for ${companionType.toLowerCase()} travel.`,
        places: placesForDay,
        meals: mealsForDay,
        accommodation: {
          hotelId: chosenHotel.id,
          hotelName: chosenHotel.name,
          roomType: chosenRoom.name,
          estimatedNightCost: dayStayCost
        },
        travelNotes:
          day === 1
            ? `Allow 3–4 hrs from nearest airport (COK / TRV). Plan stops at roadside coconut stalls.`
            : `Local taxi or private cab estimated at ₹2,200/day for all sightseeing.`,
        dayEstimatedCost: dayTotal
      });
    }

    const calculatedTripTotal = generatedDays.reduce((acc, d) => acc + d.dayEstimatedCost, 0);

    const newPlan: TripPlan = {
      id: `plan-${Date.now()}`,
      title: `${totalDays}-Day ${dest.name} & Kerala Circuit`,
      destinationId: dest.id,
      destinationName: dest.name,
      stateName: dest.stateName,
      startDate,
      endDate: new Date(baseDate.getTime() + (totalDays - 1) * 86400000).toISOString().split('T')[0],
      totalDays,
      travelers,
      budgetTier,
      companionType,
      preferredActivities: selectedActivities,
      foodPreference,
      totalEstimatedCost: calculatedTripTotal,
      days: generatedDays,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCurrentItinerary(newPlan);
  };

  const handleSaveCurrentPlan = () => {
    onSavePlan(currentItinerary);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
          <span>Day-by-Day Custom Travel Architecture</span>
          <span aria-hidden="true">·</span>
          <span>Automated Expense & Activity Generator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900">
          Personalized Trip Planner
        </h2>
        <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
          Configure your travel dates, companion group, budget tier, and dining preferences to generate a day-by-day itinerary with verified timings, entry fees, and meal stops.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column (4 cols) */}
        <form
          onSubmit={handleGeneratePlan}
          className="lg:col-span-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-5 text-xs sticky top-20"
        >
          <div className="font-bold text-sm text-neutral-900 pb-2 border-b border-neutral-100 flex items-center justify-between">
            <span>Trip Parameters</span>
            <span className="font-mono text-emerald-700 text-xs font-normal">Custom Engine</span>
          </div>

          {/* Primary Destination */}
          <div>
            <label className="block text-neutral-700 font-medium mb-1">Primary Destination</label>
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full p-2.5 bg-neutral-50 rounded-lg border border-neutral-300 focus:border-emerald-700 focus:outline-none"
            >
              {TOURIST_PLACES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.stateName})
                </option>
              ))}
            </select>
          </div>

          {/* Start Date & Days */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-700 font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 bg-neutral-50 rounded-lg border border-neutral-300 focus:border-emerald-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-neutral-700 font-medium mb-1">Total Days</label>
              <select
                value={totalDays}
                onChange={(e) => setTotalDays(Number(e.target.value))}
                className="w-full p-2 bg-neutral-50 rounded-lg border border-neutral-300 focus:border-emerald-700 focus:outline-none"
              >
                {[2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num} Days
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Travelers & Companions */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-700 font-medium mb-1">Travelers</label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full p-2 bg-neutral-50 rounded-lg border border-neutral-300 focus:border-emerald-700 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-neutral-700 font-medium mb-1">Group Type</label>
              <select
                value={companionType}
                onChange={(e) => setCompanionType(e.target.value as any)}
                className="w-full p-2 bg-neutral-50 rounded-lg border border-neutral-300 focus:border-emerald-700 focus:outline-none"
              >
                <option value="Solo">Solo</option>
                <option value="Couple">Couple</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
              </select>
            </div>
          </div>

          {/* Budget Tier */}
          <div>
            <label className="block text-neutral-700 font-medium mb-1">Budget Tier</label>
            <div className="grid grid-cols-3 gap-2">
              {(['budget', 'moderate', 'luxury'] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudgetTier(b)}
                  className={`p-2 rounded-lg border text-center capitalize transition-colors font-medium ${
                    budgetTier === b
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Food Preference */}
          <div>
            <label className="block text-neutral-700 font-medium mb-1">Dining Preference</label>
            <select
              value={foodPreference}
              onChange={(e) => setFoodPreference(e.target.value as any)}
              className="w-full p-2 bg-neutral-50 rounded-lg border border-neutral-300 focus:border-emerald-700 focus:outline-none"
            >
              <option value="all">All Regional Foods & Curries</option>
              <option value="veg">Pure Vegetarian (Sadhya, Appam, Idiyappam)</option>
              <option value="non-veg">Non-Veg Specialty (Karimeen, Kozhi, Mutton)</option>
            </select>
          </div>

          {/* Preferred Activities Tags */}
          <div>
            <label className="block text-neutral-700 font-medium mb-1.5">
              Highlight Activities ({selectedActivities.length})
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableActivities.map((act) => {
                const isSelected = selectedActivities.includes(act);
                return (
                  <button
                    key={act}
                    type="button"
                    onClick={() => handleToggleActivity(act)}
                    className={`px-2 py-1 rounded text-[11px] transition-colors border ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {act}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg shadow-sm transition-colors text-xs flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Itinerary</span>
          </button>
        </form>

        {/* Right Output Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Itinerary Overview Banner */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                <span>{currentItinerary.stateName}</span>
                <span aria-hidden="true">·</span>
                <span>{currentItinerary.totalDays} Days / {currentItinerary.totalDays - 1} Nights</span>
                <span aria-hidden="true">·</span>
                <span>{currentItinerary.travelers} Travelers</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">{currentItinerary.budgetTier} Tier</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-900">
                {currentItinerary.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <button
                onClick={handlePrint}
                className="p-2 border border-neutral-300 hover:bg-neutral-100 rounded-lg text-neutral-700 text-xs flex items-center gap-1"
                title="Print or Save as PDF"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print Brief</span>
              </button>

              <button
                onClick={handleSaveCurrentPlan}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Save Itinerary</span>
              </button>
            </div>
          </div>

          {saveSuccessNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg text-xs flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Itinerary saved to your personal profile! View it anytime under My Account.</span>
            </div>
          )}

          {/* Total Expense Breakdown Bar */}
          <div className="bg-neutral-900 text-white p-5 rounded-2xl border border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-neutral-400">Total Est. Cost</span>
              <div className="text-xl font-bold font-display text-emerald-400 tabular-nums">
                ₹{currentItinerary.totalEstimatedCost.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-neutral-400">Per Person Share</span>
              <div className="text-lg font-bold font-display text-white tabular-nums">
                ₹{Math.round(currentItinerary.totalEstimatedCost / currentItinerary.travelers).toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-neutral-400">Avg. Per Day</span>
              <div className="text-lg font-bold font-display text-white tabular-nums">
                ₹{Math.round(currentItinerary.totalEstimatedCost / currentItinerary.totalDays).toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-neutral-400">Includes</span>
              <div className="text-xs text-neutral-200 mt-1">Stays, Meals, Entry & Local Transport</div>
            </div>
          </div>

          {/* Days Accordion / List */}
          <div className="space-y-6">
            {currentItinerary.days.map((day) => (
              <div
                key={day.dayNumber}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs"
              >
                {/* Day Header */}
                <div className="p-5 border-b border-neutral-100 bg-neutral-50/60 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-emerald-800 text-xs font-bold uppercase tracking-wider">
                      Day {day.dayNumber}
                    </span>
                    <h4 className="text-base font-bold font-display text-neutral-900 mt-0.5">
                      {day.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-neutral-500">Day Budget Est.</span>
                    <div className="font-bold font-mono text-neutral-900 text-sm tabular-nums">
                      ₹{day.dayEstimatedCost.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  <p className="text-xs text-neutral-600">{day.summary}</p>

                  {/* Sightseeing Slots */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-semibold text-neutral-800 uppercase tracking-wide">
                      Scheduled Sightseeing & Activities
                    </div>
                    <div className="space-y-2">
                      {day.places.map((place, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-3 rounded-lg border border-neutral-200 bg-neutral-50/40 text-xs flex flex-col sm:flex-row justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-neutral-900">{place.name}</span>
                              <span className="text-[11px] text-neutral-500 font-mono">
                                ({place.timeSlot})
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-600 mt-0.5">{place.notes}</p>
                          </div>
                          <div className="shrink-0 text-right sm:self-center font-mono text-neutral-700 text-[11px]">
                            {place.entryFee > 0 ? `Entry: ₹${place.entryFee * currentItinerary.travelers}` : 'Free Entry'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meals Plan */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-neutral-800 uppercase tracking-wide flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-amber-700" />
                      <span>Curated Dining & Regional Specialties</span>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2 text-xs">
                      {day.meals.map((meal) => (
                        <div
                          key={meal.mealType}
                          className="p-2.5 rounded-lg border border-amber-200/60 bg-amber-50/20"
                        >
                          <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-900 mb-1">
                            <span>{meal.mealType}</span>
                            <span className="font-mono text-neutral-600 tabular-nums">
                              ₹{meal.estimatedCost * currentItinerary.travelers}
                            </span>
                          </div>
                          <div className="text-[11px] text-amber-900 font-medium">
                            {meal.dishRecommendation}
                          </div>
                          <div className="text-[10px] text-neutral-500 mt-0.5">
                            {meal.restaurantName}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stay Recommendation */}
                  {day.accommodation.hotelName !== 'Departure Flights (No hotel needed)' && (
                    <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <HotelIcon className="w-4 h-4 text-emerald-800 shrink-0" />
                        <div>
                          <span className="font-semibold text-neutral-900">
                            {day.accommodation.hotelName}
                          </span>
                          <span className="text-neutral-600 text-[11px] block">
                            {day.accommodation.roomType}
                          </span>
                        </div>
                      </div>
                      <div className="text-right font-mono font-bold text-neutral-800 tabular-nums">
                        ₹{day.accommodation.estimatedNightCost.toLocaleString()}
                        <span className="font-normal text-[10px] text-neutral-500 block">/ night</span>
                      </div>
                    </div>
                  )}

                  {/* Transport & Route Notes */}
                  <div className="text-[11px] text-neutral-500 italic pt-1 border-t border-neutral-100">
                    <strong>Transit Note: </strong>
                    {day.travelNotes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
