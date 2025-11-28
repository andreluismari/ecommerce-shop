/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";
import { orderApi } from "../lib/order-api";

export function useOrders(customerId: string) {
  return useQuery({
    queryKey: ["orders", customerId],
    queryFn: () => orderApi.getByCustomer(customerId),
    enabled: !!customerId,
  });
}
