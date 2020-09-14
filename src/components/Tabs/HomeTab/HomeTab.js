import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Vibration
} from "react-native";

import Clickable from '../../../atoms/Clickable';

import PlayIcon from "../../../../assets/images/icons/play.png";
import MenuIcon from "../../../../assets/images/icons/menu.svg";
import PremiereIcon from "../../../../assets/images/icons/ticket.png";

import { Colors } from '../../../styles';
import { Constants, Device } from '../../../utils';

function HomeTab(props) {
  const { navigation, theme, toggleTheme } = props;

  const [trendingPeople, setTrendingPeople] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [treningMenu, setTrendingMenu] = useState([
    "Trending today", "Trending all time", "Trending tags", "Trending audio", "Trending music", "Trending topic"
  ]);

  const [expanded, setExpanded] = useState(false);

  const fetchVideos = () => {
    setTrendingPeople(
      [
        {
          "id": "4863",
          "username": "dsdsharma",
          "fullname": "Deepak Sharma",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_dsdsharmarzTa25AYftDtrSFQNUpLuUJj5p2MWvzn4sx1584797354.png",
          "connected": 0,
          "following": 0,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 7,
              "notes": 4
          },
          "idx": "31027"
      },
      {
          "id": "4862",
          "username": "dhanashri",
          "fullname": "dhanashri kaje",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_dhanashriHNegge0N80As3vkcAkCX0ZWs4eu9PWQxJ4N1583826123.png",
          "connected": 0,
          "following": 0,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 4,
              "notes": 5
          },
          "idx": "30889"
      },
      {
          "id": "4835",
          "username": "VivekKarnuk",
          "fullname": "vivek karnuk",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_VivekKarnukurNrkXUPZ1RAa3hqQPbichm7RpM2tOuYghp1579431634.png",
          "connected": 0,
          "following": 0,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 3,
              "notes": 12
          },
          "idx": "30758"
      },
      {
          "id": "4803",
          "username": "pavan2403",
          "fullname": "pavan kumar",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/heartynote_profile_pic_pavan2403mjOxxbqYXletetdvi75PvRLnCgJ5QqtcKiJ1563554145.jpg",
          "connected": 0,
          "following": 0,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 4,
              "notes": 1
          },
          "idx": "30534"
      },
      {
          "id": "4764",
          "username": "Adult_Universe",
          "fullname": "Adult Universe (18 +) ",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Adult_Universe3kgWjdxqLSARQ1ixgzbWAMPTPVT0F3eJouG1586844611.png",
          "connected": 0,
          "following": 0,
          "personal": "1",
          "owner": 0,
          "stats": {
              "followers": 5,
              "notes": 294
          },
          "idx": "30477"
      },
      {
          "id": "1817",
          "username": "CodeBreaker",
          "fullname": "govardhan chitrada",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/",
          "connected": 0,
          "following": 0,
          "personal": "1",
          "owner": 0,
          "stats": {
              "followers": 18,
              "notes": 4
          },
          "idx": "30468"
      },
      {
          "id": "4777",
          "username": "Ranga",
          "fullname": "Ranga nayak",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Ranga1aoDEpXqZ6kjpahKUjtYJaTMD0iOgiPhseV1560263324.png",
          "connected": 0,
          "following": 0,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 3,
              "notes": 2
          },
          "idx": "30357"
      },
      {
          "id": "4773",
          "username": "mschauhan",
          "fullname": "Bhavana Chauhan",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_mschauhanxyJNqXJ9bB2vX5cVM5K1qMcNajQfD9paI8Y1557296310.png",
          "connected": 0,
          "following": 0,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 9,
              "notes": 0
          },
          "idx": "30251"
      },
      {
          "id": "4771",
          "username": "valykry",
          "fullname": "Shrilekha",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_valykryEI5j5R9GiMcTktKcaWK8Ebg6DzXffysThxd1556264271.png",
          "connected": 0,
          "following": 0,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 6,
              "notes": 1
          },
          "idx": "30243"
      },
      {
          "id": "4770",
          "username": "Abhi444",
          "fullname": "Abhi",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_AbhijithD4M2AIHZx4Y1GehUDvqjqNq3eVdUWJtAOgC1555688063.png",
          "connected": 0,
          "following": 0,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 3,
              "notes": 1
          },
          "idx": "30225"
      },
      {
          "id": "4767",
          "username": "romio",
          "fullname": "Romio ",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_romioTxKflggBWplnaZRlcasBp7rs2rJkvJMogwE1555278217.png",
          "connected": 0,
          "following": 0,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 2,
              "notes": 3
          },
          "idx": "30207"
      },
      {
          "id": "4766",
          "username": "sweetysahu",
          "fullname": "Shalini ",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_sweetysahuWD79XZF89es5GJgHXPwcYZkx1D8jtReqvmz1555277970.png",
          "connected": 0,
          "following": 0,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 8,
              "notes": 175
          },
          "idx": "30196"
      },
      {
          "id": "4761",
          "username": "Ayaan",
          "fullname": "Ayaan",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/pic_default.jpg",
          "connected": 0,
          "following": 0,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 0,
              "notes": 2
          },
          "idx": "30091"
      },
      {
          "id": "4743",
          "username": "Arora888",
          "fullname": "Arora Yadav",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/profile_pic_Arora8886hlkcS3RDsEZgBxBaG5WJhyNPkUFWdy3vUn1549213074.png",
          "connected": 0,
          "following": 0,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 7,
              "notes": 48
          },
          "idx": "30040"
      },
      {
          "id": "4747",
          "username": "Shreyu_ashtamkar",
          "fullname": "Shreyas Ashtamkar",
          "pic": "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/profile_pic/heartynote_profile_pic_Shreyu_ashtamkarW7jI1QEmigfXxSw3NHPdDnxhdHdnWlISt2A1551060925.jpg",
          "connected": 1,
          "following": 1,
          "personal": "0",
          "owner": 0,
          "stats": {
              "followers": 5,
              "notes": 1
          },
          "idx": "30002"
      }
      ]);
    setTrendingVideos(
      [{
      "id": "3731",
      "note_id": "43147",
      "thumb": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_43147_fashionTVtX53Q8AyghwFKHqVQlBSBfWZlC9ucb1591922862.mp4_thumb_.jpg",
      "src": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_43147_fashionTVtX53Q8AyghwFKHqVQlBSBfWZlC9ucb1591922862.mp4",
      "link": "\/n\/fIihEbX388323",
      "views": "35"
    }, {
      "id": "3730",
      "note_id": "43146",
      "thumb": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_43146_fashionTVsBL1VSOTU8zS3wI7GYotaLa9UF2gE31591922851.mp4_thumb_.jpg",
      "src": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_43146_fashionTVsBL1VSOTU8zS3wI7GYotaLa9UF2gE31591922851.mp4",
      "link": "\/n\/hAUsYbg388314",
      "views": "98"
    }, {
      "id": "3729",
      "note_id": "43145",
      "thumb": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_43145_fashionTVOg1s8tnwwvmL1dXMNJG6KEmxucd6eR1591922832.mp4_thumb_.jpg",
      "src": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_43145_fashionTVOg1s8tnwwvmL1dXMNJG6KEmxucd6eR1591922832.mp4",
      "link": "\/n\/RRJFbGk388305",
      "views": "76"
    }, {
      "id": "3598",
      "note_id": "40397",
      "thumb": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_40397_fashionTVCKZF12iy0uh6NE9hlPMU2sL9OtXU6X1564000914.mp4_thumb_.jpg",
      "src": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_40397_fashionTVCKZF12iy0uh6NE9hlPMU2sL9OtXU6X1564000914.mp4",
      "link": "\/n\/sKPeHaJ363573",
      "views": "11"
    }, {
      "id": "3597",
      "note_id": "40396",
      "thumb": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_40396_fashionTV46QCFc4CAZeSyjYI8vu8dBJ6TZu9M01564000904.mp4_thumb_.jpg",
      "src": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_40396_fashionTV46QCFc4CAZeSyjYI8vu8dBJ6TZu9M01564000904.mp4",
      "link": "\/n\/pntnPBe363564",
      "views": "25"
    }, {
      "id": "3596",
      "note_id": "40395",
      "thumb": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_40395_fashionTVu89bNoEJjRggATdFfrwfl5UnUaySKz1564000894.mp4_thumb_.jpg",
      "src": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_40395_fashionTVu89bNoEJjRggATdFfrwfl5UnUaySKz1564000894.mp4",
      "link": "\/n\/QnjYEah363555",
      "views": "19"
    }, {
      "id": "3595",
      "note_id": "40394",
      "thumb": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_40394_fashionTVOaE0lVgUHbwoL0CoVEjb6x3yz5C1Ji1564000876.mp4_thumb_.jpg",
      "src": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_40394_fashionTVOaE0lVgUHbwoL0CoVEjb6x3yz5C1Ji1564000876.mp4",
      "link": "\/n\/bcdyHJF363546",
      "views": "9"
    }, {
      "id": "3594",
      "note_id": "40393",
      "thumb": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_40393_fashionTVAEuidMLrm3YhQJJautydqVSukMTUvH1564000866.mp4_thumb_.jpg",
      "src": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_40393_fashionTVAEuidMLrm3YhQJJautydqVSukMTUvH1564000866.mp4",
      "link": "\/n\/vVvELPc363537",
      "views": "9"
    }, {
      "id": "3554",
      "note_id": "39942",
      "thumb": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_video_thumbs\/heartynote_media_video_39942_fashionTVW4HWuFeF9kcMdSRWDOVmYXRQvUTGSW1563285988.mp4_thumb_.jpg",
      "src": "https:\/\/s3-ap-south-1.amazonaws.com\/hearty-media-uploads\/pics_note\/note_videos\/heartynote_media_video_39942_fashionTVW4HWuFeF9kcMdSRWDOVmYXRQvUTGSW1563285988.mp4",
      "link": "\/n\/CccjYcF359478",
      "views": "18"
    }]
  );
};

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    fetchVideos();
  }, []);

  const onContentSizeChange = (contentWidth, contentHeight) => {
    // this.setState({ screenHeight: contentHeight });
  };

  const onTrendingSizeChange = () => {};

  const changeLayout = () => {
    Vibration.vibrate(100);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={{backgroundColor: theme.backgroundColor}}>
      <View style={[{ height: expanded ? null : 0 }, Styles.headerMenuContainer]}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          onContentSizeChange={onTrendingSizeChange}
        >
          <View style={Styles.headerMenuContent}>
            {
              treningMenu.map(item => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {}}
                  style={[Styles.headerMenuListItem, {backgroundColor: theme.transparentBackgroundColor}]}
                >
                  <Text style={[Styles.headerMenuListItemText, {color: theme.textColor}]}>{item}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </ScrollView>
      </View>
      <View style={Styles.header}>
        <View style={Styles.headerLeft}>
          <Clickable
            onPress={changeLayout}
            style={{marginTop: 6}}
          >
            <MenuIcon width={24} height={24} fill={theme.textColor} />
          </Clickable>
          <Text style={[Styles.homeTitle, {color: theme.textColor}]}>Wittyclip</Text>
        </View>
        <TouchableOpacity
            onPress={() => {
              toggleTheme();
            }}
          >
          <Image source={PremiereIcon} style={{width: 40, height: 30}} />
        </TouchableOpacity>
      </View>
      <ScrollView
        scrollEnabled={true}
        onContentSizeChange={onTrendingSizeChange}
        style={Styles.mainContainerScrollView}
      > 
        <View style={Styles.mainContainer}>
          <View style={Styles.peopleList}>
            <View style={Styles.myProfile}>
              <TouchableOpacity
                style={[Styles.profileIconContainer, {backgroundColor: theme.transparentBackgroundColor}]}
                onPress={() => navigation.navigate("ProfileScreen")}
              >
                <Image
                  source={{
                    uri:
                      "https://s3-ap-south-1.amazonaws.com/hearty-media-uploads/pics_note/note_pic/rinacdbrykiF5QB94rMp3u7qVrtFceRHKSekRIW52fL81580635285.jpg",
                  }}
                  style={Styles.trendingPic}
                />
              </TouchableOpacity>
            </View>
            <View style={[Styles.peopleTrendList, {backgroundColor: theme.transparentBackgroundColor}]}>
              <ScrollView
                style={Styles.peopleTrendListScroll}
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
                          source={{ uri: item.pic }}
                          style={Styles.trendingPic}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
          <Text style={[Styles.homeTitle, {color: theme.textColor}]}>Trending</Text>
          <ScrollView
            horizontal={true}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
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

                      <View style={Styles.videoDetails}>
                        <Text style={[Styles.videoTitle, Styles.videoTitleRed]}>Wittyclip</Text>
                        <Text style={Styles.videoTitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  profileIconContainer: {
    borderTopRightRadius: 200,
    borderBottomRightRadius: 200,
    padding: 16,
    width: 100,
  },
  headerMenuContainer: {
    overflow: 'hidden', 
    marginTop: 36
  },
  headerMenuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  headerMenuListItem: {
    padding: 16,
    marginRight: 8,
    borderRadius: 8
  },
  headerMenuListItemText: {
    color: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  headerMenuIcon: {
    width: 24,
    height: 20,
    marginTop: 3,
    padding: 8
  },
  peopleList: {
    flexDirection: 'row',
  },
  trendingPic: {
    height: 64,
    width: 64,
    maxHeight: 64,
    maxWidth: 64,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: Colors.black,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 10,
  },
  trendingUsername: {
    color: Colors.lightGrey,
    fontSize: 8,
    fontFamily: "Capriola-Regular",
    marginVertical: 5,
    textAlign: 'center',
    maxWidth: 50,
  },
  homeTitle: {
    fontSize: 30,
    fontFamily: "Capriola-Regular",
    fontWeight: "500",
    paddingLeft: 20,
    marginTop: 5,
  },
  mainContainerScrollView: {
    marginBottom: 57,
    paddingBottom: 50
  },
  peopleTrendList: {
    borderTopLeftRadius: 200,
    borderBottomLeftRadius: 200,
    marginLeft: 16,
    marginBottom: 16,
    paddingLeft: 16,
  },
  peopleTrendListScroll: {},
  peopleTrendingFeed: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 16,
    borderTopLeftRadius: 200,
    borderBottomLeftRadius: 200,
  },
  peopleTrendingCard: {
    position: "relative",
    borderRadius: 120,
    marginRight: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  videoFeed: {
    marginVertical: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  videoCard: {
    position: "relative",
    width: Device.ScreenWidth * 0.60,
    height: Device.ScreenHeight - 380,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 24,
    backgroundColor: Colors.transparent3,
  },
  videoCover: {
    width: "100%",
    height: Device.ScreenHeight - 380,
    resizeMode: "cover",
    borderRadius: 20,
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11
  },
  videoWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: Device.ScreenHeight - 380,
    backgroundColor: Colors.transparent2,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  PlayIcon: {
    height: 30,
    width: 30,
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  videoDetails: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 0,
    zIndex: -1,
    borderRadius: 20,
  },
  videoDetails2: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 12,
    color: Colors.lightGrey2,
    maxHeight: 12,
    fontFamily: "Capriola-Regular",
    marginBottom: 16,
    maxWidth: '60%'
  },
  videoTitleRed: {
    color: Colors.white,
    fontSize: 20,
    maxHeight: 20,
    fontFamily: "Capriola-Regular",
    marginBottom: 8,
  },
});

export default HomeTab;
