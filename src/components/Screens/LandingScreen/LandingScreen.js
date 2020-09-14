import React, { useEffect, useState } from "react";
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
import DeviceInfo from "react-native-device-info";

import Button from '../../../atoms/Button';
import Clickable from '../../../atoms/Clickable';

import { Colors, Fonts } from '../../../styles';
import { Device } from '../../../utils';

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

const videos = [clip0, clip1, clip2, clip3];
const videosLength = videos.length;

const LandingScreen = ({ navigation, theme }) => {

  console.log("theme", theme);

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
          <Text style={{ color: Colors.white, fontSize: 12 }}>On the way</Text>
        </View>
        <View style={styles.thumbs}>
          <Image source={thumb} style={styles.thumbnail} />
          <Image source={thumb1} style={styles.thumbnail} />
          <Image source={thumb2} style={styles.thumbnail} />
        </View>
        <Button
          name="Join Waitlist !"
          style={styles.notifyContainer}
          onPress={() => navigation.navigate("HomeScreen")}
        >
        </Button>
        <View style={styles.waitinglistCount}>
          <Text style={styles.count}> 4.7k </Text>
          <Text style={styles.countText}> Joined </Text>
        </View>
        
        <Clickable style={styles.playPauseIconContainer} onPress={() => setPauseVideo(!pauseVideo)}>
          <Image source={pauseVideo ? play : pause} style={styles.playPauseIcon}/>
        </Clickable>
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
    height: Device.ScreenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  descContainer: {
    marginLeft: 20,
  },
  desc: {
    fontSize: 42,
    color: Colors.white,
    fontFamily: Fonts.CapriolaRegular,
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
    borderColor: Colors.white,
    shadowColor: Colors.black,
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
  },
  logoAnimate: {
    top: 0,
  },
  notif: {
    position: "absolute",
    top: 80,
    right: 50,
    backgroundColor: Colors.seaBlue,
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 7,
    color: Colors.white,
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
    color: Colors.white,
    marginVertical: 15,
    fontFamily: Fonts.CapriolaRegular,
    fontWeight: "400",
  },
  notifyContainer: {
    position: "absolute",
    bottom: 50,
    right: 30,
  },
  notifyButtonText: {
    fontSize: 15,
    padding: 16,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.CapriolaRegular,
    fontWeight: "400",
  },
  view: {
    backgroundColor: Colors.transparent2,
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
    width: Device.ScreenWidth,
    paddingTop: 30,
    paddingBottom: 20,
  },
  wrLandingScreener: {},
  clip: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  waitinglistCount: {
    marginTop: 20,
    marginLeft: 35,
    fontFamily: Fonts.CapriolaRegular,
  },
  count: {
    color: Colors.white,
    fontSize: 24,
  },
  countText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.CapriolaRegular,
  },
  playPauseIconContainer: {
    position: "absolute",
    bottom: 120,
    right: 30,
  },
  playPauseIcon: {
    width: 20,
    height: 20,
  }
});

export default LandingScreen;
