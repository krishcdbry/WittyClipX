import { combineReducers } from 'redux';

import { ThemeReducer } from '../containers/Screens/LandingScreen/reducer';

import { USER_LOGGED_OUT } from './constants';

const appReducer = combineReducers({
  ThemeReducer,
});

const rootReducer = (state, action) => {
  if (action && action.type === USER_LOGGED_OUT) {
    state = undefined;
  }

  return appReducer;
}

export default rootReducer;
