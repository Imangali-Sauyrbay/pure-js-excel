export function capitalizeFirst(string) {
  if (typeof string !== 'string') throw new Error('Arg must be a string');
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start];
  }

  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index);
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return rows.reduce((acc, row) => {
    cols.forEach((col) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

let STORAGE_KEY = 'excel';

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

storage.getKey = function() {
  return STORAGE_KEY;
};

storage.setKey = function(key) {
  STORAGE_KEY = key;
};

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a === b;
}

export function camelToDash(camel) {
  return camel.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map((key) => `${camelToDash(key)}: ${Array.isArray(styles[key]) ?
        styles[key].join(' ')
        : styles[key]
      }`)
      .join(';');
}

export function debounce(callback, wait = 400) {
  let timeout = null;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      callback(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function clone(obj) {
  return Object.assign({}, obj);
}
