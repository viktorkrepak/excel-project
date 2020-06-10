import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { shouldResize, tableResize } from '@/components/table/table.utils';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      tableResize(e, this.$root);
    }
  }
}
