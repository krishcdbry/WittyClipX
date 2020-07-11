"use strict";
import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl
} from "react-native";
import AudioPlayer from "react-native-play-audio";
import AsyncStorage from "@react-native-community/async-storage";
import MusicFiles from "react-native-get-music-files";
import { screenDimensions } from "../../utils/global";
import CommonStyles from "../../styles/common";

import Song from "../../../assets/images/icons/song.png";
import play from "../../../assets/images/icons/play.png";
import pause from "../../../assets/images/icons/pause.png";
import select from "../../../assets/images/icons/select.png";
import use from "../../../assets/images/icons/use.png";

const storeSongs = async (value) => {
  try {
    await AsyncStorage.setItem("songs", JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

class SongsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      searchSongValue: "",
      songs: [],
      selectedSong: null,
      selectedSongIdx: -1,
      playing: false,
      filteredSongs: [],
      onrefresh: false,
    };

    this.searchSongValueInputHandler = this.searchSongValueInputHandler.bind(
      this
    );
  }

  fetchMediaFromDevice() {
    MusicFiles.getAll({
      blured: true, // works only when 'cover' is set to true
      artist: true,
      duration: true, //default : true
      genre: true,
      title: true,
      cover: true,
      minimumSongDuration: 15000, // get songs bigger than 10000 miliseconds duration,
      fields: ["title", "albumTitle", "genre", "lyrics", "artwork", "duration", "cover"], // for iOs Version
    })
      .then((songs) => {
        if (songs && songs.length > 0) {
          storeSongs(songs);
          console.log("Storing songs h ehehe")
          this.setState(
            {
              songs,
              filteredSongs: songs,
              isLoading: false
            },
            () => {
              console.log(songs.length);
            }
          );
        }
      })
      .catch((error) => {
        // catch the error
        console.log(error);
      });
  }

  componentDidMount() {
    try {
      AsyncStorage.getItem("songs").then((data) => {
        if (data) {
          const songs = JSON.parse(data);
          this.setState({
            songs,
            filteredSongs: songs,
            loading: false
          });
        } else {
          this.fetchMediaFromDevice();
        }
      });
    } catch (e) {
      this.fetchMediaFromDevice();
    }
  }

  searchSongValueInputHandler = (val) => {
    this.setState(
      {
        searchSongValue: val,
      },
      () => {
        console.log("Songs filter", this.searchSongValue);
        const filteredSongs = this.state.songs.filter(this.searchedSong);
        this.setState({
          filteredSongs:
            this.state.searchSongValue.length == 0
              ? this.state.songs
              : filteredSongs,
        });
      }
    );
  };

  onScrollSizeChange = () => {};

  renderTitle = (title) => {
    return title.length > 40 ? title.substr(0, 40) + ".." : title;
  };

  searchedSong = (song) => {
    const { searchSongValue } = this.state;
    if (searchSongValue && searchSongValue.length > 1) {
      const title = song.title || "";
      return title.toLowerCase().indexOf(searchSongValue) >= 0;
    }
    return true;
  };

  playSong = (song, idx) => {
    if (this.state.selectedSong) {
      if (this.state.selectedSongIdx === idx) {
        if (this.state.playing) {
          AudioPlayer.pause();
          this.setState({
            playing: false,
          });
        } else {
          AudioPlayer.play();
          this.setState({
            playing: true,
          });
        }
        return;
      } else {
        AudioPlayer.stop();
        this.setState({
          selectedSong: null,
          selectedSongIdx: -1,
          playing: false,
        });
      }
    }

    this.setState(
      {
        selectedSong: song,
        selectedSongIdx: idx,
        playing: true,
      },
      () => {
        AudioPlayer.prepare(this.state.selectedSong.path, () => {
          AudioPlayer.play();
        });
      }
    );
  };

  songSelectAndClose = (item) => {
    this.props.onSelect(item);
    AudioPlayer.stop();
  };

  render() {
    return (
      <View>
        <TextInput
          style={styles.songSelection}
          onChangeText={(val) => this.searchSongValueInputHandler(val)}
          value={this.searchSongValue}
        />
        <ScrollView
          scrollEnabled={true}
          onContentSizeChange={this.onScrollSizeChange}
          refreshControl={
            <RefreshControl refreshing={this.state.onrefresh} onRefresh={this.fetchMediaFromDevice.bind(this)} />}
          style={{
            paddingTop: 10,
          }}
        >
          {this.state.filteredSongs.length > 0 && this.state.filteredSongs.map((item, idx) => {
            if (item.path && item.path.length > 5) {
              return (
                <View key={`song-${idx}`}>
                  <View style={styles.songItemContainer}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={item.cover ? { uri: item.cover } : Song}
                        style={item.cover ? styles.songCover : styles.songIcon}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.title}>
                        {item.title
                          ? this.renderTitle(item.title)
                          : `Song ${idx}`}
                      </Text>
                      <Text style={styles.albumCover}>{item.album}</Text>
                      <View style={styles.songButtons}>
                        <TouchableOpacity
                          style={styles.playpausebutton}
                          onPress={() => this.playSong(item, idx)}
                        >
                          <Image
                            source={
                              this.state.selectedSong &&
                              this.state.selectedSongIdx === idx &&
                              this.state.playing
                                ? pause
                                : play
                            }
                            style={styles.playpauseIcon}
                          />
                          <Text style={styles.buttonText}>Play</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.playpausebutton}
                          onPress={() => this.songSelectAndClose(item, idx)}
                        >
                          <Image source={use} style={styles.useIcon} />
                          <Text style={styles.buttonText}>Select</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }
          })}

          {
              this.state.filteredSongs.length == 0 && !this.state.loading && (
                  <View>
                      <Text>No Songs</Text>
                  </View>
              )
          }

          {
              this.state.loading && (
                  <View>
                    <Text>Loading ....</Text>
                  </View>
              )
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  songSelection: {
    height: 40,
    width: screenDimensions.ScreenWidth - 50,
    borderRadius: 90,
    marginTop: 15,
    paddingLeft: 25,
    backgroundColor: "#161616",
    color: "#fff",
  },
  title: {
    color: "#fff",
    flexWrap: "wrap",
  },
  songItemContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginVertical: 4,
    backgroundColor: "#161616",
    paddingVertical: 5,
    borderRadius: 15,
    shadowColor: "#fff",
    shadowOffset: {
      width: 4,
      height: 16,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#000",
    shadowColor: "#fff",
    shadowOffset: {
      width: 4,
      height: 16,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  songCover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  songIcon: {
    width: 25,
    height: 25,
  },
  textContainer: {
    // display: "flex",
    width: 0,
    flexGrow: 1,
    flex: 1,
    paddingTop: 7,
  },
  albumCover: {
    color: "#aaa",
  },
  songButtons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 10,
    paddingVertical: 5,
  },
  playpausebutton: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: "#fff",
    backgroundColor: "#333",
    borderRadius: 30,
    marginHorizontal: 3,
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    height: 28,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  playpauseIcon: {
    height: 15,
    width: 15,
    marginRight: 3,
  },
  useIcon: {
    height: 15,
    width: 12,
    resizeMode: "contain",
    marginRight: 5,
  },
});

export default SongsList;
