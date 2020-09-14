import {
  SET_THEME_SELECTOR,
  TOGGLE_THEME_SELECTOR,
} from './constants';

import { Constants, SessionStorage } from '../../../utils';

const INITIAL_STATE = {
  theme: Constants.DARK_MODE,
};

const ThemeReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_THEME_SELECTOR:
      SessionStorage.setTheme(payload);
      return {
        ...state,
        theme: payload,
      };
    case TOGGLE_THEME_SELECTOR:
      const theme = state.theme === Constants.DARK_MODE ? Constants.LIGHT_MODE : Constants.DARK_MODE;
      SessionStorage.setTheme(theme);
      return {
        ...state,
        theme,
      };
    default:
      return state;
  }
};

export { ThemeReducer };
