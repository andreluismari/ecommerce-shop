import { useQuery } from "@tanstack/react-query";

export function useCategoryProducts(categoryId: string) {
  return useQuery({
    queryKey: ["category-products", categoryId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/categories/${categoryId}/products`);

      if (!res.ok) {
        throw new Error("Erro ao buscar produtos da categoria");
      }

      return res.json();
    },
    enabled: !!categoryId,
    initialData: [],
  });
}
