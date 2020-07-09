import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../../../plugins/TabBar";

// import TabBar from '../Reuse/TabBar';
import HomeTab from "../../../containers/Tabs/HomeTab/HomeTab";
import TvTab from "../../../containers/Tabs/TvTab/TvTab";

import { View, StyleSheet } from "react-native";

import { clearStack } from "../../../utils/navigation";
import { screenDimensions } from "../../../utils/global";
import CommonStyles from "../../../styles/common";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    clearStack(navigation, "HomeScreen");
  }, [navigation]);

  return (
    <TabBar style={CommonStyles.darkBackground}>
      <TabBar.Item
        icon={require("../../../../assets/images/icons/home.png")}
        selectedIcon={require("../../../../assets/images/icons/home-active.png")}
        title="Tab1"
        screenBackgroundColor={CommonStyles.darkBackground}
      >
        <HomeTab navigation={navigation}  />
      </TabBar.Item>
      <TabBar.Item
        icon={require("../../../../assets/images/icons/tv.png")}
        selectedIcon={require("../../../../assets/images/icons/tv-active.png")}
        title="Tab2"
        screenBackgroundColor={CommonStyles.darkBackground}
      >
        <TvTab navigation={navigation}/>
      </TabBar.Item>
      <TabBar.Item
        icon={require("../../../../assets/images/icons/search.png")}
        selectedIcon={require("../../../../assets/images/icons/search-active.png")}
        title="Tab3"
        screenBackgroundColor={CommonStyles.darkBackground}
      >
        <View />
      </TabBar.Item>
    </TabBar>
  );
};


export default HomeScreen;
