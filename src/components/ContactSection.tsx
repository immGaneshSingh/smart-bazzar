import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Check, 
  HelpCircle, 
  Train, 
  Car, 
  ChevronDown, 
  ChevronUp,
  MessageSquare,
  Facebook,
  Instagram,
  Youtube,
  Navigation
} from 'lucide-react';
import { MALL_INFO, FAQS_DATA } from '../data/mallData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Store Lease / Retail Space');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-300">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Us in Lakhisarai</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Location, Directions & Inquiries
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Smart Bazzar is prominently situated right on National Highway NH-80, easily accessible from all points in Lakhisarai, Kiul, and neighboring districts.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Mall Address</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {MALL_INFO.location}
            </p>
            <span className="text-[11px] text-amber-700 font-bold block pt-1">
              PIN Code: 811311
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Phone & Helpline</h4>
            <a 
              href={`tel:${MALL_INFO.phone}`} 
              className="text-xs text-slate-800 font-bold hover:text-amber-600 block transition-colors"
            >
              {MALL_INFO.phone}
            </a>
            <p className="text-[11px] text-slate-500">
              Customer Desk: Ext. 101<br />
              CineSmart Box Office: Ext. 104
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Email & Leasing</h4>
            <a 
              href={`mailto:${MALL_INFO.email}`} 
              className="text-xs text-slate-800 font-bold hover:text-amber-600 block transition-colors truncate"
            >
              {MALL_INFO.email}
            </a>
            <p className="text-[11px] text-slate-500">
              Founder Office: Ganesh Singh<br />
              leasing@smartbazzar.in
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Mall Timings</h4>
            <p className="text-xs text-slate-800 font-bold">
              10:00 AM – 10:30 PM
            </p>
            <p className="text-[11px] text-slate-500">
              Open All 7 Days<br />
              Multiplex late show till 12:30 AM
            </p>
          </div>

        </div>

        {/* Map, Directions & Inquiry Form (Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Left: Location Map & Transit Guide */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">How to Reach Smart Bazzar</h3>
                <p className="text-xs text-slate-500">Convenient transit from railway junctions & highways</p>
              </div>
              <Navigation className="w-5 h-5 text-amber-600" />
            </div>

            {/* Stylized Visual Map Representation */}
            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center p-6 text-center">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 space-y-2 max-w-sm">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/50 animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-white">SMART BAZZAR</h4>
                <p className="text-xs text-amber-300 font-semibold">NH-80 Road, Lakhisarai, Bihar 811311</p>
                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Lakhisarai+Bihar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Transit Connections */}
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                <Train className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-800">From Railway Stations:</p>
                  <p className="text-slate-600 mt-0.5">
                    <strong>2.5 km</strong> from Lakhisarai Junction (LKR) (~7 mins by auto/e-rickshaw)<br />
                    <strong>3.8 km</strong> from Kiul Junction (KIUL) (~12 mins by auto)
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                <Car className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Highway Access:</p>
                  <p className="text-slate-600 mt-0.5">
                    Direct frontage on NH-80 linking Munger, Bhagalpur, Begusarai, and Mokama with wide 4-lane ingress.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Connect With Us:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-100 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                  title="YouTube Live Streams"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact & Retail Space Leasing Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Send an Inquiry or Feedback</h3>
              <p className="text-xs text-slate-500">Retail leasing, event bookings, customer care, or artisan stalls</p>
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Message Dispatched!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Thank you <strong>{name}</strong>. Our management office under <strong>Ganesh Singh</strong> will review your inquiry and reach out within 24 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer hover:bg-slate-800"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ganesh Singh / Retailer Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 6200 123456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Purpose</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  >
                    <option>Store Lease / Retail Space</option>
                    <option>Made in Bihar Artisan Free Stall Request</option>
                    <option>CineSmart Group / School Movie Booking</option>
                    <option>Rooftop Event / Banquet Hosting</option>
                    <option>General Mall Feedback & Compliments</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Message or Query</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your retail brand, space requirement, or event date..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Mall Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h3>
          </div>

          <div className="divide-y divide-slate-200">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed animate-in fade-in">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
