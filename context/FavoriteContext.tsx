import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { CardProductProps } from "@/ui/CardProduct";

type FavoriteContextType = {
  favorites: CardProductProps[];
  toggleFavorite: (item: CardProductProps) => void;
  isFavorite: (id: number) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<CardProductProps[]>([]);

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  const toggleFavorite = (item: CardProductProps) => {
    if (isFavorite(item.id)) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));
      Alert.alert("Success", "Removed from favorites");
    } else {
      setFavorites((prev) => [...prev, item]);
      Alert.alert("Success", "Successfully added to favorites");
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
}
