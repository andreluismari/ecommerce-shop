import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

interface Props {
  product: ProductDTO;
  onAddToCart?: (product: ProductDTO) => void;
}

export function ProductCard({ product, onAddToCart }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </Link>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <Link to={`/product/${product.id}`} className="w-full">
          <h3 className="text-lg font-semibold hover:underline">
            {product.name}
          </h3>
        </Link>

        <p className="text-xl font-bold">R$ {product.price.toFixed(2)}</p>

        <Button
          className="mt-2 w-full"
          onClick={() => onAddToCart?.(product)}
        >
          Adicionar ao carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}
