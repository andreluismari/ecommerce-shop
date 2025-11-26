export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  active: boolean;
  category: {
    id: string;
    name: string;
  };
  brand?: {
    id: string;
    name: string;
  };
}
