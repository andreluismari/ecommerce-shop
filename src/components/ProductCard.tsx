import { Product } from "@/cases/products/product-types";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const priceNumber = Number(product.price) || 0;

  return (
    <div className="border p-4 rounded-lg shadow-sm flex flex-col">
      <div className="w-full min-h-48 h-48 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        <img
          src={
            product.image_url?.trim()
              ? product.image_url
              : "https://via.placeholder.com/300x300?text=Sem+Imagem"
          }
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <h3 className="font-bold text-lg mt-4">{product.name}</h3>

      <p className="text-gray-600 text-sm">{product.description}</p>

      <p className="text-lg font-semibold mt-2">R$ {priceNumber.toFixed(2)}</p>

      <button
        className="bg-black text-white px-3 py-2 rounded mt-4 w-full"
        onClick={() => onAdd(product)}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
