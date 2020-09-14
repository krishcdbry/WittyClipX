"use strict";
import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  PermissionsAndroid,
  Button,
} from "react-native";
import {
  requestMultiple,
  PERMISSIONS,
} from "react-native-permissions";
import CameraRoll from "@react-native-community/cameraroll";
import Video, { FilterType } from "react-native-video";
import Toast from "react-native-simple-toast";

import { Device } from '../../utils';

class FinalProcessedVideo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    requestMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]).then((result) => {
      if (this.props.uri) {
        this.saveVideo(this.props.uri);
      }
    });
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
    if (Platform.OS === "android") {
      await this.checkAndroidPermission();
      console.log("THEN SAVING");
    }
    CameraRoll.save(uri).then(
      (res) => {
        console.log("Success");
        Toast.show("Video saved to your gallery", Toast.SHORT, [
          "UIAlertController",
        ]);
        setTimeout(() => {
          // this.props.navigation.navigate("HomeScreen");
        }, 500);
      },
      (err) => {
        console.log("Error", err);
      }
    );
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
            height: Device.ScreenHeight,
            width: Device.ScreenWidth,
            backgroundColor: "#202020",
          }}
        />

        <View style={styles.videoButtons}>
          <TouchableOpacity
            style={styles.downloadVideoButton}
            onPress={() => {
              console.log("He he he");
            }}
          >
            <Text style={styles.downloadVideoButtonText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.downloadVideoButton}
            onPress={() => this.saveVideo(this.props.uri)}
          >
            <Text style={styles.downloadVideoButtonText}>Re-Download</Text>
          </TouchableOpacity>
        </View>
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
    width: Device.ScreenWidth,
    height: Device.ScreenHeight,
    zIndex: 9999,
    elevation: 10,
    top: 0,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  videoButtons: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: 'row',
    elevation: 3,
    zIndex: 10000000,
    position: "absolute",
    bottom: 50,
    marginTop: 40,
  },
  downloadVideoButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    height: 42,
    width: 120,
    marginVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#FF544D",
    marginHorizontal: 5,
    shadowColor: "#222222",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
  },
  downloadVideoButtonText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Capriola-Regular",
  },
});

export default FinalProcessedVideo;
