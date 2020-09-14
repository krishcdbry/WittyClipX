import {
  SET_THEME_SELECTOR,
  TOGGLE_THEME_SELECTOR,
} from './constants';

export const setTheme = () => {
  return {
    type: SET_THEME_SELECTOR,
  };
};

export const toggleTheme = () => {
  return {
    type: TOGGLE_THEME_SELECTOR,
  };
};
