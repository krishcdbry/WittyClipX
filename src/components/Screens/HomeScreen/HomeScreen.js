import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import TabBar from '../Reuse/TabBar';
import HomeTab from '../../../containers/Tabs/HomeTab/HomeTab';
import TvTab from '../../../containers/Tabs/TvTab/TvTab';

import {clearStack} from '../../../utils/navigation';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    clearStack(navigation, 'HomeScreen');
  }, [navigation]);

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Tv" component={TvTab} />
      </Tab.Navigator>
    </>
  );
};

export default HomeScreen;
