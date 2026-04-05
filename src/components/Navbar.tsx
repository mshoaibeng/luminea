import { motion } from "motion/react";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-lumina-cream/80 backdrop-blur-md border-b border-lumina-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-lumina-gold" />
            <span className="text-2xl font-serif tracking-[0.2em] uppercase text-lumina-dark">Lumina</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            {["Services", "About", "Shop", "Booking", "Consultant", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-[10px] font-medium tracking-[0.3em] uppercase hover:text-lumina-gold transition-all duration-500"
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="#booking"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, backgroundColor: "#C5A059", color: "#FAF9F6" }}
              className="px-8 py-3 bg-lumina-dark text-lumina-cream text-[10px] tracking-[0.2em] uppercase transition-all duration-500"
            >
              Book Now
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-lumina-cream border-b border-lumina-accent/20 px-4 py-6 flex flex-col gap-4"
        >
          {["Services", "About", "Shop", "Booking", "Consultant", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium tracking-widest uppercase"
            >
              {item}
            </a>
          ))}
          <a 
            href="#booking"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-lumina-dark text-lumina-cream text-xs tracking-widest uppercase text-center"
          >
            Book Now
          </a>
        </motion.div>
      )}
    </nav>
  );
}
