import React from 'react';
import {StatusBar} from 'react-native';
import { Provider } from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LandingScreen from './containers/Screens/LandingScreen';
import HomeScreen from './containers/Screens/HomeScreen';
import CameraScreen from './containers/Screens/CameraScreen/CameraScreen';
import RDScreen from './containers/Screens/RDScreen/RDScreen';
import ProfileScreen from './containers/Screens/ProfileScreen';

import { Colors } from './styles'

import configureStore from './redux/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <Provider store={configureStore()}>
        <StatusBar
          translucent
          backgroundColor={Colors.transparent}
          barStyle="dark-content"
        />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LandingScreen">
            <Stack.Screen
              name="LandingScreen"
              component={LandingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CameraScreen"
              component={CameraScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RDScreen"
              component={RDScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
