import { $ } from '@core/dom';

export function tableResize(event, $root) {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    const type = $resizer.data.resize;
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCords();
    const currentIndex = $parent.data.index;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;
    $resizer.css({ opacity: 1, [sideProp]: -5000 + 'px' });
    // eslint-disable-next-line no-invalid-this
    const cellsArray = $root.findAll(`[data-cell="${currentIndex}"]`);
    document.onmousemove = function(e) {
      if (type === 'col') {
        const delta = Math.floor(e.pageX - coords.right);
        value = coords.width + delta;
        $resizer.css({
          right: -delta + 'px'
        });
      } else {
        const delta = Math.floor(e.pageY - coords.bottom);
        value = coords.height + delta;
        $resizer.css({
          bottom: -delta + 'px'
        });
      }
    };
    document.onmouseup = function(e) {
      if (type === 'col') {
        $parent.css({ width: value + 'px' });
        for (const elem of cellsArray) {
          elem.style.width = value + 'px';
        }
      } else {
        $parent.css({ height: value + 'px' });
      }

      resolve({
        value,
        type,
        id: $parent.data.index
      });
      document.onmousemove = null;
      document.omnouseup = null;
      $resizer.css({ opacity: 0, zIndex: 1, bottom: 0, right: 0 });
    };
  });
}

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill('').map((_, index) => start + index);
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    for (const row of rows) {
      acc.push(`${row}:${col}`);
    }
    return acc;
  }, []);
}

export function nextSelector(key, { col, row }) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? 0 : col - 1;
      col--;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? 0 : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
