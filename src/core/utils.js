// Pure Functions

export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  // return string.charAt(0).toUpperCase() + string.slice(1);
  return stringSplice(string, 0, 1, string.charAt(0).toUpperCase())
}

function stringSplice(str, index, count, add) {
  const ar = str.split('');
  ar.splice(index, count, add);
  return ar.join('');
}
