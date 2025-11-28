// src/cases/categories/services/category-service.ts
import { api } from "@/services/api";

export const categoryService = {
  async findAll() {
    const { data } = await api.get("/categories");
    return data;
  },

  async findProducts(categoryId: string) {
    const { data } = await api.get(`/products/category/${categoryId}`);
    return data;
  },
};
