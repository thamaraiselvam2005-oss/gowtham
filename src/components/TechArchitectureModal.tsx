import React, { useState } from 'react';
import { X, Database, Server, Code2, Copy, Check, FileText, Layers, Terminal, Shield } from 'lucide-react';
import { BusinessDetails } from '../types/travel';

interface TechArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessInfo?: BusinessDetails;
}

export const TechArchitectureModal: React.FC<TechArchitectureModalProps> = ({
  isOpen,
  onClose,
  businessInfo,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'architecture' | 'django-models' | 'django-views-admin' | 'setup-deploy'>('architecture');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const djangoModelsCode = `# ==============================================================================
# Django Models for GJ Guide Masters Tourism Platform
# File: backend/tourism/models.py
# Engine: SQLite 3 for Development / PostgreSQL 15+ for Production
# Headquartered: Thuraiyur Main Road, Trichy District, Tamil Nadu, India
# ==============================================================================

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Destination(models.Model):
    """
    Hierarchical tourist places organized by Country, State, District, and City.
    Initially features Tamil Nadu and Kerala (Ooty, Kodaikanal, Madurai, Rameswaram,
    Munnar, Alleppey, Kochi, Wayanad).
    """
    DATA_SOURCE_CHOICES = (
        ('verified', 'Verified Official Record'),
        ('curated_estimate', 'Curated Editorial Estimate'),
        ('sample_data', 'Sample Prototyping Data'),
    )

    name = models.CharField(max_length=120, db_index=True)
    country = models.CharField(max_length=60, default='India')
    state_name = models.CharField(max_length=60, db_index=True) # e.g. Tamil Nadu, Kerala
    district = models.CharField(max_length=80, db_index=True)   # e.g. Nilgiris, Dindigul, Madurai
    city = models.CharField(max_length=80)                      # e.g. Ooty, Kodaikanal, Madurai
    tagline = models.CharField(max_length=255)
    description = models.TextField()
    location_name = models.CharField(max_length=150)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    hero_image = models.URLField(max_length=500)
    
    # Financial & Visiting Metadata
    entry_fee_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    entry_fee_notes = models.TextField(blank=True, null=True)
    is_free_entry = models.BooleanField(default=False)
    opening_hours = models.CharField(max_length=200)
    best_season = models.CharField(max_length=150)
    recommended_duration = models.CharField(max_length=50) # e.g. '2 to 3 Days'
    min_daily_expense = models.DecimalField(max_digits=8, decimal_places=2)
    max_daily_expense = models.DecimalField(max_digits=8, decimal_places=2)
    
    # Travel Guidelines
    guidelines_transportation = models.TextField()
    guidelines_weather = models.TextField()
    guidelines_clothing = models.TextField() # e.g. Temple dress codes, warm woolens
    guidelines_safety = models.TextField()
    guidelines_customs = models.TextField()
    guidelines_family_friendly = models.TextField()
    guidelines_accessibility = models.TextField()
    guidelines_suggested_routes = models.TextField() # e.g. Routes from Trichy HQ

    data_source = models.CharField(max_length=20, choices=DATA_SOURCE_CHOICES, default='verified')
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'gj_destinations'
        ordering = ['state_name', 'district', 'name']

    def __str__(self):
        return f"{self.name} ({self.district}, {self.state_name})"


class Hotel(models.Model):
    """
    Accommodations near tourist destinations with inspected room facilities.
    """
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='hotels')
    name = models.CharField(max_length=150, db_index=True)
    tagline = models.CharField(max_length=255)
    star_rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], default=4)
    guest_rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.5)
    review_count = models.IntegerField(default=0)
    address = models.TextField()
    distance_from_center_km = models.DecimalField(max_digits=5, decimal_places=2)
    check_in_time = models.CharField(max_length=30, default='12:00 PM')
    check_out_time = models.CharField(max_length=30, default='11:00 AM')
    contact_phone = models.CharField(max_length=30)
    contact_email = models.EmailField()
    image_url = models.URLField(max_length=500)
    
    # Core Hotel Amenities & Room Facilities
    has_ac = models.BooleanField(default=True, verbose_name="Air Conditioning (AC)")
    has_wifi = models.BooleanField(default=True, verbose_name="Free Wi-Fi")
    has_attached_bathroom = models.BooleanField(default=True, verbose_name="Attached Bathrooms")
    has_parking = models.BooleanField(default=True, verbose_name="Guest Parking")
    has_room_service = models.BooleanField(default=True, verbose_name="Room Service")
    has_hot_water = models.BooleanField(default=True, verbose_name="24/7 Hot Water")
    
    is_verified_partner = models.BooleanField(default=True)
    badge = models.CharField(max_length=60, blank=True)

    class Meta:
        db_table = 'gj_hotels'

    def __str__(self):
        return f"{self.name} ({self.destination.name})"


class RoomCategory(models.Model):
    """Specific room classification with verified pricing and capacity."""
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='rooms')
    name = models.CharField(max_length=100)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    capacity = models.CharField(max_length=60)
    bed_type = models.CharField(max_length=60)
    available_rooms = models.IntegerField(default=5)
    has_ac = models.BooleanField(default=True)
    has_attached_bathroom = models.BooleanField(default=True)
    has_hot_water = models.BooleanField(default=True)
    amenities_json = models.JSONField(default=list)

    class Meta:
        db_table = 'gj_room_categories'

    def __str__(self):
        return f"{self.hotel.name} - {self.name} (₹{self.price_per_night})"


class HotelDining(models.Model):
    """
    Dedicated food & restaurant information for every hotel.
    Clearly distinguishes verified menus from sample data.
    """
    hotel = models.OneToOneField(Hotel, on_delete=models.CASCADE, related_name='dining_info')
    restaurant_name = models.CharField(max_length=120)
    cuisines_offered = models.CharField(max_length=255)
    
    # Meal Offerings
    breakfast_offerings = models.JSONField(default=list)
    lunch_offerings = models.JSONField(default=list)
    dinner_offerings = models.JSONField(default=list)
    snacks_beverages = models.JSONField(default=list)
    
    # Dietary & Service Flags
    vegetarian_available = models.BooleanField(default=True)
    non_vegetarian_available = models.BooleanField(default=True)
    vegan_available = models.BooleanField(default=True)
    halal_available = models.BooleanField(default=False)
    jain_available = models.BooleanField(default=False)
    buffet_available = models.BooleanField(default=False)
    room_service_meals = models.BooleanField(default=True)
    
    opening_hours = models.CharField(max_length=120)
    is_verified_menu = models.BooleanField(default=False)
    menu_disclaimer = models.TextField(blank=True)

    class Meta:
        db_table = 'gj_hotel_dining'


class SignatureDish(models.Model):
    """Specialty dishes provided by the hotel's kitchen."""
    DISH_TYPE = (('veg', 'Vegetarian'), ('non-veg', 'Non-Vegetarian'))
    dining = models.ForeignKey(HotelDining, on_delete=models.CASCADE, related_name='dishes')
    name = models.CharField(max_length=100)
    dish_type = models.CharField(max_length=10, choices=DISH_TYPE)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    description = models.TextField()
    cuisine_tag = models.CharField(max_length=50)

    class Meta:
        db_table = 'gj_signature_dishes'


class TravelEnquiry(models.Model):
    """Customer enquiry logged from the GJ Guide Masters contact portal."""
    STATUS_CHOICES = (
        ('new', 'New Enquiry'),
        ('contacted', 'Contacted Traveler'),
        ('resolved', 'Resolved / Booked'),
    )
    full_name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=25)
    destination = models.CharField(max_length=100)
    travel_dates = models.CharField(max_length=100)
    travelers_count = models.IntegerField(default=2)
    food_preference = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')

    class Meta:
        db_table = 'gj_travel_enquiries'
        ordering = ['-created_at']
`;

  const djangoViewsAdminCode = `# ==============================================================================
# Django Views, Admin & URLs for GJ Guide Masters
# File: backend/tourism/views.py & admin.py
# ==============================================================================

# --- admin.py ---
from django.contrib import admin
from .models import Destination, Hotel, RoomCategory, HotelDining, SignatureDish, TravelEnquiry


class RoomCategoryInline(admin.TabularInline):
    model = RoomCategory
    extra = 1


class SignatureDishInline(admin.TabularInline):
    model = SignatureDish
    extra = 2


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'state_name', 'district', 'city', 'entry_fee_amount', 'best_season', 'data_source')
    list_filter = ('state_name', 'district', 'data_source', 'is_featured')
    search_fields = ('name', 'district', 'city', 'description')


@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ('name', 'destination', 'star_rating', 'has_ac', 'has_wifi', 'has_attached_bathroom', 'has_parking', 'has_room_service')
    list_filter = ('destination__state_name', 'has_ac', 'has_wifi', 'has_parking')
    search_fields = ('name', 'destination__name', 'address')
    inlines = [RoomCategoryInline]


@admin.register(HotelDining)
class HotelDiningAdmin(admin.ModelAdmin):
    list_display = ('restaurant_name', 'hotel', 'vegetarian_available', 'non_vegetarian_available', 'buffet_available', 'is_verified_menu')
    inlines = [SignatureDishInline]


@admin.register(TravelEnquiry)
class TravelEnquiryAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'destination', 'travelers_count', 'status', 'created_at')
    list_filter = ('status', 'destination', 'created_at')
    search_fields = ('full_name', 'phone', 'email')
    readonly_fields = ('created_at',)


# --- views.py (Django REST Framework / JSON API) ---
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import DestinationSerializer, HotelSerializer, TravelEnquirySerializer


class DestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['state_name', 'district', 'is_featured']
    search_fields = ['name', 'description', 'city']


class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.select_related('destination').prefetch_related('rooms', 'dining_info__dishes').all()
    serializer_class = HotelSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['destination', 'has_ac', 'has_wifi', 'has_parking', 'has_room_service']
    search_fields = ['name', 'address', 'dining_info__restaurant_name']


class TravelEnquiryViewSet(viewsets.ModelViewSet):
    queryset = TravelEnquiry.objects.all()
    serializer_class = TravelEnquirySerializer
`;

  const setupDeployCode = `# ==============================================================================
# Installation, Database Setup & Deployment Instructions
# Architecture: Django 5 + SQLite (Dev) -> PostgreSQL 15+ (Production)
# Agency: GJ Guide Masters, Thuraiyur Main Road, Trichy, Tamil Nadu
# ==============================================================================

# 1. Environment Setup & Dependency Installation
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
pip install django djangorestframework django-cors-headers psycopg2-binary python-dotenv gunicorn

# 2. Database Migration with SQLite (Development)
python manage.py makemigrations tourism
python manage.py migrate

# 3. Create Superuser (Admin Dashboard Access)
python manage.py createsuperuser
# Default recommended admin credentials:
# Username / Email: admin@gjguidemasters.com
# Password: StrongAdminPassword2026!

# 4. Populate Seed Data for Tamil Nadu and Kerala
python manage.py loaddata seed_destinations_hotels.json

# 5. Upgrading to PostgreSQL in Production (.env configuration)
# Set in your production .env file:
# DATABASE_URL=postgres://gj_user:SecretPass@localhost:5432/gj_guidemasters_db
# In settings.py:
# DATABASES = {
#     'default': dj_database_url.config(
#         default='sqlite:///db.sqlite3',
#         conn_max_age=600
#     )
# }

# 6. Run Development Server
python manage.py runserver 0.0.0.0:8000

# 7. Production Gunicorn & Nginx Execution
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3
`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-neutral-950 font-bold flex items-center justify-center font-display text-sm">
              GJ
            </div>
            <div>
              <h2 className="text-base font-bold font-display leading-tight">
                GJ Guide Masters · Full-Stack Django Architecture
              </h2>
              <p className="text-[11px] text-neutral-400">
                Python Django Backend · SQLite 3 (Dev) & PostgreSQL (Prod) · Reusable Templates & Admin Spec
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-6 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-emerald-700 text-emerald-900 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Specifications</span>
          </button>

          <button
            onClick={() => setActiveTab('django-models')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'django-models'
                ? 'border-emerald-700 text-emerald-900 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Django Models (models.py)</span>
          </button>

          <button
            onClick={() => setActiveTab('django-views-admin')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'django-views-admin'
                ? 'border-emerald-700 text-emerald-900 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Django Admin & Views (admin.py)</span>
          </button>

          <button
            onClick={() => setActiveTab('setup-deploy')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'setup-deploy'
                ? 'border-emerald-700 text-emerald-900 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Setup & Deployment Guide</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <h3 className="text-sm font-bold font-display text-emerald-950 mb-1">
                  Full-Stack Architecture Specification
                </h3>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  This system is architected for GJ Guide Masters, situated on Thuraiyur Main Road, Trichy District, Tamil Nadu. It provides structured schema separation between geographical hierarchies, room facilities, authentic hotel dining, and traveler enquiries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-700" />
                    <span>Database Engine</span>
                  </div>
                  <p className="text-neutral-600">
                    SQLite 3 for zero-configuration local prototyping; seamless upgrade path to PostgreSQL 15+ via Django ORM migrations and environment variable configuration.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-emerald-700" />
                    <span>Backend Framework</span>
                  </div>
                  <p className="text-neutral-600">
                    Python 3.11+ and Django 5 with Django REST Framework, Django Admin site for content management without source code edits, and CORS middleware for decoupled SPA clients.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-emerald-700" />
                    <span>Frontend Client</span>
                  </div>
                  <p className="text-neutral-600">
                    Modern responsive interface adhering to the Universal Frontend Design Constitution (anti-slop, zero-pill metadata, single-elevation depth, WCAG AA legibility).
                  </p>
                </div>
              </div>

              {/* Data Invariants */}
              <div className="bg-neutral-900 text-white rounded-xl p-5 space-y-3">
                <div className="font-bold font-display text-emerald-400 text-sm">
                  Core Architectural Constraints & Invariants
                </div>
                <ul className="text-xs text-neutral-300 space-y-2 list-disc list-inside">
                  <li>
                    <strong>Location Hierarchy:</strong> Every destination belongs strictly to a Country (India), State (Tamil Nadu / Kerala), District (e.g. Nilgiris, Madurai, Idukki), and City.
                  </li>
                  <li>
                    <strong>Room Facilities Transparency:</strong> Every hotel entity enforces discrete boolean flags for AC, Wi-Fi, Attached Bathroom, Parking, Room Service, and 24/7 Hot Water.
                  </li>
                  <li>
                    <strong>Verified vs Sample Distinction:</strong> Dining menus and prices are strictly partitioned into "Verified Partner Menu" or "Curated Sample Data" to prevent customer misinformation.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: DJANGO MODELS */}
          {activeTab === 'django-models' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold font-display text-neutral-900">
                    Django ORM Data Models (backend/tourism/models.py)
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Complete models for Destinations, Hotels, Room Categories, Food & Dining, Signature Dishes, and Enquiries.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy('models', djangoModelsCode)}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'models' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'models' ? 'Copied' : 'Copy Python Code'}</span>
                </button>
              </div>

              <pre className="p-4 bg-neutral-950 text-neutral-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-neutral-800">
                {djangoModelsCode}
              </pre>
            </div>
          )}

          {/* TAB 3: DJANGO VIEWS & ADMIN */}
          {activeTab === 'django-views-admin' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold font-display text-neutral-900">
                    Django Admin & REST API Views (admin.py & views.py)
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Includes inline tabular room editors, menu items configuration, and filtered API viewsets.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy('views', djangoViewsAdminCode)}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'views' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'views' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 bg-neutral-950 text-neutral-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-neutral-800">
                {djangoViewsAdminCode}
              </pre>
            </div>
          )}

          {/* TAB 4: SETUP & DEPLOYMENT */}
          {activeTab === 'setup-deploy' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold font-display text-neutral-900">
                    Step-by-Step Setup, Migrations & Production Deployment
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Execute these terminal commands to initialize the Django backend with SQLite and transition to PostgreSQL.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy('deploy', setupDeployCode)}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'deploy' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'deploy' ? 'Copied' : 'Copy Commands'}</span>
                </button>
              </div>

              <pre className="p-4 bg-neutral-950 text-neutral-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-neutral-800">
                {setupDeployCode}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
