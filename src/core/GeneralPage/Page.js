export class Page {
  constructor(params) {
    this.params = params || Date.now().toString();
  }
  getRoot() {
    throw new Error('getRoot should be implemented');
  }
  afterRender() {}

  destroy() {}
}
