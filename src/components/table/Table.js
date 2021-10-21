import { ExelComponent } from '@core/ExelComponent';
import { shouldResize } from './table.helperFuncs';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';


export class Table extends ExelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }
  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
