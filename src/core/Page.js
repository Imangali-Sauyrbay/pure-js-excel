export class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('Method "getRoot" in pages should be implemented');
  }

  afterRender() {}

  destroy() {}
}
