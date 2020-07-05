import {CommonActions} from '@react-navigation/native';

export const clearStack = (navigation, currentScreen) => {
  navigation.dispatch(state => {
    const routes = state.routes.filter(r => r.name === currentScreen);

    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });
};
