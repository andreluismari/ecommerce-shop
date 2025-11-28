import { useState } from "react";
import { useProducts } from "@/cases/products/services/use-products";
import { ProductCard } from "@/components/ProductCard";
import { CategorySidebar } from "@/cases/categories/components/CategorySidebar";

import { addToCart } from "@/cases/cart/cart"; // ✅ IMPORTA AQUI

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: products = [], isLoading } = useProducts(selectedCategory);

  // ✅ Função REAL de adicionar ao carrinho
  function handleAdd(product: any) {
    addToCart(product);
    alert("Produto adicionado ao carrinho!");
  }

  return (
    <div className="flex gap-8">
      <CategorySidebar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Catálogo</h1>

        {isLoading && <p>Carregando produtos...</p>}

        <div className="grid grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onAdd={handleAdd}   // ✅ AGORA FUNCIONA
            />
          ))}
        </div>
      </div>
    </div>
  );
}
