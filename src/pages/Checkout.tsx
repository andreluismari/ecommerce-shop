import { useAuth } from "@/context/AuthContext";
import { clearCart, getCart, type CartItem } from "@/cases/cart/cart";
import { useEffect, useState } from "react";
import { OrderService } from "@/cases/orders/services/order-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  // Se não tem login, vamos criar pedido SEM customer
  const customerId = user?.id ?? null;

  async function handleConfirmOrder() {
    try {
      const orderPayload = {
        customerId: customerId, // se for null o backend precisa aceitar
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
          total: Number(i.product.price) * i.quantity,
        })),
        shipping: 0,
      };

      const order = await OrderService.create(orderPayload);

      toast.success("Pedido finalizado com sucesso!");

      clearCart();
      setItems([]);

      // redireciona após criar
      navigate("/orders");

    } catch (err) {
      console.error(err);
      toast.error("Erro ao finalizar pedido.");
    }
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
                <span className="font-semibold">{item.quantity} un.</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleConfirmOrder}
            className="mt-6 px-4 py-2 w-full bg-black text-white rounded hover:bg-gray-800"
          >
            Confirmar compra
          </button>
        </>
      )}
    </div>
  );
}
