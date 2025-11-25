import { api } from "@/services/api";
import type { ProductDTO } from "../dtos/product.dto";

export async function getProducts(): Promise<ProductDTO[]> {
  const response = await api.get("/products");
  return response.data;
}
