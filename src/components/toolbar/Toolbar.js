import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/dom';
import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { defaultStyles } from '@/Constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    const initialState = defaultStyles;
    this.initState(initialState);
  }

  get template() {
    return createToolbar(this.state);
  }
  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  toHTML() {
    return this.template;
  }
  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'iconBtn') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }
}
