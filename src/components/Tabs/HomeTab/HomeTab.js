import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import PlayIcon from "../../../../assets/images/icons/play.png";
import { screenDimensions } from "../../../utils/global";

function HomeTab({ navigation }) {
  const [trendingPeople, setTrendingPeople] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);

  const fetchVideos = async () => {
    const result = await fetch(
      "https://live-api.heartynote.com/public/trending"
    );
    const resultData = await result.json();
    const videos =
      resultData?.response?.hearty_user_trending_feed?.hearty_note_feed;
    setTrendingPeople(videos);
    setTrendingVideos(videos);
  };

  useEffect(() => {
    // fetchVideos();
  }, []);

  const onContentSizeChange = (contentWidth, contentHeight) => {
    // this.setState({ screenHeight: contentHeight });
  };

  const onTrendingSizeChange = () => {};

  return (
    <>
      <View style={Styles.header}>
        <TouchableOpacity
          style={Styles.recordIconContainer}
          onPress={() => navigation.navigate("CameraScreen")}
        >
          <Image
            style={Styles.recordIcon}
            source={require("../../../../assets/images/logom.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.recordIconContainer, Styles.profileIconContainer]}
          onPress={() => navigation.navigate("CameraScreen")}
        >
          <Image
            source={{
              uri:
                "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_pic/rinacdbrykiF5QB94rMp3u7qVrtFceRHKSekRIW52fL81580635285.jpg",
            }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 120,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        scrollEnabled={true}
        onContentSizeChange={onTrendingSizeChange}
        style={{
          marginBottom: 57,
          paddingBottom: 50,
        }}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          onContentSizeChange={onTrendingSizeChange}
        >
          <View style={Styles.peopleTrendingFeed}>
            {trendingPeople.map((item, idx) => {
              return (
                <TouchableOpacity key={`${idx}-trending-people`} style={Styles.peopleTrendingCard}>
                  <Image
                    source={{ uri: item.profile.pic }}
                    style={Styles.videoCover}
                  />
                  <Text style={Styles.trendingUsername}>
                    {item.profile.username.length > 7 ? item.profile.username.substr(0, 7)+'..' : item.profile.username}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <Text style={Styles.homeTitle}>Trending</Text>
        <ScrollView
          horizontal={true}
          scrollEnabled={true}
          onContentSizeChange={onContentSizeChange}
        >
          <View style={Styles.videoFeed}>
            {trendingVideos.map((item, idx) => {
              return (
                <TouchableOpacity style={Styles.videoCard} key={`${idx}-trending-clips`}>
                  <Image
                    source={{ uri: item.thumb }}
                    style={Styles.videoCover}
                  />
                  <View style={Styles.videoWrapper}>
                    <Image source={PlayIcon} style={Styles.PlayIcon} />
                    <Text style={Styles.videoTitle}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </ScrollView>
    </>
  );
}

const Styles = StyleSheet.create({
  recordIconContainer: {
    position: "absolute",
    top: 50,
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
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  profileIconContainer: {
    right: "auto",
    left: 20,
  },
  header: {
    position: "absolute",
    top: 0,
    height: 90,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#202020",
    width: screenDimensions.ScreenWidth,
  },
  trendingUsername: {
    color: "#999",
    fontSize: 11,
    fontFamily: "Capriola-Regular",
    marginVertical: 5,
  },
  homeTitle: {
    fontSize: 23,
    fontFamily: "Capriola-Regular",
    fontWeight: "500",
    color: "#fff",
    paddingLeft: 20,
    marginTop: 5,
  },
  peopleTrendingFeed: {
    marginTop: 125,
    height: 110,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  peopleTrendingCard: {
    position: "relative",
    width: 72,
    height: 72,
    borderRadius: 120,
    marginHorizontal: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  videoFeed: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  videoCard: {
    position: "relative",
    width: screenDimensions.ScreenWidth - 100,
    height: screenDimensions.ScreenHeight - 350,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  videoCover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  videoWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  PlayIcon: {
    height: 50,
    width: 50,
  },
  videoTitle: {
    fontSize: 15,
    color: "#fff",
    paddingTop: 10,
    position: "absolute",
    bottom: 20,
    left: 20,
  },
});

export default HomeTab;
