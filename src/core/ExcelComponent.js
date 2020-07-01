import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || 'Default name ';
    this.observer = options.observer;
    this.subscribe = options.subscribe || [];
    this.unsubscribers = [];
    this.store = options.store;
    this.prepare();
  }

  prepare() {}

  $on(event, fn) {
    const unsub = this.observer.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }
  // Facade around EMIT function
  $emit(event, ...args) {
    this.observer.emit(event, ...args);
  }

  // Store

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // $subscribe(fn) {
  //   this.storeUnsub = this.store.subscribe(fn);
  // }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Return a component template
  toHTML() {
    return '';
  }
  init() {
    this.initDomListeners();
  }
  destroy() {
    this.removeDomListeners();
    for (const unsub of this.unsubscribers) {
      unsub();
    }
  }
}
