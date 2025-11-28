import { useFavorites } from "@/hooks/useFavorites";
import { useRatings } from "@/hooks/useRatings";

export function ProductCard({ product, onAdd }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { rateProduct, getRating } = useRatings();

  const rating = getRating(product.id);

  return (
    <div
      className="border rounded-lg p-3 shadow-sm flex flex-col gap-2"
      style={{ position: "relative", zIndex: 1 }}
    >
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
        style={{ pointerEvents: "none" }} // evita bloquear clique
      />

      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-green-700 font-bold">
        R$ {Number(product.price).toFixed(2)}
      </p>

      {/* Botão adicionar ao carrinho */}
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        onClick={() => onAdd(product)}
        style={{ position: "relative", zIndex: 10 }}
      >
        Adicionar ao Carrinho
      </button>

      {/* Favoritar */}
      <button
        className="text-sm text-gray-600 flex items-center gap-1"
        onClick={() => toggleFavorite(product.id)}
        style={{ position: "relative", zIndex: 10 }}
      >
        {isFavorite(product.id) ? "💚 Favorito" : "🤍 Favoritar"}
      </button>

      {/* Estrelas */}
      <div
        className="flex gap-1 mt-1"
        style={{ position: "relative", zIndex: 20 }}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => rateProduct(product.id, star)}
            className="cursor-pointer text-xl"
            style={{
              color: star <= rating ? "#f5c518" : "#ccc",
              position: "relative",
              zIndex: 30,
            }}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}
