import React, { useState } from 'react';
import { 
  Film, 
  Sparkles, 
  Gamepad2, 
  Smile, 
  Music, 
  Clock, 
  Star, 
  Ticket, 
  Volume2, 
  Tv, 
  CheckCircle2, 
  Play, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { MovieShow } from '../types';
import { MOVIES_DATA } from '../data/mallData';

interface EntertainmentSectionProps {
  onOpenMovieBooking: (movie?: MovieShow) => void;
}

export const EntertainmentSection: React.FC<EntertainmentSectionProps> = ({ onOpenMovieBooking }) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieShow>(MOVIES_DATA[0]);
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>4th Floor Entertainment Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            CineSmart Multiplex & Gaming World
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Bihar's premier cinema featuring 4-screen Dolby Atmos immersion, thrilling kids trampoline parks, and state-of-the-art VR arcade gaming.
          </p>
        </div>

        {/* DOLBY ATMOS 4-SCREEN MULTIPLEX SPOTLIGHT */}
        <div className="mb-16 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider">
                  CineSmart Lakhisarai
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-300 font-semibold">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  Dolby Atmos 64-Channel Sound
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mt-2 text-white">
                Now Showing at Smart Bazzar (4 Screens)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Audi 1 (4K Laser Dolby Atmos) • Audi 2 (Dolby Atmos) • Audi 3 (3D Digital) • Audi 4 (VIP Recliner)
              </p>
            </div>

            <button
              onClick={() => onOpenMovieBooking()}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 self-start lg:self-auto"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Movie Tickets Online</span>
            </button>
          </div>

          {/* Movies Cards Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOVIES_DATA.map((movie) => (
              <div
                key={movie.id}
                className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-amber-400/80 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Poster */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-amber-400/30">
                      {movie.rating}
                    </span>

                    <span className="absolute bottom-2.5 left-3 text-[11px] text-white font-medium bg-slate-900/80 px-2 py-0.5 rounded">
                      {movie.duration} • {movie.language.split(' ')[0]}
                    </span>
                  </div>

                  {/* Title & Info */}
                  <div className="p-4 space-y-2">
                    <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {movie.title}
                    </h4>
                    <p className="text-[11px] text-amber-300/90 font-medium">{movie.genre}</p>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                      {movie.synopsis}
                    </p>

                    <div className="pt-2 border-t border-slate-700/60">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                        {movie.screen}
                      </p>
                      {/* Showtimes Pill Buttons */}
                      <div className="flex flex-wrap gap-1.5">
                        {movie.showtimes.map((time, tIdx) => (
                          <button
                            key={tIdx}
                            onClick={() => onOpenMovieBooking(movie)}
                            className="px-2 py-1 rounded bg-slate-700 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => onOpenMovieBooking(movie)}
                    className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-400/40 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Select Seats & Book</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* 2. KIDS ZONE & GAMING ARCADE (SPLIT SECTION) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Kids Play Zone */}
          <div className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30">
                  <Smile className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30">
                  Ages 2 – 14 Years
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">Smart Kids Wonderland & Trampoline Park</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A secure, hygienic, soft-padded indoor wonderland designed for boundless fun. Includes high-bounce trampolines, slide ball pits, interactive foam mazes, and dedicated toddler crawl parks.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {[
                  'Super Trampoline Arena',
                  'Mega Giant Ball Pit',
                  'Toddler Sensory Soft Maze',
                  'Certified Childcare Attendants',
                  'Sanitized Grip Socks Provided',
                  'Birthday Party Lounge'
                ].map((item, iIdx) => (
                  <div key={iIdx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Unlimited 1-Hour Pass</p>
                <p className="text-lg font-black text-pink-400">₹199 / Child</p>
              </div>
              <span className="text-xs bg-slate-700 px-3 py-1.5 rounded-lg text-slate-300 font-semibold">
                4th Floor, Adjacent to Cinema
              </span>
            </div>
          </div>

          {/* VR & E-Sports Arcade */}
          <div className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                  Next-Gen Arcade
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">Smart VR Gaming & Racing Simulators</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Step into futuristic gaming with 360° virtual reality roller coasters, motion hydraulic F1 racing simulators, air hockey tournament tables, and PS5 / Xbox console lounges.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {[
                  'Hydraulic F1 Racing Pods',
                  'HTC Vive VR Roller Coaster',
                  'Air Hockey Championship Tables',
                  'PS5 4K Console Lounge',
                  'Retro Basketball Hoops',
                  'Ticket Redemption Gifts'
                ].map((item, gIdx) => (
                  <div key={gIdx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Gaming Smart Card</p>
                <p className="text-lg font-black text-cyan-400">Recharge from ₹200</p>
              </div>
              <span className="text-xs bg-slate-700 px-3 py-1.5 rounded-lg text-slate-300 font-semibold">
                Get 20% Extra Bonus Points
              </span>
            </div>
          </div>

        </div>

        {/* 3. ROOFTOP ZONE (5TH FLOOR) & WEEKEND LIVE SHOWS */}
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-10 border border-amber-500/30">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span>5th Floor Open-Air Sky Zone</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Rooftop Café, Live Music & Cultural Amphitheatre
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Unwind under the stars with panoramic views of Lakhisarai. Featuring acoustic live bands on weekends, seasonal artisan flea markets, cultural dance recitals, and open-air sunset dining.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-center">
                <p className="text-xs text-slate-400 font-bold uppercase">Weekend Timings</p>
                <p className="text-lg font-black text-amber-400 mt-0.5">5:00 PM – 10:30 PM</p>
                <p className="text-[11px] text-emerald-400 mt-0.5">Free Entry for All Visitors</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
