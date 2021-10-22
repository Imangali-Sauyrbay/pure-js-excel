import { DomListener } from '@core/DomListener';

export class ExelComponent extends DomListener {
  constructor($el, options = {}) {
    super($el, options.listeners);
    this.name = options.name || '';

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

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeEventListener();
    this.unsubs.forEach((unsub) => unsub());
  }
}
