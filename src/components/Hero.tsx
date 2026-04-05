import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-lumina-cream">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lumina-gold/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lumina-accent/20 rounded-full blur-[100px] animate-pulse delay-1000" />

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              transition={{ duration: 2 }}
              className="text-[10px] font-medium uppercase text-lumina-gold block glow-text"
            >
              The Science of Radiance
            </motion.span>
            <h1 className="text-7xl md:text-[120px] font-serif font-light tracking-tight leading-[0.85] text-lumina-dark">
              Reveal Your <br />
              <span className="italic font-extralight opacity-80">Inner Light</span>
            </h1>
          </div>

          <p className="text-base md:text-lg font-light tracking-wide text-lumina-dark/50 max-w-xl mx-auto leading-relaxed text-balance">
            Experience the intersection of advanced dermatology and holistic aesthetics. 
            Tailored treatments for a skin that glows from within.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.02, backgroundColor: "#C5A059", color: "#FAF9F6" }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 bg-lumina-dark text-lumina-cream text-[10px] tracking-[0.3em] uppercase transition-all duration-700 shadow-2xl"
            >
              Book Appointment
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.02, borderColor: "#C5A059", color: "#C5A059" }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 border border-lumina-dark/10 text-lumina-dark text-[10px] tracking-[0.3em] uppercase transition-all duration-700"
            >
              Our Services
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Scroll</span>
        <ChevronDown className="w-4 h-4 opacity-40 animate-bounce" />
      </motion.div>
    </section>
  );
}
