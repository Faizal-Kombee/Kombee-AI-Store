"use client";

import { useStoreActions, Product } from "@/lib/hooks/useStoreActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { StoreHeader } from "./store/StoreHeader";
import { ProductGrid } from "./store/ProductGrid";
import { CartSidebar } from "./store/CartSidebar";

export default function StoreUI() {
  const router = useRouter();
  const {
    cart,
    setCart,
    products,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    filterColor,
    setFilterColor,
    filterCategory,
    setFilterCategory,
    maxPrice,
    setMaxPrice,
    handleAddToCart,
  } = useStoreActions();

  const [isListening, setIsListening] = useState(false);

  /**
   * REQUIREMENT 2.4: Knowledge Base Integration
   */
  useCopilotReadable({
    description: "The complete product catalog of the store",
    value: products,
  });

  useCopilotReadable({
    description: "User preferences and shopping history",
    value: {
      favoriteColor: "Indigo",
      budgetLimit: 2500,
      recentlyViewed: ["Classic Aviators", "Midnight Shades"],
      isPremiumMember: true,
    },
  });

  useCopilotReadable({
    description: "The current shopping cart state",
    value: cart,
  });

  /**
   * REQUIREMENT 2.5: Tooling & Action System
   * REQUIREMENT 2.2: Chatbot as the Control Brain
   */
  useCopilotAction({
    name: "searchProducts",
    description: "Filter products by name, color, or maximum price.",
    parameters: [
      { name: "query", type: "string", description: "Search query" },
      { name: "color", type: "string", description: "Filter by color" },
      { name: "maxPrice", type: "number", description: "Max price filter" },
    ],
    handler: ({ query, color, maxPrice }) => {
      if (query !== undefined) setSearchQuery(query);
      if (color !== undefined) setFilterColor(color);
      if (maxPrice !== undefined) setMaxPrice(maxPrice);
    },
  });

  useCopilotAction({
    name: "addToCart",
    description: "Add a product to the shopping cart by its ID.",
    parameters: [
      { name: "productId", type: "string", description: "Product ID" },
      { name: "quantity", type: "number", description: "Quantity" },
    ],
    handler: ({ productId }) => {
      handleAddToCart(productId);
    },
  });

  useCopilotAction({
    name: "quickBuy",
    description: "Quickly buy a product by name.",
    parameters: [
      { name: "productName", type: "string", description: "Product name" },
    ],
    handler: async ({ productName }) => {
      setSearchQuery(productName);
      const product = products.find((p: Product) =>
        p.name.toLowerCase().includes(productName.toLowerCase()),
      );
      if (product) {
        handleAddToCart(product.id);
        return `Found ${product.name} and added it to your cart!`;
      }
      return "I couldn't find that exact product.";
    },
  });

  useCopilotAction({
    name: "navigateTo",
    description: "Navigate to a specific page.",
    parameters: [
      { name: "path", type: "string", enum: ["/", "/checkout"] },
    ],
    handler: ({ path }) => {
      router.push(path);
    },
  });

  const toggleVoice = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      setSearchQuery(event.results[0][0].transcript);
    };
    isListening ? recognition.stop() : recognition.start();
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen relative p-4 md:p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="mesh-bg" />

      <StoreHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterColor={filterColor}
        setFilterColor={setFilterColor}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        isListening={isListening}
        toggleVoice={toggleVoice}
      />

      <main className="flex flex-col lg:flex-row gap-8 items-start">
        <ProductGrid
          products={filteredProducts}
          handleAddToCart={handleAddToCart}
        />
        <CartSidebar
          cart={cart}
          removeFromCart={removeFromCart}
          onCheckout={() => router.push("/checkout")}
        />
      </main>
    </div>
  );
}
