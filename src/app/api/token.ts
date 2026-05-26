import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStoredAuthToken(): Promise<string | null> {
  try {
    const raw = await AsyncStorage.getItem('userToken');
    if (!raw) return null;
    
    if (raw.startsWith('ey')) {
      return raw;
    }
    
    try {
      const parsed = JSON.parse(raw);
      return parsed?.token ?? parsed?.data?.token ?? null;
    } catch {
      return raw;
    }
  } catch {
    return null;
  }
}

export async function getStoredAuthPayload(): Promise<Record<string, unknown> | null> {
  try {
    const raw = await AsyncStorage.getItem('userToken');
    if (!raw) return null;
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}
