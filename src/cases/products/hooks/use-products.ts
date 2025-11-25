import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/products"); // <<< AJUSTE AQUI

      if (!res.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      return res.json();
    },
    initialData: [],
  });
}
