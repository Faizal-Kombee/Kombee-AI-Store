import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/lib/hooks/useStoreActions";

interface CartItemProps {
  item: CartItemType;
  removeFromCart: (id: string) => void;
}

export function CartItem({ item, removeFromCart }: CartItemProps) {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-50 shadow-sm hover:shadow-md transition-all"
    >
      <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
        <p className="text-xs text-indigo-500 font-bold">
          ${item.price.toFixed(2)} x {item.quantity}
        </p>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </motion.div>
  );
}
