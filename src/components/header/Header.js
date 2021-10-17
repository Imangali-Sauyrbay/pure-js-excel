import { ExelComponent } from '@core/ExelComponent';

export class Header extends ExelComponent {
  static className = 'excel__header';
  toHTML() {
    return `
    <input type="text" class="input" value="Новая Таблица" />

    <div>
        <div class="button"><span class="material-icons">
            delete
        </span></div>

        <div class="button"><span class="material-icons">
            exit_to_app
        </span></div>
    </div>`;
  }
}