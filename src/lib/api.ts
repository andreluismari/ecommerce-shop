// src/lib/api.ts
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function api(path: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  return response.json();
}
