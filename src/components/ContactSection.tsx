import React, { useState } from 'react';
import { BusinessDetails, TravelEnquiry } from '../types/travel';
import { submitEnquiry } from '../utils/storage';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  Compass,
  Navigation,
  ShieldCheck,
  Calendar,
  Users,
  Utensils
} from 'lucide-react';

interface ContactSectionProps {
  businessInfo: BusinessDetails;
  onEnquirySubmitted?: () => void;
  onExploreDestinations?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  businessInfo,
  onEnquirySubmitted,
  onExploreDestinations,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: 'Ooty (Udhagamandalam)',
    travelDates: '',
    travelersCount: 2,
    foodPreference: 'Vegetarian and Non-Vegetarian',
    message: ''
  });

  const [submittedEnquiry, setSubmittedEnquiry] = useState<TravelEnquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const created = submitEnquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        travelDates: formData.travelDates || 'Flexible / Upcoming',
        travelersCount: Number(formData.travelersCount),
        foodPreference: formData.foodPreference,
        message: formData.message || 'General tour guidance and accommodation request.'
      });

      setSubmittedEnquiry(created);
      setIsSubmitting(false);
      onEnquirySubmitted?.();
    }, 400);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
          <span>Official Travel Desk</span>
          <span aria-hidden="true">·</span>
          <span>Trichy District Headquarters</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-neutral-900 tracking-tight">
          Contact GJ Guide Masters
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
          Plan personalized travel itineraries across Tamil Nadu and Kerala. Connect directly with our certified tour advisors for verified hotel reservations, room facilities, and genuine local dining guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Business Details & Location Map (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Business Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-neutral-100">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
                  Registered Tourism Agency
                </span>
                <h2 className="text-2xl font-bold font-display text-neutral-900 mt-0.5">
                  {businessInfo.name}
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Tamil Nadu & Kerala Tourism Information Architect
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold font-display text-lg shrink-0">
                GJ
              </div>
            </div>

            <div className="space-y-5 text-sm">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Office Address
                  </div>
                  <div className="font-medium text-neutral-900 leading-snug mt-0.5">
                    {businessInfo.address}
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    Trichy (Tiruchirappalli) District, Tamil Nadu, India
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Business Phone
                  </div>
                  <div className="font-mono text-base font-bold text-neutral-900 mt-0.5">
                    {businessInfo.phone}
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    Direct travel desk helpline (10-line rotary desk)
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Official Email
                  </div>
                  <div className="font-medium text-neutral-900 mt-0.5">
                    {businessInfo.email}
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Operating Schedule
                  </div>
                  <div className="font-medium text-neutral-900 mt-0.5">
                    {businessInfo.workingHours}
                  </div>
                  <div className="text-xs text-emerald-700 mt-0.5 font-medium">
                    Open all 7 days for tourist emergency inquiries
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Notice on Call & WhatsApp */}
            <div className="mt-8 p-4 bg-amber-50/80 border border-amber-200/80 rounded-xl">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <span className="font-semibold">Notice on Calling & WhatsApp Services:</span> The telephone number{' '}
                  <span className="font-mono font-bold">{businessInfo.phone}</span> is the registered office helpline. To guarantee authentic itinerary logs, room rate confirmations, and priority processing, please use the online enquiry form on this page. Our team verifies caller identity prior to establishing WhatsApp communication.
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Geographic Map Location Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  Headquarters Map Location
                </div>
                <h3 className="text-base font-bold font-display text-neutral-900 mt-0.5">
                  Thuraiyur Main Road, Trichy
                </h3>
              </div>
              <span className="font-mono text-xs text-neutral-500">
                11.1448° N, 78.5973° E
              </span>
            </div>

            {/* Stylized Vector Map Visualizer */}
            <div className="relative rounded-xl overflow-hidden bg-emerald-950 text-white p-5 aspect-[16/9] flex flex-col justify-between border border-emerald-900 shadow-inner">
              {/* Radial gradient background */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 flex items-center justify-between text-xs text-emerald-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Central Tamil Nadu Hub</span>
                </span>
                <span className="bg-emerald-900/80 px-2 py-0.5 rounded text-[11px] font-mono">
                  NH 45 / SH 62 Access
                </span>
              </div>

              {/* Pin representation */}
              <div className="relative z-10 flex items-center justify-center my-2">
                <div className="bg-white text-neutral-900 rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-3 border border-neutral-200">
                  <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping absolute" />
                  <div className="w-3 h-3 rounded-full bg-emerald-600 relative" />
                  <div>
                    <div className="text-xs font-bold font-display">GJ Guide Masters HQ</div>
                    <div className="text-[11px] text-neutral-500">Thuraiyur Main Road, Trichy</div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-3 gap-2 text-center text-[10px] text-neutral-300 border-t border-white/10 pt-2 font-mono">
                <div>
                  <span className="text-emerald-400 font-bold block">42 km</span>
                  <span>to Trichy Junction</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold block">48 km</span>
                  <span>to Trichy Airport</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold block">195 km</span>
                  <span>to Kodaikanal</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-500 mt-3">
              Strategic starting hub for pilgrim tours to Madurai & Rameswaram, or hill excursions to Ooty, Kodaikanal, and Munnar.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Tour Enquiry Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-display text-neutral-900">
                Request a Custom Travel Plan
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Fill in your travel preferences and our experts at GJ Guide Masters will prepare an itinerary with verified accommodations and food recommendations.
              </p>
            </div>

            {submittedEnquiry ? (
              <div className="p-8 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-emerald-950">
                    Enquiry Received Successfully!
                  </h3>
                  <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto">
                    Thank you, <span className="font-semibold">{submittedEnquiry.fullName}</span>. Your enquiry (ID:{' '}
                    <span className="font-mono font-bold">{submittedEnquiry.id}</span>) has been logged in the GJ Guide Masters desk queue.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-emerald-100 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Target Destination:</span>
                    <span className="font-semibold text-neutral-900">{submittedEnquiry.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Travelers:</span>
                    <span className="font-semibold text-neutral-900">{submittedEnquiry.travelersCount} Person(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Food Preference:</span>
                    <span className="font-semibold text-neutral-900">{submittedEnquiry.foodPreference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Follow-up Contact:</span>
                    <span className="font-mono font-semibold text-neutral-900">{submittedEnquiry.phone}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedEnquiry(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        destination: 'Ooty (Udhagamandalam)',
                        travelDates: '',
                        travelersCount: 2,
                        foodPreference: 'Vegetarian and Non-Vegetarian',
                        message: ''
                      });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                  {onExploreDestinations && (
                    <button
                      onClick={onExploreDestinations}
                      className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
                    >
                      Browse Tourist Places
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Senthil Kumar"
                      className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700 transition-colors"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 98430 12345"
                      className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700 transition-colors"
                    />
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Destination of Interest *
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700 transition-colors"
                    >
                      <optgroup label="Tamil Nadu Highlights">
                        <option value="Ooty (Nilgiris)">Ooty (Udhagamandalam) - Nilgiris</option>
                        <option value="Kodaikanal (Dindigul)">Kodaikanal - Dindigul</option>
                        <option value="Madurai (Madurai)">Madurai - Meenakshi Temple</option>
                        <option value="Rameswaram (Ramanathapuram)">Rameswaram & Pamban Island</option>
                        <option value="Trichy & Thuraiyur Loop">Trichy & Thuraiyur Regional Heritage</option>
                      </optgroup>
                      <optgroup label="Kerala Highlights">
                        <option value="Munnar (Idukki)">Munnar Tea Hills - Idukki</option>
                        <option value="Alleppey (Alappuzha)">Alleppey Backwaters - Alappuzha</option>
                        <option value="Kochi (Ernakulam)">Fort Kochi Maritime - Ernakulam</option>
                        <option value="Wayanad (Wayanad)">Wayanad Rainforest & Caves</option>
                      </optgroup>
                      <optgroup label="Custom Combination">
                        <option value="Tamil Nadu & Kerala Combined Circuit">Tamil Nadu + Kerala Combined 7-Day Tour</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Travel Dates */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Travel Dates / Month
                    </label>
                    <input
                      type="text"
                      value={formData.travelDates}
                      onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                      placeholder="e.g. Nov 15 - Nov 20"
                      className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700 transition-colors"
                    />
                  </div>

                  {/* Travelers Count */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Number of Travelers
                    </label>
                    <select
                      value={formData.travelersCount}
                      onChange={(e) => setFormData({ ...formData, travelersCount: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700 transition-colors"
                    >
                      <option value={1}>1 Traveler (Solo)</option>
                      <option value={2}>2 Travelers (Couple)</option>
                      <option value={4}>3 to 5 (Family)</option>
                      <option value={8}>6 to 10 (Group)</option>
                      <option value={15}>10+ (Large Group / Corporate)</option>
                    </select>
                  </div>

                  {/* Food Preference */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Food Preference
                    </label>
                    <select
                      value={formData.foodPreference}
                      onChange={(e) => setFormData({ ...formData, foodPreference: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700 transition-colors"
                    >
                      <option value="Pure Vegetarian (Satvik / Jain)">Pure Veg (Satvik / Jain)</option>
                      <option value="South Indian Vegetarian">South Indian Vegetarian</option>
                      <option value="Vegetarian and Non-Vegetarian">Veg & Non-Veg Mixed</option>
                      <option value="Local Seafood & Regional Specialties">Local Seafood & Spiced Specialities</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Special Requests or Hotel Room Facility Needs
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us if you require AC rooms, attached bathrooms, hot water guarantee, vegetarian-only hotels, toy train tickets, or wheelchair accessibility..."
                    className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting to GJ Guide Masters...' : 'Send Travel Enquiry'}</span>
                  </button>
                  <p className="text-[11px] text-neutral-500 text-center mt-2">
                    Our advisors at Thuraiyur Main Road, Trichy review every request against verified seasonal schedules.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
