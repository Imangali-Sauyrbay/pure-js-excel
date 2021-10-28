import { TABLE_RESIZE,
  TABLE_CHANGE_TEXT,
  CURRENT_CELL_STYLES,
  APPLY_CELL_STYLE,
  CHANGE_TITLE,
  UPDATA_DATE,
} from './types';

export function rootReducer(state = {}, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const {id, value, type} = action.payload;
      const field = type === 'col' ? 'colState' : 'rowState';
      return {
        ...state,
        [field]: {
          ...state[field],
          [id]: value,
        }};
    }

    case TABLE_CHANGE_TEXT: {
      const isEmpty = action.payload.value === '';
      const field = 'dataState';
      const val = state[field] || {};
      action.payload.id.forEach((id) =>{
        isEmpty ? delete val[id] : val[id] = action.payload.value;
      });
      return {...state,
        currentText: action.payload.value,
        [field]: {
          ...val,
        },
      };
    }

    case CURRENT_CELL_STYLES: {
      return {...state, currentStyles: action.payload};
    }

    case APPLY_CELL_STYLE: {
      const field = 'stylesState';

      const val = state[field] || {};
      const styles = {...action.payload.value};

      const keysForDelete = Object.keys(styles).filter((key)=>{
        switch (styles[key]) {
          case 'normal':
          case 'none':
          case 'left':
            return true;
        }
        return false;
      });

      action.payload.ids.forEach((id) => {
        val[id] = {...val[id], ...styles};
        Object.keys(val[id]).forEach((key) => {
          if (keysForDelete.includes(key)) delete val[id][key];
        });
        if (Object.keys(val[id]).length === 0) delete val[id];
      });

      return {...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.payload.value}};
    }

    case CHANGE_TITLE: {
      return {...state, title: action.payload};
    }

    case UPDATA_DATE: {
      return {...state, date: action.payload};
    }
    default: return state;
  }
}
