import React, { useState } from 'react';
import { 
  X, 
  Film, 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  Ticket, 
  Volume2, 
  CreditCard,
  Download,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MovieShow } from '../types';
import { MOVIES_DATA } from '../data/mallData';

interface MovieBookingModalProps {
  movie?: MovieShow;
  onClose: () => void;
}

export const MovieBookingModal: React.FC<MovieBookingModalProps> = ({ movie, onClose }) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieShow>(movie || MOVIES_DATA[0]);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState(selectedMovie.showtimes[0] || '06:00 PM');
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['E5', 'E6']);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Seat pricing
  const SEAT_PRICE = 220;
  const VIP_PRICE = 350;

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length >= 6) {
        alert('Maximum 6 seats per booking.');
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      alert('Please select at least 1 seat.');
      return;
    }

    const newBookingId = `CINESMART-LK-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(newBookingId);
    setIsBooked(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  // Sample Seat Layout Rows
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'VIP'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const totalPrice = selectedSeats.reduce((sum, seat) => {
    return sum + (seat.startsWith('VIP') ? VIP_PRICE : SEAT_PRICE);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 my-auto">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm">
              CS
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">CineSmart 4-Screen Multiplex</h3>
              <p className="text-[11px] text-amber-400 font-medium">Smart Bazzar • Dolby Atmos • 4th Floor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          /* Confirmation E-Ticket View */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-black text-white">Movie Tickets Confirmed!</h4>
              <p className="text-xs text-slate-300">
                Your instant digital pass is ready. Please present this e-ticket at Audi Concourse Entry.
              </p>
            </div>

            {/* Realistic Digital Ticket Card */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 rounded-2xl border-2 border-dashed border-amber-500/40 p-5 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400">Smart Bazzar Lakhisarai</span>
                  <h5 className="text-lg font-black text-white">{selectedMovie.title}</h5>
                  <p className="text-xs text-slate-400">{selectedMovie.screen}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Booking ID</span>
                  <p className="text-xs font-mono font-bold text-amber-300">{bookingId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <p className="text-slate-400 text-[10px] uppercase">Date & Time</p>
                  <p className="font-bold text-white">{selectedDate}, {selectedTime}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase">Seats</p>
                  <p className="font-bold text-amber-400">{selectedSeats.join(', ')}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase">Guest</p>
                  <p className="font-bold text-white truncate">{customerName || 'Movie Lover'}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase">Total Amount</p>
                  <p className="font-bold text-emerald-400">₹{totalPrice} (Paid)</p>
                </div>
              </div>

              {/* Barcode Mockup */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>Dolby Atmos 64 Ch • 4K Laser</span>
                </div>
                <div className="font-mono text-xs tracking-widest text-slate-500 bg-slate-950 px-3 py-1 rounded">
                  ||||| ||| ||||||| |||| ||||
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => alert(`Ticket ${bookingId} saved! SMS sent to ${customerPhone || 'registered phone'}.`)}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Save E-Ticket to Phone</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Seat & Showtime Booking Flow */
          <form onSubmit={handleBookingSubmit} className="p-5 sm:p-6 space-y-5">
            
            {/* Movie Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Select Movie
              </label>
              <select
                value={selectedMovie.id}
                onChange={(e) => {
                  const m = MOVIES_DATA.find(x => x.id === e.target.value);
                  if (m) {
                    setSelectedMovie(m);
                    setSelectedTime(m.showtimes[0]);
                  }
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:ring-2 focus:ring-amber-500"
              >
                {MOVIES_DATA.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.title} ({m.screen})
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Select Date
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Today', 'Tomorrow', 'This Weekend'].map(d => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                        selectedDate === d
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Showtime
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMovie.showtimes.map(t => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedTime === t
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Cinema Seat Map */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-3/4 mx-auto h-2 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 rounded-full shadow-lg shadow-amber-400/20" />
              <p className="text-[10px] text-center uppercase tracking-widest text-slate-500 font-bold">
                Cinema Screen This Way
              </p>

              {/* Grid of Seats */}
              <div className="pt-2 space-y-1.5 max-w-sm mx-auto">
                {rows.map((row) => (
                  <div key={row} className="flex items-center justify-center gap-1.5">
                    <span className="w-5 text-[10px] font-bold text-slate-500 text-right">{row}</span>
                    <div className="flex gap-1">
                      {cols.map((col) => {
                        const seatId = `${row}${col}`;
                        const isSelected = selectedSeats.includes(seatId);
                        const isVIP = row === 'VIP';
                        const isOccupied = (row === 'C' && (col === 4 || col === 5));

                        return (
                          <button
                            type="button"
                            key={seatId}
                            disabled={isOccupied}
                            onClick={() => toggleSeat(seatId)}
                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded text-[9px] font-bold flex items-center justify-center transition-all ${
                              isOccupied
                                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                : isSelected
                                ? 'bg-amber-400 text-slate-950 scale-110 shadow-xs'
                                : isVIP
                                ? 'bg-amber-950/80 border border-amber-500/50 text-amber-300 hover:bg-amber-900'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                            }`}
                          >
                            {col}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-slate-800"></span> Available (₹220)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-amber-400"></span> Selected
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-amber-950 border border-amber-500"></span> VIP Recliner (₹350)
                </span>
              </div>
            </div>

            {/* Customer Information Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ganesh Singh"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Mobile Number (for SMS Pass)</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 6200 123456"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Booking Summary & CTA */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">
                  {selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''} Selected
                </p>
                <p className="text-xl font-black text-amber-400">₹{totalPrice}</p>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
              >
                Proceed & Confirm Booking
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
