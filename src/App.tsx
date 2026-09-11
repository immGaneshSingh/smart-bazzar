import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { KeyHighlights } from './components/KeyHighlights';
import { FloorGuide } from './components/FloorGuide';
import { StoresDirectory } from './components/StoresDirectory';
import { DiningSection } from './components/DiningSection';
import { EntertainmentSection } from './components/EntertainmentSection';
import { EventsCalendar } from './components/EventsCalendar';
import { MembershipRewards } from './components/MembershipRewards';
import { FacilitiesAndCSR } from './components/FacilitiesAndCSR';
import { GallerySection } from './components/GallerySection';
import { AboutUs } from './components/AboutUs';
import { ContactSection } from './components/ContactSection';
import { AppDownloadBanner } from './components/AppDownloadBanner';
import { Footer } from './components/Footer';

// Dedicated Specific Full Pages
import { SmartParkingPage } from './components/SmartParkingPage';
import { VirtualTourPage } from './components/VirtualTourPage';
import { OnlineShoppingPage } from './components/OnlineShoppingPage';
import { CustomerAccountPage } from './components/CustomerAccountPage';
import { AdminDashboard } from './components/AdminDashboard';
import { OwnerGaneshSinghPage } from './components/OwnerGaneshSinghPage';

// E-Commerce State & Modals
import { ShopProvider } from './context/ShopContext';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPaymentModal } from './components/CheckoutPaymentModal';
import { AuthModal } from './components/AuthModal';

// Interactive Modals
import { MovieBookingModal } from './components/MovieBookingModal';
import { ParkingBookingModal } from './components/ParkingBookingModal';
import { VirtualTourModal } from './components/VirtualTourModal';

import { ActiveTab, MovieShow } from './types';
import { MALL_INFO, MOVIES_DATA } from './data/mallData';
import { 
  Sparkles, 
  MapPin, 
  Film, 
  Car, 
  Compass, 
  ArrowUp,
  UserCheck,
  ArrowLeft
} from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState<ActiveTab>('home');
  const [navHistory, setNavHistory] = useState<ActiveTab[]>(['home']);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Modals state
  const [isMovieBookingOpen, setIsMovieBookingOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieShow | undefined>(undefined);
  const [isParkingModalOpen, setIsParkingModalOpen] = useState(false);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);

  // Scroll to top on section change
  const handleNavigate = (sectionId: ActiveTab) => {
    setNavHistory((prev) => {
      if (prev[prev.length - 1] === sectionId) return prev;
      return [...prev, sectionId];
    });
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back button functionality
  const handleGoBack = () => {
    // 1. Close open modals first
    if (isMovieBookingOpen) {
      setIsMovieBookingOpen(false);
      return;
    }
    if (isParkingModalOpen) {
      setIsParkingModalOpen(false);
      return;
    }
    if (isVirtualTourOpen) {
      setIsVirtualTourOpen(false);
      return;
    }

    // 2. Navigate back in history
    if (navHistory.length > 1) {
      const updated = [...navHistory];
      updated.pop(); // remove current section
      const prevTab = updated[updated.length - 1] || 'home';
      setNavHistory(updated);
      setActiveSection(prevTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (activeSection !== 'home') {
      setActiveSection('home');
      setNavHistory(['home']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If already at home, scroll top or browser back
      if (window.scrollY > 150) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.history.length > 1) {
        window.history.back();
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenMovieBooking = (movie?: MovieShow) => {
    setSelectedMovie(movie || MOVIES_DATA[0]);
    setIsMovieBookingOpen(true);
  };

  return (
    <ShopProvider>
      <div className="min-h-screen bg-transparent text-slate-900 font-sans antialiased flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. Global Announcement Ticker */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white text-[11px] font-medium py-1.5 px-4 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-bold text-amber-400 uppercase tracking-wider">Now Happening:</span>
            <span className="truncate text-slate-300">
              Diwali & Chhath Puja Mega Carnival • Flat 50% Off at Reliance Trends & Pantaloons • High-speed Free Wi-Fi across all 5 Floors
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 shrink-0 text-slate-400">
            <button
              onClick={() => handleNavigate('contact')}
              className="hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>NH-80 Road, Lakhisarai</span>
            </button>
            <span>•</span>
            <button 
              onClick={() => handleNavigate('parking')}
              className="text-emerald-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Car className="w-3 h-3" />
              <span>Smart Parking (Live Slots)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar with Specific Dedicated Links */}
      <Navbar
        activeTab={activeSection}
        onNavigate={handleNavigate}
        onOpenParking={() => handleNavigate('parking')}
        onOpenVirtualTour={() => handleNavigate('tour')}
        onOpenMovieBooking={() => handleOpenMovieBooking()}
      />

      {/* 3. Dynamic Specific & Dedicated Page View Container */}
      <main className="flex-1">
        {/* HOME PAGE */}
        {activeSection === 'home' && (
          <div>
            <HeroBanner
              onNavigate={handleNavigate}
              onOpenMovieBooking={handleOpenMovieBooking}
              onOpenVirtualTour={() => handleNavigate('tour')}
              onOpenParking={() => handleNavigate('parking')}
            />

            <KeyHighlights
              onOpenParking={() => handleNavigate('parking')}
              onOpenVirtualTour={() => handleNavigate('tour')}
              onNavigate={handleNavigate}
            />

            <FloorGuide onNavigate={handleNavigate} />

            <StoresDirectory
              onSelectCategory={(cat) => console.log(cat)}
            />

            <DiningSection />

            <EntertainmentSection
              onBookMovie={handleOpenMovieBooking}
            />

            <AppDownloadBanner />

            <EventsCalendar />

            <MembershipRewards />

            <FacilitiesAndCSR
              onOpenParking={() => handleNavigate('parking')}
            />

            <GallerySection
              onOpenVirtualTour={() => handleNavigate('tour')}
            />

            <AboutUs onNavigate={handleNavigate} />

            <ContactSection />
          </div>
        )}

        {/* DEDICATED STORES PAGE */}
        {activeSection === 'stores' && (
          <div>
            <div className="bg-slate-900 text-white py-12 px-4 text-center border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Floor 0, 1 & 2 Directory</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Anchor Stores & Brands</h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                Discover 50+ national & local brands across fashion, lifestyle, electronics, groceries, and Bihar handlooms.
              </p>
            </div>
            <StoresDirectory />
            <FloorGuide onNavigate={handleNavigate} />
          </div>
        )}

        {/* DEDICATED DINING PAGE */}
        {activeSection === 'dining' && (
          <div>
            <div className="bg-slate-900 text-white py-12 px-4 text-center border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Floor 3 & Rooftop Gastronomy</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Food Court & Dining</h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                Third floor gastronomy featuring authentic Litti Chokha, Champaran Handi, KFC, Domino's, and rooftop sky dining.
              </p>
            </div>
            <DiningSection />
          </div>
        )}

        {/* DEDICATED ENTERTAINMENT PAGE */}
        {activeSection === 'entertainment' && (
          <div>
            <div className="bg-slate-900 text-white py-12 px-4 text-center border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Floor 4 CineSmart & VR Zone</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">CineSmart Multiplex & Gaming</h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                4 screens with Dolby Atmos 64-channel sound, VR simulators, bowling alley, and kids soft play zone.
              </p>
            </div>
            <EntertainmentSection onBookMovie={handleOpenMovieBooking} />
          </div>
        )}

        {/* DEDICATED 5-FLOOR DIRECTORY PAGE */}
        {activeSection === 'floors' && (
          <div>
            <div className="bg-slate-900 text-white py-12 px-4 text-center border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">2,50,000 Sq. Ft. Architecture</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Interactive 5-Floor Directory</h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                Explore Ground Atrium through Rooftop Sky Zone across 5 distinct levels with escalators and glass elevators.
              </p>
            </div>
            <FloorGuide onNavigate={handleNavigate} />
          </div>
        )}

        {/* DEDICATED SMART PARKING PAGE */}
        {activeSection === 'parking' && (
          <SmartParkingPage onNavigate={handleNavigate} />
        )}

        {/* DEDICATED ONLINE SHOPPING STORE PAGE */}
        {activeSection === 'shop' && (
          <OnlineShoppingPage onNavigate={handleNavigate} />
        )}

        {/* DEDICATED SECURE ADMIN DASHBOARD & MASTER ACCESS */}
        {activeSection === 'admin' && (
          <AdminDashboard />
        )}

        {/* DEDICATED CUSTOMER ACCOUNT PORTAL */}
        {activeSection === 'account' && (
          <CustomerAccountPage onNavigate={handleNavigate} initialTab="orders" />
        )}

        {/* DEDICATED ABOUT US PAGE */}
        {activeSection === 'about' && (
          <AboutUs onNavigate={handleNavigate} />
        )}

        {/* DEDICATED FOUNDER & OWNER GANESH SINGH PAGE */}
        {activeSection === 'owner' && (
          <OwnerGaneshSinghPage onNavigate={handleNavigate} onOpenVirtualTour={() => handleNavigate('tour')} />
        )}

        {/* DEDICATED 360° VIRTUAL TOUR PAGE */}
        {activeSection === 'tour' && (
          <VirtualTourPage onNavigate={handleNavigate} />
        )}

        {/* DEDICATED EVENTS PAGE */}
        {activeSection === 'events' && (
          <div>
            <div className="bg-slate-900 text-white py-12 px-4 text-center border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Festivals & Celebrations</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Festivals & Events Calendar</h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                Diwali mega sales, Chhath Puja bazaar, fashion runways, live weekend music, and instant discount coupon codes.
              </p>
            </div>
            <EventsCalendar />
          </div>
        )}

        {/* DEDICATED MEMBERSHIP PAGE */}
        {activeSection === 'membership' && (
          <div>
            <div className="bg-slate-900 text-white py-12 px-4 text-center border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Loyalty & Privileges</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Smart Club Membership</h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                Earn 1 point for every ₹1 spent. Calculate your monthly voucher perks & generate your digital membership card.
              </p>
            </div>
            <MembershipRewards />
          </div>
        )}

        {/* DEDICATED FACILITIES & CSR PAGE */}
        {activeSection === 'facilities' && (
          <div>
            <div className="bg-slate-900 text-white py-12 px-4 text-center border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">World-Class Amenities</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Facilities, Services & Green Tech</h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                Sensor-based parking, wheelchair assistance, rooftop solar panels, rainwater harvesting & customer help desk.
              </p>
            </div>
            <FacilitiesAndCSR onOpenParking={() => handleNavigate('parking')} />
          </div>
        )}

        {/* DEDICATED GALLERY PAGE */}
        {activeSection === 'gallery' && (
          <div>
            <div className="bg-slate-900 text-white py-12 px-4 text-center border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Visual Tour</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Photo & Video Gallery</h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                High-definition captures of our grand atrium, multiplex auditoriums, fine dining, and rooftop lounge.
              </p>
            </div>
            <GallerySection onOpenVirtualTour={() => handleNavigate('tour')} />
          </div>
        )}

        {/* DEDICATED CONTACT & LEASING PAGE */}
        {activeSection === 'contact' && (
          <div>
            <div className="bg-slate-900 text-white py-12 px-4 text-center border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Visit & Inquiries</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Contact & Directions</h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                Located on NH-80 Road, Lakhisarai. Reachable in 5 mins from Lakhisarai Junction and Kiul Junction.
              </p>
            </div>
            <ContactSection />
          </div>
        )}
      </main>

      {/* 4. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenParking={() => handleNavigate('parking')}
        onOpenVirtualTour={() => handleNavigate('tour')}
      />

      {/* 5. Floating Quick Action Controls */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        
        {/* Quick Parking reservation pill */}
        <button
          onClick={() => handleNavigate('parking')}
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-xl border border-slate-700 hover:bg-slate-800 cursor-pointer transition-all hover:scale-105"
        >
          <Car className="w-3.5 h-3.5 text-amber-400" />
          <span>Parking Status</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>

        {/* Minimized Arrow-Only Back Button */}
        <button
          id="back-button"
          onClick={handleGoBack}
          title="Back"
          aria-label="Back"
          className="w-8 h-8 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white border border-slate-700 shadow-md backdrop-blur-xs flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-200 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 border border-slate-700 shadow-lg flex items-center justify-center hover:bg-slate-800 cursor-pointer transition-all hover:-translate-y-0.5"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 6. Global Modals */}
      {isMovieBookingOpen && (
        <MovieBookingModal
          movie={selectedMovie}
          onClose={() => setIsMovieBookingOpen(false)}
        />
      )}

      {isParkingModalOpen && (
        <ParkingBookingModal
          onClose={() => setIsParkingModalOpen(false)}
        />
      )}

      {isVirtualTourOpen && (
        <VirtualTourModal
          onClose={() => setIsVirtualTourOpen(false)}
        />
      )}

      {/* 7. E-Commerce & Customer Modals */}
      <CartDrawer onNavigate={handleNavigate} />
      <CheckoutPaymentModal />
      <AuthModal />

    </div>
    </ShopProvider>
  );
}
export default App;
