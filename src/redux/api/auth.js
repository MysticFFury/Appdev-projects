import { loginApi } from '../../api/authApi';

// Wrap the real API call into an instructor-style response shape.
export async function UserLogin(credentials) {
  try {
    const data = await loginApi(credentials);
    const token = data?.token ?? data?.access_token ?? data?.jwt ?? null;
    const normalizedData =
      token && data && typeof data === 'object' ? { ...data, token } : data;

    return { ok: true, data: normalizedData, token };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}

