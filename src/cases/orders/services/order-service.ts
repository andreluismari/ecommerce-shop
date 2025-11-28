// src/cases/orders/services/order-service.ts
import type { CartItem } from "@/cases/cart/cart";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export type CreateOrderItemPayload = {
  productId: string;
  quantity: number;
  unitPrice: number;
};

export type CreateOrderPayload = {
  customerId: string;
  items: CreateOrderItemPayload[];
};

export async function createOrderFromCart(
  customerId: string,
  items: CartItem[]
) {
  const payload: CreateOrderPayload = {
    customerId,
    items: items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      unitPrice: Number(item.product.price) || 0,
    })),
  };

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Erro ao criar pedido: ${res.status} ${
        text || res.statusText || ""
      }`.trim()
    );
  }

  return res.json();
}
