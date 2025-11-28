/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";

type RatingsMap = Record<string, number>;

export function useRatings() {
  const { user } = useAuth();

  const userKey = useMemo(
    () => user?.customerId || user?.id || user?.authUserId || "guest",
    [user],
  );

  const storageKey = `ratings_${userKey}`;
  const [ratings, setRatings] = useState<RatingsMap>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setRatings(JSON.parse(stored));
      } else {
        setRatings({});
      }
    } catch {
      setRatings({});
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(ratings));
    } catch {
      // ignore
    }
  }, [ratings, storageKey]);

  function setRating(productId: string, value: number) {
    setRatings((prev) => ({ ...prev, [productId]: value }));
  }

  function getRating(productId: string) {
    return ratings[productId] ?? 0;
  }

  return { ratings, setRating, getRating };
}
