import { UserProfile, TripPlan, UserReview, TouristPlace, Hotel, TravelEnquiry, BusinessDetails } from '../types/travel';
import { SAMPLE_ITINERARIES, TOURIST_PLACES, HOTELS, BUSINESS_INFO } from '../data/travelData';

const PROFILE_KEY = 'gj_guidemasters_user_profile_v2';
const DESTINATIONS_KEY = 'gj_guidemasters_destinations_v2';
const HOTELS_KEY = 'gj_guidemasters_hotels_v2';
const ENQUIRIES_KEY = 'gj_guidemasters_enquiries_v2';
const BUSINESS_KEY = 'gj_guidemasters_business_info_v2';
const ADMIN_AUTH_KEY = 'gj_guidemasters_admin_auth_v2';

const DEFAULT_PROFILE: UserProfile = {
  id: 'user-001',
  name: 'Ravi & Ananya',
  email: 'ravi.ananya@example.com',
  city: 'Trichy, Tamil Nadu',
  avatarSeed: 'RA',
  savedDestinationIds: ['ooty', 'madurai', 'munnar', 'rameswaram'],
  favoriteHotelIds: ['ooty-savoy-heritage', 'madurai-heritage-resort'],
  savedPlans: [...SAMPLE_ITINERARIES],
  reviews: [
    {
      id: 'rev-1',
      placeId: 'madurai',
      placeName: 'Madurai',
      rating: 5,
      comment: 'GJ Guide Masters organized our family Meenakshi Amman Temple trip with incredible punctuality. The night palliarai procession guide and recommendation for authentic Madurai Jigarthanda made our visit unforgettable!',
      date: '2026-10-12'
    },
    {
      id: 'rev-2',
      placeId: 'ooty',
      placeName: 'Ooty (Udhagamandalam)',
      rating: 5,
      comment: 'The Nilgiri toy train booking tips and Doddabetta guidance were spot on. Clean hotel with working fireplace and wonderful Nilgiri tea.',
      date: '2026-09-28'
    }
  ]
};

const SEED_ENQUIRIES: TravelEnquiry[] = [
  {
    id: 'enq-101',
    fullName: 'Senthil Kumar',
    email: 'senthil.k@gmail.com',
    phone: '9843012345',
    destination: 'Madurai & Rameswaram',
    travelDates: '2026-11-15 to 2026-11-18',
    travelersCount: 4,
    foodPreference: 'Pure Vegetarian (Satvik preferred)',
    message: 'Looking for a private family cab from Trichy Thuraiyur road covering Meenakshi Temple darshan and Pamban bridge crossing.',
    createdAt: '2026-10-22',
    status: 'new'
  },
  {
    id: 'enq-102',
    fullName: 'Meenakshi Sundaram',
    email: 'meena.sundar@yahoo.com',
    phone: '9443198765',
    destination: 'Ooty & Kodaikanal',
    travelDates: '2026-12-05 to 2026-12-09',
    travelersCount: 2,
    foodPreference: 'All Cuisines',
    message: 'Couples hill station getaway with fireplace cottage and heritage toy train booking assistance.',
    createdAt: '2026-10-23',
    status: 'contacted'
  }
];

// USER PROFILE
export function getStoredUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      saveUserProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read user profile from storage', err);
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save user profile to storage', err);
  }
}

export function toggleSavedDestination(destinationId: string): UserProfile {
  const profile = getStoredUserProfile();
  const exists = profile.savedDestinationIds.includes(destinationId);
  if (exists) {
    profile.savedDestinationIds = profile.savedDestinationIds.filter(id => id !== destinationId);
  } else {
    profile.savedDestinationIds.push(destinationId);
  }
  saveUserProfile(profile);
  return profile;
}

export function toggleFavoriteHotel(hotelId: string): UserProfile {
  const profile = getStoredUserProfile();
  const exists = profile.favoriteHotelIds.includes(hotelId);
  if (exists) {
    profile.favoriteHotelIds = profile.favoriteHotelIds.filter(id => id !== hotelId);
  } else {
    profile.favoriteHotelIds.push(hotelId);
  }
  saveUserProfile(profile);
  return profile;
}

export function addSavedTripPlan(plan: TripPlan): UserProfile {
  const profile = getStoredUserProfile();
  profile.savedPlans = [plan, ...profile.savedPlans.filter(p => p.id !== plan.id)];
  saveUserProfile(profile);
  return profile;
}

export function removeSavedTripPlan(planId: string): UserProfile {
  const profile = getStoredUserProfile();
  profile.savedPlans = profile.savedPlans.filter(p => p.id !== planId);
  saveUserProfile(profile);
  return profile;
}

export function addUserReview(review: Omit<UserReview, 'id' | 'date'>): UserProfile {
  const profile = getStoredUserProfile();
  const newReview: UserReview = {
    ...review,
    id: `rev-${Date.now()}`,
    date: new Date().toISOString().split('T')[0]
  };
  profile.reviews = [newReview, ...profile.reviews];
  saveUserProfile(profile);
  return profile;
}

// DESTINATIONS CRUD
export function getStoredDestinations(): TouristPlace[] {
  try {
    const raw = localStorage.getItem(DESTINATIONS_KEY);
    if (!raw) {
      localStorage.setItem(DESTINATIONS_KEY, JSON.stringify(TOURIST_PLACES));
      return TOURIST_PLACES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read destinations from storage', err);
    return TOURIST_PLACES;
  }
}

export function saveStoredDestinations(places: TouristPlace[]): void {
  try {
    localStorage.setItem(DESTINATIONS_KEY, JSON.stringify(places));
  } catch (err) {
    console.error('Failed to save destinations to storage', err);
  }
}

export function addDestination(place: TouristPlace): TouristPlace[] {
  const current = getStoredDestinations();
  const updated = [place, ...current];
  saveStoredDestinations(updated);
  return updated;
}

export function updateDestination(place: TouristPlace): TouristPlace[] {
  const current = getStoredDestinations();
  const updated = current.map(p => (p.id === place.id ? place : p));
  saveStoredDestinations(updated);
  return updated;
}

export function deleteDestination(placeId: string): TouristPlace[] {
  const current = getStoredDestinations();
  const updated = current.filter(p => p.id !== placeId);
  saveStoredDestinations(updated);
  return updated;
}

export function resetDestinationsToDefault(): TouristPlace[] {
  saveStoredDestinations(TOURIST_PLACES);
  return TOURIST_PLACES;
}

// HOTELS CRUD
export function getStoredHotels(): Hotel[] {
  try {
    const raw = localStorage.getItem(HOTELS_KEY);
    if (!raw) {
      localStorage.setItem(HOTELS_KEY, JSON.stringify(HOTELS));
      return HOTELS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read hotels from storage', err);
    return HOTELS;
  }
}

export function saveStoredHotels(hotels: Hotel[]): void {
  try {
    localStorage.setItem(HOTELS_KEY, JSON.stringify(hotels));
  } catch (err) {
    console.error('Failed to save hotels to storage', err);
  }
}

export function addHotel(hotel: Hotel): Hotel[] {
  const current = getStoredHotels();
  const updated = [hotel, ...current];
  saveStoredHotels(updated);
  return updated;
}

export function updateHotel(hotel: Hotel): Hotel[] {
  const current = getStoredHotels();
  const updated = current.map(h => (h.id === hotel.id ? hotel : h));
  saveStoredHotels(updated);
  return updated;
}

export function deleteHotel(hotelId: string): Hotel[] {
  const current = getStoredHotels();
  const updated = current.filter(h => h.id !== hotelId);
  saveStoredHotels(updated);
  return updated;
}

export function resetHotelsToDefault(): Hotel[] {
  saveStoredHotels(HOTELS);
  return HOTELS;
}

// ENQUIRIES CRUD
export function getStoredEnquiries(): TravelEnquiry[] {
  try {
    const raw = localStorage.getItem(ENQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(SEED_ENQUIRIES));
      return SEED_ENQUIRIES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read enquiries from storage', err);
    return SEED_ENQUIRIES;
  }
}

export function saveStoredEnquiries(enquiries: TravelEnquiry[]): void {
  try {
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
  } catch (err) {
    console.error('Failed to save enquiries to storage', err);
  }
}

export function submitEnquiry(enquiry: Omit<TravelEnquiry, 'id' | 'createdAt' | 'status'>): TravelEnquiry {
  const current = getStoredEnquiries();
  const newEnq: TravelEnquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    status: 'new'
  };
  const updated = [newEnq, ...current];
  saveStoredEnquiries(updated);
  return newEnq;
}

export function updateEnquiryStatus(id: string, status: 'new' | 'contacted' | 'resolved'): TravelEnquiry[] {
  const current = getStoredEnquiries();
  const updated = current.map(e => (e.id === id ? { ...e, status } : e));
  saveStoredEnquiries(updated);
  return updated;
}

// BUSINESS INFO
export function getStoredBusinessInfo(): BusinessDetails {
  try {
    const raw = localStorage.getItem(BUSINESS_KEY);
    if (!raw) {
      localStorage.setItem(BUSINESS_KEY, JSON.stringify(BUSINESS_INFO));
      return BUSINESS_INFO;
    }
    return JSON.parse(raw);
  } catch (err) {
    return BUSINESS_INFO;
  }
}

export function saveBusinessInfo(info: BusinessDetails): void {
  try {
    localStorage.setItem(BUSINESS_KEY, JSON.stringify(info));
  } catch (err) {
    console.error('Failed to save business info', err);
  }
}

// ADMIN AUTH
export function getAdminAuthState(): boolean {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthState(loggedIn: boolean): void {
  try {
    localStorage.setItem(ADMIN_AUTH_KEY, loggedIn ? 'true' : 'false');
  } catch (err) {
    console.error('Failed to update admin auth state', err);
  }
}
