// src/cases/categories/hooks/use-categories.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get("/categories");
      return data;
    },
  });
}
