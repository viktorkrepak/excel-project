const CODES = {
  A: 65,
  Z: 90
};

// function toCell(row, col) {
//   return `<div class="cell" contenteditable="" data-cell="${col}"></div>`;
// }

function toCell(row) {
  return function(_, col) {
    return `<div class="cell" 
    contenteditable data-cell="${col}" data-type="cell" 
    data-id="${row}:${col}"></div>`;
  };
}

function toColumn(colName, index) {
  return `
  <div class="column" data-type="resizable" data-index="${index}">
    ${colName}
    <div class="col-resize" data-resize="col">
    
</div>
  </div>
`;
}

function createRow(content, rowIndex) {
  const resizer = rowIndex
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
  <div class="row" ${rowIndex ? 'data-type="resizable"' : ''}>
    <div class="row-info">${rowIndex || ''}
    ${resizer}
    </div>
    <div class="row-data">${content}</div>
  </div>
`;
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('');
  const rows = [];
  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      // .map((_, col) => toCell(row, col))
      .map(toCell(row))
      .join('');
    rows.push(createRow(cells, row + 1));
  }

  return rows.join('');
}
