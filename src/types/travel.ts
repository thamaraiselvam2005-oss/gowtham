export type AudienceCategory = 'Families' | 'Nature Lovers' | 'Adventure Seekers' | 'Cultural Travelers' | 'Couples';

export type DestinationCategory =
  | 'Hill Station'
  | 'Backwaters'
  | 'Heritage & Culture'
  | 'Beach & Coastal'
  | 'Wildlife & Sanctuary'
  | 'Waterfalls & Trekking'
  | 'International';

export type DataSourceType = 'verified' | 'curated_estimate' | 'sample_data';

export interface StateRegion {
  id: string;
  name: string;
  code: string;
  country: 'India' | 'International';
  tagline: string;
  description: string;
  capital: string;
  bestSeason: string;
  image: string;
  destinationsCount: number;
  badge?: string;
  districts?: string[];
}

export interface NearbyAttraction {
  name: string;
  distanceKm: number;
  description: string;
}

export interface TravelGuidelines {
  transportation: string;
  weather: string;
  clothing: string;
  safety: string;
  customs: string;
  familyFriendly: string;
  accessibility: string;
  suggestedRoutes: string;
}

export interface TouristPlace {
  id: string;
  country: string;
  stateId: string;
  stateName: string;
  district: string;
  city: string;
  name: string;
  tagline: string;
  description: string;
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  heroImage: string;
  gallery: string[];
  category: DestinationCategory[];
  entryFee: {
    amount: number;
    currency: string;
    isFree: boolean;
    notes?: string;
  };
  openingHours: string;
  bestSeason: string;
  suitableFor: AudienceCategory[];
  activities: string[];
  nearbyAttractions: NearbyAttraction[];
  travelTips: string[];
  travelGuidelines?: TravelGuidelines;
  estimatedExpensePerDay: {
    min: number;
    max: number;
    currency: string;
  };
  recommendedDuration: string;
  whyWorthVisiting: string;
  dataSource: DataSourceType;
  featured?: boolean;
}

export interface RoomType {
  id?: string;
  name: string;
  pricePerNight: number;
  capacity: string;
  bedType: string;
  amenities: string[];
  availableRooms: number;
  hasAC: boolean;
  hasWifi: boolean;
  hasAttachedBathroom: boolean;
  hasHotWater: boolean;
  hasRoomService: boolean;
  hasParking: boolean;
  isVerified?: boolean;
}

export interface SignatureDish {
  name: string;
  type: 'veg' | 'non-veg';
  price: number;
  description: string;
  cuisineTag: string;
}

export interface FoodDiningInfo {
  hasInHouseRestaurant: boolean;
  restaurantName: string;
  cuisines: string[];
  mealOptions: ('Complimentary Breakfast' | 'Buffet Lunch' | 'A la carte Dinner' | '24/7 Room Service')[];
  vegetarianAvailable: boolean;
  nonVegetarianAvailable: boolean;
  veganAvailable: boolean;
  halalAvailable: boolean;
  jainAvailable: boolean;
  breakfastOfferings: string[];
  lunchOfferings: string[];
  dinnerOfferings: string[];
  snacksBeverages: string[];
  buffetAvailable: boolean;
  roomServiceMealsAvailable: boolean;
  localKeralaCuisineNotes: string;
  signatureDishes: SignatureDish[];
  openingHours: string;
  isVerifiedMenu: boolean;
  menuDisclaimer?: string;
}

export interface Hotel {
  id: string;
  destinationId: string;
  destinationName: string;
  country: string;
  stateId: string;
  district: string;
  city: string;
  name: string;
  tagline: string;
  starRating: number;
  rating: number;
  reviewCount: number;
  address: string;
  distanceFromCenterKm: number;
  checkInTime: string;
  checkOutTime: string;
  contactPhone: string;
  contactEmail: string;
  image: string;
  roomTypes: RoomType[];
  facilities: string[];
  hasAC: boolean;
  hasWifi: boolean;
  hasAttachedBathroom: boolean;
  hasParking: boolean;
  hasRoomService: boolean;
  hasHotWater: boolean;
  foodDining: FoodDiningInfo;
  dataSource: 'verified_partner' | 'curated_sample';
  badge?: string;
}

export interface DayItineraryPlace {
  placeId: string;
  name: string;
  timeSlot: string;
  duration: string;
  entryFee: number;
  notes: string;
  category: string;
}

export interface DayItineraryMeal {
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  restaurantName: string;
  dishRecommendation: string;
  isVegetarianOptionAvailable: boolean;
  estimatedCost: number;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  summary: string;
  places: DayItineraryPlace[];
  meals: DayItineraryMeal[];
  accommodation: {
    hotelId: string;
    hotelName: string;
    roomType: string;
    estimatedNightCost: number;
  };
  travelNotes: string;
  dayEstimatedCost: number;
}

export interface TripPlan {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  stateName: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  travelers: number;
  budgetTier: 'budget' | 'moderate' | 'luxury';
  companionType: 'Solo' | 'Couple' | 'Family' | 'Friends';
  preferredActivities: string[];
  foodPreference: 'all' | 'veg' | 'non-veg';
  totalEstimatedCost: number;
  days: DayItinerary[];
  createdAt: string;
}

export interface UserReview {
  id: string;
  placeId: string;
  placeName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  city: string;
  avatarSeed: string;
  savedDestinationIds: string[];
  favoriteHotelIds: string[];
  savedPlans: TripPlan[];
  reviews: UserReview[];
}

export interface TravelEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  travelDates: string;
  travelersCount: number;
  foodPreference: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface BusinessDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  locationDistrict: string;
  locationState: string;
  locationCountry: string;
}
