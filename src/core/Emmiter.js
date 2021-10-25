export class Emmiter {
  constructor() {
    this.listeners = {};
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      console.warn(`Event ${event} subscribers does not exist!`);
    }

    (this.listeners[event] || []).forEach((ls) => {
      ls(...args);
    });
  }

  subscribe(event, listener) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(listener);

    return () => {
      this.listeners[event].filter((ls) => ls !== listener);
    };
  }
}
