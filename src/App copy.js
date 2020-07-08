import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LandingScreen from './containers/Screens/LandingScreen/LandingScreen';
import HomeScreen from './containers/Screens/HomeScreen/HomeScreen';

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
        <Stack.Navigator initialRouteName="HomeScreen">
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
