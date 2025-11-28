import { api } from "@/services/api";

export const OrderService = {
  listByCustomer(customerId: string) {
    return api.get(`/orders/customer/${customerId}`).then((res) => res.data);
  },

  getById(id: string) {
    return api.get(`/orders/${id}`).then((res) => res.data);
  },

  create(payload: {
    customerId: string | null;
    items: { productId: string; quantity: number; total: number }[];
    shipping: number;
  }) {
    return api.post("/orders", payload).then((res) => res.data);
  }
};
