class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  get data() {
    return this.$el.dataset;
  }
  find(selector) {
    return $(this.$el.querySelector(selector));
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
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
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1]
      };
    }
    return this.data.id;
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }
  attr(attrName, value) {
    if (value) {
      this.$el.setAttribute(attrName, value);
      return this;
    } else {
      return this.$el.getAttribute(attrName);
    }
  }

  focus() {
    this.$el.focus();
    return this;
  }
  css(styles = {}) {
    if (!styles) {
      return;
    }
    // for (const key in styles) {
    //    if (styles.hasOwnProperty(key)) {
    //    }
    // }
    Object.keys(styles).forEach(key => (this.$el.style[key] = styles[key]));
  }

  on(eventType, callbackFn) {
    this.$el.addEventListener(eventType, callbackFn);
  }
  off(eventType, callbackFn) {
    this.$el.removeEventListener(eventType, callbackFn);
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

  getCords() {
    return this.$el.getBoundingClientRect();
  }
  getStyles(styles = []) {
    return styles.reduce((resObj, currentItem) => {
      resObj[currentItem] = this.$el.style[currentItem];
      return resObj;
    }, {});
  }
}

// event.target
export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
