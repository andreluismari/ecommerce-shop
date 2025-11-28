// src/context/RatingsContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

// Tipo da avaliação (produtoId → estrelas)
type Rating = {
  productId: string;
  stars: number; // 1 a 5
};

type RatingsContextType = {
  ratings: Rating[];
  setRating: (productId: string, stars: number) => void;
};

const RatingsContext = createContext<RatingsContextType | undefined>(undefined);

export function RatingsProvider({ children }: { children: React.ReactNode }) {
  const [ratings, setRatings] = useState<Rating[]>(() => {
    const saved = localStorage.getItem("ratings");
    return saved ? JSON.parse(saved) : [];
  });

  // Persistir no localStorage
  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  function setRating(productId: string, stars: number) {
    setRatings((prev) => {
      const exists = prev.find((r) => r.productId === productId);

      if (exists) {
        return prev.map((r) =>
          r.productId === productId ? { ...r, stars } : r
        );
      }

      return [...prev, { productId, stars }];
    });
  }

  return (
    <RatingsContext.Provider value={{ ratings, setRating }}>
      {children}
    </RatingsContext.Provider>
  );
}

// Hook de uso
export function useRatings() {
  const ctx = useContext(RatingsContext);
  if (!ctx) {
    throw new Error("useRatings deve ser usado dentro de RatingsProvider");
  }
  return ctx;
}
