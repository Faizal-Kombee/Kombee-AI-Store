"use client";

import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useState, useMemo } from "react";
import productsData from "@/lib/products.json";
import { useRouter } from "next/navigation";

export interface Product {
  id: string;
  name: string;
  price: number;
  color: string;
  description: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export function useStoreActions() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    return (productsData as Product[]).filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesColor = filterColor ? p.color === filterColor : true;
      const matchesPrice = maxPrice ? p.price <= maxPrice : true;
      return matchesSearch && matchesColor && matchesPrice;
    });
  }, [searchQuery, filterColor, maxPrice]);

  // Make state readable to Copilot
  useCopilotReadable({
    description: "The list of products available in the store.",
    value: productsData,
  });

  useCopilotReadable({
    description: "The current shopping cart items.",
    value: cart,
  });

  useCopilotReadable({
    description: "The currently filtered list of products.",
    value: filteredProducts,
  });

  // Actions for Copilot
  useCopilotAction({
    name: "searchProducts",
    description: "Search and filter products in the store.",
    parameters: [
      { name: "query", type: "string", description: "Search query for product name." },
      { name: "color", type: "string", description: "Filter by color." },
      { name: "maxPrice", type: "number", description: "Maximum price filter." },
    ],
    handler: ({ query, color, maxPrice }) => {
      if (query !== undefined) setSearchQuery(query);
      if (color !== undefined) setFilterColor(color);
      if (maxPrice !== undefined) setMaxPrice(maxPrice);
      return `Filters updated. Query: ${query || 'none'}, Color: ${color || 'any'}, Max Price: ${maxPrice || 'any'}`;
    },
  });

  useCopilotAction({
    name: "addToCart",
    description: "Add a product to the shopping cart.",
    parameters: [
      { name: "productId", type: "string", description: "The ID of the product to add." },
      { name: "quantity", type: "number", description: "Quantity to add.", default: 1 },
    ],
    handler: ({ productId, quantity = 1 }) => {
      const product = (productsData as Product[]).find((p) => p.id === productId);
      if (product) {
        setCart((prev) => {
          const existing = prev.find((item) => item.id === productId);
          if (existing) {
            return prev.map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
            );
          }
          return [...prev, { ...product, quantity }];
        });
        return `Added ${quantity} ${product.name} to cart.`;
      }
      return "Product not found.";
    },
  });

  useCopilotAction({
    name: "removeFromCart",
    description: "Remove a product from the shopping cart.",
    parameters: [
      { name: "productId", type: "string", description: "The ID of the product to remove." },
    ],
    handler: ({ productId }) => {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      return `Removed item ${productId} from cart.`;
    },
  });

  useCopilotAction({
    name: "navigateTo",
    description: "Navigate to a different part of the application.",
    parameters: [
      { name: "path", type: "string", description: "The path to navigate to (e.g., '/', '/cart', '/checkout')." },
    ],
    handler: ({ path }) => {
      router.push(path);
      return `Navigated to ${path}.`;
    },
  });

  useCopilotAction({
    name: "quickBuy",
    description: "Find an item, compare with cheaper alternative, and proceed to checkout.",
    parameters: [
      { name: "itemName", type: "string", description: "The name or type of item to find." },
    ],
    handler: async ({ itemName }) => {
      // Logic for multi-step: 
      // 1. Find matches
      const matches = (productsData as Product[]).filter(p => p.name.toLowerCase().includes(itemName.toLowerCase()) || p.category.toLowerCase().includes(itemName.toLowerCase()));
      if (matches.length === 0) return "No matches found.";
      
      // 2. Find cheapest
      const cheapest = matches.reduce((prev, curr) => prev.price < curr.price ? prev : curr);
      
      // 3. Add to cart
      setCart((prev) => {
        const existing = prev.find((item) => item.id === cheapest.id);
        if (existing) {
          return prev.map((item) => item.id === cheapest.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...cheapest, quantity: 1 }];
      });

      // 4. Navigate to cart/checkout
      router.push("/checkout");
      return `Found ${cheapest.name} for $${cheapest.price} (cheapest match). Added to cart and navigating to checkout.`;
    },
  });

  const handleAddToCart = (productId: string) => {
    const product = (productsData as Product[]).find((p) => p.id === productId);
    if (!product) {
      console.error(`Product ${productId} not found`);
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return {
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
  };
}
