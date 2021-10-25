import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribes: ['currentText'],
      ...options,
    });
  }
  toHTML() {
    return `
    <div class="info"></div>
    <div id = "formula" class="input" contenteditable spellcheck="false"></div>`;
  }

  init() {
    super.init();

    this.$formula = this.$root.query('#formula');

    this.$on('table:select', (text) => {
      this.$formula.text(text);
    });
  }

  storeChanged(store) {
    this.$formula.text(store.currentText);
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keyCodes = [13, 9];
    if (keyCodes.includes(event.keyCode)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
