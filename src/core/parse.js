import { Table } from '@components/table/Table';
import MathExpEval from 'math-expression-evaluator';

const ERROR_MESSGE = 'Parsing error';

const mathExpEval = new MathExpEval();
export function parse(text, currentId = [], getValue) {
  if (typeof text !== 'string') return text;
  if (text.startsWith('=')) {
    text = removeSymbolsFromEnd(text.slice(1));

    currentId.forEach(
        (id) => {
          const val = getValueFromId(id);
          const regex = new RegExp(`${val}(?!\\d)`);
          text = text.replace(regex, 'null');
        }
    );

    if (isContainNull(text) || isErrorMessage(text, ERROR_MESSGE)) return ERROR_MESSGE;

    text = text.replace(/([A-Z][0-9]+)/g, (id) => {
      if (id.slice(1) === '0' || id.slice(1) > Table.rowsCount) return null;

      const nextId = toId(id);
      currentId.push(nextId);

      const val = String(getValue(nextId, currentId));
      return val.startsWith('=') ? val.slice(1) : val;
    });

    if (isContainNull(text) || isErrorMessage(text, ERROR_MESSGE)) return ERROR_MESSGE;

    try {
      const lexed = mathExpEval.lex(text);
      const postfixed = mathExpEval.toPostfix(lexed);
      return mathExpEval.postfixEval(postfixed);
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
  return String.fromCharCode(+id + 'A'.charCodeAt());
}

function fromLetterToId(letter) {
  return String(letter.charCodeAt() - 'A'.charCodeAt());
}

function isContainNull(text) {
  return /[null|=]/.test(text);
}

function isErrorMessage(text, errorMessge) {
  return text === errorMessge;
}

function removeSymbolsFromEnd(text) {
  while (isNaN(text.charAt(text.length - 1)) || text.charAt(text.length - 1) === ' ') {
    text = text.slice(0, -1);
  }
  return text;
}
