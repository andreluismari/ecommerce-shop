import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../lib/utils";

export function useProductDetail(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products/${id}`);

      if (!res.ok) throw new Error("Erro ao buscar produto");

      return res.json();
    },
  });
}
