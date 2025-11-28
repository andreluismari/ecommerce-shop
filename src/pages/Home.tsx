import { useProducts } from "@/cases/products/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { addToCart } from "@/cases/cart/cart";
import type { Product } from "@/components/ProductCard";

export function Home() {
  const { data: products = [], isLoading } = useProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Produtos em Destaque</h1>

      {isLoading && <p>Carregando produtos...</p>}

      {!isLoading && products.length === 0 && (
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={(p) => {
              addToCart(p);
              alert("Produto adicionado ao carrinho!");
            }}
          />
        ))}
      </div>
    </div>
  );
}
