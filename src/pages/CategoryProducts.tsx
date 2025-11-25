import { useParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { addToCart } from "@/cases/cart/cart";
import { useCategoryProducts } from "@/cases/products/hooks/use-category-products";

export function CategoryProducts() {
  const { id } = useParams();
  const { products, loading, category } = useCategoryProducts(id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {category ? `Categoria: ${category.name}` : "Carregando categoria..."}
      </h1>

      {loading && <p className="text-gray-500">Carregando produtos...</p>}

      {!loading && products?.length === 0 && (
        <p className="text-gray-500">Nenhum produto encontrado para esta categoria.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
