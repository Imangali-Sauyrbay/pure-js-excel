export function parse(text, currentId, getValue) {
  if (!text) return text;
  if (text.startsWith('=')) {
    text = text.slice(1);
    while (isNaN(text.charAt(text.length - 1)) || text.charAt(text.length - 1) === ' ') {
      text = text.slice(0, -1);
    }

    try {
      text = text.replace(/([A-Z][0-9]+)/g, (id) => {
        const nextId = toId(id);
        if (nextId === currentId) return null;
        const val = String(getValue(nextId));
        return val.startsWith('=') ? val.splice(1) : val;
      });
      if (/[null|=]/.test(text)) return 'Parsing error';
      return eval(text);
    } catch (err) {
      console.warn('Skipping parse', err);
    }
  }

  return text;
}

function toId(id) {
  return String(id.slice(1) - 1)
      .concat(':')
      .concat(String(id.slice(0, 1).charCodeAt() - 'A'.charCodeAt()));
}
