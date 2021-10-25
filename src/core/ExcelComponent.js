import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($el, options = {}) {
    super($el, options.listeners);
    this.name = options.name || null;
    this.subscribes = options.subscribes || [];
    this.store = options.store;
    this.emmiter = options.emmiter;
    this.unsubs = [];

    this.prepare();
  }

  prepare() {}

  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emmiter.emit(event, ...args);
  }

  $on(event, listener) {
    const unsub = this.emmiter.subscribe(event, listener);
    this.unsubs.push(unsub);
  }

  $dispatch(action) {
    if (typeof action === 'function') {
      action(this.store.dispatch, this.store.getState);
    } else {
      this.store.dispatch(action);
    }
  }

  storeChanged() {}

  isWathcing(key) {
    return this.subscribes.includes(key);
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeEventListener();
    this.unsubs.forEach((unsub) => unsub());
  }
}
