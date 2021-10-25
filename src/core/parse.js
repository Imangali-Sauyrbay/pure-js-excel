import { Table } from '@components/table/Table';

const ERROR_MESSGE = 'Parsing error';
export function parse(text, currentId = [], getValue) {
  if (typeof text !== 'string') return text;
  if (text.startsWith('=')) {
    text = text.slice(1);
    while (isNaN(text.charAt(text.length - 1)) || text.charAt(text.length - 1) === ' ') {
      text = text.slice(0, -1);
    }

    try {
      currentId.forEach((id) => text = text
          .replace(new RegExp(getValueFromId(id).concat('?(=\D)'), 'g'), 'null'));
      if (/[null|=]/.test(text) || text === ERROR_MESSGE) return ERROR_MESSGE;

      text = text.replace(/([A-Z][0-9]+)/g, (id) => {
        if (id.slice(1) === '0' || id.slice(1) > Table.rowsCount) return null;
        const nextId = toId(id);
        currentId.push(nextId);
        const val = String(getValue(nextId, currentId));
        return val.startsWith('=') ? val.splice(1) : val;
      });
      if (/[null|=]/.test(text) || text === ERROR_MESSGE) return ERROR_MESSGE;

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
      .concat(String(id.slice(0, 1).charCodeAt() - 'A'.charCodeAt()));
}

function getValueFromId(id) {
  const val = id.split(':');
  val[1] = String.fromCharCode(Number(val[1]) + 'A'.charCodeAt());
  val[0] = +val[0] + 1;
  return val.reverse().join('');
}
