import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@/store/createStore';
import { normalizeInitialState, rootReducer } from '@/store/rootReducer';
import { storage } from '@core/utils';
import { Page } from '@core/GeneralPage/Page';
import { StateProcessor } from '@core/GeneralPage/StateProcessor';

function storageName(param) {
  return `excel:${param}`;
}

class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    // return Promise.resolve(storage(this.name));
    console.log('here');
    return new Promise(resolve => {
      const state = storage(this.name);
      setTimeout(() => {
        console.log('here');
        resolve(state);
      }, 3000);
    });
  }
}

export class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
    this.processor = new StateProcessor(new LocalStorageClient(this.params));
  }

  async getRoot() {
    const state = await this.processor.get();
    const initialState = normalizeInitialState(state);
    const store = createStore(rootReducer, initialState);

    this.storeSub = store.subscribe(this.processor.listen);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
    this.storeSub.unsubscribe();
  }
}
