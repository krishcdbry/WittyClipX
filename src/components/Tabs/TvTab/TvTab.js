import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';

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

function TvTab() {
  const [activeVideo, setActiveVideo] = useState(0);

  const onIndexChanged = () => {
    let activeIndex = activeVideo + 1;
    if (activeVideo === 10) {
      activeIndex = 0;
    }
    console.log(activeIndex);
    setActiveVideo(activeIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        style={styles.wrapper}
        horizontal={false}
        showsPagination={false}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScreenHeight,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    // backgroundColor: 'rgba(0,0,0,0.7)',
  },
  clip: {
    flex: 1,
  },
});

export default TvTab;
