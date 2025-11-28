// src/pages/Checkout.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCart, clearCart, CartItem } from "../cases/cart/cart";

export default function Checkout() {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const total = items.reduce(
    (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
    0
  );

  async function handleFinish() {
    if (!user) {
      alert("Você precisa estar logado para finalizar a compra.");
      return;
    }

    alert("Pedido finalizado com sucesso! (simulação da FASE 2)");
    clearCart();
    setItems([]);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>

      {items.length === 0 && (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      )}

      {items.length > 0 && (
        <>
          <ul className="space-y-4 mb-6">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="flex justify-between bg-white border rounded p-4"
              >
                <span>
                  {item.product.name} — {item.quantity}x
                </span>
                <span>
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mb-4">
            Total: R$ {total.toFixed(2)}
          </h2>

          <button
            onClick={handleFinish}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Finalizar Pedido
          </button>
        </>
      )}
    </div>
  );
}
