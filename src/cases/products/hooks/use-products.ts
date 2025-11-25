import { useEffect, useState } from "react";
import { getProducts } from "../services/products.service";
import type { ProductDTO } from "../dtos/product.dto";

export function useProducts() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const items = await getProducts();
        setProducts(items);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, []);

  return { products, loading };
}
