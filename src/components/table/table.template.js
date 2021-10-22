const CODES = {
  A: 65,
  Z: 90,
};

function toCell(row) {
  return function(content, col) {
    return /* html */`
    <div class="cell"
    contenteditable
    data-type="cell"
    data-col = "${col}"
    data-id = "${row}:${col}">
    ${content}
    </div>`;
  };
}

function toColumn(col, idx) {
  return /* html */`<div class="column" data-type="resizable" data-col = ${idx}>
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>`;
}

function createRow(content, number = '') {
  const resizer = number ? '<div class="row-resize" data-resize="row"></div>' : '';
  return /* html */ `
  <div class="row" data-type="resizable">
    <div class="row-info">
    ${number}
    ${resizer}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `;
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;

  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join(' ');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join(' ');

    rows.push(createRow(cells, row + 1));
  }

  return rows.join(' ');
}
