import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@/store/createStore';
import { initialState, rootReducer } from '@/store/rootReducer';
import './scss/index.scss';
import { debounce, storage } from '@core/utils';

const store = createStore(rootReducer, initialState);

const stateListener = debounce(state => {
  console.log('App state:', state);
  storage('excel-state', state);
}, 400);

store.subscribe(stateListener);
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
});

excel.render();
