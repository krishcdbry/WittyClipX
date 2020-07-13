"use strict";
import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  Button,
} from "react-native";

import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";
import CameraRoll from "@react-native-community/cameraroll";
import { screenDimensions } from "../../utils/global";
import Video, { FilterType } from "react-native-video";
import CommonStyles from "../../styles/common";
import Toast from "react-native-simple-toast";

class FinalProcessedVideo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    requestMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]).then((result) => {});
  }

  checkAndroidPermission = async () => {
    try {
      console.log("ASKING PERMISSIONS");
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      PermissionsAndroid.request(permission).then((res) => {
        console.log("ASKING PERMISSIONS RESOLVING", res);
        Promise.resolve();
      });
    } catch (error) {
      Promise.reject(error);
    }
  };

  saveVideo = async (uri) => {
      console.log("URI", uri)
    if (Platform.OS === "android") {
      await this.checkAndroidPermission();
      console.log("THEN SAVING");
      CameraRoll.save(uri).then(
        (res) => {
          console.log("Success");
          Toast.show("Video saved to your gallery", Toast.SHORT, [
            "UIAlertController",
          ]);
          setTimeout(() => {
            this.props.navigation.navigate("HomeScreen")
          }, 500)
        },
        (err) => {
          console.log("Error", err);
        }
      );
    }
  };

  render() {
    console.log(this.props);
    return (
      <View style={styles.FinalProcessedVideoContainer}>
        <Video
          source={{ uri: this.props.uri }}
          muted={false}
          repeat={false}
          resizeMode={"contain"}
          rate={1}
          filter={FilterType.TONAL}
          //   paused={true}
          style={{
            height: screenDimensions.ScreenHeight,
            width: screenDimensions.ScreenWidth,
            backgroundColor: "#202020",
          }}
        />

        <TouchableOpacity
          style={styles.downloadVideoButton}
          onPress={() => this.saveVideo(this.props.uri)}
        >
          <Text style={styles.downloadVideoButtonText}>Download Video</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  FinalProcessedVideoContainer: {
    flex: 1,
    position: "absolute",
    flexDirection: "column",
    backgroundColor: "#202020",
    width: screenDimensions.ScreenWidth,
    height: screenDimensions.ScreenHeight,
    zIndex: 9999,
    elevation: 10,
    top: 0,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  downloadVideoButton: {
    marginTop: 40,
    ...CommonStyles.flex,
    borderRadius: 20,
    height: 35,
    paddingHorizontal: 15,
    backgroundColor: "#FF544D",
    marginHorizontal: 5,
    shadowColor: "#fff",
    shadowOffset: {
      width: 4,
      height: 16,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
    zIndex: 10000000,
    position: 'absolute',
    bottom: 60
  },
  downloadVideoButtonText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Capriola-Regular",
  },
});

export default FinalProcessedVideo;
