import { DomListener } from '@core/DomListener';

export class ExelComponent extends DomListener {
  constructor($el, options = {}) {
    super($el, options.listeners);
    this.name = options.name || '';
  }
  toHTML() {
    return '';
  }
  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeEventListener();
  }
}
