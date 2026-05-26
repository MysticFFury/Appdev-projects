import { apiFetch, getApiBaseUrl } from './auth';
import {
  AdminCategory,
  AdminDashboard,
  AdminLog,
  AdminOrder,
  AdminProduct,
  AdminStockMovement,
  AdminUser,
} from '../../types/admin.types';

export { getApiBaseUrl };

export async function fetchAdminDashboard(): Promise<AdminDashboard> {
  return apiFetch('/api/admin/dashboard');
}

export async function fetchAdminProducts(): Promise<AdminProduct[]> {
  const data = await apiFetch<{ items: AdminProduct[] }>('/api/admin/products');
  return data.items ?? [];
}

export async function fetchAdminProduct(id: number): Promise<AdminProduct> {
  return apiFetch(`/api/admin/products/${id}`);
}

export async function saveAdminProduct(
  payload: Partial<AdminProduct> & { categoryId?: number },
  id?: number,
): Promise<AdminProduct> {
  if (id) {
    return apiFetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
  return apiFetch('/api/admin/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminProduct(id: number): Promise<void> {
  await apiFetch(`/api/admin/products/${id}`, { method: 'DELETE' });
}

export async function fetchAdminCategories(): Promise<AdminCategory[]> {
  const data = await apiFetch<{ items: AdminCategory[] }>('/api/admin/categories');
  return data.items ?? [];
}

export async function saveAdminCategory(
  payload: { name: string; description?: string },
  id?: number,
): Promise<AdminCategory> {
  if (id) {
    return apiFetch(`/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
  return apiFetch('/api/admin/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminCategory(id: number): Promise<void> {
  await apiFetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
}

export async function fetchAdminOrders(): Promise<{ items: AdminOrder[]; statuses: string[] }> {
  return apiFetch('/api/admin/orders');
}

export async function fetchAdminOrder(id: number): Promise<{ order: AdminOrder; statuses: string[] }> {
  return apiFetch(`/api/admin/orders/${id}`);
}

export async function updateAdminOrderStatus(id: number, status: string): Promise<AdminOrder> {
  return apiFetch(`/api/admin/orders/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
}

export async function deleteAdminOrder(id: number): Promise<void> {
  await apiFetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
}

export async function fetchAdminStock(): Promise<AdminStockMovement[]> {
  const data = await apiFetch<{ items: AdminStockMovement[] }>('/api/admin/stock');
  return data.items ?? [];
}

export async function addAdminStock(productId: number, amount: number): Promise<AdminStockMovement> {
  return apiFetch('/api/admin/stock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, amount }),
  });
}

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  const data = await apiFetch<{ items: AdminUser[] }>('/api/admin/users');
  return data.items ?? [];
}

export async function saveAdminUser(
  payload: {
    name: string;
    email: string;
    password?: string;
    roles: string[];
    isActive?: boolean;
  },
  id?: number,
): Promise<AdminUser> {
  if (id) {
    return apiFetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
  return apiFetch('/api/admin/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function toggleAdminUser(id: number): Promise<AdminUser> {
  return apiFetch(`/api/admin/users/${id}/toggle`, { method: 'POST' });
}

export async function fetchAdminLogs(): Promise<AdminLog[]> {
  const data = await apiFetch<{ items: AdminLog[] }>('/api/admin/logs');
  return data.items ?? [];
}

export function formatPeso(amount: number): string {
  return `₱${Number(amount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getProductImageUrl(image: string | null | undefined): string {
  if (!image) return 'https://via.placeholder.com/120x80?text=No+Image';
  if (image.startsWith('http')) return image;
  return `${getApiBaseUrl().replace(/\/$/, '')}/uploads/products/${image}`;
}
