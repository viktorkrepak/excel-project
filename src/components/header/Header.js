import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { changeTitle } from '@/store/actions';
import { defaultMainTitle } from '@/Constants';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, { name: 'Header', listeners: ['input'], ...options });
  }

  toHTML() {
    const title = this.store.getState().mainTitle || defaultMainTitle;
    console.log(title);
    return `
      <input type="text" class="input" value="${title}" />

      <div>


        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    console.log($target);
    this.$dispatch(changeTitle($target.text()));
  }
}
