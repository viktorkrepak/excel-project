import { stylesToInline } from '@core/utils';
import { defaultStyles } from '@/Constants';
import { parse } from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id] || '';
    const styles = stylesToInline({
      ...defaultStyles,
      ...state.stylesState[id]
    });

    return `<div class="cell" 
    contenteditable data-cell="${col}" data-type="cell" 
    data-value="${data || ''}"
    data-id="${id}" style="${styles};  width: ${width}">
   ${parse(data) || ''} 
</div>`;
  };
}

function toColumn({ colName, index, width }) {
  return `
  <div
  class="column"
  data-type="resizable" data-index="${index}"
  style="width:${width}">
    ${colName}
    <div class="col-resize" data-resize="col">

</div>
  </div>
`;
}

function createRow(content, rowIndex, state) {
  const resizer = rowIndex
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';
  const height = getHeight(state, rowIndex);
  return `
  <div class="row" style="height: ${height}" data-index="${rowIndex}"  
  ${rowIndex ? 'data-type="resizable"' : ''}>
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

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function widthFromState(state) {
  return function(col, index) {
    return {
      colName: col,
      index,
      width: getWidth(state.colState, index)
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(widthFromState(state))
    .map(toColumn)
    .join('');
  const rows = [];
  rows.push(createRow(cols, null, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(state, row))
      .join('');
    rows.push(createRow(cells, row + 1, state.rowState));
  }

  return rows.join('');
}
