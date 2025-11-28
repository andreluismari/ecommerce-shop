// src/pages/Checkout.tsx
import { useAuth } from "@/context/AuthContext";
import { clearCart, getCart, type CartItem } from "@/cases/cart/cart";
import { useEffect, useState } from "react";

export function Checkout() {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-semibold">
          Você precisa estar logado para finalizar a compra.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Finalizar pedido</h1>

      {items.length === 0 && (
        <p className="text-gray-600">Seu carrinho está vazio.</p>
      )}

      {items.length > 0 && (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="border p-3 rounded-md flex justify-between"
              >
                <span>{item.product.name}</span>
                <span className="font-semibold">
                  {item.quantity} un.
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              alert("Pedido finalizado com sucesso! Obrigado pela compra 😊");
              clearCart();
              setItems([]);
            }}
            className="mt-6 px-4 py-2 w-full bg-black text-white rounded hover:bg-gray-800"
          >
            Confirmar compra
          </button>
        </>
      )}
    </div>
  );
}
