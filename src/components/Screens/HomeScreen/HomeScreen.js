import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../../../plugins/TabBar";

// import TabBar from '../Reuse/TabBar';
import HomeTab from "../../../containers/Tabs/HomeTab/HomeTab";
import TvTab from "../../../containers/Tabs/TvTab/TvTab";

import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

import { clearStack } from "../../../utils/navigation";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    clearStack(navigation, "HomeScreen");
  }, [navigation]);

  return (
    <>
      <TouchableOpacity
        style={Styles.recordIconContainer}
        onPress={() => navigation.navigate("CameraScreen")}
      >
        <Image
          style={Styles.recordIcon}
          source={require("../../../../assets/images/icons/film.png")}
        />
      </TouchableOpacity>
      <TabBar style={{ backgroundColor: "#202020" }}>
        <TabBar.Item
          icon={require("../../../../assets/images/icons/home.png")}
          selectedIcon={require("../../../../assets/images/icons/home-active.png")}
          title="Tab1"
          screenBackgroundColor={{ backgroundColor: "#202020" }}
        >
          <HomeTab />
        </TabBar.Item>
        <TabBar.Item
          icon={require("../../../../assets/images/icons/tv.png")}
          selectedIcon={require("../../../../assets/images/icons/tv-active.png")}
          title="Tab2"
          onClick={() => navigation.navigate("LandingScreen")}
          screenBackgroundColor={{ backgroundColor: "#202020" }}
        >
          <HomeTab />
        </TabBar.Item>
        <TabBar.Item
          icon={require("../../../../assets/images/icons/notification.png")}
          selectedIcon={require("../../../../assets/images/icons/notification-active.png")}
          title="Tab3"
          screenBackgroundColor={{ backgroundColor: "#202020" }}
        >
          <HomeTab />
        </TabBar.Item>
      </TabBar>
    </>
  );
};

const Styles = StyleSheet.create({
  recordIconContainer: {
    position: "absolute",
    bottom: 90,
    right: 20,
    zIndex: 1,
    height: 60,
    width: 60,
    borderRadius: 120,
    backgroundColor: "#171a1c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  recordIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  }
});

export default HomeScreen;
