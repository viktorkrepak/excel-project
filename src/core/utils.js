// Pure Functions

export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  // return string.charAt(0).toUpperCase() + string.slice(1);
  return stringSplice(string, 0, 1, string.charAt(0).toUpperCase());
}

function stringSplice(str, index, count, add) {
  const ar = str.split('');
  ar.splice(index, count, add);
  return ar.join('');
}

export function camelToDash(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function stylesToInline(styles = {}) {
  return Object.keys(styles)
    .map(key => `${camelToDash(key)}: ${styles[key]}`)
    .join(';');
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function isEqual(prevState, nextState) {
  if (typeof prevState === 'object' && typeof nextState === 'object') {
    return JSON.stringify(prevState) === JSON.stringify(nextState);
  }
  return prevState === nextState;
}

export function debounce(fn, ms = 2000) {
  let timeout;
  return function(...args) {
    const callFn = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args);
    };
    clearTimeout(timeout);

    timeout = setTimeout(callFn, ms);
  };
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
