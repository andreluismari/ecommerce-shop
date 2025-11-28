// src/pages/Orders.tsx
import { useAuth } from "../context/AuthContext";
import { useOrders } from "@/cases/orders/services/use-orders";

export function Orders() {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const { data: orders = [], isLoading } = useOrders(userId);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Meus Pedidos</h1>

      {isLoading && <p>Carregando pedidos...</p>}

      {!isLoading && orders.length === 0 && (
        <p className="text-gray-600">Você ainda não realizou nenhum pedido.</p>
      )}

      <div className="flex flex-col gap-4 mt-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold">
              Pedido #{order.id.slice(0, 8)}
            </h2>

            <p className="text-sm mt-1 text-gray-700">
              <strong>Status:</strong> {order.status}
            </p>

            <p className="text-sm text-gray-700">
              <strong>Total:</strong> R$ {Number(order.total).toFixed(2)}
            </p>

            <p className="text-sm text-gray-700">
              <strong>Data:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="mt-3">
              <strong className="text-sm">Itens:</strong>
              <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product?.name} — {item.quantity}x (R$ {item.total})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
