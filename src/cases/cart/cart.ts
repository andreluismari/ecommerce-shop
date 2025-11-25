// src/cases/cart/cart.ts

export interface CartProduct {
  id: number | string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  [key: string]: any; // caso venha mais coisa da API
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

const STORAGE_KEY = "ecommerce_cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function getCart(): CartItem[] {
  return loadCart();
}

export function addToCart(product: CartProduct) {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.product.id === product.id);

  if (index >= 0) {
    cart[index].quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(productId: CartProduct["id"]) {
  const cart = loadCart().filter((item) => item.product.id !== productId);
  saveCart(cart);
}

export function updateQuantity(productId: CartProduct["id"], quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = loadCart();
  const index = cart.findIndex((item) => item.product.id === productId);
  if (index >= 0) {
    cart[index].quantity = quantity;
    saveCart(cart);
  }
}

export function clearCart() {
  saveCart([]);
}
