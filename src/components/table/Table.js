import { ExelComponent } from '@core/ExelComponent';
import { $ } from '@core/dom';
import { matrix } from '@core/utils';
import { shouldResize, shouldSelect, nextSelection } from './table.helperFuncs';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';


export class Table extends ExelComponent {
  static className = 'excel__table';
  static rowsCount = 20;
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'click', 'input'],
      ...options,
    });
  }
  toHTML() {
    return createTable(Table.rowsCount);
  }

  prepare() {
    this.selection = new TableSelection(($cell) => {
      this.$emit('table:input', $cell.text());
    });
  }

  init() {
    super.init();

    const $firstCell = this.$root.query('[data-id = "0:0"]');
    this.selection.select($firstCell);

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  onMousedown(event) {
    if (event.which === 3) event.preventDefault();
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target).text());
  }

  onClick(event) {
    if (shouldSelect(event)) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const $cells = matrix( $target, this.selection.current)
            .map((id) => this.$root.query(`[data-id = "${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keyCodes = [13, 9, 37, 38, 39, 40];

    const {keyCode, shiftKey} = event;

    if (keyCodes.includes(keyCode) && !shiftKey) {
      event.preventDefault();
      const CODES = { A: 65, Z: 90 };

      const id = this.selection.current.id(true);
      const $next = this.$root.query(
          nextSelection(keyCode, id, Table.rowsCount - 1, CODES.Z - CODES.A)
      );
      this.selection.select($next);
    }
  }
}
