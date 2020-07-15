import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LandingScreen from './containers/Screens/LandingScreen/LandingScreen';
import HomeScreen from './containers/Screens/HomeScreen/HomeScreen';
import CameraScreen from './containers/Screens/CameraScreen/CameraScreen';
import RDScreen from './containers/Screens/RDScreen/RDScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="#00000000"
        barStyle="dark-content"
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="RDScreen">
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
