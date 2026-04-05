import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, User, CheckCircle2, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

const services = [
  "Lumina Glow Facial",
  "Advanced Hydration",
  "Sun Damage Repair",
  "Oxygen Therapy",
  "Chemical Peel",
  "Microneedling"
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

export default function BookingSystem() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: ""
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const isStepValid = () => {
    switch(step) {
      case 1: return bookingData.service !== "";
      case 2: return bookingData.date !== "" && bookingData.time !== "";
      case 3: return bookingData.name !== "" && bookingData.email !== "" && bookingData.phone !== "";
      default: return true;
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-serif text-lumina-dark">Select a Service</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => setBookingData({ ...bookingData, service })}
                  className={`p-4 text-left border transition-all duration-300 ${
                    bookingData.service === service 
                      ? "border-lumina-gold bg-lumina-gold/5 text-lumina-gold" 
                      : "border-lumina-accent/20 hover:border-lumina-gold/50"
                  }`}
                >
                  <span className="text-sm font-medium tracking-widest uppercase">{service}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-serif text-lumina-dark">Date & Time</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-lumina-dark/40 mb-3">Select Date</label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="w-full bg-white border border-lumina-accent/20 p-4 text-sm focus:outline-none focus:border-lumina-gold"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-lumina-dark/40 mb-3">Select Time</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setBookingData({ ...bookingData, time: slot })}
                      className={`p-3 text-center border text-xs transition-all duration-300 ${
                        bookingData.time === slot 
                          ? "border-lumina-gold bg-lumina-gold/5 text-lumina-gold" 
                          : "border-lumina-accent/20 hover:border-lumina-gold/50"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-serif text-lumina-dark">Your Details</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name"
                value={bookingData.name}
                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                className="w-full bg-white border border-lumina-accent/20 p-4 text-sm focus:outline-none focus:border-lumina-gold"
              />
              <input 
                type="email" 
                placeholder="Email Address"
                value={bookingData.email}
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                className="w-full bg-white border border-lumina-accent/20 p-4 text-sm focus:outline-none focus:border-lumina-gold"
              />
              <input 
                type="tel" 
                placeholder="Phone Number"
                value={bookingData.phone}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                className="w-full bg-white border border-lumina-accent/20 p-4 text-sm focus:outline-none focus:border-lumina-gold"
              />
            </div>
          </motion.div>
        );
      case 4:
        // Save to localStorage when reaching the confirmation step
        const saveBooking = () => {
          const existing = JSON.parse(localStorage.getItem("lumina_bookings") || "[]");
          const isAlreadySaved = existing.some((b: any) => 
            b.date === bookingData.date && 
            b.time === bookingData.time && 
            b.service === bookingData.service &&
            b.email === bookingData.email
          );
          
          if (!isAlreadySaved) {
            const newBooking = { ...bookingData, id: Date.now() };
            localStorage.setItem("lumina_bookings", JSON.stringify([newBooking, ...existing]));
            // Dispatch a custom event so other components can update
            window.dispatchEvent(new Event("lumina_booking_updated"));
          }
        };

        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onViewportEnter={saveBooking}
            className="text-center space-y-6 py-10"
          >
            <div className="w-20 h-20 bg-lumina-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-lumina-gold" />
            </div>
            <h3 className="text-3xl font-serif text-lumina-dark">Booking Confirmed</h3>
            <p className="text-lumina-dark/60 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-lumina-dark font-medium">{bookingData.name}</span>. 
              Your appointment for <span className="text-lumina-dark font-medium">{bookingData.service}</span> is scheduled for 
              <span className="text-lumina-dark font-medium"> {bookingData.date}</span> at <span className="text-lumina-dark font-medium">{bookingData.time}</span>.
            </p>
            <div className="pt-6">
              <button 
                onClick={() => {
                  setStep(1);
                  setBookingData({ service: "", date: "", time: "", name: "", email: "", phone: "" });
                }}
                className="px-8 py-3 bg-lumina-dark text-lumina-cream text-xs tracking-widest uppercase hover:bg-lumina-gold transition-all"
              >
                Book Another Appointment
              </button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="booking" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <span className="text-xs font-medium tracking-[0.4em] uppercase text-lumina-gold">Reservations</span>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-lumina-dark">
            Book Your <span className="italic">Experience</span>
          </h2>
          <div className="w-24 h-px bg-lumina-gold/30 mx-auto mt-6" />
        </div>

        <div className="glass-card rounded-[40px] p-10 md:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-lumina-gold/10" />
          
          {/* Progress Indicator */}
          {step < 4 && (
            <div className="flex justify-between mb-20 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-lumina-accent/10 -translate-y-1/2 z-0" />
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-700 ${
                    step >= s ? "bg-lumina-dark text-lumina-gold shadow-xl" : "bg-white border border-lumina-accent/10 text-lumina-dark/20"
                  }`}
                >
                  {s === 1 && <Sparkles className="w-5 h-5" />}
                  {s === 2 && <Calendar className="w-5 h-5" />}
                  {s === 3 && <User className="w-5 h-5" />}
                </div>
              ))}
            </div>
          )}

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>

          {step < 4 && (
            <div className="flex justify-between mt-12 pt-8 border-t border-lumina-accent/10">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center gap-2 text-xs tracking-widest uppercase transition-all ${
                  step === 1 ? "opacity-0 pointer-events-none" : "text-lumina-dark/40 hover:text-lumina-dark"
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-8 py-3 bg-lumina-dark text-lumina-cream text-xs tracking-widest uppercase transition-all ${
                  !isStepValid() ? "opacity-50 cursor-not-allowed" : "hover:bg-lumina-gold"
                }`}
              >
                {step === 3 ? "Confirm Booking" : "Next"} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
