import 'core-js';
import '@styles/index.scss';
import { Router } from '@core/routes/Router';
import { DashboardPage } from '@/pages/DashboardPage';
import { ExcelPage } from '@/pages/ExelPage';


new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
