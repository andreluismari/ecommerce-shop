import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useOrders(customerId: string | null) {
  return useQuery({
    queryKey: ["orders", customerId],
    queryFn: async () => {
      if (!customerId) return [];

      const { data } = await api.get(`/orders/customer/${customerId}`);
      return data;
    },
  });
}
