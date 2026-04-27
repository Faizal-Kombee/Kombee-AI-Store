import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/hooks/useStoreActions";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  handleAddToCart: (id: string) => void;
}

export function ProductGrid({ products, handleAddToCart }: ProductGridProps) {
  return (
    <div className="flex-1 w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-800">
          {products.length}{" "}
          <span className="text-slate-400 font-medium">Products found</span>
        </h2>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
