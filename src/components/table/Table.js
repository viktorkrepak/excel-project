import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import {
  isCell,
  shouldResize,
  tableResize,
  matrix,
  nextSelector
} from '@/components/table/table.utils';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom';
import {
  actionTableResize,
  applyStyle,
  changeStyles,
  changeText
} from '@/store/actions';
import { defaultStyles } from '@/Constants';
import { parse } from '@core/parse';

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
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $firstCell = this.$root.find('[data-id="0:0"');
    this.emitCell($firstCell);
    this.$on('formula:input', text => {
      this.selection.current.attr('data-value', text).text(parse(text));
      this.selection.current.text(text);
      this.updateTextInStore(text);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value);
      this.$dispatch(
        applyStyle({
          value,
          ids: this.selection.selectedIds
        })
      );
    });
  }

  emitCell($cell) {
    this.selection.selectCell($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(changeStyles(styles));
  }

  async resizeTable(e) {
    try {
      const data = await tableResize(e, this.$root);
      this.$dispatch(actionTableResize(data));
    } catch (e) {
      console.error(e.message);
    }
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e);
    } else if (isCell(e)) {
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

  updateTextInStore(text) {
    this.$dispatch(
      changeText({
        id: this.selection.current.id(),
        text
      })
    );
  }
  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}
