import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import {
  isSell,
  shouldResize,
  tableResize,
  range,
  matrix,
  nextSelector
} from '@/components/table/table.utils';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $firstCell = this.$root.find('[data-id="0:0"');
    this.emitCell($firstCell);
    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  emitCell(cell) {
    this.selection.selectCell(cell);
    this.$emit('table:select', cell);
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      tableResize(e, this.$root);
    } else if (isSell(e)) {
      const $target = $(e.target);

      if (e.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id =>
          this.$root.find(`[data-id="${id}"`)
        );
        this.selection.selectGroupCell($cells);
      } else {
        this.selection.selectCell($target);
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.emitCell($next);
    }
  }
  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}
