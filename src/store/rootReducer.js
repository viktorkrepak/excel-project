import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLES,
  UPDATE_DATE
} from './types';
import { defaultMainTitle, defaultStyles } from '@/Constants';
import { CHANGE_TITLE } from '@/store/types';
import { clone } from '@core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  mainTitle: defaultMainTitle,
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON()
};
const normalizeState = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});

export function normalizeInitialState(state) {
  return state ? normalizeState(state) : clone(defaultState);
}

export function rootReducer(state, action) {
  let field;
  let val;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.payload.type === 'col' ? 'colState' : 'rowState';
      return { ...state, [field]: dataStateValue(state, field, action) };
    case CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.payload.text,
        [field]: dataStateValue(state, field, action)
      };
    case APPLY_STYLES:
      field = 'stylesState';
      val = state[field] || {};
      action.payload.ids.forEach(id => {
        val[id] = { ...val[id], ...action.payload.value };
      });
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.payload.value }
      };
    case CHANGE_STYLES:
      return { ...state, currentStyles: action.payload };
    case CHANGE_TITLE:
      console.log(action.payload);
      return { ...state, mainTitle: action.payload };
    case UPDATE_DATE:
      return { ...state, openedDate: new Date().toJSON() };
    default:
      return state;
  }
}

function dataStateValue(state, field, action) {
  const val = state[field] || {};
  val[action.payload.id] = action.payload.text;
  return val;
}
