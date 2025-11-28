// src/pages/Checkout.tsx
import { useAuth } from "../context/AuthContext";
import { clearCart, getCart } from "../cases/cart/cart";
import { useEffect, useState } from "react";

export function Checkout() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  if (!user) {
    return <p>Você precisa estar logado para finalizar a compra.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Finalizar pedido</h1>

      {items.length === 0 && <p>Seu carrinho está vazio.</p>}

      {items.length > 0 && (
        <>
          <ul className="space-y-4">
            {items.map((item: any) => (
              <li key={item.product.id}>
                {item.product.name} — {item.quantity} unidade(s)
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              alert("Pedido finalizado com sucesso!");
              clearCart();
              setItems([]);
            }}
            className="mt-4 px-4 py-2 bg-black text-white rounded"
          >
            Confirmar compra
          </button>
        </>
      )}
    </div>
  );
}
