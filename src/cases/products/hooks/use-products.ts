import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      return res.json();
    },
    initialData: [],
  });
}
