import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  Easing,
  TouchableHighlight,
} from "react-native";
import Video, { FilterType } from "react-native-video";
import Swiper from "react-native-swiper";

import icon from "../../../../assets/images/wittyclip.png";

const clip0 = require("../../../../assets/clips/splash0.mp4");
const clip1 = require("../../../../assets/clips/splash1.mp4");
const clip2 = require("../../../../assets/clips/splash2.mp4");
const clip3 = require("../../../../assets/clips/splash3.mp4");
const clip4 = require("../../../../assets/clips/splash4.mp4");
const clip5 = require("../../../../assets/clips/splash5.mp4");
const clip6 = require("../../../../assets/clips/splash6.mp4");
const clip7 = require("../../../../assets/clips/splash7.mp4");
const clip8 = require("../../../../assets/clips/splash8.mp4");
const clip9 = require("../../../../assets/clips/splash9.mp4");
const clip10 = require("../../../../assets/clips/splash10.mp4");

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const videos = [
  clip0,
  clip1,
  clip2,
  clip3,
  clip4,
  clip5,
  clip6,
  clip7,
  clip8,
  clip9,
  clip10,
];

const LandingScreen = () => {
  console.log("Loaded");
  const [activeVideo, setActiveVideo] = useState(0);
  const y_translate = new Animated.Value(0);
  const menu_moveY = y_translate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -300],
  });

  const animate = (count = 0) => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(y_translate, {
        toValue: count % 2 === 0 ? 0 : 0.02,
        duration: 500,
        easing: Easing.Bounce,
        repeat: true,
        useNativeDriver: true,
      }).start(() => {
        animate(count + 1);
      }),
    ]);
  };

  const onIndexChanged = () => {
    let activeIndex = activeVideo + 1;
    if (activeVideo === 10) {
      activeIndex = 0;
    }
    console.log(activeIndex);
    setActiveVideo(activeIndex);
  };

  setTimeout(() => {
    animate();
  }, 700);

  const onNotifyMe = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <View style={styles.logoContainer}>
          <Animated.View
            style={[
              styles.logoAnimate,
              {
                transform: [
                  {
                    translateY: menu_moveY,
                  },
                ],
              },
            ]}
          >
            <Image style={styles.logo} source={icon} />
          </Animated.View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>WittyClip</Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.desc}>#Witty</Text>
          <Text style={styles.desc}>#Record</Text>
          <Text style={styles.desc}>#Play</Text>
        </View>
        {/* <View style={styles.notif}>
          <Text style={{ color: "#fff" }}>On the way</Text>
        </View> */}
        <TouchableHighlight style={styles.notifyContainer}>
          <Text style={styles.notifyButtonText}> Notify Me ! </Text>
        </TouchableHighlight>
      </View>

      <Swiper
        style={styles.wrLandingScreener}
        horizontal={false}
        showsPagination={false}
        autoplay={true}
        autoplayTimeout={9}
        loadMinimal={true}
        onIndexChanged={onIndexChanged}
      >
        {videos.map((item, idx) => {
          return (
            <Video
              key={idx}
              source={item}
              muted={true}
              repeat={true}
              resizeMode={"cover"}
              rate={1}
              volume={0.1}
              filter={FilterType.SEPIA}
              paused={activeVideo !== idx}
              ignoreSilentSwitch={"obey"}
              style={styles.clip}
            />
          );
        })}
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScreenHeight,
    justifyContent: "center",
    alignItems: "center"
  },
  descContainer: {
    marginLeft: 20,
  },
  desc: {
    fontSize: 52,
    color: '#fff',
    fontFamily: "Capriola-Regular",
    fontWeight: '400',
  },
  logoContainer: {
    width: 150,
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logoAnimate: {
    top: 0,
  },
  notif: {
    position: "absolute",
    top: 85,
    right: 30,
    backgroundColor: "#EA3357",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 9,
    color: "#fff",
  },
  logo: {
    height: 72,
    resizeMode: "contain",
  },
  titleContainer: {
    position: "absolute",
    top: 35,
    right: 30,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 15,
    fontFamily: "Capriola-Regular",
    fontWeight: '400',
  },
  notifyContainer: {
    backgroundColor: "#1e88e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 120,
    borderRadius: 120,
    position: "absolute",
    bottom: 50,
    right: 30,
    borderColor: "#191919",
    elevation: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 70,
    elevation: 50,
  },
  notifyButtonText: {
    fontSize: 15,
    color: "#fff",
    fontFamily: 'Capriola-Regular',
    fontWeight: '400',
  },
  view: {
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    position: "absolute",
    zIndex: 1,
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    width: ScreenWidth,
    paddingTop: 30,
    paddingBottom: 20,
  },
  wrLandingScreener: {},
  clip: {
    flex: 1,
    backgroundColor: "#000000",
  },
});

export default LandingScreen;
