import React, { useState, useMemo } from 'react';
import { TOURIST_PLACES } from '../data/travelData';
import { TouristPlace, AudienceCategory } from '../types/travel';
import { Sparkles, ArrowRight, Check, Compass, MapPin } from 'lucide-react';

interface RecommendationsEngineProps {
  onSelectDestination: (place: TouristPlace) => void;
  onStartItineraryForRoute: (destinationId: string, durationDays: number) => void;
}

export const RecommendationsEngine: React.FC<RecommendationsEngineProps> = ({
  onSelectDestination,
  onStartItineraryForRoute,
}) => {
  const [duration, setDuration] = useState<number>(3); // days
  const [budgetTier, setBudgetTier] = useState<'budget' | 'mid' | 'luxury'>('mid');
  const [companion, setCompanion] = useState<AudienceCategory>('Couples');
  const [preferredVibe, setPreferredVibe] = useState<string>('all');

  const recommendations = useMemo(() => {
    return TOURIST_PLACES.map((place) => {
      let score = 70;

      // Companion alignment
      if (place.suitableFor.includes(companion)) {
        score += 15;
      }

      // Budget alignment
      const minDaily = place.estimatedExpensePerDay.min;
      if (budgetTier === 'budget' && minDaily <= 2000) score += 10;
      if (budgetTier === 'mid' && minDaily >= 2000 && minDaily <= 4000) score += 10;
      if (budgetTier === 'luxury' && minDaily >= 3000) score += 10;

      // Duration alignment
      if (duration <= 2 && place.recommendedDuration.includes('1') || place.recommendedDuration.includes('2')) {
        score += 10;
      } else if (duration >= 3 && place.recommendedDuration.includes('3')) {
        score += 10;
      }

      // Vibe alignment
      if (preferredVibe !== 'all') {
        const matchesVibe = place.category.some((c) =>
          c.toLowerCase().includes(preferredVibe.toLowerCase())
        );
        if (matchesVibe) score += 15;
      }

      // Custom personalized rationale
      let rationale = '';
      if (place.id === 'munnar') {
        rationale = `Ideal for ${companion.toLowerCase()} craving high-altitude Western Ghats mist, scenic tea trails, and peaceful estate living.`;
      } else if (place.id === 'alleppey') {
        rationale = `Unbeatable slow-travel experience for ${companion.toLowerCase()} with private houseboat waterways and tranquil Kuttanad village life.`;
      } else if (place.id === 'kochi') {
        rationale = `Superb match for cultural history lovers, antique spice trails, Kathakali theater, and historic colonial waterfront quarters.`;
      } else if (place.id === 'wayanad') {
        rationale = `Prime natural escape featuring mountain rainforest treehouses, prehistoric cave petroglyphs, and wildlife safari zones.`;
      } else if (place.id === 'kovalam') {
        rationale = `World-class destination for gentle ocean swimming, lighthouse sunsets, and certified Ayurvedic healing therapies.`;
      } else {
        rationale = `Excellent destination matching your ${duration}-day timeframe with diverse activities and easy road connections.`;
      }

      // Circuit combination logic
      let circuitSuggestion = '';
      if (place.id === 'munnar') {
        circuitSuggestion = 'Pair with Alleppey Backwaters (4.5 hrs) or Thekkady Wildlife Sanctuary (3 hrs) for a classic Hills & Waters circuit.';
      } else if (place.id === 'alleppey') {
        circuitSuggestion = 'Combine with Fort Kochi (1.5 hrs) or Marari Beach (25 mins) to blend backwaters with coastal history.';
      } else if (place.id === 'kochi') {
        circuitSuggestion = 'Combine with Munnar (3.5 hrs drive) as Kochi International Airport is the ideal entry point.';
      } else if (place.id === 'wayanad') {
        circuitSuggestion = 'Combine with Athirappilly or Coorg for an epic rainforest and waterfall expedition.';
      } else if (place.id === 'kovalam') {
        circuitSuggestion = 'Pair with Varkala Cliff Beach (1.5 hrs) and Poovar Island estuary for southern coastal bliss.';
      } else {
        circuitSuggestion = `Nearby attractions within 30km: ${place.nearbyAttractions.map(n => n.name).slice(0, 2).join(' & ')}.`;
      }

      return {
        place,
        score: Math.min(score, 99),
        rationale,
        circuitSuggestion,
      };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [duration, budgetTier, companion, preferredVibe]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
          <span>Personalized Recommendations</span>
          <span aria-hidden="true">·</span>
          <span>Preference-Driven Matcher</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900">
          Where Should You Travel Next?
        </h2>
        <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
          Set your trip parameters below. Our recommendation engine curates optimal destinations, explains why they match, and suggests nearby attractions to visit together.
        </p>
      </div>

      {/* Interactive Preference Controls Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs mb-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Duration */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2">
              Trip Duration
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: '2 Days (Weekend)', val: 2 },
                { label: '3 Days (Short)', val: 3 },
                { label: '5 Days (Circuit)', val: 5 },
                { label: '7+ Days (Grand)', val: 7 },
              ].map((d) => (
                <button
                  key={d.val}
                  type="button"
                  onClick={() => setDuration(d.val)}
                  className={`p-2 rounded-lg border text-left font-medium transition-colors ${
                    duration === d.val
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Tier */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2">
              Daily Budget / Person
            </label>
            <div className="space-y-2 text-xs">
              {[
                { id: 'budget', label: 'Backpacker / Budget', desc: '₹1,500 – ₹2,500/day' },
                { id: 'mid', label: 'Comfort / Boutique', desc: '₹3,000 – ₹6,000/day' },
                { id: 'luxury', label: 'Luxury & Heritage', desc: '₹8,000+/day' },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudgetTier(b.id as any)}
                  className={`w-full p-2 rounded-lg border text-left transition-colors flex items-center justify-between ${
                    budgetTier === b.id
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  <div>
                    <div className="font-medium">{b.label}</div>
                    <div className="text-[10px] text-neutral-500">{b.desc}</div>
                  </div>
                  {budgetTier === b.id && <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Companions */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2">
              Travel Companions
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(['Couples', 'Families', 'Adventure Seekers', 'Cultural Travelers'] as AudienceCategory[]).map(
                (aud) => (
                  <button
                    key={aud}
                    type="button"
                    onClick={() => setCompanion(aud)}
                    className={`p-2 rounded-lg border text-left font-medium transition-colors ${
                      companion === aud
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                    }`}
                  >
                    {aud}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Primary Landscape / Vibe */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2">
              Preferred Landscape
            </label>
            <div className="space-y-2 text-xs">
              {[
                { id: 'all', label: 'All Scenic Landscapes' },
                { id: 'hill', label: 'Misty Hills & Tea Estates' },
                { id: 'backwaters', label: 'Backwaters & Lagoons' },
                { id: 'beach', label: 'Golden Beaches & Cliffs' },
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setPreferredVibe(v.id)}
                  className={`w-full p-2 rounded-lg border text-left font-medium transition-colors flex items-center justify-between ${
                    preferredVibe === v.id
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  <span>{v.label}</span>
                  {preferredVibe === v.id && (
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Results List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-display text-neutral-900">
            Top Matches for You ({companion} · {duration} Days · {budgetTier.toUpperCase()})
          </h3>
          <span className="text-xs text-neutral-500 font-mono">
            {recommendations.length} Curated Options
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map(({ place, score, rationale, circuitSuggestion }) => (
            <div
              key={place.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                  <img
                    src={place.heroImage}
                    alt={place.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-950/85 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded font-mono tabular-nums font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{score}% Match</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-neutral-950/70 backdrop-blur-sm text-white p-2 rounded-lg text-xs flex justify-between items-center">
                    <span className="font-medium">{place.locationName}</span>
                    <span className="tabular-nums text-neutral-300">{place.recommendedDuration}</span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-xl font-bold font-display text-neutral-900 mb-1">
                      {place.name}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {place.tagline}
                    </p>
                  </div>

                  {/* Why this destination is recommended */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs">
                    <div className="font-semibold text-emerald-950 mb-1 flex items-center gap-1">
                      <span>Why We Recommend This for You:</span>
                    </div>
                    <p className="text-emerald-900 leading-relaxed font-normal">
                      {rationale}
                    </p>
                  </div>

                  {/* Combined Circuit Suggestion */}
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                    <div className="font-semibold text-neutral-900 mb-1 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Suggested Combined Circuit:</span>
                    </div>
                    <p className="text-neutral-600 leading-relaxed">
                      {circuitSuggestion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-5 pt-0 flex gap-2">
                <button
                  onClick={() => onSelectDestination(place)}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  Explore Destination
                </button>
                <button
                  onClick={() => onStartItineraryForRoute(place.id, duration)}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Generate Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
