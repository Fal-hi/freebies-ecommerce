import React, { createContext, useState, useContext, ReactNode } from "react";
import { ImageSourcePropType } from "react-native";

export type CartItem = {
  id: number;
  image: ImageSourcePropType;
  title: string;
  category: string;
  price: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  setCartItems: (items: CartItem[]) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
        // Check if item already exists to avoid duplicates or handles quantity if generic
        // For now, assuming simple add as per request, but unique ID might be needed if multiple same items
        // The current data uses static IDs, so we might need to handle ID generation for dynamic adds if real backend
        // For this demo, we'll assign a random ID if it conflicts or just push it.
        // But the user request implies just "add product", so we'll push.
        // Let's generate a temporary ID to avoid key conflicts in lists if strictly needed for UI,
        // but keeping it simple for now based on user flow.
        return [...prevItems, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
