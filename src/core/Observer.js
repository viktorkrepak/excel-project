export class Observer {
  constructor() {
    this.listeners = {};
  }
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) return false;
    for (const listener of this.listeners[eventName]) {
      listener(...args);
    }
  }

  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter(
        listener => listener !== fn
      );
    };
  }
}

