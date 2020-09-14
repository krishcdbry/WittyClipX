import { createSelector } from 'reselect';

import { Constants } from '../../../utils';
import { Colors } from '../../../styles';

const getTheme = state => {
  const theme = state?.ThemeReducer?.theme || Constants.DARK_MODE;

  return theme === Constants.DARK_MODE ? {
    backgroundColor: Colors.darkBackground,
    transparentBackgroundColor: Colors.transparent2,
    textColor: Colors.white,
    tabIconColor: Colors.tabInactive,
    tabIconActiveColor: Colors.tabDarkThemeActive,
  } : {
    backgroundColor: Colors.white,
    transparentBackgroundColor: Colors.transparent3,
    textColor: Colors.darkBackground,
    tabIconColor: Colors.tabInactive,
    tabIconActiveColor: Colors.tabLightThemeActive,
  };
};

export const selectTheme = createSelector(
  getTheme,
  data => data
);
