export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
};

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />

      <h3 className="font-bold text-lg mt-4">{product.name}</h3>

      <p className="text-gray-600 text-sm">{product.description}</p>

      <p className="text-lg font-semibold mt-2">
        R$ {product.price.toFixed(2)}
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
