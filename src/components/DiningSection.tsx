import React, { useState } from 'react';
import { 
  Utensils, 
  Sparkles, 
  Star, 
  MapPin, 
  Clock, 
  Check, 
  Flame, 
  Calendar,
  Coffee,
  Heart,
  ChevronRight,
  ShieldAlert,
  Send
} from 'lucide-react';
import { Restaurant } from '../types';
import { RESTAURANTS_DATA, TASTE_OF_BIHAR_SPECIALS } from '../data/mallData';

export const DiningSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'food-court' | 'fine-dining' | 'bihar-special'>('all');
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedRestName, setSelectedRestName] = useState<string>('The Sky View Terrace & Bistro');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Reservation form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2 Guests');
  const [date, setDate] = useState('Today (Dinner)');
  const [time, setTime] = useState('7:30 PM');

  const filteredRestaurants = RESTAURANTS_DATA.filter((r) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'fine-dining') return r.type === 'rooftop';
    return r.type === activeFilter;
  });

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      // keep success visible
    }, 500);
  };

  return (
    <section className="py-16 sm:py-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-300">
            <Utensils className="w-3.5 h-3.5" />
            <span>Culinary Experience & Food Court</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            20+ Delicious Dining Outlets Under One Roof
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From world-famous fast food chains and sizzling street food chaat to scenic rooftop dining and authentic Bihari feasts.
          </p>
        </div>

        {/* SPECIAL FEATURE: TASTE OF BIHAR SPOTLIGHT */}
        <div className="mb-16 bg-gradient-to-br from-amber-900 via-orange-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-amber-500/20">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/40">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Monthly Gastronomy Celebration</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  "Taste of Bihar" Food Festival
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Every month, Smart Bazzar transforms the 3rd floor pavilion into an authentic celebration of Bihar’s timeless culinary heritage. Prepared by traditional cooks using desi ghee, earthen handi pots, and organic regional spices.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedRestName('Taste of Bihar Festival Stall');
                    setReservationModalOpen(true);
                    setBookingSuccess(false);
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer text-center"
                >
                  Reserve Tasting Pass
                </button>
              </div>
            </div>

            {/* Featured Bihari Delicacies Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {TASTE_OF_BIHAR_SPECIALS.map((special, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-amber-400/40 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                        {special.badge}
                      </span>
                      <span className="text-sm font-black text-amber-300">{special.price}</span>
                    </div>

                    <h4 className="text-lg font-bold text-white tracking-tight">{special.dish}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">{special.description}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-amber-200">
                    <span className="font-medium">Specialty: {special.tag}</span>
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded">3rd Floor</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Dining (20+ Outlets)' },
              { id: 'food-court', label: 'Food Court Brands' },
              { id: 'fine-dining', label: 'Rooftop Sky Dining' },
              { id: 'bihar-special', label: 'Taste of Bihar Corner' },
            ].map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-amber-400 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              setSelectedRestName('The Sky View Terrace & Bistro');
              setReservationModalOpen(true);
              setBookingSuccess(false);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Table at Rooftop Bistro</span>
          </button>
        </div>

        {/* Restaurants Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white text-[11px] font-bold">
                      {restaurant.priceRange}
                    </span>
                    {restaurant.vegOnly && (
                      <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold uppercase">
                        Pure Veg
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-xs font-black shadow">
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>{restaurant.rating}</span>
                  </div>

                  <span className="absolute bottom-2.5 left-3 text-white text-xs font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {restaurant.floor}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {restaurant.name}
                  </h4>
                  <p className="text-xs font-semibold text-amber-700">{restaurant.cuisine}</p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {restaurant.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Chef's Signature:</span>
                    <p className="text-xs font-semibold text-slate-800">{restaurant.specialty}</p>
                  </div>

                  {restaurant.offer && (
                    <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg">
                      🎁 {restaurant.offer}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {restaurant.type === 'rooftop' ? 'Dinner & Sunset Views' : 'Quick Counter & Seating'}
                </span>

                <button
                  onClick={() => {
                    setSelectedRestName(restaurant.name);
                    setReservationModalOpen(true);
                    setBookingSuccess(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  {restaurant.type === 'rooftop' ? 'Reserve Table' : 'Order / Dine Info'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Table Reservation Modal */}
      {reservationModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-200">
            <div className="p-6 bg-gradient-to-r from-slate-900 to-amber-950 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Smart Bazzar Hospitality</span>
                <h3 className="text-xl font-black mt-0.5">{selectedRestName}</h3>
              </div>
              <button
                onClick={() => setReservationModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {bookingSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Table Reserved Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    We have booked your table for <strong>{name || 'Guest'}</strong> ({guests}) at {selectedRestName} on {date} at {time}. An SMS confirmation has been dispatched.
                  </p>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-semibold">
                    Booking ID: SB-DINE-{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                  <button
                    onClick={() => setReservationModalOpen(false)}
                    className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer hover:bg-slate-800"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Number of Guests</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                      >
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>4 Guests</option>
                        <option>6 Guests</option>
                        <option>8+ Family Table</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                      >
                        <option>1:00 PM (Lunch)</option>
                        <option>2:30 PM (Lunch)</option>
                        <option>7:00 PM (Dinner)</option>
                        <option>8:30 PM (Dinner)</option>
                        <option>9:45 PM (Late Dinner)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                    <select
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                    >
                      <option>Today</option>
                      <option>Tomorrow</option>
                      <option>This Upcoming Weekend (Saturday)</option>
                      <option>This Upcoming Weekend (Sunday)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer mt-2"
                  >
                    Confirm Table Reservation
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    No advance booking charge • Pay at restaurant
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
