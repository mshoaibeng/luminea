/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import SkinConsultant from "./components/SkinConsultant";
import BookingSystem from "./components/BookingSystem";
import BookingHistory from "./components/BookingHistory";
import SocialSection from "./components/SocialSection";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-lumina-cream relative">
      {/* Global Atmosphere & Texture */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        <div className="absolute inset-0 atmosphere-gradient" />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-lumina-gold z-[60] origin-left"
        style={{ scaleX }}
      />

      <div className="relative z-10">
        <Navbar />
        
        <main>
        <Hero />
        
        {/* About Section */}
        <section id="about" className="py-24 bg-lumina-cream relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-lumina-gold/10 rounded-full blur-3xl" />
                <img 
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Aesthetic Clinic" 
                  className="rounded-2xl shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-lumina-dark p-8 rounded-2xl shadow-xl z-20 hidden md:block">
                  <p className="text-lumina-gold text-4xl font-serif mb-1">15+</p>
                  <p className="text-lumina-cream/60 text-[10px] tracking-widest uppercase">Years of Excellence</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <span className="text-xs font-medium tracking-[0.4em] uppercase text-lumina-gold">Our Philosophy</span>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-lumina-dark leading-tight">
                  Where <span className="italic">Science</span> Meets <br />
                  Pure Aesthetic Artistry
                </h2>
                <p className="text-lg text-lumina-dark/60 font-light leading-relaxed">
                  At Lumina, we believe that skincare is more than a routine—it's a ritual of self-love. 
                  Our clinic combines state-of-the-art dermatological technology with a holistic 
                  understanding of beauty to deliver results that are both visible and sustainable.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <h4 className="text-sm font-serif font-medium mb-2">Expert Care</h4>
                    <p className="text-xs text-lumina-dark/40 leading-relaxed">Board-certified specialists dedicated to your skin's health.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-medium mb-2">Tailored Plans</h4>
                    <p className="text-xs text-lumina-dark/40 leading-relaxed">Every treatment is customized to your unique skin profile.</p>
                  </div>
                </div>
                <button className="text-xs font-medium tracking-widest uppercase border-b border-lumina-dark/20 pb-2 hover:border-lumina-gold hover:text-lumina-gold transition-all duration-300">
                  Read Our Story
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        <Services />
        <Shop />
        <BookingSystem />
        <BookingHistory />
        <SocialSection />
        <SkinConsultant />
        
        {/* Testimonials */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-medium tracking-[0.4em] uppercase text-lumina-gold">Testimonials</span>
              <h2 className="text-4xl font-serif font-light mt-4">Real <span className="italic">Glow</span> Stories</h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { name: "Elena R.", role: "Model", text: "Lumina transformed my skin. The Glow Facial is now a non-negotiable part of my routine." },
                { name: "James W.", role: "Architect", text: "Professional, precise, and effective. The best aesthetic clinic I've ever visited." },
                { name: "Sophia L.", role: "Artist", text: "The AI consultant gave me a routine that actually works. My skin has never looked better." }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="max-w-sm p-8 bg-lumina-cream rounded-2xl border border-lumina-accent/10"
                >
                  <p className="text-lg font-serif italic text-lumina-dark/80 mb-6">"{t.text}"</p>
                  <div>
                    <p className="text-sm font-medium text-lumina-dark">{t.name}</p>
                    <p className="text-[10px] tracking-widest uppercase text-lumina-gold">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      </div>
    </div>
  );
}
