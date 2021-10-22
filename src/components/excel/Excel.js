import { $ } from '@core/dom';
import { Emmiter } from '@core/Emmiter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];

    this.emmiter = new Emmiter();
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const compOptions = {emmiter: this.emmiter};

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

    this.components.forEach((comp) => comp.init());
  }

  destroy() {
    this.components.forEach((comp) => comp.destroy());
  }
}
