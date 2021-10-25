import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';
import { $ } from '@core/dom';
import { defaultStyles } from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';
  constructor($root, options) {
    super($root, {
      name: 'ToolBar',
      listeners: ['click'],
      subscribes: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  get template() {
    return createToolbar(this.state);
  }
  toHTML() {
    return this.template;
  }

  onClick(event) {
    const $taret = $(event.target);
    if ($taret.data.type === 'button') {
      event.stopPropagation();

      const value = JSON.parse($taret.data.value);

      const key = Object.keys(value)[0];
      const style = value[key];

      let result;

      if (Array.isArray(this.state[key])) {
        let arr = [...this.state[key]];

        if (arr.includes(style)) {
          arr = arr.filter((el) => el !== style);
        } else {
          arr.push(style);
        }

        arr = arr.filter((el) => el !== 'none');
        result = {[key]: arr.join(' ') || 'none'};
      } else {
        result = {[key]: style};
      }

      this.$emit('toolbar:applyStyle', result);
    }
  }
}
