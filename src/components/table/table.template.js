const CODES = {
  A: 65,
  Z: 90
};

function toCell(celContent = '', index) {
  return `<div class="cell" contenteditable="" data-cell="${index}">
  ${celContent}</div>`;
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
  console.log(rowIndex);
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

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('');
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
