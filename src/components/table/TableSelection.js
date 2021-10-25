import { parse } from '@core/parse';
import { findByIdInState } from './table.helperFuncs';

export class TableSelection {
  static className = 'selected';

  constructor(options = {}) {
    this.group = [];
    this.current = {id() {}};

    this.onSelected = options.onSelected || Function.prototype;
    this.$root = options.root || {};

    this.init();
  }

  get selectedIds() {
    return this.group.map(($el)=> $el.id());
  }

  init() {
    this.getCellValue = this.getCellValue.bind(this);
  }

  select($el) {
    if (this.current.id() === $el.id()) return;
    this.clear();
    this.current = $el;
    this.group.push($el);
    $el.addClass(TableSelection.className).focus();
    this.setValue();
    this.onSelected($el);
    return this;
  }

  clear() {
    this.group.forEach(($el) => {
      $el.removeClass(TableSelection.className);
      $el.text(parse($el.data.value, $el.id(), this.getCellValue));
    });
    this.group = [];
  }

  getCellValue(id) {
    return this.getCell(id).text() || 0;
  }

  getCell(id) {
    return this.$root.query(`[data-id = "${id}"]`);
  }

  setValue() {
    this.group.forEach(($el) => $el.text($el.data.value));
  }

  reParse(store) {
    Object.keys(store).forEach((key) => {
      if (this.selectedIds.includes(key)) return;
      const $cell = this.getCell(key);
      const value = parse(store[key], key, findByIdInState(store));
      $cell.text() !== value ? $cell.text(value) : null;
    });
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach(($el) => $el.addClass(TableSelection.className));
    this.setValue();
    return this;
  }

  applyStyle(style) {
    this.group.forEach(($el) => $el.css(style));
    return this;
  }

  setText(text = '') {
    this.group.forEach(($el) => $el.text(text));
    return this;
  }

  setAttr(name, value) {
    const method = value === '' ? 'removeAttr' : 'attr';
    this.group.forEach(($el) => $el[method](name, value));
    return this;
  }
}
