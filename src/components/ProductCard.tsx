import { FC } from "react";

export const ProductCard: FC<any> = ({ product, onAdd }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>

      <button
        className="bg-black text-white px-3 py-1 rounded mt-2"
        onClick={() => onAdd(product)}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
};
