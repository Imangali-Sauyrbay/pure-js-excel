import { isEqual } from './utils';

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.unsub = Function.prototype;
    this.prevState = {};
  }

  subscribeComponents(component) {
    this.prevState = this.store.getState();
    this.sub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(this.prevState[key], state[key])) {
          component.forEach((component) => {
            if (component.isWathcing(key)) {
              const changes = {[key]: state[key]};
              component.storeChanged(changes);
            }
          });
        }
      });
      this.prevState = this.store.getState();
    });
  }

  unsubscribeComponents() {
    this.unsub();
  }
}
