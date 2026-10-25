import React, { useState } from 'react';
import {
  X,
  User,
  Bookmark,
  Calendar,
  Hotel as HotelIcon,
  Star,
  Trash2,
  Plus,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { UserProfile, TouristPlace, Hotel, TripPlan } from '../types/travel';
import { TOURIST_PLACES, HOTELS } from '../data/travelData';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSelectDestination: (place: TouristPlace) => void;
  onRemoveSavedDestination: (id: string) => void;
  onRemoveFavoriteHotel: (id: string) => void;
  onRemoveTripPlan: (id: string) => void;
  onAddReview: (review: { placeId: string; placeName: string; rating: number; comment: string }) => void;
  onUpdateProfileName: (name: string, email: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSelectDestination,
  onRemoveSavedDestination,
  onRemoveFavoriteHotel,
  onRemoveTripPlan,
  onAddReview,
  onUpdateProfileName,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'wishlist' | 'hotels' | 'itineraries' | 'reviews' | 'account'>('wishlist');

  // Review form state
  const [selectedReviewPlaceId, setSelectedReviewPlaceId] = useState(TOURIST_PLACES[0].id);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Profile edit state
  const [editName, setEditName] = useState(userProfile.name);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [profileUpdated, setProfileUpdated] = useState(false);

  const savedPlaces = TOURIST_PLACES.filter((p) =>
    userProfile.savedDestinationIds.includes(p.id)
  );
  const savedHotels = HOTELS.filter((h) =>
    userProfile.favoriteHotelIds.includes(h.id)
  );

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const place = TOURIST_PLACES.find((p) => p.id === selectedReviewPlaceId);
    onAddReview({
      placeId: selectedReviewPlaceId,
      placeName: place ? place.name : 'Kerala Destination',
      rating: reviewRating,
      comment: reviewText.trim()
    });

    setReviewText('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 2500);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfileName(editName, editEmail);
    setProfileUpdated(true);
    setTimeout(() => setProfileUpdated(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-sm">
              {userProfile.avatarSeed}
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-neutral-900 leading-tight">
                {userProfile.name}
              </h3>
              <div className="text-xs text-neutral-500">{userProfile.email} · {userProfile.city}</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 border-b border-neutral-200 bg-neutral-50/80 overflow-x-auto text-xs py-1.5">
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Saved Destinations ({savedPlaces.length})
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'hotels'
                ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Favorite Stays ({savedHotels.length})
          </button>
          <button
            onClick={() => setActiveTab('itineraries')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'itineraries'
                ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            My Trip Plans ({userProfile.savedPlans.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Travel Log & Reviews ({userProfile.reviews.length})
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'account'
                ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Account Settings
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: Saved Destinations */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Bookmarked places for future getaways</span>
                <span>{savedPlaces.length} destinations</span>
              </div>

              {savedPlaces.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {savedPlaces.map((place) => (
                    <div
                      key={place.id}
                      className="p-4 rounded-xl border border-neutral-200 bg-white flex gap-4 items-center justify-between hover:border-neutral-300"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={place.heroImage}
                          alt={place.name}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-neutral-900 font-display truncate">
                            {place.name}
                          </h4>
                          <div className="text-xs text-neutral-500 truncate">{place.locationName}</div>
                          <div className="text-xs text-emerald-800 font-medium tabular-nums mt-0.5">
                            {place.recommendedDuration}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectDestination(place);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onRemoveSavedDestination(place.id)}
                          className="p-1 text-neutral-400 hover:text-rose-600 rounded flex justify-center"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-xs text-neutral-500">
                  You haven't bookmarked any destinations yet. Click the bookmark icon on any card to save it here!
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Favorite Hotels */}
          {activeTab === 'hotels' && (
            <div className="space-y-4">
              {savedHotels.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {savedHotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="p-4 rounded-xl border border-neutral-200 bg-white flex justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{hotel.rating} / 5</span>
                          <span className="text-neutral-400 font-normal">({hotel.reviewCount})</span>
                        </div>
                        <h4 className="font-bold text-sm text-neutral-900 font-display">
                          {hotel.name}
                        </h4>
                        <div className="text-xs text-neutral-500 mt-0.5">{hotel.destinationName}</div>
                        <div className="text-xs font-bold text-neutral-900 font-mono mt-2 tabular-nums">
                          ₹{hotel.roomTypes[0].pricePerNight.toLocaleString()} / night
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-end shrink-0">
                        <button
                          onClick={() => onRemoveFavoriteHotel(hotel.id)}
                          className="text-neutral-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded">
                          {hotel.badge || 'Verified'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-xs text-neutral-500">
                  No hotels saved yet. Click the bookmark icon on hotels to keep track of your favorite stays!
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Saved Trip Plans */}
          {activeTab === 'itineraries' && (
            <div className="space-y-4">
              {userProfile.savedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-5 rounded-xl border border-neutral-200 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                      <span>{plan.destinationName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{plan.totalDays} Days</span>
                      <span aria-hidden="true">·</span>
                      <span>{plan.travelers} Travelers</span>
                    </div>
                    <h4 className="font-bold text-base text-neutral-900 font-display">
                      {plan.title}
                    </h4>
                    <div className="text-xs text-neutral-600 mt-1">
                      Estimated Cost: <strong className="font-mono text-emerald-800">₹{plan.totalEstimatedCost.toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRemoveTripPlan(plan.id)}
                      className="p-2 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-neutral-50"
                      title="Delete itinerary"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Travel Log & Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Add New Review Box */}
              <form onSubmit={handleReviewSubmit} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3 text-xs">
                <div className="font-bold text-neutral-900 text-sm">Write a Travel Experience Review</div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">Visited Destination</label>
                    <select
                      value={selectedReviewPlaceId}
                      onChange={(e) => setSelectedReviewPlaceId(e.target.value)}
                      className="w-full p-2 bg-white rounded border border-neutral-300 focus:border-emerald-700 focus:outline-none"
                    >
                      {TOURIST_PLACES.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">Rating</label>
                    <div className="flex items-center gap-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating
                                ? 'text-amber-500 fill-current'
                                : 'text-neutral-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 font-bold text-neutral-700">{reviewRating} Stars</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Your Travel Review & Tips</label>
                  <textarea
                    rows={2}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share honest tips about road conditions, best viewpoints, authentic food to order..."
                    className="w-full p-2 bg-white rounded border border-neutral-300 focus:border-emerald-700 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex justify-between items-center">
                  {reviewSubmitted && (
                    <span className="text-emerald-800 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Review published to your travel log!</span>
                    </span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
                  >
                    Post Review
                  </button>
                </div>
              </form>

              {/* Past Reviews List */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                  Your Past Reviews ({userProfile.reviews.length})
                </div>

                {userProfile.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-neutral-200 bg-white text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-neutral-900 text-sm font-display">
                        {rev.placeName}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">{rev.comment}</p>
                    <div className="text-[11px] text-neutral-400 font-mono">{rev.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Account Settings */}
          {activeTab === 'account' && (
            <form onSubmit={handleProfileSave} className="max-w-md space-y-4 text-xs">
              <div className="font-bold text-neutral-900 text-sm">Update Profile Details</div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 rounded border border-neutral-300 focus:border-emerald-700 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 rounded border border-neutral-300 focus:border-emerald-700 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {profileUpdated && (
                  <span className="text-emerald-800 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Profile saved successfully!</span>
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto px-5 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
