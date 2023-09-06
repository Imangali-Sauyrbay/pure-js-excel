import { createStore } from './createStore';
const initialState = {count: 0};
const reducer = (store = initialState, action) => {
  if (action.type === 'ADD') return {...store, count: store.count + 1};
  return store;
};

describe('createStore:', () => {
  let store; let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  test('should return store object', () => {
    expect(store).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.getState).toBeDefined();
  });

  test('should return object', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('should change state if action exist', () => {
    store.dispatch({type: 'ADD'});
    expect(store.getState().count).toBe(1);
  });

  test('should NOT change state if action don\'t exist', () => {
    store.dispatch({type: 'NOT_EXISTING_ACTION'});
    expect(store.getState().count).toBe(0);
  });

  test('should call subscriber callback', () => {
    store.subscribe(handler);
    store.dispatch({type: 'ADD'});
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('should NOT call subscriber callback if unsub', () => {
    store.subscribe(handler)();
    store.dispatch({type: 'ADD'});
    expect(handler).not.toHaveBeenCalled();
  });

  test('should dispatch in async way', () => {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        store.dispatch({type: 'ADD'});
      }, 500);

      setTimeout(()=> {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000);
    });
  });
});
