import { motion } from "motion/react";
import { Sparkles, Droplets, Sun, Wind } from "lucide-react";

const services = [
  {
    title: "Lumina Glow Facial",
    description: "Our signature treatment using advanced hydration and light therapy to reveal a radiant, youthful complexion.",
    icon: <Sparkles className="w-8 h-8 text-lumina-gold" />,
    price: "From $180",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Advanced Hydration",
    description: "Deep moisture infusion using hyaluronic acid and specialized serums to restore skin's natural barrier.",
    icon: <Droplets className="w-8 h-8 text-lumina-gold" />,
    price: "From $150",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Sun Damage Repair",
    description: "Targeted treatments to reverse pigmentation and sun damage using laser and chemical peel technologies.",
    icon: <Sun className="w-8 h-8 text-lumina-gold" />,
    price: "From $220",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Oxygen Therapy",
    description: "Revitalize tired skin with pure oxygen infusion, boosting circulation and cellular turnover.",
    icon: <Wind className="w-8 h-8 text-lumina-gold" />,
    price: "From $120",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <span className="text-xs font-medium tracking-[0.4em] uppercase text-lumina-gold">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-lumina-dark">
            Curated <span className="italic">Aesthetic</span> Solutions
          </h2>
          <div className="w-24 h-px bg-lumina-gold/30 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative bg-white p-10 border border-lumina-accent/5 hover:border-lumina-gold/20 transition-all duration-700 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-8 p-4 bg-lumina-cream rounded-full w-fit group-hover:bg-lumina-dark transition-colors duration-500">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif font-medium mb-4 text-lumina-dark group-hover:text-lumina-gold transition-colors duration-500">
                {service.title}
              </h3>
              <p className="text-xs text-lumina-dark/40 leading-relaxed mb-8 font-light tracking-wide">
                {service.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-lumina-accent/5">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-lumina-gold">
                  {service.price}
                </span>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-[10px] font-medium tracking-[0.2em] uppercase text-lumina-dark/30 group-hover:text-lumina-dark transition-colors duration-500"
                >
                  Explore →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
