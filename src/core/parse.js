import { Table } from '@components/table/Table';
import MathExpEval from 'math-expression-evaluator';

const ERROR_MESSAGE = 'Parsing error';
const RECURSION_ERROR = '<RECURSION@ERROR>';

const mathExpEval = new MathExpEval();
export function parse(text, currentId = [], getValue) {
  if (typeof text !== 'string' || ! text.startsWith('=')) return text;

  // text = removeSymbolsFromEnd(text.slice(1));
  text = text.slice(1);

  currentId.forEach(
      (id) => {
        const val = getValueFromId(id);
        const regex = new RegExp(`${val}(?!\\d)`);
        text = text.replace(regex, RECURSION_ERROR);
      }
  );

  if (
    doesHaveRecursion(text) ||
    isErrorMessage(text, ERROR_MESSAGE)
  ) return ERROR_MESSAGE;

  text = text.replace(/([A-Z][0-9]+)/g, (id) => {
    if (id.slice(1) === '0' || id.slice(1) > Table.rowsCount) return ERROR_MESSAGE;

    const nextId = toId(id);
    currentId.push(nextId);

    const val = String(getValue(nextId, currentId));
    return val.startsWith('=') ? val.slice(1) : val;
  });

  if (
    doesHaveRecursion(text) ||
    isErrorMessage(text, ERROR_MESSAGE) ||
    doesContainErrorMessage(text, ERROR_MESSAGE)
  ) return ERROR_MESSAGE;

  try {
    const lexed = mathExpEval.lex(text);
    const postfixed = mathExpEval.toPostfix(lexed);
    return mathExpEval.postfixEval(postfixed);
  } catch (err) {
    return err.message;
  }
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

function doesHaveRecursion(text) {
  const regex = new RegExp(RECURSION_ERROR);
  return regex.test(text);
}

function isErrorMessage(text, errorMessge) {
  return text === errorMessge;
}

function doesContainErrorMessage(text, ERROR_MESSAGE) {
  const regex = new RegExp(ERROR_MESSAGE);
  return regex.test(text);
}

/* eslint-disable-next-line */
function removeSymbolsFromEnd(text) {
  while (isNaN(text.charAt(text.length - 1)) || text.charAt(text.length - 1) === ' ') {
    text = text.slice(0, -1);
  }
  return text;
}
