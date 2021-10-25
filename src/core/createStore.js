export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT_STORE__'});
  let listeners = [];

  return {
    subscribe(fn) {
      if (typeof fn !== 'function') {
        throw new Error('Store subscribe callBack must be a function!');
      }
      listeners.push(fn);
      return function() {
        listeners = listeners.filter((cb) => cb !== fn);
      };
    },
    dispatch(action) {
      if (!action.type) throw new Error('Action type is required!');
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  };
}
