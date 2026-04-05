import { motion } from "motion/react";
import { Instagram, Facebook, Twitter, Sparkles } from "lucide-react";

const instagramPosts = [
  { id: 1, url: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600" },
  { id: 2, url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600" },
  { id: 3, url: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600" },
  { id: 4, url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600" },
  { id: 5, url: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=600" },
  { id: 6, url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600" },
];

export default function SocialSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-xs font-medium tracking-[0.4em] uppercase text-lumina-gold">Follow Our Journey</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-lumina-dark">
              Lumina <span className="italic">on Social</span>
            </h2>
          </div>
          <div className="flex gap-6">
            {[
              { Icon: Instagram, label: "Instagram", href: "https://instagram.com/lumina_aesthetics" },
              { Icon: Facebook, label: "Facebook", href: "https://facebook.com/lumina_aesthetics" },
              { Icon: Twitter, label: "Twitter", href: "https://twitter.com/lumina_aesthetics" },
            ].map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: "#121212", color: "#C5A059" }}
                className="flex items-center gap-3 px-8 py-4 border border-lumina-dark/5 text-[10px] tracking-[0.3em] uppercase transition-all duration-700"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {instagramPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative aspect-square group overflow-hidden cursor-pointer rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
            >
              <img 
                src={post.url} 
                alt={`Lumina Social Post ${post.id}`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-lumina-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-lumina-gold" />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-lumina-dark/40 font-light italic">
            Tag us <span className="text-lumina-gold font-medium">#LuminaGlow</span> to be featured
          </p>
        </div>
      </div>
    </section>
  );
}
