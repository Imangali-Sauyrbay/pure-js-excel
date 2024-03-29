import { Excel } from '@components/excel/Excel';
import { Header } from '@components/header/Header';
import { Toolbar } from '@components/toolbar/Toolbar';
import { Formula } from '@components/formula/Formula';
import { Table } from '@components/table/Table';
import { createStore } from '@store/createStore';
import { rootReducer } from '@redux/rootReducer';
import { initialState } from '@redux/initialState';
import { storage, debounce } from '@core/utils';
import { Page } from '@core/Page';

export class ExcelPage extends Page {
  getRoot() {
    storage.setKey('excel:'.concat(this.params));
    const store = createStore(rootReducer, initialState());
    const storeListener = debounce((state) => {
      storage(storage.getKey(), state);
    }, 400);

    store.subscribe(storeListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });
    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
