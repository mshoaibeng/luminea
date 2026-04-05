import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, X, Plus, Minus, ShoppingCart, CheckCircle2 } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Lumina Shield SPF 50+",
    category: "Sunscreen",
    price: 85,
    description: "Advanced broad-spectrum protection with a weightless, invisible finish.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    name: "Clearance Pro Acne Serum",
    category: "Acne Care",
    price: 120,
    description: "Targeted treatment with salicylic acid and niacinamide for clear, balanced skin.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    name: "Velvet Dew Moisturizer",
    category: "Moisturizer",
    price: 150,
    description: "Deeply hydrating cream with ceramides and peptides for a supple glow.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    name: "Gold Elixir Night Repair",
    category: "Anti-Aging",
    price: 450,
    description: "Luxurious overnight treatment with 24k gold flakes and retinol.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 5,
    name: "Diamond Radiance Mask",
    category: "Treatment",
    price: 850,
    description: "Intensive brightening mask with crushed diamond dust and vitamin C.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 6,
    name: "Lumina Ultimate Set",
    category: "Full Routine",
    price: 1950,
    description: "The complete Lumina collection for total skin transformation.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600"
  }
];

interface CartItem extends Product {
  quantity: number;
}

export default function Shop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCheckoutComplete(true);
    setTimeout(() => {
      setCart([]);
      setIsCheckoutComplete(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <section id="shop" className="py-24 bg-lumina-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <span className="text-xs font-medium tracking-[0.4em] uppercase text-lumina-gold">The Collection</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-lumina-dark">
            Lumina <span className="italic">Boutique</span>
          </h2>
          <div className="w-24 h-px bg-lumina-gold/30 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-8 bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-700">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-lumina-cream/80 backdrop-blur-md text-lumina-gold text-[9px] tracking-[0.3em] uppercase rounded-full border border-lumina-gold/10">
                    {product.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-lumina-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#C5A059", color: "#FAF9F6" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product)}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 px-10 py-4 bg-lumina-dark text-lumina-cream text-[10px] tracking-[0.3em] uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 shadow-2xl"
                >
                  Add to Cart
                </motion.button>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-serif text-lumina-dark tracking-tight">{product.name}</h3>
                <p className="text-[11px] text-lumina-dark/30 leading-relaxed max-w-[280px] mx-auto font-light tracking-wide">
                  {product.description}
                </p>
                <p className="text-xs font-medium text-lumina-gold tracking-[0.3em] uppercase pt-2">
                  ${product.price.toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-lumina-dark/40 backdrop-blur-sm z-[70]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-lumina-cream z-[80] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-lumina-accent/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-lumina-gold" />
                  <h3 className="text-xl font-serif text-lumina-dark uppercase tracking-widest">Your Cart</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-lumina-accent/10 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                    <ShoppingCart className="w-12 h-12" />
                    <p className="text-sm tracking-widest uppercase">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-6">
                      <div className="w-20 h-24 bg-white rounded-lg overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-serif font-medium text-lumina-dark uppercase tracking-widest leading-tight">
                            {item.name}
                          </h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-lumina-dark/20 hover:text-red-500 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-lumina-gold tracking-widest uppercase">{item.category}</p>
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center border border-lumina-accent/20 rounded-full px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-lumina-gold transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-medium px-3">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-lumina-gold transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-sm font-medium text-lumina-dark">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 border-t border-lumina-accent/20 bg-white/40 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium tracking-widest uppercase text-lumina-dark/40">Subtotal</span>
                    <span className="text-2xl font-serif text-lumina-dark">${total.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckoutComplete}
                    className="w-full py-4 bg-lumina-dark text-lumina-cream text-xs tracking-widest uppercase hover:bg-lumina-gold transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    {isCheckoutComplete ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-lumina-gold" />
                        Order Confirmed
                      </>
                    ) : (
                      "Complete Purchase"
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Cart Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-lumina-dark text-lumina-gold rounded-full shadow-2xl z-[60] flex items-center justify-center"
      >
        <ShoppingBag className="w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-lumina-gold text-lumina-dark text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-lumina-dark">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </motion.button>
    </section>
  );
}
