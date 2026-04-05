import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { History, Calendar, Clock, Sparkles, Trash2 } from "lucide-react";

interface Booking {
  id: number;
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
}

export default function BookingHistory() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadBookings = () => {
    const saved = JSON.parse(localStorage.getItem("lumina_bookings") || "[]");
    setBookings(saved);
  };

  useEffect(() => {
    loadBookings();
    window.addEventListener("lumina_booking_updated", loadBookings);
    return () => window.removeEventListener("lumina_booking_updated", loadBookings);
  }, []);

  const deleteBooking = (id: number) => {
    const filtered = bookings.filter(b => b.id !== id);
    localStorage.setItem("lumina_bookings", JSON.stringify(filtered));
    setBookings(filtered);
  };

  if (bookings.length === 0) return null;

  return (
    <section id="history" className="py-24 bg-lumina-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-medium tracking-[0.4em] uppercase text-lumina-gold">Your Journey</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-lumina-dark">
            Booking <span className="italic">History</span>
          </h2>
          <div className="w-24 h-px bg-lumina-gold/30 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-10 rounded-[32px] relative group border border-lumina-accent/5 hover:border-lumina-gold/20 transition-all duration-700 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
              >
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => deleteBooking(booking.id)}
                    className="p-2 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-lumina-dark rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-lumina-gold" />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-medium text-lumina-dark uppercase tracking-[0.15em]">
                      {booking.service}
                    </h3>
                    <p className="text-[9px] text-lumina-gold tracking-[0.3em] uppercase font-medium">Confirmed</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-4 text-xs text-lumina-dark/50 tracking-wide">
                    <Calendar className="w-4 h-4 text-lumina-gold/60" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-lumina-dark/50 tracking-wide">
                    <Clock className="w-4 h-4 text-lumina-gold/60" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="pt-6 border-t border-lumina-accent/5">
                    <p className="text-[9px] text-lumina-dark/30 tracking-[0.3em] uppercase mb-2">Guest</p>
                    <p className="text-sm font-medium text-lumina-dark tracking-tight">{booking.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
