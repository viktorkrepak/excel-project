import './scss/index.scss';
import { Router } from '@core/router/Router';
import { DashboardPage } from '@/pages/dashboard.page';
import { ExcelPage } from '@/pages/excel.page';

new Router('#app', {
  dashboard: DashboardPage,
  excelPage: ExcelPage
});
