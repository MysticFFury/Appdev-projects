import AsyncStorage from './storage';
import { CartLine } from '../types/product.types';
import { formatPeso } from '../app/api/products';

export const CART_STORAGE_KEY = 'geargrid_cart_v1';

export async function loadCart(): Promise<CartLine[]> {
  try {
    const raw = await AsyncStorage.getItem(CART_STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function saveCart(lines: CartLine[]): Promise<void> {
  await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
}

export async function getCartCount(): Promise<number> {
  const lines = await loadCart();
  return lines.reduce((sum, line) => sum + (Number(line.qty) || 0), 0);
}

export async function addToCart(
  productId: number,
  name: string,
  priceNum: number,
  qty = 1,
): Promise<CartLine[]> {
  const lines = await loadCart();
  const id = Number(productId);
  const q = Math.max(1, Number(qty) || 1);
  const priceLabel = formatPeso(priceNum);
  let found = false;
  const next = lines.map((line) => {
    if (Number(line.productId) === id) {
      found = true;
      return { ...line, qty: line.qty + q };
    }
    return line;
  });
  if (!found) next.push({ productId: id, name, priceNum, qty: q, price: priceLabel });
  await saveCart(next);
  return next;
}
