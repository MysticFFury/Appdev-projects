import { NativeModules, Platform } from 'react-native';

function getDevServerHost() {
  const scriptURL = NativeModules?.SourceCode?.scriptURL;
  if (!scriptURL || typeof scriptURL !== 'string') return null;

  // Example: http://192.168.1.5:8081/index.bundle?platform=android
  const match = scriptURL.match(/https?:\/\/([^/:]+)(?::\d+)?\//);
  return match?.[1] ?? null;
}

export function getApiBaseUrl() {
  // Manual override (put this in App.js for quick testing):
  // global.GEARGRID_API_BASE_URL = 'http://192.168.1.5:8000';
  const manual = global?.GEARGRID_API_BASE_URL;
  if (typeof manual === 'string' && manual.startsWith('http')) return manual;

  // Prefer the same host serving Metro (works on real devices + LAN).
  const host = getDevServerHost();
  if (host) return `http://${host}:8000`;

  // Fallbacks when scriptURL isn't available.
  // - Android emulator: 10.0.2.2 points to your PC
  // - Real Android phone: prefer Metro host, or use Wi‑Fi LAN IP, or use adb reverse
  if (Platform.OS === 'android') return 'http://10.0.2.2:8000';
  return 'http://127.0.0.1:8000';
}

export async function apiFetch(path, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url =
    typeof path === 'string' && path.startsWith('http')
      ? path
      : `${baseUrl}${String(path).startsWith('/') ? '' : '/'}${path}`;

  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? 20000;
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
          `If you're on a real Android phone over USB, run "adb reverse tcp:8000 tcp:8000" ` +
          `so 127.0.0.1:8000 on the phone points to your PC. ` +
          `On Wi‑Fi, use your PC's LAN IP instead of localhost.`
      );
    }

    if (err?.name === 'AbortError' || message === 'Aborted' || message.toLowerCase().includes('aborted')) {
      throw new Error(`Request timeout: backend did not respond from ${url}.`);
    }

    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

