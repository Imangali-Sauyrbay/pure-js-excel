import { defaultStyles } from '@/constants';
import { toInlineStyles} from '@core/utils';
import { parse } from '@core/parse';
import { findByIdInState } from './table.helperFuncs';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return ( state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return ( state[index] || DEFAULT_HEIGHT) + 'px';
}

function createRow(content, number = '', state) {
  const resizer = number ?
  '<div class="row-resize" data-resize="row"></div>'
  : '';
  const select = number ?
  '<div class="select-line" data-select="row">+</div>'
  : '';

  const dataRow = number ? `data-row="${number - 1}"` : '';

  const styleHeight = number ? `style="height: ${getHeight(state, number - 1)}"` : '';

  return /* html */ `
  <div class="row"
  data-type="resizable"
  ${dataRow}
  ${styleHeight}>
    <div class="row-info">
    ${select}
    ${number}
    ${resizer}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `;
}

function toCell(row, state) {
  return function(val, col) {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const content = state.dataState[id] || '';
    const style = toInlineStyles({...defaultStyles, ...state.stylesState[id]});
    return /* html */`
    <div class="cell"
    contenteditable
    data-type="cell"
    data-col = "${col}"
    data-id = "${id}"
    data-value="${content}"
    style="width: ${width}; ${style}">
    ${parse(content, id, findByIdInState(state.dataState))}
    </div>`;
  };
}

function toColumn({col, index, width}) {
  return /* html */`<div class="column"
  data-type="resizable"
  data-col = ${index}
  style="width: ${width}">
    <div class="select-line" data-select="col">+</div>
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>`;
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx);
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;

  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join(' ');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join(' ');

    rows.push(createRow(cells, row + 1, state.rowState));
  }

  return rows.join(' ');
}
