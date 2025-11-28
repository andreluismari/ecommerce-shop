// src/pages/Cart.tsx
import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  type CartItem,
} from "@/cases/cart/cart";
import { createOrderFromCart } from "@/cases/orders/services/order-service";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Carrega itens do localStorage ao montar
  useEffect(() => {
    setItems(getCart());
  }, []);

  function syncCart() {
    setItems(getCart());
  }

  function handleIncrease(id: CartItem["product"]["id"]) {
    const item = items.find((i) => i.product.id === id);
    if (!item) return;
    updateQuantity(id, item.quantity + 1);
    syncCart();
  }

  function handleDecrease(id: CartItem["product"]["id"]) {
    const item = items.find((i) => i.product.id === id);
    if (!item) return;
    if (item.quantity <= 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, item.quantity - 1);
    }
    syncCart();
  }

  function handleRemove(id: CartItem["product"]["id"]) {
    removeFromCart(id);
    syncCart();
  }

  function handleClear() {
    clearCart();
    setItems([]);
  }

  // Total com conversão segura de preço
  const total = items.reduce((sum, item) => {
    const price = Number(item.product.price) || 0;
    return sum + price * item.quantity;
  }, 0);

  async function handleCheckout() {
    if (items.length === 0) return;

    // 👉 Por enquanto pegamos o customerId do localStorage.
    // Na FASE 2 (autenticação) isso vai vir do usuário logado.
    const customerId = localStorage.getItem("customerId");

    if (!customerId) {
      alert("Você precisa estar logado para finalizar a compra (FASE 2).");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createOrderFromCart(customerId, items);

      // Limpa carrinho local
      clearCart();
      setItems([]);

      alert("Pedido realizado com sucesso!");
      navigate("/"); // se quiser, depois podemos criar uma página de sucesso
    } catch (err) {
      console.error(err);
      setError("Não foi possível finalizar a compra. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Carrinho</h1>

      {items.length === 0 && (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      )}

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item) => {
              const unitPrice = Number(item.product.price) || 0;
              const lineTotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.product.image_url ||
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
                        R$ {unitPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

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
                      R$ {lineTotal.toFixed(2)}
                    </span>

                    <button
                      className="text-red-500 text-sm hover:underline"
                      onClick={() => handleRemove(item.product.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-4">
            <div className="text-xl font-bold">
              Total: R$ {total.toFixed(2)}
            </div>

            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded-md border text-sm"
                onClick={handleClear}
                disabled={isSubmitting}
              >
                Limpar carrinho
              </button>
              <button
                className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-800 transition disabled:opacity-60"
                onClick={handleCheckout}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Finalizando..." : "Finalizar compra"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
