export class TableSelection {
  static className = 'selected';

  constructor(cb = Function.prototype) {
    this.group = [];
    this.current = null;

    this.onSelected = cb;
  }

  select($el) {
    this.clear();
    this.current = $el;
    this.group.push($el);
    $el.addClass(TableSelection.className).focus();
    this.onSelected($el);
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach(($el) => $el.addClass(TableSelection.className));
  }
}
