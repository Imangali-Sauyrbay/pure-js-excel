import { storage, clone } from '@core/utils';
import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  date: new Date().toJSON(),
};

function normalizeState(state) {
  if (typeof state !== 'object') return null;
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  };
}

export function initialState() {
  return normalizeState(storage(storage.getKey()) || clone(defaultState));
}
