class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  }

  get data() {
    return this.$el.dataset;
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

  queryAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach((key) => {
          this.$el.style[key] = styles[key];
        });
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
