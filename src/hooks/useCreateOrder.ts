/* eslint-disable prettier/prettier */
import { useMutation } from "@tanstack/react-query";
import { orderApi } from "../lib/order-api";

export function useCreateOrder() {
  return useMutation({
    mutationFn: ({
      customerId,
      items,
      shipping = 0,
    }: {
      customerId: string;
      items: any[];
      shipping?: number;
    }) => orderApi.create(customerId, items, shipping),
  });
}
