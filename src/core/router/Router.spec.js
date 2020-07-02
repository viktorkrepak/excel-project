import { Router } from './Router';
import { Page } from '../Page';

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = '<h1>Dashboard</h1>';
    return root;
  }
}
class ExcelPage extends Page {}

describe('Router:', () => {
  let router;
  let $root;
  beforeEach(() => {
    $root = document.createElement('div');
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage
    });
  });

  test('should be defined', () => {
    expect(router).toBeDefined();
  });

  test('should render Dashboard Page', () => {
    router.changePageHandler();
    expect($root.innerHTML).toBe('<div><h1>Dashboard</h1></div>');
  });
});
