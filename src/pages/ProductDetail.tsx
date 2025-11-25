import { useParams } from "react-router-dom";
import { useProductDetail } from "@/cases/products/hooks/use-product-detail";
import { addToCart } from "@/cases/cart/cart";

export function ProductDetail() {
  const { id } = useParams();
  const { product, loading } = useProductDetail(id);

  if (loading) return <p className="text-gray-500">Carregando...</p>;
  if (!product) return <p className="text-red-500">Produto não encontrado.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <img
        src={product.image || "https://via.placeholder.com/500"}
        alt={product.name}
        className="w-full rounded-xl shadow"
      />

      <div>
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

        <p className="text-gray-600 mb-6">{product.description}</p>

        <span className="text-3xl font-bold text-green-600">
          R$ {product.price?.toFixed(2)}
        </span>

        <button
          className="block mt-6 bg-black text-white py-3 px-6 rounded-md text-lg hover:bg-gray-800 transition"
          onClick={() => addToCart(product)}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
