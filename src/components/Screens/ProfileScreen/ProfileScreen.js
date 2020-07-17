import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import Video, { FilterType } from "react-native-video";

import PlayIcon from "../../../../assets/images/icons/play.png";
import Back from "../../../../assets/images/icons/back.png";

const clip0 = require("../../../../assets/clips/splash2.mp4");


const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {
  const [following, setFollowing] = useState(false);
  const [trendingVideos, setTrendingVideos] = useState([]);

  const fetchVideos = async () => {
    const result = await fetch(
      "https://live-api.heartynote.com/public/trending"
    );
    const resultData = await result.json();
    const videos =
      resultData?.response?.hearty_user_trending_feed?.hearty_note_feed;
    setTrendingVideos(videos);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.topRightBackArrow}
        onPress={() => navigation.goBack()}
      >
        <Image source={Back} style={styles.miniIcon} />
      </TouchableOpacity>
      <Video
          source={clip0}
          repeat={true}
          resizeMode={"cover"}
          rate={1}
          filter={FilterType.SEPIA}
          paused={false}
          ignoreSilentSwitch={"ignore"}
          style={styles.clip}
        />
      <View style={styles.view}>
        <View style={styles.detailsContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.profilePicAndName}>
              <Image style={styles.profilePic} 
                source={{uri: "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_pic/rinacdbrykiF5QB94rMp3u7qVrtFceRHKSekRIW52fL81580635285.jpg"}}
              />
              <Text style={styles.name}>Rina Cdbry</Text>
            </View>
            <Text style={styles.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Kothi Pilla</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          >
            <View style={styles.videoFeed}>
              <View style={[styles.statsContainer, styles.postCountContainer]}>
                <Text style={styles.statsValue}>
                  100
                </Text>
                <Text style={styles.statsText}>
                  Clips
                </Text>
              </View>
              {trendingVideos.map((item, idx) => {
                return (
                  <TouchableOpacity style={styles.videoCard} key={`${idx}-trending-clips`}>
                    <Image
                      source={{ uri: item.thumb }}
                      style={styles.videoCover}
                    />
                    <View style={styles.videoWrapper}>
                      <Image source={PlayIcon} style={styles.PlayIcon} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.bottomStats}>
            <View style={styles.followerAndFollowing}>
              <View style={styles.statsContainer}>
                <Text style={styles.statsValue}>
                  34k
                </Text>
                <Text style={styles.statsText}>
                  Followers
                </Text>
              </View>
              <View style={styles.statsContainer}>
                <Text style={styles.statsValue}>
                  340
                </Text>
                <Text style={styles.statsText}>
                  Following
                </Text>
              </View>
            </View>
            {following ? (
              <TouchableHighlight
              style={[styles.followContainer, styles.followingContainer]}
              onPress={() => {
                setFollowing(false);
              }}
            >
              <Text style={[styles.followButtonText, styles.followingButtonText]}> Following </Text>
            </TouchableHighlight>
            ) : (
              <TouchableHighlight
                style={styles.followContainer}
                onPress={() => {
                  setFollowing(true);
                }}
              >
                <Text style={styles.followButtonText}> Follow </Text>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </View>
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
  topRightBackArrow: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 50,
  },
  view: {
    backgroundColor: "rgba(0,0,0,0.60)",
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
  detailsContainer: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bottomStats: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  followerAndFollowing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  statsText: {
    color: '#a0a0a0',
    fontSize: 12,
    fontFamily: "Capriola-Regular",
    textAlign: 'center',
  },
  statsValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: "Capriola-Regular",
    marginBottom: 8,
  },
  clip: {
    backgroundColor: "#000000",
    width: ScreenWidth,
    height: ScreenHeight
  },
  followContainer: {
    backgroundColor: "#FF544D",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 100,
    borderRadius: 120,
    borderColor: "#191919",
    elevation: 50,
    margin: 16,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 70,
    elevation: 50,
  },
  followingContainer: {
    backgroundColor: "#FFFFFF",
  },
  followButtonText: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Capriola-Regular",
    fontWeight: "400",
  },
  followingButtonText: {
    color: "#000",
  },
  profileContainer: {
    paddingHorizontal: 16,
    flexDirection: 'column',
  },
  profilePicAndName: {
    flexDirection: 'row',
    maxWidth: '70%',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 10,
    marginRight: 16,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 36,
    fontFamily: "Capriola-Regular",
    marginBottom: 8,
  },
  desc: {
    color: '#a0a0a0',
    fontSize: 12,
    fontFamily: "Capriola-Regular",
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
    width: ScreenWidth * 0.33,
    height: ScreenWidth * 0.33,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  premiumVideoCard: {
    width: ScreenWidth * 0.45,
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
  miniIcon: {
    width: 20,
    height: 20,
  },
  PlayIcon: {
    height: 24,
    width: 24,
  },
  postCountContainer: {
    backgroundColor: "rgba(0,0,0,0.45)",
    width: 80,
    height: ScreenWidth * 0.33,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  postCount: {
    color: '#FF544D'
  }
});

export default ProfileScreen;
