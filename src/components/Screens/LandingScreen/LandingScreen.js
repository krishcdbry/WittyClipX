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
  TouchableNativeFeedback,
  TouchableHighlight,
} from "react-native";
import Video, { FilterType } from "react-native-video";
import Swiper from "react-native-swiper";

import DeviceInfo from "react-native-device-info";

import icon from "../../../../assets/images/logom.png";
import thumb from "../../../../assets/images/thumb.jpg";
import thumb1 from "../../../../assets/images/thumb1.jpg";
import thumb2 from "../../../../assets/images/thumb2.jpg";
import play from "../../../../assets/images/icons/play.png";
import pause from "../../../../assets/images/icons/pause.png";

const clip0 = require("../../../../assets/clips/splash0.mp4");
const clip1 = require("../../../../assets/clips/splash1.mp4");
const clip2 = require("../../../../assets/clips/splash2.mp4");
const clip3 = require("../../../../assets/clips/splash3.mp4");

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;
const videos = [clip0, clip1, clip2, clip3];
const videosLength = videos.length;

const LandingScreen = ({ navigation }) => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [pauseVideo, setPauseVideo] = useState(false);
  const y_translate = new Animated.Value(0);
  const menu_moveY = y_translate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -300],
  });

  // Analytics
  const AndroidId = DeviceInfo.getAndroidIdSync();
  const Address = DeviceInfo.getIpAddressSync();
  const BaseOs = DeviceInfo.getBaseOsSync();
  const Brand = DeviceInfo.getBrand();
  const BuildId = DeviceInfo.getBuildIdSync();
  const DeviceId = DeviceInfo.getDeviceId();
  const DeviceToken = DeviceInfo.getDeviceToken();
  const InstallTime = DeviceInfo.getFirstInstallTimeSync();
  const Manufacturer = DeviceInfo.getManufacturerSync();

  const deviceData = {
    AndroidId,
    Address,
    BaseOs,
    Brand,
    BuildId,
    DeviceId,
    DeviceToken,
    InstallTime,
    Manufacturer,
  };

  const animate = (count = 0) => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(y_translate, {
        toValue: count % 2 === 0 ? 0 : 0.02,
        duration: 500,
        easing: Easing.Bounce,
        repeat: true,
        useNativeDriver: Platform.OS === "android",
      }).start(() => {
        animate(count + 1);
      }),
    ]);
  };

  const onIndexChanged = () => {
    let activeIndex = activeVideo + 1;
    if (activeVideo === videosLength - 1) {
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
        <View style={styles.notif}>
          <Text style={{ color: "#fff", fontSize: 12 }}>On the way</Text>
        </View>
        <View style={styles.thumbs}>
          <Image source={thumb} style={styles.thumbnail} />
          <Image source={thumb1} style={styles.thumbnail} />
          <Image source={thumb2} style={styles.thumbnail} />
        </View>
        <TouchableHighlight
          style={styles.notifyContainer}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.notifyButtonText}> Join Waitlist ! </Text>
        </TouchableHighlight>
        <View style={styles.waitinglistCount}>
          <Text style={styles.count}> 4.7k </Text>
          <Text style={styles.countText}> Joined </Text>
        </View>
        
        <View style={styles.playPauseIconContainer}>
          <TouchableNativeFeedback  onPress={() => setPauseVideo(!pauseVideo)}>
            <Image source={pauseVideo ? play : pause} style={styles.playpauseIcon}/>
          </TouchableNativeFeedback>
        </View>
      </View>

      <Swiper
        style={styles.wrLandingScreener}
        horizontal={false}
        showsPagination={false}
        autoplay={true}
        autoplayTimeout={15}
        loadMinimal={true}
        onIndexChanged={onIndexChanged}
      >
        {videos.map((item, idx) => {
          return (
              <Video
                key={idx}
                source={item}
                repeat={true}
                resizeMode={"cover"}
                rate={1}
                filter={FilterType.SEPIA}
                paused={activeVideo !== idx || pauseVideo}
                ignoreSilentSwitch={"ignore"}
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
    alignItems: "center",
  },
  descContainer: {
    marginLeft: 20,
  },
  desc: {
    fontSize: 42,
    color: "#fff",
    fontFamily: "Capriola-Regular",
    fontWeight: "400",
  },
  thumbs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
    marginTop: 30,
  },
  thumbnail: {
    width: 38,
    height: 38,
    resizeMode: "cover",
    borderRadius: 200,
    margin: 0 - 5,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 10,
  },
  logoContainer: {
    width: 90,
    height: 70,
    borderRadius: 30,
    marginLeft: 30,
    marginBottom: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // backgroundColor: "#ccc"
  },
  logoAnimate: {
    top: 0,
  },
  notif: {
    position: "absolute",
    top: 80,
    right: 50,
    backgroundColor: "#22a0ce",
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 7,
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
    fontWeight: "400",
  },
  notifyContainer: {
    backgroundColor: "#FF544D",
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
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 70,
    elevation: 50,
  },
  notifyButtonText: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Capriola-Regular",
    fontWeight: "400",
  },
  view: {
    // backgroundColor: "rgba(0,0,0,0.45)",
    backgroundColor: "rgba(0,0,0,0.45)",
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
  waitinglistCount: {
    marginTop: 20,
    marginLeft: 35,
    fontFamily: "Capriola-Regular",
  },
  count: {
    color: "#fff",
    fontSize: 24,
  },
  countText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Capriola-Regular",
  },
  playPauseIconContainer: {
    position: "absolute",
    bottom: 120,
    right: 30,
  },
  playpauseIcon: {
    width: 20,
    height: 20,
  }
});

export default LandingScreen;
