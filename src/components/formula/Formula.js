import { ExelComponent } from '@core/ExelComponent';
import { $ } from '@core/dom';

export class Formula extends ExelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
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

    this.$on('table:input', (text) => {
      this.$formula.text(text);
    });
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
