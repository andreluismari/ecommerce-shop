export type Product = {
  id: string;
  name: string;
  description: string;
  price: number | string;
  active: boolean;
  image_url: string | null;

  // 🔥 Campos necessários para evitar erro silencioso
  categoryId: string;
  brandId: string;
};
