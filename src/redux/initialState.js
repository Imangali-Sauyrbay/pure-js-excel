import { storage } from '@core/utils';
import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
};

function normalizeState(state) {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  };
}

export const initialState = normalizeState(storage(storage.getKey()) || defaultState);
