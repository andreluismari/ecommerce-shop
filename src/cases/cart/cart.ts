export type CartItem = {
  product: any;
  quantity: number;
};

const CART_KEY = "ecommerce_cart";

export function getCart(): CartItem[] {
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: any) {
  const cart = getCart();

  const existing = cart.find((i) => i.product.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number) {
  const cart = getCart();

  const item = cart.find((i) => i.product.id === productId);
  if (!item) return;

  item.quantity = quantity;

  saveCart(cart);
}

export function removeFromCart(productId: string) {
  let cart = getCart();
  cart = cart.filter((i) => i.product.id !== productId);
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
