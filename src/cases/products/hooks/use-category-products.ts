import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";

export function useCategoryProducts(categoryId?: string) {
  return useQuery<Product[]>({
    queryKey: ["products-by-category", categoryId],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products?categoryId=${categoryId}`);
      if (!res.ok) throw new Error("Erro ao buscar produtos por categoria");
      return res.json();
    },
    enabled: !!categoryId,
  });
}
