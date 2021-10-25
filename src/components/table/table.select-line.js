import { $ } from '@core/dom';
import { Table } from './Table';

export function getLine($root, event) {
  const $target = $(event.target);
  const $parent = $target.closest('[data-type="resizable"]');

  const type = $target.data.select;
  const id = $parent.data[type];
  const group = type === 'col' ? 'row' : 'col';
  const $cells = new Array(Table[group.concat('sCount')])
      .fill('')
      .map((_, index) => {
        return type === 'row' ?
        `${id}:${index}`
        : `${index}:${id}`;
      })
      .map((id) => $root.query(`[data-id = "${id}"]`));
  return $cells;
}
