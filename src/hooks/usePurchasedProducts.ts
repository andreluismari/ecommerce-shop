/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";
import { orderApi } from "../lib/order-api";

export function usePurchasedProductIds(customerId?: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["purchasedProducts", customerId],
    queryFn: () => orderApi.getByCustomer(customerId as string),
    enabled: !!customerId,
  });

  const productIds: string[] =
    data?.flatMap((order: any) =>
      order.items.map((item: any) => item.product?.id),
    ) ?? [];

  const uniqueProductIds = Array.from(new Set(productIds));

  return { productIds: uniqueProductIds, isLoading };
}
