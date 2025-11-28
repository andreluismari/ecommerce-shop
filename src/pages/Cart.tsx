import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  type CartItem,
} from "@/cases/cart/cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const nav = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setItems(getCart());
  }, []);

  function handleIncrease(id: string) {
    const item = items.find((i) => i.product.id === id);
    if (!item) return;

    updateQuantity(id, item.quantity + 1);
    setItems(getCart());
  }

  function handleDecrease(id: string) {
    const item = items.find((i) => i.product.id === id);
    if (!item) return;

    if (item.quantity === 1) return;
    updateQuantity(id, item.quantity - 1);
    setItems(getCart());
  }

  function handleRemove(id: string) {
    removeFromCart(id);
    setItems(getCart());
  }

  function handleClear() {
    clearCart();
    setItems([]);
  }

  function handleCheckout() {
    if (!user) {
      alert("Você precisa estar logado para finalizar a compra (FASE 2).");
      return;
    }

    nav("/checkout");
  }

  const total = items.reduce((sum, item) => {
    const price = Number(item.product.price) || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Carrinho</h1>

      {items.length === 0 && <p>Seu carrinho está vazio.</p>}

      {items.length > 0 && (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.product.image_url ??
                      "https://via.placeholder.com/80"
                    }
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.product.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      R$ {Number(item.product.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity and actions */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => handleDecrease(item.product.id)}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => handleIncrease(item.product.id)}
                    >
                      +
                    </button>
                  </div>

                  <span className="font-semibold">
                    R$ {(Number(item.product.price) * item.quantity).toFixed(2)}
                  </span>

                  <button
                    className="text-red-500 text-sm hover:underline"
                    onClick={() => handleRemove(item.product.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-4">
            <div className="text-xl font-bold">
              Total: R$ {total.toFixed(2)}
            </div>

            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded-md border text-sm"
                onClick={handleClear}
              >
                Limpar carrinho
              </button>

              <button
                className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-800 transition"
                onClick={handleCheckout}
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
