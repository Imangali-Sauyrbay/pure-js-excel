import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { matrix } from '@core/utils';
import * as actions from '@redux/actions';
import { shouldResize,
  shouldSelect,
  nextSelection,
  shouldSelectLine } from './table.helperFuncs';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';
import { defaultStyles } from '@/constants';
import { getLine } from './table.select-line';


export class Table extends ExcelComponent {
  static className = 'excel__table';
  static rowsCount = 20;
  static colsCount = 'Z'.charCodeAt() - 'A'.charCodeAt() + 1;
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'click', 'input'],
      subscribes: ['dataState'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection({
      root: this.$root,
      onSelected: ($cell) => {
        this.$emit('table:select', $cell.data.value || $cell.text());
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.$dispatch(actions.changeStyles(styles));
      },
    });
  }

  init() {
    super.init();

    const $firstCell = this.$root.query('[data-id = "0:0"]');
    this.selection.select($firstCell);

    this.$on('formula:input', this.onInput.bind(this));

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  toHTML() {
    return createTable(Table.rowsCount, this.store.getState());
  }

  storeChanged({dataState}) {
    this.selection.reParse(dataState);
  }

  async tableResize(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (err) {
      console.error('Resize error', err.message);
    }
  }

  updateTextInStore(id, value) {
    this.$dispatch(actions.changeText({
      id,
      value,
    }));
  }

  onMousedown(event) {
    if (event.which === 3) event.preventDefault();
    if (shouldResize(event)) {
      this.tableResize(event);
    }
  }

  onInput(event) {
    let text = '';
    if (typeof event === 'string') {
      text = event;
      this.selection.setText(text);
    } else {
      text = $(event.target).text();
    }

    this.selection.setAttr('data-value', text);
    this.updateTextInStore(this.selection.selectedIds, text);
  }

  onClick(event) {
    event.stopPropagation();
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

    if (shouldSelectLine(event)) {
      const $cells = getLine(this.$root, event);
      this.selection.current = $cells[0];
      this.selection.selectGroup($cells);
    }
  }

  onKeydown(event) {
    const keyCodes = [13, 9, 37, 38, 39, 40];

    const {keyCode, shiftKey} = event;

    if (keyCodes.includes(keyCode) && !shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$root.query(
          nextSelection(keyCode, id, Table.rowsCount - 1, Table.colsCount)
      );
      this.selection.select($next);
    }
  }
}
