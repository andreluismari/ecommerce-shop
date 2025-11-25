import { useQuery } from "@tanstack/react-query";

export function useCategoryProducts(categoryId?: string) {
  return useQuery({
    queryKey: ["categoryProducts", categoryId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/products/category/${categoryId}`);
      if (!res.ok) throw new Error("Erro ao buscar produtos da categoria");
      return res.json();
    },
  });
}
