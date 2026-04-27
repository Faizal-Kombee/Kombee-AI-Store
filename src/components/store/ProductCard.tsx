import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/hooks/useStoreActions";

interface ProductCardProps {
  product: Product;
  handleAddToCart: (id: string) => void;
}

export function ProductCard({ product, handleAddToCart }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
    >
      <div className="aspect-[4/3] bg-slate-50 rounded-3xl mb-4 relative overflow-hidden flex items-center justify-center">
        <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-100">
          {product.category}
        </span>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="px-2">
        <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Price
            </span>
            <span className="text-xl font-black text-indigo-600">
              ${product.price.toFixed(2)}
            </span>
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
  );
}
