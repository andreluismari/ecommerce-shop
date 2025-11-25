import { useQuery } from "@tanstack/react-query";

export function useProductDetail(id?: string) {
  return useQuery({
    queryKey: ["productDetail", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/products/${id}`);
      if (!res.ok) throw new Error("Erro ao buscar detalhes do produto");
      return res.json();
    },
  });
}
