import { ExelComponent } from '@core/ExelComponent';

export class Formula extends ExelComponent {
  static className = 'excel__formula';
  constructor($el) {
    super($el, {
      name: 'Formula',
      listeners: [],
    });
  }
  toHTML() {
    return `
    <div class="info"></div>
    <div class="input" contenteditable spellcheck="false"></div>`;
  }
}
