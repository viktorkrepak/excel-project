import {
  UPDATE_DATE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLES,
  CHANGE_TITLE
} from '@/store/types';

export function actionTableResize(data) {
  return {
    type: TABLE_RESIZE,
    payload: data
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    payload: data
  };
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    payload: data
  };
}

// value, ids
export function applyStyle(data) {
  return {
    type: APPLY_STYLES,
    payload: data
  };
}

export function changeTitle(text) {
  return {
    type: CHANGE_TITLE,
    payload: text
  };
}

export function updateDate() {
  return {
    type: UPDATE_DATE
  };
}
