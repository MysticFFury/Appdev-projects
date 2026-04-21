import { NativeModules, Platform } from 'react-native';

function getDevServerHost() {
  const scriptURL = NativeModules?.SourceCode?.scriptURL;
  if (!scriptURL || typeof scriptURL !== 'string') return null;

  // Example: http://192.168.1.5:8081/index.bundle?platform=android
  const match = scriptURL.match(/https?:\/\/([^/:]+)(?::\d+)?\//);
  return match?.[1] ?? null;
}

function isProbablyAndroidEmulator() {
  if (Platform.OS !== 'android') return false;
  const pc = NativeModules?.PlatformConstants ?? {};
  const fingerprint = String(pc.Fingerprint ?? pc.fingerprint ?? '').toLowerCase();
  const model = String(pc.Model ?? pc.model ?? '').toLowerCase();
  const brand = String(pc.Brand ?? pc.brand ?? '').toLowerCase();
  const manufacturer = String(pc.Manufacturer ?? pc.manufacturer ?? '').toLowerCase();

  return (
    fingerprint.includes('generic') ||
    fingerprint.includes('emulator') ||
    model.includes('sdk') ||
    model.includes('emulator') ||
    brand.includes('generic') ||
    manufacturer.includes('genymotion') ||
    manufacturer.includes('unknown')
  );
}

export function getApiBaseUrl() {
  // Prefer the same host serving Metro (works on real devices + LAN).
  const host = getDevServerHost();
  if (host) return `http://${host}:8000`;

  // Fallbacks when scriptURL isn't available.
  // Android emulator: 10.0.2.2 points to your PC's localhost.
  // Real Android device over USB: use adb reverse so 127.0.0.1:8000 on the phone maps to your PC.
  if (Platform.OS === 'android') {
    return isProbablyAndroidEmulator() ? 'http://10.0.2.2:8000' : 'http://127.0.0.1:8000';
  }
  return 'http://127.0.0.1:8000'; // iOS simulator / desktop
}

export async function apiFetch(path, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url =
    typeof path === 'string' && path.startsWith('http')
      ? path
      : `${baseUrl}${String(path).startsWith('/') ? '' : '/'}${path}`;

  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? 30000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!res.ok) {
      const message =
        (data && typeof data === 'object' && data.message) ||
        (data && typeof data === 'object' && data.detail) ||
        (typeof data === 'string' && data) ||
        `Request failed (${res.status})`;
      throw new Error(message);
    }

    return data;
  } catch (err) {
    const message = err?.message || String(err);

    if (message === 'Network request failed' || message === 'Failed to fetch') {
      throw new Error(
        `SERVER OFFLINE: Cannot reach backend at ${baseUrl}. ` +
          `If you're on Android emulator, use 10.0.2.2:8000. ` +
          `If you're on a real Android phone over USB, run "adb reverse tcp:8000 tcp:8000". ` +
          `On Wi‑Fi, use your PC's LAN IP (not localhost).`
      );
    }

    if (message === 'Aborted' || message.toLowerCase().includes('aborted')) {
      throw new Error(
        `Request timeout: backend did not respond from ${baseUrl}. ` +
          `This usually means the server isn't running, the host/port is wrong, or the device can't reach your PC.`
      );
    }

    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function loginApi({ username, password, timeoutMs } = {}) {
  if (!username || !password) {
    throw new Error('Email and password are required.');
  }

  return apiFetch('/api/login', {
    timeoutMs: timeoutMs ?? 35000,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
}