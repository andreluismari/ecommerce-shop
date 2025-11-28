import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useProducts(categoryId: string | null) {
  return useQuery({
    queryKey: ["products", categoryId],
    queryFn: async () => {
      const url = categoryId
        ? `/products/category/${categoryId}`
        : "/products";

      const { data } = await api.get(url);
      return data;
    },
  });
}
