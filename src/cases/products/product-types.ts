export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number | string | null;
  active: boolean;
  image_url: string | null;

  category: {
    id: string;
    name: string;
  };

  brand: {
    id: string;
    name: string;
  };
};
