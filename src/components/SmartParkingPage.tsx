import React, { useState } from 'react';
import { 
  Car, 
  Bike, 
  Zap, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  QrCode, 
  Check, 
  CreditCard, 
  Navigation, 
  Download, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MALL_INFO } from '../data/mallData';

interface SmartParkingPageProps {
  onNavigate: (tab: any) => void;
}

export const SmartParkingPage: React.FC<SmartParkingPageProps> = ({ onNavigate }) => {
  const [vehicleType, setVehicleType] = useState<'car' | 'bike' | 'ev'>('car');
  const [selectedLevel, setSelectedLevel] = useState<'B1' | 'B2'>('B1');
  const [selectedSlot, setSelectedSlot] = useState<string>('B1-04');
  const [plateNumber, setPlateNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isReserved, setIsReserved] = useState(false);
  const [passCode, setPassCode] = useState('');

  // Sample bays for interactive selector
  const baysB1 = [
    { id: '01', type: 'car', occupied: true, isEV: false },
    { id: '02', type: 'car', occupied: false, isEV: false },
    { id: '03', type: 'car', occupied: true, isEV: false },
    { id: '04', type: 'car', occupied: false, isEV: false },
    { id: '05', type: 'car', occupied: false, isEV: true },
    { id: '06', type: 'car', occupied: false, isEV: true },
    { id: '07', type: 'bike', occupied: false, isEV: false },
    { id: '08', type: 'bike', occupied: true, isEV: false },
    { id: '09', type: 'bike', occupied: false, isEV: false },
    { id: '10', type: 'bike', occupied: false, isEV: false },
    { id: '11', type: 'car', occupied: false, isEV: false },
    { id: '12', type: 'car', occupied: true, isEV: false },
  ];

  const baysB2 = [
    { id: '21', type: 'car', occupied: false, isEV: false },
    { id: '22', type: 'car', occupied: false, isEV: false },
    { id: '23', type: 'car', occupied: true, isEV: false },
    { id: '24', type: 'car', occupied: false, isEV: false },
    { id: '25', type: 'car', occupied: false, isEV: true },
    { id: '26', type: 'bike', occupied: false, isEV: false },
    { id: '27', type: 'bike', occupied: false, isEV: false },
    { id: '28', type: 'bike', occupied: true, isEV: false },
    { id: '29', type: 'car', occupied: false, isEV: false },
    { id: '30', type: 'car', occupied: false, isEV: false },
    { id: '31', type: 'car', occupied: true, isEV: false },
    { id: '32', type: 'car', occupied: false, isEV: false },
  ];

  const activeBays = selectedLevel === 'B1' ? baysB1 : baysB2;

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    const newPass = `SB-PARK-${Math.floor(100000 + Math.random() * 900000)}`;
    setPassCode(newPass);
    setIsReserved(true);
    try {
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <Car className="w-3.5 h-3.5" />
            <span>Smart Bazzar Automated Facility</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Smart Sensor-Based Parking System
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Capacity for <strong>500+ Four-Wheelers</strong> and <strong>1000+ Two-Wheelers</strong> across two basement levels with real-time ultrasound bay sensors, automated boom barriers, and EV fast-charging.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-3xl">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-emerald-400">Basement 1 Status</span>
              <p className="text-lg font-black text-white">218 Free Slots</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-emerald-400">Basement 2 Status</span>
              <p className="text-lg font-black text-white">314 Free Slots</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-amber-400">EV Fast Chargers</span>
              <p className="text-lg font-black text-white">12 Active Bays</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-amber-400">First 1 Hour</span>
              <p className="text-lg font-black text-white">100% Free</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        {/* Interactive Parking Bay Reservation Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Bay Layout Map */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Live Parking Bay Map</h3>
                <p className="text-xs text-slate-500">Select an available green slot to pre-lock</p>
              </div>

              {/* Level Tabs */}
              <div className="flex gap-2">
                {(['B1', 'B2'] as const).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setSelectedLevel(lvl);
                      setSelectedSlot(`${lvl}-02`);
                    }}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedLevel === lvl
                        ? 'bg-slate-900 text-amber-400 shadow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Basement {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Underground Bay Floor Plan */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                <span className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Entry Ramp from NH-80 Road Frontage</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-500">Speed Limit: 10 km/h</span>
              </div>

              {/* Grid of Bays */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 pt-2">
                {activeBays.map((bay) => {
                  const bayCode = `${selectedLevel}-${bay.id}`;
                  const isSelected = selectedSlot === bayCode;

                  return (
                    <button
                      key={bay.id}
                      disabled={bay.occupied}
                      onClick={() => setSelectedSlot(bayCode)}
                      className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all border cursor-pointer ${
                        bay.occupied
                          ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
                          : isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-400 scale-105 shadow-md ring-2 ring-amber-300'
                          : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
                      }`}
                    >
                      <span className="text-[10px] opacity-75">{bayCode}</span>
                      <div className="flex items-center gap-1 mt-1">
                        {bay.type === 'car' ? <Car className="w-4 h-4" /> : <Bike className="w-4 h-4" />}
                        {bay.isEV && <Zap className="w-3 h-3 text-amber-400" />}
                      </div>
                      <span className="text-[9px] mt-1 uppercase font-bold">
                        {bay.occupied ? 'Occupied' : isSelected ? 'Selected' : 'Open'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800 gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500"></span> Available Bay
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-700"></span> Occupied
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-500"></span> Your Selected Slot
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" /> EV Fast Charger
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">License Plate Recognition (ANPR) Active</p>
                <p className="text-slate-600 mt-0.5">
                  The automated boom barrier scans your vehicle plate upon entry. If pre-booked, the barrier lifts instantly without rolling down your window.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Reservation & Digital QR Pass Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Pre-Book Your Parking Bay</h3>
              <p className="text-xs text-slate-500">Reserve your spot up to 3 hours before arrival</p>
            </div>

            {isReserved ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 rounded-2xl p-5 text-white border-2 border-dashed border-amber-400/40 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400">Smart Bazzar Lakhisarai</span>
                      <p className="text-2xl font-black text-white">{selectedSlot}</p>
                      <p className="text-xs text-slate-300">Basement {selectedLevel} • Near Lift Lobby 2</p>
                    </div>
                    <div className="w-16 h-16 bg-white p-1 rounded-xl flex items-center justify-center">
                      <QrCode className="w-14 h-14 text-slate-900" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Vehicle Number</span>
                      <p className="font-bold text-amber-300 uppercase font-mono">{plateNumber || 'BR-53-L-1001'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Booking Pass ID</span>
                      <p className="font-bold text-white font-mono">{passCode}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Tariff</span>
                      <p className="font-bold text-emerald-400">Free 1st Hour</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Status</span>
                      <p className="font-bold text-emerald-400">Bay Locked for 45m</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => alert(`Permit ${passCode} saved! Confirmation SMS sent.`)}
                    className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Save QR Pass to Phone</span>
                  </button>
                  <button
                    onClick={() => setIsReserved(false)}
                    className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    New
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="space-y-4">
                {/* Vehicle Type Switcher */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Vehicle Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setVehicleType('car')}
                      className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                        vehicleType === 'car'
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <Car className="w-4 h-4" />
                      <span>Car / SUV</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVehicleType('bike')}
                      className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                        vehicleType === 'bike'
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      <span>Two-Wheeler</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVehicleType('ev')}
                      className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                        vehicleType === 'ev'
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      <span>EV Charging</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Plate Registration Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BR-53-AK-4421"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono uppercase font-bold text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone for SMS Pass</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 6200 123456"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                  <span className="text-slate-500">Selected Bay:</span>
                  <span className="font-bold text-slate-900">{selectedSlot} (Basement {selectedLevel})</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Generate Free Parking Permit & QR Pass
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Tariffs & Guidelines Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-base">Tariff & Rates</h4>
            <p className="text-xs text-slate-600">
              • 1st Hour: <strong>100% Free</strong> for all mall visitors.<br />
              • Cars: ₹20 / additional hour.<br />
              • Two-Wheelers: ₹10 / additional hour.<br />
              • Smart Club Gold & Platinum members enjoy complimentary parking all day!
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-base">Valet Parking Service</h4>
            <p className="text-xs text-slate-600">
              Available at the Main Ground Floor Porch entry on NH-80 Road during weekends and festival days. Drop your keys with our uniform security team.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-base">EV Fast-Charging</h4>
            <p className="text-xs text-slate-600">
              12 high-speed CCS2 and Type 2 EV chargers on Level B1 powered partially by our rooftop solar energy system. Compatible with Tata, Mahindra, MG, and electric scooters.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
