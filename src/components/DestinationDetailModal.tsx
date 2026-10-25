import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Ticket,
  Calendar,
  Compass,
  CheckCircle2,
  Bookmark,
  Share2,
  Navigation,
  ArrowRight,
  ShieldCheck,
  Building,
  Bus,
  Shirt,
  ShieldAlert,
  Accessibility,
  HeartHandshake,
  Baby,
  Route
} from 'lucide-react';
import { TouristPlace } from '../types/travel';

interface DestinationDetailModalProps {
  place: TouristPlace | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onViewHotels: (destinationId: string) => void;
  onStartTripPlan: (destinationId: string) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  place,
  onClose,
  isSaved,
  onToggleSave,
  onViewHotels,
  onStartTripPlan,
}) => {
  if (!place) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'guidelines' | 'attractions'>('overview');
  const [activeImage, setActiveImage] = useState(place.heroImage);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 my-8 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white sticky top-0 z-20">
          <div>
            {/* Complete Geographic Hierarchy */}
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold">
              <span>{place.country}</span>
              <span aria-hidden="true">&gt;</span>
              <span>{place.stateName}</span>
              <span aria-hidden="true">&gt;</span>
              <span>{place.district} District</span>
              <span aria-hidden="true">&gt;</span>
              <span>{place.city}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-neutral-900 mt-0.5">
              {place.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(place.id)}
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSaved
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
                  : 'border-neutral-200 hover:bg-neutral-100 text-neutral-700'
              }`}
              title="Save to wishlist"
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Wishlist'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy share link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors ml-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tab Switcher */}
        <div className="flex items-center gap-4 px-6 border-b border-neutral-200 bg-neutral-50 text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-emerald-800 text-neutral-900 font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Overview & Activities
          </button>
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'guidelines'
                ? 'border-emerald-800 text-neutral-900 font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Travel Guidelines & Dress Code
          </button>
          <button
            onClick={() => setActiveTab('attractions')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'attractions'
                ? 'border-emerald-800 text-neutral-900 font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Nearby Attractions & Routes
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Photo Showcase */}
              <div>
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                  <img
                    src={activeImage}
                    alt={place.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-neutral-900 text-xs font-semibold px-2.5 py-1 rounded shadow-sm">
                    {place.locationName}
                  </div>
                </div>

                {place.gallery && place.gallery.length > 1 && (
                  <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                    {place.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                          activeImage === img ? 'border-emerald-800 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Core Essential Specifications (Entry fee, hours, season, duration, budget) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-neutral-500 mb-1">
                    <Ticket className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Entry Fee</span>
                  </div>
                  <div className="font-bold text-neutral-900 text-sm">
                    {place.entryFee.isFree ? 'Free Admission' : `₹${place.entryFee.amount}`}
                  </div>
                  {place.entryFee.notes && (
                    <div className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">{place.entryFee.notes}</div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-neutral-500 mb-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Opening Hours</span>
                  </div>
                  <div className="font-bold text-neutral-900 text-xs leading-snug">
                    {place.openingHours}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-neutral-500 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Best Visiting Season</span>
                  </div>
                  <div className="font-bold text-neutral-900 text-xs leading-snug">
                    {place.bestSeason}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-neutral-500 mb-1">
                    <Compass className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Est. Daily Budget</span>
                  </div>
                  <div className="font-bold text-neutral-900 text-sm tabular-nums">
                    ₹{place.estimatedExpensePerDay.min.toLocaleString()} – ₹{place.estimatedExpensePerDay.max.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-neutral-500">Duration: {place.recommendedDuration}</div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-base font-bold font-display text-neutral-900">
                  About {place.name}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {place.description}
                </p>
                {place.whyWorthVisiting && (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-lg text-xs text-emerald-950">
                    <span className="font-semibold text-emerald-900">Why GJ Guide Masters Recommends This: </span>
                    {place.whyWorthVisiting}
                  </div>
                )}
              </div>

              {/* Activities */}
              <div className="space-y-3">
                <h3 className="text-base font-bold font-display text-neutral-900">
                  Top Recommended Activities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {place.activities.map((act, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Tips */}
              <div className="space-y-2">
                <h3 className="text-base font-bold font-display text-neutral-900">
                  Practical Travel Tips
                </h3>
                <ul className="space-y-1.5 text-xs text-neutral-600">
                  {place.travelTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-800 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: TRAVEL GUIDELINES */}
          {activeTab === 'guidelines' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <h3 className="text-sm font-bold font-display text-emerald-950 mb-1">
                  Travel Guidelines & Protocols for {place.name}
                </h3>
                <p className="text-xs text-emerald-800">
                  Curated by GJ Guide Masters travel team based on local government regulations, climate patterns, and cultural traditions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Transportation */}
                <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold font-display text-sm">
                    <Bus className="w-4 h-4" />
                    <span>Local Transportation</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {place.travelGuidelines?.transportation ||
                      'State express buses (SETC / TNSTC / KSRTC), verified private tourist taxis, and auto-rickshaws connect all major points.'}
                  </p>
                </div>

                {/* Clothing & Dress Code */}
                <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold font-display text-sm">
                    <Shirt className="w-4 h-4" />
                    <span>Clothing & Temple Dress Code</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {place.travelGuidelines?.clothing ||
                      'Temples require traditional attire (dhoti, formal trousers, sarees, churidars). Hill stations require warm sweaters and windcheaters.'}
                  </p>
                </div>

                {/* Safety */}
                <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold font-display text-sm">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Safety Precautions</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {place.travelGuidelines?.safety ||
                      'Use packaged drinking water. Drive cautiously on hairpin ghat bends. Follow lifeguards instructions along coastal zones.'}
                  </p>
                </div>

                {/* Customs */}
                <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold font-display text-sm">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Local Customs & Etiquette</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {place.travelGuidelines?.customs ||
                      'Footwear must be deposited outside temples and traditional homes. Maintain reverence during prayer services.'}
                  </p>
                </div>

                {/* Family Friendly */}
                <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold font-display text-sm">
                    <Baby className="w-4 h-4" />
                    <span>Family-Friendly Activities</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {place.travelGuidelines?.familyFriendly ||
                      'Safe and engaging for all age groups. Children enjoy boat rides, toy train journeys, and botanical garden walks.'}
                  </p>
                </div>

                {/* Accessibility */}
                <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold font-display text-sm">
                    <Accessibility className="w-4 h-4" />
                    <span>Mobility & Accessibility</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {place.travelGuidelines?.accessibility ||
                      'Paved walkways in major gardens and monuments. Wheelchair assistance can be requested at main administrative entrances.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NEARBY ATTRACTIONS & ROUTES */}
          {activeTab === 'attractions' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-base font-bold font-display text-neutral-900">
                  Nearby Attractions to {place.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {place.nearbyAttractions.map((att, idx) => (
                    <div key={idx} className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900 text-sm">{att.name}</span>
                        <span className="font-mono text-emerald-800 font-semibold">{att.distanceKm} km away</span>
                      </div>
                      <p className="text-neutral-600 text-[11px] leading-relaxed">{att.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {place.travelGuidelines?.suggestedRoutes && (
                <div className="p-4 bg-neutral-900 text-white rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold font-display text-sm">
                    <Route className="w-4 h-4" />
                    <span>Recommended Travel Route from Trichy HQ</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {place.travelGuidelines.suggestedRoutes}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-neutral-500">
            Source:{' '}
            <span className="font-mono text-neutral-800 font-medium">
              {place.dataSource === 'verified' ? 'Verified GJ Guide Masters Record' : 'Curated Sample Guide'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onViewHotels(place.id);
              }}
              className="px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Building className="w-3.5 h-3.5" />
              <span>Explore Stays & Food Menus</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onStartTripPlan(place.id);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Build Trip Itinerary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
