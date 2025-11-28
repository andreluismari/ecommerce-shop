/* eslint-disable prettier/prettier */
import { API_URL } from "./api";

export const orderApi = {
  create: async (customerId: string, items: any[], shipping = 0) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId, items, shipping }),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar pedido");
    }

    return response.json();
  },

  getByCustomer: async (customerId: string) => {
    const response = await fetch(`${API_URL}/orders/customer/${customerId}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar pedidos");
    }

    return response.json();
  },
};
