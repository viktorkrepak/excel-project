import { $ } from '@core/dom';

export function tableResize(event, $root) {
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
    document.onmousemove = null;
    document.omnouseup = null;
    $resizer.css({ opacity: 0, zIndex: 1, bottom: 0, right: 0 });
  };
}

export function shouldResize(event) {
  return event.target.dataset.resize;
}
