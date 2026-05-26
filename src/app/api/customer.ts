import { apiFetch } from './auth';

export type PcCatalog = Record<string, { id: string; label: string; price: number }[]>;

export async function fetchPcBuilderCatalog(): Promise<{
  catalog: PcCatalog;
  slotOrder: string[];
}> {
  return apiFetch('/api/customer/pc-builder/catalog', {
    headers: { Accept: 'application/json' },
  });
}

export async function checkPcBuild(selection: Record<string, string>): Promise<Record<string, unknown>> {
  return apiFetch('/customer-pc-builder/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ selection }),
  });
}

export type ContactPayload = { name: string; email: string; subject: string; message: string };

export async function submitContact(payload: ContactPayload): Promise<{ message?: string }> {
  return apiFetch('/api/customer/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function checkoutCart(items: { productId: number; qty: number }[]) {
  return apiFetch('/api/customer/orders/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ items }),
  });
}

export async function fetchCustomerOrders() {
  const result = await apiFetch('/api/customer/orders', {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (result && result.items) {
    return result.items;
  }
  return [];
}
