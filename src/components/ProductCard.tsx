export type Product = {
  id: string;
  name: string;
  price: number | string; // 🔥 Aceita string porque vem do banco como string
  description: string;
  image_url?: string; // 🔥 Evita erro caso não exista imagem no banco
};

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  // 🔥 Converte preço para número de forma segura
  const priceNumber =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <img
        src={product.image_url || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />

      <h3 className="font-bold text-lg mt-4">{product.name}</h3>

      <p className="text-gray-600 text-sm">{product.description}</p>

      <p className="text-lg font-semibold mt-2">
        R$ {priceNumber.toFixed(2)}
      </p>

      <button
        className="bg-black text-white px-3 py-1 rounded mt-3 w-full"
        onClick={() => onAdd(product)}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
