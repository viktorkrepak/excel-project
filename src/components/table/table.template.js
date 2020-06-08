const CODES = {
  A: 65,
  Z: 90
};

function toCell(celContent = '') {
  return `<div class="cell" contenteditable="">${celContent}</div>`;
}

function toColumn(colName) {
  return `
  <div class="column">
    ${colName}
  </div>
`;
}

function createRow(content, rowIndex) {
  return `
  <div class="row">
    <div class="row-info">${rowIndex || ''}</div>
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
        .map(toCell )
        .join('');
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}

