import { parse } from '@core/parse';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function shouldSelect(event) {
  return event.target.dataset.type === 'cell';
}

export function shouldSelectLine(event) {
  return event.target.dataset.select;
}

export function nextSelection(keyCode, {row, col}, MAX_ROW = 19, MAX_COL = 25) {
  const MIN_VAL = 0;

  switch (keyCode) {
    case 13:
    case 40:
      row++;
      row = row > MAX_ROW ? MAX_ROW : row;
      break;
    case 9:
    case 39:
      col++;
      col = col > MAX_COL ? MAX_COL : col;
      break;
    case 37:
      col--;
      col = col >= MIN_VAL ? col : MIN_VAL;
      break;
    case 38:
      row--;
      row = row >= MIN_VAL ? row : MIN_VAL;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}

export function findByIdInState(state) {
  return function getVal(id, ids) {
    return parse(state[id], ids, getVal) || 0;
  };
}
