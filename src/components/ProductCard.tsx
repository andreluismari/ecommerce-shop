interface ProductCardProps {
  product: any;
  onAddToCart: (p: any) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition p-4 flex flex-col">
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />

      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-1 flex-1">
        {product.description}
      </p>

      <div className="mt-4 flex flex-col gap-2">
        <span className="font-bold text-xl text-green-600">
          R$ {product.price?.toFixed(2)}
        </span>

        <button
          className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          onClick={() => onAddToCart(product)}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};
