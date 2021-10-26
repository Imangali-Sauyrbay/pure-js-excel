import { Table } from '@components/table/Table';

const ERROR_MESSGE = 'Parsing error';

export function parse(text, currentId = [], getValue) {
  if (typeof text !== 'string') return text;
  if (text.startsWith('=')) {
    text = text.slice(1);

    while (isNaN(text.charAt(text.length - 1)) || text.charAt(text.length - 1) === ' ') {
      text = text.slice(0, -1);
    }

    currentId.forEach(
        (id) => {
          const val = getValueFromId(id);
          const regex = new RegExp(`${val}(?!\\d)`);
          text = text.replace(regex, 'null');
        }
    );

    if (isContainNull(text, ERROR_MESSGE)) return ERROR_MESSGE;

    text = text.replace(/([A-Z][0-9]+)/g, (id) => {
      if (id.slice(1) === '0' || id.slice(1) > Table.rowsCount) return null;

      const nextId = toId(id);
      currentId.push(nextId);

      const val = String(getValue(nextId, currentId));
      return val.startsWith('=') ? val.splice(1) : val;
    });

    if (isContainNull(text, ERROR_MESSGE)) return ERROR_MESSGE;

    try {
      return eval(text);
    } catch (err) {
      return err.message;
    }
  }

  return text;
}

function toId(id) {
  return String(+id.slice(1) - 1)
      .concat(':')
      .concat(fromLetterToId(id.slice(0, 1)));
}

function getValueFromId(id) {
  let [row, col] = id.split(':');
  col = fromIdToLetter(col);
  row = +row + 1;
  return col.concat(row);
}

function fromIdToLetter(id) {
  return String.fromCharCode(Number(id) + 'A'.charCodeAt());
}

function fromLetterToId(letter) {
  return String(letter.charCodeAt() - 'A'.charCodeAt());
}

function isContainNull(text, errorMessge) {
  return (/[null|=]/.test(text) || text === errorMessge);
}
