import { useProducts } from "@/cases/products/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { addToCart } from "@/cases/cart/cart";

export function Home() {
  const { products, loading } = useProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Produtos em Destaque</h1>

      {loading && <p className="text-gray-500">Carregando produtos...</p>}

      {!loading && products?.length === 0 && (
        <p className="text-gray-500">Nenhum produto encontrado.</p>
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
