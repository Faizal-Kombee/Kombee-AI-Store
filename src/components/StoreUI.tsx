"use client";

import { useStoreActions, Product, CartItem } from "@/lib/hooks/useStoreActions";
import { ShoppingCart, Search, Trash2, Mic, MicOff, Star, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function StoreUI() {
  const router = useRouter();
  const {
    cart,
    setCart,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    filterColor,
    setFilterColor,
    maxPrice,
    setMaxPrice,
    handleAddToCart,
  } = useStoreActions();

  const [isListening, setIsListening] = useState(false);

  const toggleVoice = () => {
    if (typeof window === "undefined") return;
    if (!("webkitSpeechRecognition" in window) && !("speechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div className="min-h-screen relative p-4 md:p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="mesh-bg" />
      
      {/* Header Section */}
      <header className="glass sticky top-4 z-40 p-4 md:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 transition-all">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Kombee Store</h1>
        </div>

        <div className="flex-1 max-w-xl w-full relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Talk to AI or search sunglasses..."
            className="w-full bg-slate-100/50 border-none focus:ring-2 focus:ring-indigo-500 rounded-2xl py-4 pl-12 pr-12 text-slate-700 placeholder:text-slate-400 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={toggleVoice}
            className={`absolute inset-y-2 right-2 p-2 rounded-xl transition-all ${
              isListening ? "bg-red-500 text-white animate-pulse" : "bg-slate-200 text-slate-500 hover:bg-slate-300"
            }`}
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-2 bg-slate-100/50 rounded-2xl border border-white/20">
            {["blue", "black", "gold", "brown"].map((color) => (
              <button
                key={color}
                onClick={() => setFilterColor(color === filterColor ? null : color)}
                className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 active:scale-95 ${
                  filterColor === color ? "border-indigo-600 scale-125 shadow-md" : "border-transparent"
                }`}
                style={{ backgroundColor: color === "gold" ? "#fbbf24" : color }}
                title={`Filter ${color}`}
              />
            ))}
            {(filterColor || searchQuery || maxPrice) && (
              <button 
                onClick={() => {
                  setFilterColor(null);
                  setSearchQuery("");
                  setMaxPrice(null);
                }}
                className="ml-2 p-2 text-xs font-bold text-slate-500 hover:text-red-500 uppercase tracking-widest transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Products Grid */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">
              {filteredProducts.length} <span className="text-slate-400 font-medium">Products found</span>
            </h2>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
                >
                  <div className="aspect-[4/3] bg-slate-50 rounded-3xl mb-4 relative overflow-hidden flex items-center justify-center">
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-100">
                      {product.category}
                    </span>
                    <ShoppingCart className="w-16 h-16 text-slate-200 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="px-2">
                    <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Price</span>
                        <span className="text-xl font-black text-indigo-600">${product.price.toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={() => handleAddToCart(product.id)}
                        className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-600 active:scale-95 transition-all shadow-lg shadow-slate-200"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Sidebar Cart */}
        <aside className="w-full lg:w-96 glass p-8 rounded-[3rem] shadow-2xl border border-white/40 sticky top-28">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              Your Cart
              <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-lg">{cart.length} items</span>
            </h3>
          </div>

          <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center flex flex-col items-center gap-4"
                >
                  <div className="bg-slate-50 p-6 rounded-full">
                    <ShoppingCart className="w-12 h-12 text-slate-200" />
                  </div>
                  <p className="text-slate-400 font-medium">Your cart is empty</p>
                </motion.div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-50 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center">
                      <span className="text-xs font-black text-slate-300">{item.color.slice(0,1).toUpperCase()}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                      <p className="text-xs text-indigo-500 font-bold">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {cart.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-slate-500 font-bold">Total Amount</span>
                <span className="text-2xl font-black text-slate-800">
                  ${cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                </span>
              </div>
              <button 
                onClick={() => router.push('/checkout')}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-100 mt-4 group"
              >
                Go to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          <div className="mt-8 p-6 bg-slate-900 rounded-[2rem] text-white space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">AI Power</span>
            </div>
            <h4 className="font-bold text-sm">Voice Search</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Say "Blue sunglasses" or "show me items under $40" to use the agent.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
