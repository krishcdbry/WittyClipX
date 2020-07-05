import React, {useState} from 'react';
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
} from 'react-native';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';

import icon from '../../../../assets/images/wittyclip.png';

const clip0 = require('../../../../assets/clips/splash0.mp4');
const clip1 = require('../../../../assets/clips/splash1.mp4');
const clip2 = require('../../../../assets/clips/splash2.mp4');
const clip3 = require('../../../../assets/clips/splash3.mp4');
const clip4 = require('../../../../assets/clips/splash4.mp4');
const clip5 = require('../../../../assets/clips/splash5.mp4');
const clip6 = require('../../../../assets/clips/splash6.mp4');
const clip7 = require('../../../../assets/clips/splash7.mp4');
const clip8 = require('../../../../assets/clips/splash8.mp4');
const clip9 = require('../../../../assets/clips/splash9.mp4');
const clip10 = require('../../../../assets/clips/splash10.mp4');

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

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
  console.log('Loaded');
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
          <Text style={styles.notif}>On the way</Text>
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
            ]}>
            <Image style={styles.logo} source={icon} />
          </Animated.View>
        </View>

        <Text style={styles.titleText}>WittyClip</Text>
        <TouchableHighlight style={styles.notifyContainer}>
          <Text style={styles.notifyButtonText}>Notify Me !</Text>
        </TouchableHighlight>
      </View>

      <Swiper
        style={styles.wrLandingScreener}
        horizontal={false}
        showsPagination={false}
        autoplay={true}
        autoplayTimeout={9}
        loadMinimal={true}
        onIndexChanged={onIndexChanged}>
        {videos.map((item, idx) => {
          return (
            <Video
              key={idx}
              source={item}
              muted={true}
              repeat={true}
              resizeMode={'cover'}
              rate={1}
              volume={0.1}
              paused={activeVideo !== idx}
              ignoreSilentSwitch={'obey'}
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
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    borderRadius: 15,
    width: 110,
    height: 110,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  logoAnimate: {
    top: 0,
  },
  notif: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#EA3357',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 9,
    color: '#fff',
  },
  logo: {
    height: 72,
    resizeMode: 'contain',
    // margin: 20,
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  notifyContainer: {
    backgroundColor: '#0684a2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    height: 40,
    width: 120,
    borderRadius: 20,
    marginLeft: 50,
    marginRight: 50,
  },
  notifyButtonText: {
    fontSize: 15,
    color: '#fff',
  },
  view: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: ScreenWidth,
    height: ScreenHeight,
    paddingBottom: 90,
    // left: -120,
    // bottom: -50,
    // width: 400,
    // height: 400,
    // paddingLeft: 50,
    // paddingBottom: 90,
    // paddingVertical: 50,
    // borderRadius: 1000,
  },
  wrLandingScreener: {
    // backgroundColor: 'rgba(0,0,0,0.7)',
  },
  clip: {
    flex: 1,
  },
});

export default LandingScreen;
