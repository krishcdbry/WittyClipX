import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Easing,
} from "react-native";

import { Device } from '../../utils';

import icon from "../../../assets/images/logom.png";

const ProcessingLoader = ({ loadingText }) => {
  const y_translate = new Animated.Value(0);
  const menu_moveY = y_translate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -300],
  });

  const text = loadingText ? loadingText : 'Processing your awesome video ! \n Sit back & relax';

  const animate = (count = 0) => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(y_translate, {
        toValue: count % 2 === 0 ? 0 : 0.05,
        duration: 500,
        easing: Easing.Bounce,
        repeat: true,
        useNativeDriver: Platform.OS === "android",
      }).start(() => {
        animate(count + 1);
      }),
    ]);
  };

  setTimeout(() => {
    animate();
  }, 700);

  return (
    <View style={styles.loaderContainer}>
      <Animated.View
        style={[
          styles.logoAnimate,
          styles.logoContainer,
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
      <Text style={styles.loadingText}> {text} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    zIndex: 1000000,
    elevation: 100000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Device.ScreenWidth,
    height: Device.ScreenHeight,
    backgroundColor: '#171717',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: '#171717'
  },
  loadingText: {
    color: '#ddd',
    fontFamily: "Capriola-Regular",
    textAlign: 'center',
    lineHeight: 28,
    marginVertical: 10,
    },
  logoAnimate: {
    top: 0,
  },
  logo: {
    height: 92,
    resizeMode: "contain",
  },
});

export default ProcessingLoader;
