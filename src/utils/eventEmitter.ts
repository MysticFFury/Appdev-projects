type Listener = (...args: any[]) => void;

class SimpleEventEmitter {
  private listeners: { [event: string]: Listener[] } = {};

  on(event: string, listener: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
    return () => this.off(event, listener);
  }

  off(event: string, listener: Listener) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(l => l !== listener);
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(listener => {
      try {
        listener(...args);
      } catch (err) {
        console.error(`Error in event listener for ${event}:`, err);
      }
    });
  }
}

export const appEvents = new SimpleEventEmitter();
