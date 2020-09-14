import {
  USER_LOGGED_OUT
} from './constants';

export const userLogout = () => {
  return {
    type: USER_LOGGED_OUT,
  };
};
