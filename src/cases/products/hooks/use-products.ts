import { useQuery } from "@tanstack/react-query";
import type { Product } from "../product-types";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);

      if (!res.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const data = await res.json();

      // 🔥 Garante tipagem e evita erro no .toFixed()
      return data.map((p: any) => ({
        ...p,
        price: Number(p.price) || 0,
        image_url: p.image_url ?? null,
      }));
    },
    initialData: [],
  });
}
