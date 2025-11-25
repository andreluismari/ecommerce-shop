import type { ProductDTO } from "../products/dtos/product.dto";

const CART_KEY = "cart-items";

export function getCart(): ProductDTO[] {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

export function addToCart(product: ProductDTO) {
  const cart = getCart();
  cart.push(product);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function removeFromCart(id: string) {
  const cart = getCart().filter(p => p.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
