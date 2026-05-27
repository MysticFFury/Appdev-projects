const memoryStorage = new Map<string, string>();

const AsyncStorage = {
  getItem: async (key: string): Promise<string | null> => {
    return memoryStorage.get(key) || null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    memoryStorage.set(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    memoryStorage.delete(key);
  },
  clear: async (): Promise<void> => {
    memoryStorage.clear();
  }
};

export default AsyncStorage;
