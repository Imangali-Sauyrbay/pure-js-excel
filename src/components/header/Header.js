import { ExcelComponent } from '@core/ExcelComponent';
import { changeTitle } from '@redux/actions';
import { defaultTitle } from '@/constants';
import { $ } from '@core/dom';
import { debounce } from '@core/utils';
import { ActiveRoute } from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput.bind(this));
  }
  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return /* html */ `
    <input type="text" class="input" value="${title}" />

    <div>
        <div class="button" data-button="delete">
          <span class="material-icons" data-button="delete">
              delete
          </span>
        </div>

        <div class="button" data-button="exit">
          <span class="material-icons" data-button="exit">
              exit_to_app
          </span>
        </div>
    </div>`;
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.button === 'delete') {
      const dicision = confirm('Are you sure you want to delete this?');
      if (dicision) {
        localStorage.removeItem('excel:'.concat(ActiveRoute.param));
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
