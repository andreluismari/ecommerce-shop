import { useQuery } from "@tanstack/react-query";
import { Product } from "@/components/ProductCard";

export function useCategoryProducts(categoryId: string | undefined) {
  return useQuery<Product[]>({
    queryKey: ["products-by-category", categoryId],
    enabled: !!categoryId,

    queryFn: async () => {
      const url = `http://localhost:3000/products?categoryId=${categoryId}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Erro ao buscar produtos por categoria");
      }

      return res.json();
    },
  });
}
