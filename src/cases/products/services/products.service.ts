// src/cases/products/services/product.service.ts

// Tipo base do produto vindo da API
export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  categoryId?: number | string;
  // Se o backend trouxer mais campos, você pode ir adicionando aqui
}

// URL base da API (de preferência vinda do .env)
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    console.error("Erro na API:", response.status, text);
    throw new Error("Erro ao comunicar com a API");
  }
  return response.json();
}

// Buscar todos os produtos
export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);
  return handleResponse<Product[]>(res);
}

// Buscar um produto por ID
export async function getProductById(id: string | number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`);
  return handleResponse<Product>(res);
}

// Buscar produtos por categoria
export async function getProductsByCategory(
  categoryId: string | number
): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products/category/${categoryId}`);
  return handleResponse<Product[]>(res);
}
