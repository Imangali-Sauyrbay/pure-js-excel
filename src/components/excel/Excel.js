import { $ } from '@core/dom';
import { Emmiter } from '@core/Emmiter';
import { StoreSubscriber } from '@core/StoreSubscriber';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store || {};
    this.emmiter = new Emmiter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const compOptions = {
      emmiter: this.emmiter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);

      const component = new Component($el, compOptions);
      $root.append($el.html(component.toHTML()));
      return component;
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((comp) => comp.init());
  }

  destroy() {
    this.subscriber.unsubscribeComponents();
    this.components.forEach((comp) => comp.destroy());
  }
}
