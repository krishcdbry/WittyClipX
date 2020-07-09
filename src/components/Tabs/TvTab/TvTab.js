import React, { useState, useEffect } from "react";
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
import LinearGradient from "react-native-linear-gradient";

import { screenDimensions } from "../../../utils/global";
import Swiper from "../../../plugins/Swiper";

import clapIcon from "../../../../assets/images/icons/clap.png";
import commentIcon from "../../../../assets/images/icons/comm.png";
import shareIcon from "../../../../assets/images/icons/share.png";
import songIn from "../../../../assets/images/icons/song-in.png";
import moreOptions from "../../../../assets/images/icons/more-options.png";

console.log(clapIcon);

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const TvTab = ({ navigation }) => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [videos, setVideos] = useState([]);
  const [pauseVideo, setPauseVideo] = useState(-1);

  const activeVideoHandler = (idx) => {
    setActiveVideo(idx);
    if (idx > videos.length - 5) {
      fetchVideos(1);
    }
  };

  const toggleVideoPlay = (idx) => {
    if (pauseVideo === idx) {
      idx = -1;
    }
    setPauseVideo(idx);
  };

  const fetchVideos = async (update) => {
    const result = await fetch(
      "https://live-api.heartynote.com/public/trending"
    );
    const resultData = await result.json();
    const newVideos =
      resultData?.response?.hearty_user_trending_feed?.hearty_note_feed;
    if (update) {
      setVideos([...videos, ...newVideos]);
    } else {
      setVideos(newVideos);
      setActiveVideo(0);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <Swiper
      style={styles.wrLandingScreener}
      horizontal={false}
      // height={Dimensions.get("window").height}
      removeClippedSubviews={false}
      onIndexChanged={(idx) => activeVideoHandler(idx)}
      // loadMinimalSize={3}
      // loadMinimalLoader={
      //   <View>
      //     <Text>Loading....</Text>
      //   </View>
      // }
      // loadMinimal={true}
    >
      {videos &&
        videos.length > 0 &&
        videos.map((item, idx) => {
          return (
            <TouchableHighlight
              key={idx}
              onPress={() => toggleVideoPlay(idx)}
              style={styles.clip}
            >
              <View style={{ position: "relative" }}>
                <LinearGradient
                  colors={["transparent", "#111"]}
                  style={styles.videoWrapper}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                >
                  <View style={styles.videoDataContainer}>
                    <View style={styles.videoUserContainer}>
                      <Image
                        source={{ uri: item.profile.pic }}
                        style={styles.videoUserPic}
                      />
                      <Text style={styles.videoUsername}>
                        {item.profile.username}
                      </Text>
                    </View>

                    <View style={styles.videoUserOptions}>
                      <View style={styles.optionIcon}>
                        <Image source={clapIcon} style={styles.clapIcon} />
                        <Text style={styles.stats}>{item.views}</Text>
                      </View>
                      <View style={styles.optionIcon}>
                        <Image
                          source={commentIcon}
                          style={styles.commentIcon}
                        />
                        <Text style={styles.stats}>{item.star.count}</Text>
                      </View>
                      <View style={styles.optionIcon}>
                        <Image source={shareIcon} style={styles.shareIcon} />
                        <Text style={styles.stats}>
                          {Math.round(item.star.count + item.views / 2)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.videoMoreOptions}>
                    <Image source={songIn} style={styles.songIcon} />
                    <Image source={moreOptions} style={styles.moreOptions} />
                  </View>

                  <View style={styles.viewsContainer}>
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                      {item.views} Views
                    </Text>
                  </View>
                </LinearGradient>
                {console.log(activeVideo, item.src)}
                <Video
                  source={{ uri: item.src }}
                  muted={false}
                  repeat={true}
                  resizeMode={"cover"}
                  rate={1}
                  filter={FilterType.SEPIA}
                  paused={activeVideo !== idx || pauseVideo === idx}
                  ignoreSilentSwitch={"ignore"}
                  style={styles.clip}
                />
              </View>
            </TouchableHighlight>
          );
        })}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScreenHeight,
    justifyContent: "center",
    alignItems: "center",
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
  wrLandingScreener: {
    position: "relative",
    minHeight: screenDimensions.ScreenHeight
  },
  clip: {
    flex: 1,
    backgroundColor: "#202020",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    zIndex: 50,
    height: screenDimensions.ScreenHeight,
    width: screenDimensions.ScreenWidth,
  },
  videoWrapper: {
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    zIndex: 200,
    height: screenDimensions.ScreenHeight,
    width: screenDimensions.ScreenWidth,
  },
  videoDataContainer: {
    position: "absolute",
    bottom: 80,
    left: 15,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  videoUserContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  videoUsername: {
    color: "#fff",
    fontFamily: "Capriola-Regular",
    fontSize: 13,
  },
  videoUserPic: {
    width: 35,
    height: 35,
    borderRadius: 70,
    marginHorizontal: 7,
  },
  videoUserOptions: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  optionIcon: {
    marginHorizontal: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  clapIcon: {
    width: 22,
    height: 22,
  },
  commentIcon: {
    height: 22,
    width: 22,
    resizeMode: "contain",
  },
  shareIcon: {
    height: 22,
    width: 25,
    resizeMode: "contain",
  },
  stats: {
    color: "#fff",
    fontSize: 11,
    marginTop: 2,
  },
  videoMoreOptions: {
    position: "absolute",
    bottom: 85,
    right: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  songIcon: {
    height: 27,
    width: 27,
  },
  moreOptions: {
    width: 7,
    height: 20,
    marginLeft: 15,
  },
  viewsContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#FF544D",
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 7,
    color: "#fff",
  },
});

export default TvTab;
