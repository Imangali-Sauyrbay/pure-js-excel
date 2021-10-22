class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  }

  get data() {
    return this.$el.dataset;
  }

  text(value) {
    let place = 'textContent';
    if (this.$el.tagName.toLowerCase() === 'input') {
      place = 'value';
    }

    if (typeof value === 'string') {
      this.$el[place] = String(value);
    }

    return this.$el[place].trim();
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  on(eType, cb) {
    this.$el.addEventListener(eType, cb);
    return this;
  }

  off(eType, cb) {
    this.$el.removeEventListener(eType, cb);
    return this;
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  query(selector) {
    return $(this.$el.querySelector(selector));
  }

  queryAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach((key) => {
          this.$el.style[key] = styles[key];
        });
    return this;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  id(parse) {
    const id = this.data.id;
    if (parse) {
      const [x, y] = id.split(':');
      return {
        row: +x,
        col: +y,
      };
    }
    return id;
  }

  removeAttr(attrName) {
    if (!attrName) throw new Error('Missing attribute name!');
    this.$el.removeAttribute(attrName);
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const root = document.createElement(tagName);
  root.classList.add(classes);
  return $(root);
};
