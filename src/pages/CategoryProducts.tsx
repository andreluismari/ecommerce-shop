import { useParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { addToCart } from "@/cases/cart/cart";
import type { Product } from "@/types/product";
import { useCategoryProducts } from "@/cases/products/hooks/use-category-products";

export function CategoryProducts() {
  const { id } = useParams();
  const { data: products = [], isLoading } = useCategoryProducts(id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Produtos da Categoria
      </h1>

      {isLoading && <p>Carregando produtos...</p>}

      {!isLoading && products.length === 0 && (
        <p className="text-gray-500">Nenhum produto encontrado para esta categoria.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}
