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

  const fetchVideos = () => {
    setTrendingVideos([{"id": "2276", "is_saved": 0, "link": "/tv?vid=GQoOyLL307071", "note_id": "34119", "profile": {"id": "1682", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Dhruv8iTZiZyZsZkCABTM7DwpyVm01j4N3x0bQTb1501259319.png", "username": "Dhruv"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_34119_DhruvCThaYaSno9uJsqbVgD80PXnIAc0mFI1555266140.mp4", "star": {"action": "star", "count": 2, "is_starred": 0}, "tag": "Dance", "tag_id": "1042", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_34119_DhruvCThaYaSno9uJsqbVgD80PXnIAc0mFI1555266140.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Dhruv", "views": "37"}, {"id": "2110", "is_saved": 0, "link": "/tv?vid=eLrweBC304524", "note_id": "33836", "profile": {"id": "57", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/heartynote_profile_pic_Srinivas_NRN89RR3u3jCycJwh0Zjir9Pa9GoynW4fJcp1591979719.jpg", "username": "Srinivas_N"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_33836_Srinivas_NLfYFWdmUdqx2gmCCEeUz1aqPg89HdG1555012021.mp4", "star": {"action": "star", "count": 1, "is_starred": 0}, "tag": "Music Collection", "tag_id": "1047", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_33836_Srinivas_NLfYFWdmUdqx2gmCCEeUz1aqPg89HdG1555012021.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Srinivas_N", "views": "16"}, {"id": "3689", "is_saved": 0, "link": "/tv?vid=GZRIAwk381402", "note_id": "42378", "profile": {"id": "57", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/heartynote_profile_pic_Srinivas_NRN89RR3u3jCycJwh0Zjir9Pa9GoynW4fJcp1591979719.jpg", "username": "Srinivas_N"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_42378_Srinivas_NnDeRfK6ocC2FQnxas1BhqflWSlMxQd1580933390.mp4", "star": {"action": "star", "count": 3, "is_starred": 0}, "tag": "My note", "tag_id": "1047", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_42378_Srinivas_NnDeRfK6ocC2FQnxas1BhqflWSlMxQd1580933390.mp4_thumb_.jpg", "title": "Asha Pasham Full Video Song || Care Of Kancharapalem", "type": "video", "username": "Srinivas_N", "views": "255"}, {"id": "2429", "is_saved": 0, "link": "/tv?vid=NFdMeYI309438", "note_id": "34382", "profile": {"id": "1682", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Dhruv8iTZiZyZsZkCABTM7DwpyVm01j4N3x0bQTb1501259319.png", "username": "Dhruv"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_34382_Dhruvm6WCIAuVdaKaQ1MeSllm1lOK7pNQvM1555620637.mp4", "star": {"action": "star", "count": 0, "is_starred": 0}, "tag": "Cars", "tag_id": "56", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_34382_Dhruvm6WCIAuVdaKaQ1MeSllm1lOK7pNQvM1555620637.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Dhruv", "views": "66"}, {"id": "2558", "is_saved": 0, "link": "/tv?vid=WLQyLkX311616", "note_id": "34624", "profile": {"id": "12", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_rakeshNanduqDGwAFdh8IitAYSHyA8gji4Kb07Lc7oDL491498768831.png", "username": "rakeshNandu"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_34624_rakeshNanduo9qHaIm8yrHYEdxcwiHNFmOnixbKgo1555926195.mp4", "star": {"action": "star", "count": 2, "is_starred": 0}, "tag": "Videohub", "tag_id": "1045", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_34624_rakeshNanduo9qHaIm8yrHYEdxcwiHNFmOnixbKgo1555926195.mp4_thumb_.jpg", "title": "", "type": "video", "username": "rakeshNandu", "views": "39"}, {"id": "2301", "is_saved": 0, "link": "/tv?vid=BpTnakw307512", "note_id": "34168", "profile": {"id": "1682", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Dhruv8iTZiZyZsZkCABTM7DwpyVm01j4N3x0bQTb1501259319.png", "username": "Dhruv"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_34168_Dhruv5U4LGtHtTZe4l10xcI0FTA4j6nbmoo1555329470.mp4", "star": {"action": "star", "count": 3, "is_starred": 0}, "tag": "Dance", "tag_id": "1042", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_34168_Dhruv5U4LGtHtTZe4l10xcI0FTA4j6nbmoo1555329470.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Dhruv", "views": "73"}, {"id": "3361", "is_saved": 0, "link": "/tv?vid=UlraBPB343323", "note_id": "38147", "profile": {"id": "4741", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_SiddharthRoyLmYtpKVeGqEaWLeDqtuIoZIpRGrQrC2cZ0G1563485650.png", "username": "SiddharthRoy"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_38147_SiddharthRoym2grvtIvm0YGFaPLohDTyP0dIeyJLm1561234983.mp4", "star": {"action": "star", "count": 0, "is_starred": 0}, "tag": "FunMemes", "tag_id": "1104", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_38147_SiddharthRoym2grvtIvm0YGFaPLohDTyP0dIeyJLm1561234983.mp4_thumb_.jpg", "title": "#hahaha", "type": "video", "username": "SiddharthRoy", "views": "8"}, {"id": "2883", "is_saved": 0, "link": "/tv?vid=dffDhYS328041", "note_id": "36449", "profile": {"id": "3", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_rinacdbryXDDoBzDwKz0yMMIFjjiCpRyjod1zdXXbBBA1575122468.png", "username": "rinacdbry"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_36449_rinacdbryemIGzxgRSMfozbWdrVpdusdlvjs5sq1558278444.mp4", "star": {"action": "star", "count": 4, "is_starred": 0}, "tag": "Indian Talent", "tag_id": "1019", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_36449_rinacdbryemIGzxgRSMfozbWdrVpdusdlvjs5sq1558278444.mp4_thumb_.jpg", "title": "", "type": "video", "username": "rinacdbry", "views": "71"}, {"id": "1231", "is_saved": 0, "link": "/tv?vid=22apFb655N7", "note_id": "30295", "profile": {"id": "1682", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Dhruv8iTZiZyZsZkCABTM7DwpyVm01j4N3x0bQTb1501259319.png", "username": "Dhruv"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_30295_DhruvR6oOYx68ng1IOKcUUKCydBj9DodAiQ1546119631.mp4", "star": {"action": "star", "count": 5, "is_starred": 0}, "tag": "Dance", "tag_id": "1042", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_30295_DhruvR6oOYx68ng1IOKcUUKCydBj9DodAiQ1546119631.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Dhruv", "views": "554"}, {"id": "1073", "is_saved": 0, "link": "/tv?vid=u802LS1s97X", "note_id": "30021", "profile": {"id": "2797", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_vowTvJ01mnNczdWN5uqe9SLfxCF6eltk39XxTXzf1546103349.png", "username": "vowTv"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_30021_vowTvJhxtWigos7ICckwfE0O5Ycq4RhgeO91545784020.mp4", "star": {"action": "star", "count": 5, "is_starred": 0}, "tag": "vowTv", "tag_id": "421", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_30021_vowTvJhxtWigos7ICckwfE0O5Ycq4RhgeO91545784020.mp4_thumb_.jpg", "title": "Awesomeness", "type": "video", "username": "vowTv", "views": "694"}, {"id": "1151", "is_saved": 0, "link": "/tv?vid=AR23177RN7j", "note_id": "30197", "profile": {"id": "12", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_rakeshNanduqDGwAFdh8IitAYSHyA8gji4Kb07Lc7oDL491498768831.png", "username": "rakeshNandu"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_30197_rakeshNanduzhiJK4Bt1EilpGEgZsT5tseIlmCYzp1546082938.mp4", "star": {"action": "star", "count": 5, "is_starred": 0}, "tag": "Videohub", "tag_id": "1045", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_30197_rakeshNanduzhiJK4Bt1EilpGEgZsT5tseIlmCYzp1546082938.mp4_thumb_.jpg", "title": "", "type": "video", "username": "rakeshNandu", "views": "368"}, {"id": "2614", "is_saved": 0, "link": "/tv?vid=UVyCeUB313182", "note_id": "34798", "profile": {"id": "4766", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_sweetysahuWD79XZF89es5GJgHXPwcYZkx1D8jtReqvmz1555277970.png", "username": "sweetysahu"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_34798_sweetysahuWI5OznNry3EGEozACHcN9cNd6IGENA1556035220.mp4", "star": {"action": "star", "count": 0, "is_starred": 0}, "tag": "Cool stuff", "tag_id": "1091", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_34798_sweetysahuWI5OznNry3EGEozACHcN9cNd6IGENA1556035220.mp4_thumb_.jpg", "title": "#LehLadakh", "type": "video", "username": "sweetysahu", "views": "15"}, {"id": "745", "is_saved": 0, "link": "/tv?vid=Xppougk225018", "note_id": "25002", "profile": {"id": "25", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic4da642a43c5b00d6f65eafa9784d7fd2.png", "username": "Vasantha"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_25002_VasantharR5L8JH2WECwoZMrFXhiReSOQ2H0q11509279308.mp4", "star": {"action": "star", "count": 6, "is_starred": 0}, "tag": "My note", "tag_id": "1", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_25002_VasantharR5L8JH2WECwoZMrFXhiReSOQ2H0q11509279308.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Vasantha", "views": "1025"}, {"id": "1860", "is_saved": 0, "link": "/tv?vid=wJBhBWG294912", "note_id": "32768", "profile": {"id": "4743", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Arora8886hlkcS3RDsEZgBxBaG5WJhyNPkUFWdy3vUn1549213074.png", "username": "Arora888"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_32768_Arora888xw8pAfJVbJkaw5mYktDyXWrbo7IwDE1550973856.mp4", "star": {"action": "star", "count": 6, "is_starred": 0}, "tag": "Happy Moment", "tag_id": "9", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_32768_Arora888xw8pAfJVbJkaw5mYktDyXWrbo7IwDE1550973856.mp4_thumb_.jpg", "title": "", "type": "video", "username": "Arora888", "views": "49"}, {"id": "3303", "is_saved": 0, "link": "/tv?vid=ovqJtfD342171", "note_id": "38019", "profile": {"id": "57", "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/heartynote_profile_pic_Srinivas_NRN89RR3u3jCycJwh0Zjir9Pa9GoynW4fJcp1591979719.jpg", "username": "Srinivas_N"}, "src": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_videos/heartynote_media_video_38019_Srinivas_N0WC0QYkVG5MGm4Cv4IkGgLh73IqJ5x1561134232.mp4", "star": {"action": "star", "count": 3, "is_starred": 0}, "tag": "Music Collection", "tag_id": "1047", "thumb": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_video_thumbs/heartynote_media_video_38019_Srinivas_N0WC0QYkVG5MGm4Cv4IkGgLh73IqJ5x1561134232.mp4_thumb_.jpg", "title": "Unnattundi - Ninnu Kori", "type": "video", "username": "Srinivas_N", "views": "24"}]);
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
