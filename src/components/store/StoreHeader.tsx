import { ShoppingCart, Search, Mic, MicOff } from "lucide-react";

interface StoreHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterColor: string | null;
  setFilterColor: (color: string | null) => void;
  filterCategory: string | null;
  setFilterCategory: (category: string | null) => void;
  maxPrice: number | null;
  setMaxPrice: (price: number | null) => void;
  isListening: boolean;
  toggleVoice: () => void;
}

export function StoreHeader({
  searchQuery,
  setSearchQuery,
  filterColor,
  setFilterColor,
  filterCategory,
  setFilterCategory,
  maxPrice,
  setMaxPrice,
  isListening,
  toggleVoice,
}: StoreHeaderProps) {
  const colors = ["blue", "black", "gold", "brown"];
  const categories = ["eyewear", "watches", "bags", "headwear", "accessories"];

  return (
    <header className="glass sticky top-4 z-40 p-4 md:p-6 rounded-3xl shadow-xl flex flex-col items-center gap-6 transition-all">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Kombee Store
          </h1>
        </div>

        <div className="flex-1 max-w-xl w-full relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Talk to AI or search products..."
            className="w-full bg-slate-100/50 border-none focus:ring-2 focus:ring-indigo-500 rounded-2xl py-4 pl-12 pr-12 text-slate-700 placeholder:text-slate-400 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={toggleVoice}
            className={`absolute inset-y-2 right-2 p-2 rounded-xl transition-all ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-slate-200 text-slate-500 hover:bg-slate-300"
            }`}
          >
            {isListening ? (
              <Mic className="w-5 h-5" />
            ) : (
              <MicOff className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-2 bg-slate-100/50 rounded-2xl border border-white/20">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  setFilterColor(color === filterColor ? null : color)
                }
                className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 active:scale-95 ${
                  filterColor === color
                    ? "border-indigo-600 scale-125 shadow-md"
                    : "border-transparent"
                }`}
                style={{
                  backgroundColor: color === "gold" ? "#fbbf24" : color,
                }}
                title={`Filter ${color}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-3 border-t border-slate-100 pt-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat === filterCategory ? null : cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              filterCategory === cat
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
        {(filterColor || filterCategory || searchQuery || maxPrice) && (
          <button
            onClick={() => {
              setFilterColor(null);
              setFilterCategory(null);
              setSearchQuery("");
              setMaxPrice(null);
            }}
            className="px-4 py-2 text-xs font-black text-red-500 hover:bg-red-50"
          >
            CLEAR ALL
          </button>
        )}
      </div>
    </header>
  );
}
