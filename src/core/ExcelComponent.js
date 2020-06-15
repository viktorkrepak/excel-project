import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || 'Default name ';
    console.log(options);
    this.observer = options.observer;
    this.unsubscribers = [];
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
