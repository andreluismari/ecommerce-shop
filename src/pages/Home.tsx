import { useProducts } from "@/cases/products/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { addToCart } from "@/cases/cart/cart";

export function Home() {
  const { products, loading } = useProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Home</h1>

      <h2 className="text-xl font-semibold mt-8 mb-4">Produtos</h2>

      {loading && <p>Carregando...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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
