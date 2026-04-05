import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, User, Bot, Loader2, RefreshCw } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function SkinConsultant() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "bot", 
      content: "Welcome to Lumina Aesthetics. I am your AI Skin Consultant. How can I help you achieve your skin goals today? Tell me about your skin type or any concerns you have." 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `You are a professional AI Skin Consultant for "Lumina Aesthetics", a premium skincare clinic. 
          Your tone is elegant, professional, empathetic, and science-backed. 
          Provide personalized skincare advice, recommend routines, and explain the science behind ingredients. 
          Always emphasize that for serious medical conditions, they should see a dermatologist. 
          Suggest Lumina's signature treatments like "Lumina Glow Facial" or "Oxygen Therapy" where appropriate.
          Keep responses concise but informative. Use markdown for better readability.`,
          temperature: 0.7,
        }
      });

      const botResponse = response.text || "I apologize, I'm having trouble analyzing that. Could you rephrase your concern?";
      setMessages(prev => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: "bot", content: "I'm sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="consultant" className="py-24 bg-lumina-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-lumina-gold rounded-full animate-ping duration-[10s]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <span className="text-xs font-medium tracking-[0.4em] uppercase text-lumina-gold">AI-Powered Analysis</span>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-lumina-dark">
            Virtual <span className="italic">Skin</span> Consultant
          </h2>
          <p className="text-sm text-lumina-dark/40 max-w-xl mx-auto leading-relaxed font-light tracking-wide">
            Get instant, personalized skincare advice powered by advanced artificial intelligence. 
            Describe your concerns and receive a tailored routine.
          </p>
        </div>

        <div className="glass-card rounded-[40px] overflow-hidden shadow-2xl flex flex-col h-[700px] border border-white/40">
          {/* Chat Header */}
          <div className="p-8 border-b border-lumina-accent/10 bg-white/40 backdrop-blur-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-lumina-dark rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-lumina-gold" />
              </div>
              <div>
                <h3 className="text-sm font-serif font-medium text-lumina-dark uppercase tracking-[0.1em]">Lumina Intelligence</h3>
                <span className="text-[9px] tracking-[0.3em] uppercase text-lumina-gold animate-pulse font-bold">Active Analysis</span>
              </div>
            </div>
            <button 
              onClick={() => setMessages([{ role: "bot", content: "Welcome back. How can I assist you today?" }])}
              className="p-3 hover:bg-lumina-accent/10 rounded-full transition-all duration-500"
            >
              <RefreshCw className="w-4 h-4 text-lumina-dark/30" />
            </button>
          </div>

          {/* Chat Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "bot" ? "bg-lumina-dark" : "bg-lumina-gold"
                  }`}>
                    {msg.role === "bot" ? <Bot className="w-4 h-4 text-lumina-gold" /> : <User className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "bot" 
                      ? "bg-white text-lumina-dark shadow-sm markdown-body" 
                      : "bg-lumina-dark text-lumina-cream shadow-md"
                  }`}>
                    {msg.role === "bot" ? (
                      <Markdown>{msg.content}</Markdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-lumina-dark flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-lumina-gold" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-lumina-gold" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chat Input */}
          <div className="p-6 border-t border-lumina-accent/20 bg-white/60">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about your skin concerns..."
                className="w-full bg-white border border-lumina-accent/30 rounded-full py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-lumina-gold transition-colors shadow-inner"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-3 bg-lumina-dark text-lumina-gold rounded-full hover:bg-lumina-gold hover:text-lumina-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-center mt-4 text-lumina-dark/40 tracking-widest uppercase">
              Powered by Lumina Intelligence • Professional Skincare Guidance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
