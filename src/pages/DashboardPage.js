import { Page } from '@core/Page';
import { $ } from '@core/dom';
import { createRecordsTable } from './dashboards.functions';

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'dashboard').html(/* html */`
      <div class="dashboard__header">
          <h1>Simple Excel With Pure JS</h1>
      </div>

      <div class="dashboard__new">
          <div class="dashboard__view">
              <a href="#excel/${Date.now().toString()}" class="dashboard__create">
                  Новая<br/>Таблица
              </a>
          </div>
      </div>

      <div class="dashboard__table dashboard__view">
       ${createRecordsTable()}
      </div>
    `);
  }
}
