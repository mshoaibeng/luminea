import { motion } from "motion/react";
import { Sparkles, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-lumina-dark text-lumina-cream py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-lumina-gold" />
              <span className="text-2xl font-serif tracking-[0.2em] uppercase text-lumina-cream">Lumina</span>
            </div>
            <p className="text-sm text-lumina-cream/40 leading-relaxed font-light tracking-wide">
              Where science meets aesthetic artistry. We provide bespoke skincare solutions 
              designed to reveal your natural radiance.
            </p>
            <div className="flex gap-6">
              {[
                { Icon: Instagram, href: "https://instagram.com/lumina_aesthetics" },
                { Icon: Facebook, href: "https://facebook.com/lumina_aesthetics" },
                { Icon: Twitter, href: "https://twitter.com/lumina_aesthetics" }
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: "#C5A059" }}
                  className="text-lumina-cream/30 transition-all duration-500"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-medium tracking-[0.3em] uppercase text-lumina-gold mb-10">Quick Links</h4>
            <ul className="space-y-5">
              {[
                { label: "Services", href: "#services" },
                { label: "About Us", href: "#about" },
                { label: "Shop", href: "#shop" },
                { label: "Booking", href: "#booking" },
                { label: "My Bookings", href: "#history" },
                { label: "Consultant", href: "#consultant" },
                { label: "Privacy Policy", href: "#" }
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-lumina-cream/40 hover:text-lumina-gold transition-all duration-500 tracking-wide font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-medium tracking-[0.3em] uppercase text-lumina-gold mb-10">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-lumina-gold/60 mt-1" />
                <span className="text-xs text-lumina-cream/40 leading-relaxed font-light tracking-wide">
                  123 Aesthetic Blvd, Suite 100<br />Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-lumina-gold/60" />
                <span className="text-xs text-lumina-cream/40 font-light tracking-wide">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-lumina-gold/60" />
                <span className="text-xs text-lumina-cream/40 font-light tracking-wide">hello@luminaaesthetics.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-medium tracking-[0.3em] uppercase text-lumina-gold mb-10">Newsletter</h4>
            <p className="text-xs text-lumina-cream/40 mb-8 font-light tracking-wide">
              Join our community for exclusive skincare tips and offers.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 px-6 py-4 text-xs text-lumina-cream focus:outline-none focus:border-lumina-gold/50 transition-all duration-500 placeholder:text-white/20"
              />
              <button className="w-full py-4 bg-lumina-gold text-lumina-dark text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-white transition-all duration-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-lumina-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] tracking-widest uppercase text-lumina-cream/20 font-light">
            © 2026 Lumina Aesthetics. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] tracking-widest uppercase text-lumina-cream/20 font-light">Terms of Service</span>
            <span className="text-[10px] tracking-widest uppercase text-lumina-cream/20 font-light">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
