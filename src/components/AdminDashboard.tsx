import React, { useState } from 'react';
import {
  TouristPlace,
  Hotel,
  RoomType,
  TravelEnquiry,
  BusinessDetails,
  DestinationCategory
} from '../types/travel';
import {
  addDestination,
  updateDestination,
  deleteDestination,
  resetDestinationsToDefault,
  addHotel,
  updateHotel,
  deleteHotel,
  resetHotelsToDefault,
  updateEnquiryStatus,
  saveBusinessInfo,
  setAdminAuthState
} from '../utils/storage';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Save,
  CheckCircle2,
  X,
  Lock,
  LogOut,
  MapPin,
  Building,
  Utensils,
  Inbox,
  Phone,
  DollarSign,
  AlertCircle,
  Eye
} from 'lucide-react';

interface AdminDashboardProps {
  destinations: TouristPlace[];
  hotels: Hotel[];
  enquiries: TravelEnquiry[];
  businessInfo: BusinessDetails;
  onRefreshData: () => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  destinations,
  hotels,
  enquiries,
  businessInfo,
  onRefreshData,
  onClose,
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Sub-tab
  const [adminTab, setAdminTab] = useState<
    'destinations' | 'hotels' | 'food' | 'enquiries' | 'business'
  >('destinations');

  // Modals / Editing states
  const [editingDestination, setEditingDestination] = useState<TouristPlace | null>(null);
  const [isAddingDestination, setIsAddingDestination] = useState(false);

  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [isAddingHotel, setIsAddingHotel] = useState(false);

  const [businessForm, setBusinessForm] = useState<BusinessDetails>(businessInfo);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (loginEmail === 'admin@gjguidemasters.com' && loginPassword === 'admin123') ||
      loginPassword === '123456' ||
      loginEmail === 'admin'
    ) {
      setIsAuthenticated(true);
      setAdminAuthState(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Use demo: admin@gjguidemasters.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuthState(false);
  };

  // Business info save
  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    saveBusinessInfo(businessForm);
    setSaveSuccessMsg('Business information updated and saved successfully.');
    onRefreshData();
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Destination actions
  const handleDeleteDestination = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteDestination(id);
      onRefreshData();
    }
  };

  const handleSaveDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDestination) return;

    if (isAddingDestination) {
      addDestination(editingDestination);
    } else {
      updateDestination(editingDestination);
    }
    setIsAddingDestination(false);
    setEditingDestination(null);
    onRefreshData();
  };

  // Hotel actions
  const handleDeleteHotel = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteHotel(id);
      onRefreshData();
    }
  };

  const handleSaveHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHotel) return;

    if (isAddingHotel) {
      addHotel(editingHotel);
    } else {
      updateHotel(editingHotel);
    }
    setIsAddingHotel(false);
    setEditingHotel(null);
    onRefreshData();
  };

  // Enquiry status change
  const handleStatusChange = (id: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    updateEnquiryStatus(id, newStatus);
    onRefreshData();
  };

  // Master reset
  const handleResetAll = () => {
    if (
      window.confirm(
        'Reset all destinations and hotels to factory default records? Any custom additions will be reverted.'
      )
    ) {
      resetDestinationsToDefault();
      resetHotelsToDefault();
      onRefreshData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-display text-neutral-900">
              GJ Guide Masters Admin
            </h2>
            <p className="text-xs text-neutral-500">
              Secure administration portal to manage destinations, hotels, room facilities, food menus, and enquiries.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Admin Username or Email
              </label>
              <input
                type="text"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@gjguidemasters.com"
                className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Security Password / PIN
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-[11px] text-neutral-600 font-mono">
              Demo Credentials: <br />
              Email: <span className="font-bold">admin@gjguidemasters.com</span> <br />
              Password: <span className="font-bold">admin123</span> (or PIN: 123456)
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg"
              >
                Sign In to Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden my-auto">
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-neutral-950 font-bold flex items-center justify-center font-display text-sm">
              GJ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-display leading-tight">
                  GJ Guide Masters · Admin Console
                </h2>
                <span className="bg-emerald-400/20 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded">
                  Authenticated
                </span>
              </div>
              <div className="text-[11px] text-neutral-400">
                Live Data Storage: localStorage · Instant Synchronous Updates
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetAll}
              title="Reset records to default sample data"
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors px-2.5 py-1 rounded hover:bg-neutral-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={handleLogout}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors px-2.5 py-1 rounded hover:bg-neutral-800"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-neutral-200 bg-neutral-50 px-6 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setAdminTab('destinations')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
              adminTab === 'destinations'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Destinations ({destinations.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('hotels')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
              adminTab === 'hotels'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Hotels & Rooms ({hotels.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('food')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
              adminTab === 'food'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Hotel Food & Menus</span>
          </button>

          <button
            onClick={() => setAdminTab('enquiries')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
              adminTab === 'enquiries'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Enquiries ({enquiries.length})</span>
            {enquiries.filter((e) => e.status === 'new').length > 0 && (
              <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {enquiries.filter((e) => e.status === 'new').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminTab('business')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
              adminTab === 'business'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Business Profile & Contact</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {saveSuccessMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {/* TAB 1: DESTINATIONS */}
          {adminTab === 'destinations' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-neutral-900">
                    Tourist Destinations Directory
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Organized by Country, State, District, and City. Modify entry fees, opening hours, travel guidelines, or add new places.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingDestination({
                      id: `dest-${Date.now()}`,
                      country: 'India',
                      stateId: 'tamil-nadu',
                      stateName: 'Tamil Nadu',
                      district: 'Tiruchirappalli',
                      city: 'Trichy / Thuraiyur',
                      name: '',
                      tagline: '',
                      description: '',
                      locationName: 'Trichy District, Tamil Nadu',
                      coordinates: { lat: 10.7905, lng: 78.7047 },
                      heroImage: '/src/assets/images/ooty_nilgiri_hills_1792907280955.jpg',
                      gallery: ['/src/assets/images/ooty_nilgiri_hills_1792907280955.jpg'],
                      category: ['Heritage & Culture'],
                      entryFee: { amount: 0, currency: 'INR', isFree: true, notes: 'Free entry' },
                      openingHours: '6:00 AM – 8:00 PM',
                      bestSeason: 'October to March',
                      suitableFor: ['Families', 'Cultural Travelers'],
                      activities: ['Heritage walking tour', 'Temple exploration'],
                      nearbyAttractions: [],
                      travelTips: ['Carry drinking water', 'Wear comfortable footwear'],
                      estimatedExpensePerDay: { min: 1500, max: 4000, currency: 'INR' },
                      recommendedDuration: '1 to 2 Days',
                      whyWorthVisiting: '',
                      dataSource: 'verified',
                      featured: false
                    });
                    setIsAddingDestination(true);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Destination</span>
                </button>
              </div>

              {/* Destinations Table */}
              <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-100 text-neutral-700 font-semibold border-b border-neutral-200">
                      <th className="p-3">Destination</th>
                      <th className="p-3">Location Hierarchy</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Entry Fee</th>
                      <th className="p-3">Daily Expense</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {destinations.map((place) => (
                      <tr key={place.id} className="hover:bg-neutral-50">
                        <td className="p-3">
                          <div className="font-bold text-neutral-900">{place.name}</div>
                          <div className="text-[11px] text-neutral-500 truncate max-w-xs">{place.tagline}</div>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-neutral-600">
                          <div>{place.country} / {place.stateName}</div>
                          <div className="text-neutral-500">{place.district} District · {place.city}</div>
                        </td>
                        <td className="p-3">
                          <span className="text-neutral-700">{place.category.join(', ')}</span>
                        </td>
                        <td className="p-3 tabular-nums">
                          {place.entryFee.isFree ? 'Free' : `₹${place.entryFee.amount}`}
                        </td>
                        <td className="p-3 tabular-nums font-mono text-neutral-700">
                          ₹{place.estimatedExpensePerDay.min} – ₹{place.estimatedExpensePerDay.max}
                        </td>
                        <td className="p-3">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              place.dataSource === 'verified'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            {place.dataSource === 'verified' ? 'Verified' : 'Sample'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingDestination(place);
                                setIsAddingDestination(false);
                              }}
                              className="p-1.5 text-neutral-600 hover:text-emerald-800 hover:bg-neutral-100 rounded"
                              title="Edit destination"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteDestination(place.id, place.name)}
                              className="p-1.5 text-neutral-600 hover:text-red-700 hover:bg-neutral-100 rounded"
                              title="Delete destination"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: HOTELS & ROOM FACILITIES */}
          {adminTab === 'hotels' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-neutral-900">
                    Hotels & Room Facilities Directory
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Inspect and configure room prices, AC, Wi-Fi, attached bathrooms, parking, room service, and hot water amenities.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingHotel({
                      id: `hotel-${Date.now()}`,
                      destinationId: 'ooty',
                      destinationName: 'Ooty (Udhagamandalam)',
                      country: 'India',
                      stateId: 'tamil-nadu',
                      district: 'Nilgiris',
                      city: 'Ooty',
                      name: '',
                      tagline: '',
                      starRating: 4,
                      rating: 4.5,
                      reviewCount: 100,
                      address: '',
                      distanceFromCenterKm: 1.0,
                      checkInTime: '12:00 PM',
                      checkOutTime: '11:00 AM',
                      contactPhone: '123345678',
                      contactEmail: 'desk@hotel.com',
                      image: '/src/assets/images/ooty_nilgiri_hills_1792907280955.jpg',
                      hasAC: true,
                      hasWifi: true,
                      hasAttachedBathroom: true,
                      hasParking: true,
                      hasRoomService: true,
                      hasHotWater: true,
                      facilities: [
                        'Air Conditioning',
                        'Free Wi-Fi',
                        'Attached Bathrooms',
                        '24/7 Hot Water',
                        'Free Parking',
                        'Room Service'
                      ],
                      roomTypes: [
                        {
                          id: `room-${Date.now()}`,
                          name: 'Standard AC Deluxe Room',
                          pricePerNight: 3500,
                          capacity: '2 Adults',
                          bedType: '1 King Bed',
                          amenities: ['AC', 'Free Wi-Fi', 'Attached Bathroom', 'Hot Water'],
                          availableRooms: 5,
                          hasAC: true,
                          hasWifi: true,
                          hasAttachedBathroom: true,
                          hasHotWater: true,
                          hasRoomService: true,
                          hasParking: true,
                          isVerified: true
                        }
                      ],
                      foodDining: {
                        hasInHouseRestaurant: true,
                        restaurantName: 'In-House Dining',
                        cuisines: ['South Indian', 'Continental'],
                        mealOptions: ['Complimentary Breakfast', 'A la carte Dinner'],
                        vegetarianAvailable: true,
                        nonVegetarianAvailable: true,
                        veganAvailable: true,
                        halalAvailable: false,
                        jainAvailable: false,
                        breakfastOfferings: ['Idli, Dosa, Tea/Coffee'],
                        lunchOfferings: ['South Indian Meals'],
                        dinnerOfferings: ['Chapatis and Curry'],
                        snacksBeverages: ['Tea and Coffee'],
                        buffetAvailable: false,
                        roomServiceMealsAvailable: true,
                        localKeralaCuisineNotes: 'Freshly prepared regional meals.',
                        signatureDishes: [],
                        openingHours: '7:00 AM - 10:00 PM',
                        isVerifiedMenu: false,
                        menuDisclaimer: 'Curated sample menu for visitor reference.'
                      },
                      dataSource: 'verified_partner',
                      badge: 'Verified Hotel'
                    });
                    setIsAddingHotel(true);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Hotel</span>
                </button>
              </div>

              {/* Hotels List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-900 text-sm">{hotel.name}</span>
                          <span className="text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.2 rounded font-mono">
                            {hotel.starRating}★
                          </span>
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          {hotel.destinationName} · {hotel.district} District
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingHotel(hotel);
                            setIsAddingHotel(false);
                          }}
                          className="p-1.5 text-neutral-600 hover:text-emerald-800 hover:bg-neutral-100 rounded"
                          title="Edit hotel & facilities"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteHotel(hotel.id, hotel.name)}
                          className="p-1.5 text-neutral-600 hover:text-red-700 hover:bg-neutral-100 rounded"
                          title="Delete hotel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Room Facilities Grid */}
                    <div className="grid grid-cols-3 gap-2 text-[11px] border-y border-neutral-100 py-3">
                      <div className="flex items-center gap-1 text-neutral-700">
                        <span className={hotel.hasAC ? 'text-emerald-700 font-bold' : 'text-neutral-400'}>
                          {hotel.hasAC ? '✓' : '✗'}
                        </span>
                        <span>Air Conditioning</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-700">
                        <span className={hotel.hasWifi ? 'text-emerald-700 font-bold' : 'text-neutral-400'}>
                          {hotel.hasWifi ? '✓' : '✗'}
                        </span>
                        <span>Free Wi-Fi</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-700">
                        <span className={hotel.hasAttachedBathroom ? 'text-emerald-700 font-bold' : 'text-neutral-400'}>
                          {hotel.hasAttachedBathroom ? '✓' : '✗'}
                        </span>
                        <span>Attached Bath</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-700">
                        <span className={hotel.hasParking ? 'text-emerald-700 font-bold' : 'text-neutral-400'}>
                          {hotel.hasParking ? '✓' : '✗'}
                        </span>
                        <span>Guest Parking</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-700">
                        <span className={hotel.hasRoomService ? 'text-emerald-700 font-bold' : 'text-neutral-400'}>
                          {hotel.hasRoomService ? '✓' : '✗'}
                        </span>
                        <span>Room Service</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-700">
                        <span className={hotel.hasHotWater ? 'text-emerald-700 font-bold' : 'text-neutral-400'}>
                          {hotel.hasHotWater ? '✓' : '✗'}
                        </span>
                        <span>24/7 Hot Water</span>
                      </div>
                    </div>

                    {/* Room Categories */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                        Configured Room Categories & Prices:
                      </div>
                      {hotel.roomTypes.map((r, idx) => (
                        <div key={idx} className="flex justify-between text-xs bg-neutral-50 px-2.5 py-1.5 rounded">
                          <span className="font-medium text-neutral-800">{r.name}</span>
                          <span className="font-mono text-emerald-800 font-semibold tabular-nums">
                            ₹{r.pricePerNight} / night
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HOTEL FOOD & MENUS */}
          {adminTab === 'food' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-neutral-900">
                  Hotel Dining & Authentic Menus
                </h3>
                <p className="text-xs text-neutral-500">
                  Manage breakfast, lunch, dinner, vegetarian, non-vegetarian, local cuisines, buffet options, and verified vs sample data disclaimers.
                </p>
              </div>

              <div className="space-y-6">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold font-display text-sm text-neutral-900">{hotel.name}</h4>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              hotel.foodDining.isVerifiedMenu
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {hotel.foodDining.isVerifiedMenu ? 'Verified Menu' : 'Sample Menu Data'}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          Restaurant: <span className="font-semibold text-neutral-800">{hotel.foodDining.restaurantName}</span> · Hours: {hotel.foodDining.openingHours}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setEditingHotel(hotel);
                          setIsAddingHotel(false);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                      >
                        Edit Menu Data
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      {/* Breakfast */}
                      <div className="p-3 bg-neutral-50 rounded-lg space-y-1.5">
                        <div className="font-semibold text-neutral-900">Breakfast Offerings</div>
                        <ul className="text-neutral-600 space-y-1 text-[11px]">
                          {hotel.foodDining.breakfastOfferings.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-700">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Lunch */}
                      <div className="p-3 bg-neutral-50 rounded-lg space-y-1.5">
                        <div className="font-semibold text-neutral-900">Lunch Options</div>
                        <ul className="text-neutral-600 space-y-1 text-[11px]">
                          {hotel.foodDining.lunchOfferings.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-700">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Dinner */}
                      <div className="p-3 bg-neutral-50 rounded-lg space-y-1.5">
                        <div className="font-semibold text-neutral-900">Dinner Specialties</div>
                        <ul className="text-neutral-600 space-y-1 text-[11px]">
                          {hotel.foodDining.dinnerOfferings.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-700">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Disclaimer note */}
                    <div className="text-[11px] text-neutral-500 bg-neutral-100/70 p-2.5 rounded font-mono">
                      Disclaimer Label: "{hotel.foodDining.menuDisclaimer || 'Prices and menus shown are for reference.'}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ENQUIRIES INBOX */}
          {adminTab === 'enquiries' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-neutral-900">
                  Customer Enquiries & Tour Requests
                </h3>
                <p className="text-xs text-neutral-500">
                  Real-time tourist enquiries received through the GJ Guide Masters contact portal.
                </p>
              </div>

              {enquiries.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-xl border border-neutral-200">
                  <p className="text-sm text-neutral-500">No customer enquiries logged yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-neutral-900 text-sm">{enq.fullName}</span>
                            <span className="text-[10px] font-mono text-neutral-400">({enq.id})</span>
                          </div>
                          <div className="text-xs text-neutral-500 flex items-center gap-3 mt-0.5">
                            <span>Phone: <strong className="font-mono text-neutral-800">{enq.phone}</strong></span>
                            <span>Email: <strong className="text-neutral-800">{enq.email}</strong></span>
                            <span>Received: {enq.createdAt}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-500">Status:</span>
                          <select
                            value={enq.status}
                            onChange={(e) =>
                              handleStatusChange(enq.id, e.target.value as 'new' | 'contacted' | 'resolved')
                            }
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                              enq.status === 'new'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : enq.status === 'contacted'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            <option value="new">New Enquiry</option>
                            <option value="contacted">Contacted Traveler</option>
                            <option value="resolved">Resolved / Booked</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-neutral-50 p-3 rounded-lg">
                        <div>
                          <span className="text-neutral-400 block text-[11px]">Destination</span>
                          <span className="font-semibold text-neutral-800">{enq.destination}</span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[11px]">Travel Dates & Size</span>
                          <span className="font-semibold text-neutral-800">
                            {enq.travelDates} ({enq.travelersCount} travelers)
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[11px]">Food Preference</span>
                          <span className="font-semibold text-neutral-800">{enq.foodPreference}</span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-700 italic bg-white p-2.5 rounded border border-neutral-100">
                        "{enq.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: BUSINESS PROFILE & CONTACT */}
          {adminTab === 'business' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-neutral-900">
                  Business Information Settings
                </h3>
                <p className="text-xs text-neutral-500">
                  Update agency name, registered address on Thuraiyur Main Road, Trichy, phone number, and operating hours.
                </p>
              </div>

              <form onSubmit={handleSaveBusiness} className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Website & Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessForm.name}
                    onChange={(e) => setBusinessForm({ ...businessForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Registered Business Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessForm.address}
                    onChange={(e) => setBusinessForm({ ...businessForm, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Business Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessForm.phone}
                      onChange={(e) => setBusinessForm({ ...businessForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm font-mono bg-neutral-50 rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Contact Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={businessForm.email}
                      onChange={(e) => setBusinessForm({ ...businessForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Operating Schedule & Office Hours *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessForm.workingHours}
                    onChange={(e) => setBusinessForm({ ...businessForm, workingHours: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Business Information</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* MODAL: EDIT / ADD DESTINATION */}
        {editingDestination && (
          <div className="fixed inset-0 z-60 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 border border-neutral-200 shadow-2xl space-y-4 my-8">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="text-lg font-bold font-display text-neutral-900">
                  {isAddingDestination ? 'Add New Tourist Destination' : `Edit: ${editingDestination.name}`}
                </h3>
                <button
                  onClick={() => setEditingDestination(null)}
                  className="p-1 text-neutral-400 hover:text-neutral-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveDestination} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Destination Name *</label>
                    <input
                      type="text"
                      required
                      value={editingDestination.name}
                      onChange={(e) => setEditingDestination({ ...editingDestination, name: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Tagline</label>
                    <input
                      type="text"
                      value={editingDestination.tagline}
                      onChange={(e) => setEditingDestination({ ...editingDestination, tagline: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Country</label>
                    <input
                      type="text"
                      value={editingDestination.country}
                      onChange={(e) => setEditingDestination({ ...editingDestination, country: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">State</label>
                    <input
                      type="text"
                      value={editingDestination.stateName}
                      onChange={(e) => setEditingDestination({ ...editingDestination, stateName: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">District</label>
                    <input
                      type="text"
                      value={editingDestination.district}
                      onChange={(e) => setEditingDestination({ ...editingDestination, district: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">City</label>
                    <input
                      type="text"
                      value={editingDestination.city}
                      onChange={(e) => setEditingDestination({ ...editingDestination, city: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingDestination.description}
                    onChange={(e) => setEditingDestination({ ...editingDestination, description: e.target.value })}
                    className="w-full p-2 bg-neutral-50 border rounded"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Entry Fee (INR)</label>
                    <input
                      type="number"
                      value={editingDestination.entryFee.amount}
                      onChange={(e) =>
                        setEditingDestination({
                          ...editingDestination,
                          entryFee: {
                            ...editingDestination.entryFee,
                            amount: Number(e.target.value),
                            isFree: Number(e.target.value) === 0
                          }
                        })
                      }
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Opening Hours</label>
                    <input
                      type="text"
                      value={editingDestination.openingHours}
                      onChange={(e) => setEditingDestination({ ...editingDestination, openingHours: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Best Season</label>
                    <input
                      type="text"
                      value={editingDestination.bestSeason}
                      onChange={(e) => setEditingDestination({ ...editingDestination, bestSeason: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Hero Image Path</label>
                  <input
                    type="text"
                    value={editingDestination.heroImage}
                    onChange={(e) => setEditingDestination({ ...editingDestination, heroImage: e.target.value })}
                    className="w-full p-2 bg-neutral-50 border rounded font-mono text-[11px]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setEditingDestination(null)}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded font-semibold"
                  >
                    Save Destination
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT / ADD HOTEL */}
        {editingHotel && (
          <div className="fixed inset-0 z-60 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 border border-neutral-200 shadow-2xl space-y-4 my-8">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="text-lg font-bold font-display text-neutral-900">
                  {isAddingHotel ? 'Add New Hotel & Facilities' : `Edit Hotel: ${editingHotel.name}`}
                </h3>
                <button
                  onClick={() => setEditingHotel(null)}
                  className="p-1 text-neutral-400 hover:text-neutral-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveHotel} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Hotel Name *</label>
                    <input
                      type="text"
                      required
                      value={editingHotel.name}
                      onChange={(e) => setEditingHotel({ ...editingHotel, name: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Star Rating (1 - 5)</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={editingHotel.starRating}
                      onChange={(e) => setEditingHotel({ ...editingHotel, starRating: Number(e.target.value) })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Address *</label>
                  <input
                    type="text"
                    required
                    value={editingHotel.address}
                    onChange={(e) => setEditingHotel({ ...editingHotel, address: e.target.value })}
                    className="w-full p-2 bg-neutral-50 border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Phone</label>
                    <input
                      type="text"
                      value={editingHotel.contactPhone}
                      onChange={(e) => setEditingHotel({ ...editingHotel, contactPhone: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Email</label>
                    <input
                      type="text"
                      value={editingHotel.contactEmail}
                      onChange={(e) => setEditingHotel({ ...editingHotel, contactEmail: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">District</label>
                    <input
                      type="text"
                      value={editingHotel.district}
                      onChange={(e) => setEditingHotel({ ...editingHotel, district: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">City</label>
                    <input
                      type="text"
                      value={editingHotel.city}
                      onChange={(e) => setEditingHotel({ ...editingHotel, city: e.target.value })}
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                </div>

                {/* Facilities Toggles */}
                <div className="p-3 bg-neutral-50 rounded-lg space-y-2">
                  <div className="font-semibold text-neutral-800">Room & Hotel Amenities Toggles:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingHotel.hasAC}
                        onChange={(e) => setEditingHotel({ ...editingHotel, hasAC: e.target.checked })}
                      />
                      <span>Air Conditioning (AC)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingHotel.hasWifi}
                        onChange={(e) => setEditingHotel({ ...editingHotel, hasWifi: e.target.checked })}
                      />
                      <span>Free Wi-Fi</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingHotel.hasAttachedBathroom}
                        onChange={(e) => setEditingHotel({ ...editingHotel, hasAttachedBathroom: e.target.checked })}
                      />
                      <span>Attached Bathroom</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingHotel.hasParking}
                        onChange={(e) => setEditingHotel({ ...editingHotel, hasParking: e.target.checked })}
                      />
                      <span>Guest Parking</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingHotel.hasRoomService}
                        onChange={(e) => setEditingHotel({ ...editingHotel, hasRoomService: e.target.checked })}
                      />
                      <span>Room Service</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingHotel.hasHotWater}
                        onChange={(e) => setEditingHotel({ ...editingHotel, hasHotWater: e.target.checked })}
                      />
                      <span>24/7 Hot Water</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setEditingHotel(null)}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded font-semibold"
                  >
                    Save Hotel & Facilities
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
