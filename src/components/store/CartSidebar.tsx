import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { CartItem as CartItemType } from "@/lib/hooks/useStoreActions";
import { CartItem } from "./CartItem";

interface CartSidebarProps {
  cart: CartItemType[];
  removeFromCart: (id: string) => void;
  onCheckout: () => void;
}

export function CartSidebar({
  cart,
  removeFromCart,
  onCheckout,
}: CartSidebarProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="w-full lg:w-96 glass p-6 rounded-[2.5rem] sticky top-24 shadow-2xl border border-white/40">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
          Your Cart
          <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-lg">
            {cart.length} items
          </span>
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
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {cart.length > 0 && (
        <div className="mt-8 pt-8 border-t border-slate-100 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              Total Amount
            </span>
            <span className="text-2xl font-black text-slate-800">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
          >
            Checkout Now
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </aside>
  );
}
