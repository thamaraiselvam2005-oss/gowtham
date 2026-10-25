import React, { useState } from 'react';
import { X, Calendar, User, ShieldCheck, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import { Hotel, RoomType } from '../types/travel';

interface HotelBookingModalProps {
  hotel: Hotel | null;
  room: RoomType | null;
  onClose: () => void;
  onConfirmBooking: (bookingDetails: any) => void;
}

export const HotelBookingModal: React.FC<HotelBookingModalProps> = ({
  hotel,
  room,
  onClose,
  onConfirmBooking,
}) => {
  if (!hotel || !room) return null;

  const [checkInDate, setCheckInDate] = useState('2026-11-12');
  const [nights, setNights] = useState(2);
  const [guestCount, setGuestCount] = useState(2);
  const [primaryGuestName, setPrimaryGuestName] = useState('Priya Menon');
  const [guestPhone, setGuestPhone] = useState('+91 98450 12345');
  const [guestEmail, setGuestEmail] = useState('priya.menon@example.com');
  const [specialRequest, setSpecialRequest] = useState('Vegetarian breakfast and high-floor room preferred');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const subtotal = room.pricePerNight * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `YV-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refCode);
    setIsSuccess(true);

    onConfirmBooking({
      bookingRef: refCode,
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomName: room.name,
      checkInDate,
      nights,
      guestCount,
      primaryGuestName,
      guestEmail,
      guestPhone,
      total,
      bookedAt: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white">
          <div>
            <div className="text-xs text-neutral-500">{hotel.name}</div>
            <h3 className="text-lg font-bold font-display text-neutral-900">
              {isSuccess ? 'Reservation Confirmed' : `Reserve ${room.name}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold font-display text-neutral-900">
              Booking Confirmed!
            </h4>
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 max-w-sm mx-auto space-y-1.5 text-left">
              <div>
                <span className="font-semibold">Confirmation Code: </span>
                <span className="font-mono font-bold text-emerald-800">{bookingRef}</span>
              </div>
              <div>
                <span className="font-semibold">Hotel: </span>
                {hotel.name}
              </div>
              <div>
                <span className="font-semibold">Room: </span>
                {room.name}
              </div>
              <div>
                <span className="font-semibold">Check-in: </span>
                {checkInDate} ({nights} {nights === 1 ? 'night' : 'nights'})
              </div>
              <div>
                <span className="font-semibold">Total Amount: </span>
                <span className="tabular-nums font-bold">₹{total.toLocaleString()}</span> (Payable at hotel)
              </div>
            </div>
            <p className="text-xs text-neutral-500">
              A confirmation voucher has been saved to your YatraVista profile.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-4 text-xs">
            {/* Stay Configuration */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-neutral-700 font-medium mb-1">Check-in Date</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-md focus:border-emerald-700 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-700 font-medium mb-1">Duration</label>
                <select
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full p-2 border border-neutral-300 rounded-md focus:border-emerald-700 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 7, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Night' : 'Nights'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-neutral-700 font-medium mb-1">Guests</label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full p-2 border border-neutral-300 rounded-md focus:border-emerald-700 focus:outline-none"
                >
                  {[1, 2, 3, 4].map((g) => (
                    <option key={g} value={g}>
                      {g} {g === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Info */}
            <div className="space-y-3 pt-2 border-t border-neutral-100">
              <div>
                <label className="block text-neutral-700 font-medium mb-1">Primary Guest Name</label>
                <input
                  type="text"
                  value={primaryGuestName}
                  onChange={(e) => setPrimaryGuestName(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-md focus:border-emerald-700 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-md focus:border-emerald-700 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-md focus:border-emerald-700 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">Special Preferences / Dietary Requests</label>
                <input
                  type="text"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="e.g., Pure vegetarian meal, quiet room, late check-in..."
                  className="w-full p-2 border border-neutral-300 rounded-md focus:border-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1.5 pt-2">
              <div className="flex justify-between text-neutral-600">
                <span>Room Rate (₹{room.pricePerNight} × {nights} nights)</span>
                <span className="font-mono tabular-nums">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Estimated Taxes & Tourism Levies (12% GST)</span>
                <span className="font-mono tabular-nums">₹{taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-neutral-900 pt-1.5 border-t border-neutral-200 text-sm">
                <span>Total Estimated Payable</span>
                <span className="font-mono text-emerald-800 tabular-nums">₹{total.toLocaleString()}</span>
              </div>
              <div className="text-[10px] text-neutral-500">
                No advance card required. Free cancellation up to 48 hours before check-in.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
              >
                Confirm Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
