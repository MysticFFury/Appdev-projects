import { apiFetch, getApiBaseUrl } from './auth';
import { Product, ProductCategory } from '../../types/product.types';

function normalizeCategory(raw: unknown): ProductCategory | null {
  if (!raw) return null;
  if (typeof raw === 'string') return { name: raw.split('/').pop() || raw };
  if (typeof raw === 'object' && raw !== null) {
    const o = raw as Record<string, unknown>;
    return {
      id: typeof o.id === 'number' ? o.id : undefined,
      name: typeof o.name === 'string' ? o.name : undefined,
    };
  }
  return null;
}

function normalizeProduct(raw: Record<string, unknown>): Product {
  return {
    id: Number(raw.id),
    name: String(raw.name ?? 'Unnamed'),
    price: Number(raw.price ?? 0),
    quantity: Number(raw.quantity ?? 0),
    description: (raw.description as string) ?? null,
    image: (raw.image as string) ?? null,
    category: normalizeCategory(raw.category),
  };
}

function unwrapCollection(data: unknown): Record<string, unknown>[] {
  if (!data) return [];
  if (Array.isArray(data)) return data as Record<string, unknown>[];
  const obj = data as Record<string, unknown>;
  if (Array.isArray(obj['hydra:member'])) return obj['hydra:member'] as Record<string, unknown>[];
  if (Array.isArray(obj.member)) return obj.member as Record<string, unknown>[];
  return [];
}

export async function fetchProducts(): Promise<Product[]> {
  let allProducts: Record<string, unknown>[] = [];
  let nextUrl: string | undefined = '/api/products';

  while (nextUrl) {
    const data: unknown = await apiFetch(nextUrl, {
      headers: { Accept: 'application/ld+json' },
    });
    
    allProducts = [...allProducts, ...unwrapCollection(data)];
    
    const view = (data as any)['hydra:view'] || (data as any)['view'];
    nextUrl = view && (view['hydra:next'] || view['next']) ? (view['hydra:next'] || view['next']) : undefined;
  }

  return allProducts.map(normalizeProduct);
}

export function getProductImageUrl(image: string | null | undefined): string {
  if (!image) return 'https://via.placeholder.com/600x400?text=No+Image';
  if (image.startsWith('http')) return image;
  return `${getApiBaseUrl().replace(/\/$/, '')}/uploads/products/${image}`;
}

export function formatPeso(price: number): string {
  return `₱${price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getCategoryName(product: Product): string {
  if (!product.category) return 'Uncategorized';
  if (typeof product.category === 'string') return product.category;
  return product.category.name || 'Uncategorized';
}
