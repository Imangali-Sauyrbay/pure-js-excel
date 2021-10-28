import { TABLE_RESIZE,
  TABLE_CHANGE_TEXT,
  CURRENT_CELL_STYLES,
  APPLY_CELL_STYLE,
  CHANGE_TITLE,
  UPDATA_DATE,
} from './types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    payload: data,
  };
}

export function changeText(payload) {
  return {
    type: TABLE_CHANGE_TEXT,
    payload,
  };
}

export function changeStyles(payload) {
  return {
    type: CURRENT_CELL_STYLES,
    payload,
  };
}

export function applyStyle(payload) {
  return {
    type: APPLY_CELL_STYLE,
    payload,
  };
}

export function changeTitle(payload) {
  return {
    type: CHANGE_TITLE,
    payload,
  };
}

export function updateDate() {
  return {
    type: UPDATA_DATE,
    payload: new Date().toJSON(),
  };
}
