import { NativeModules } from 'react-native';

const { SharedStorage } = NativeModules;
const memoryStorage = new Map<string, string>();

const AsyncStorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (SharedStorage) {
      try {
        return await SharedStorage.getItem(key);
      } catch (err) {
        console.warn('Error reading from SharedStorage:', err);
      }
    }
    return memoryStorage.get(key) || null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (SharedStorage) {
      try {
        await SharedStorage.setItem(key, value);
        return;
      } catch (err) {
        console.warn('Error writing to SharedStorage:', err);
      }
    }
    memoryStorage.set(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    if (SharedStorage) {
      try {
        await SharedStorage.removeItem(key);
        return;
      } catch (err) {
        console.warn('Error removing from SharedStorage:', err);
      }
    }
    memoryStorage.delete(key);
  },
  clear: async (): Promise<void> => {
    if (SharedStorage) {
      try {
        await SharedStorage.clear();
        return;
      } catch (err) {
        console.warn('Error clearing SharedStorage:', err);
      }
    }
    memoryStorage.clear();
  }
};

export default AsyncStorage;
