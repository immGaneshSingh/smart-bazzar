import React, { useState } from 'react';
import { 
  X, 
  Car, 
  Bike, 
  MapPin, 
  Check, 
  Clock, 
  ShieldCheck, 
  QrCode, 
  Download, 
  Sparkles,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ParkingBookingModalProps {
  onClose: () => void;
}

export const ParkingBookingModal: React.FC<ParkingBookingModalProps> = ({ onClose }) => {
  const [vehicleType, setVehicleType] = useState<'car' | 'bike'>('car');
  const [parkingLevel, setParkingLevel] = useState<'B1' | 'B2'>('B1');
  const [selectedSlot, setSelectedSlot] = useState<string>('B1-12');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [driverName, setDriverName] = useState('');
  const [isReserved, setIsReserved] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Sample Parking bays for demonstration
  const bays = [
    { id: '11', occupied: false, isEV: true },
    { id: '12', occupied: false, isEV: false },
    { id: '13', occupied: true, isEV: false },
    { id: '14', occupied: false, isEV: false },
    { id: '15', occupied: true, isEV: false },
    { id: '16', occupied: false, isEV: true },
    { id: '17', occupied: false, isEV: false },
    { id: '18', occupied: true, isEV: false },
    { id: '19', occupied: false, isEV: false },
    { id: '20', occupied: false, isEV: false },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `SB-PARK-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketId(newId);
    setIsReserved(true);

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-200 my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-amber-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black leading-tight">Smart Parking Assistant</h3>
              <p className="text-xs text-amber-300">500+ Car & 1000+ Two-Wheeler Sensor Bays</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isReserved ? (
          /* Digital QR Parking Ticket */
          <div className="p-6 space-y-5">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-black text-slate-900">Slot Reserved Successfully!</h4>
              <p className="text-xs text-slate-500">
                Your bay at Smart Bazzar NH-80 is locked for the next 45 minutes.
              </p>
            </div>

            {/* Parking Pass Card */}
            <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-amber-300 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Reserved Slot</span>
                  <p className="text-2xl font-black text-slate-900">{selectedSlot}</p>
                  <p className="text-xs text-slate-500">Basement {parkingLevel}, Near Elevator 2</p>
                </div>
                <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-300 flex items-center justify-center shadow-xs">
                  <QrCode className="w-14 h-14 text-slate-800" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Vehicle Reg. No.</p>
                  <p className="font-bold text-slate-800 uppercase">{vehicleNumber || 'BR-53-L-1001'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Pass ID</p>
                  <p className="font-mono font-bold text-amber-700">{ticketId}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Vehicle Type</p>
                  <p className="font-bold text-slate-800">{vehicleType === 'car' ? '4-Wheeler Car' : 'Two-Wheeler'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Tariff</p>
                  <p className="font-bold text-emerald-600">Free for 1st Hour</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Boom barrier will auto-open upon scanning your license plate or QR code.</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
            >
              Done & Save Permit
            </button>
          </div>
        ) : (
          /* Slot Selector Flow */
          <form onSubmit={handleBooking} className="p-6 space-y-4">
            
            {/* Vehicle Type Switcher */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Vehicle Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setVehicleType('car')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                    vehicleType === 'car'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  <span>4-Wheeler (Car/SUV)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVehicleType('bike')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                    vehicleType === 'bike'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  <span>Two-Wheeler (Bike/Scooter)</span>
                </button>
              </div>
            </div>

            {/* Level Switcher */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Parking Floor</label>
              <div className="flex gap-1.5">
                {(['B1', 'B2'] as const).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setParkingLevel(lvl)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      parkingLevel === lvl
                        ? 'bg-slate-900 text-amber-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Basement {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Live Bays Grid */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-bold text-slate-700">Select Available Bay ({parkingLevel}):</span>
                <span className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Open
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-slate-300"></span> Taken
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2 pt-1">
                {bays.map((bay) => {
                  const bayCode = `${parkingLevel}-${bay.id}`;
                  const isSelected = selectedSlot === bayCode;

                  return (
                    <button
                      key={bay.id}
                      type="button"
                      disabled={bay.occupied}
                      onClick={() => setSelectedSlot(bayCode)}
                      className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center border transition-all ${
                        bay.occupied
                          ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed'
                          : isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm scale-105'
                          : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
                      }`}
                    >
                      <span className="text-[10px]">{parkingLevel}</span>
                      <span>#{bay.id}</span>
                      {bay.isEV && <Zap className="w-2.5 h-2.5 text-amber-600 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Number Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Vehicle Plate Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. BR-53-AK-4421"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 uppercase font-mono tracking-wider focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number (for SMS QR Code)
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer mt-2"
            >
              Lock Slot & Generate QR Entry Pass
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Smart Parking sensors guide you directly to your slot upon arrival
            </p>

          </form>
        )}

      </div>
    </div>
  );
};
