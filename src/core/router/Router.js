import { $ } from '../dom';
import { ActiveRoute } from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Pass the selector');
    }
    this.page = null;
    this.$placeholder = $(selector);
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
    this.$placeholder.html(ActiveRoute.path);
  }
  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();
    console.log(ActiveRoute.path);
    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excelPage
      : this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
