"use strict";
import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  InteractionManager,
  Animated,
  ScrollView,
} from "react-native";
import { RNCamera } from "react-native-camera";
import ImagePicker from "react-native-image-picker";
import Video, { FilterType } from "react-native-video";

import CameraRecord from "../../../../assets/images/icons/dot.png";
import SubmitRecord from "../../../../assets/images/icons/tick.png";
import CancelRecord from "../../../../assets/images/icons/cancel.png";
import SwapCamera from "../../../../assets/images/icons/swap-camera.png";
import Song from "../../../../assets/images/icons/song.png";
import Stop from "../../../../assets/images/icons/stop.png";
import Flash from "../../../../assets/images/icons/flash.png";
import Timer from "../../../../assets/images/icons/timer.png";
import Gallery from "../../../../assets/images/icons/gallery.png";
import More from "../../../../assets/images/icons/more.png";
import Back from "../../../../assets/images/icons/back.png";

import ProgressBar from "../../../plugins/ProgressBar";
import { screenDimensions } from "../../../utils/global";

class CameraScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      isRecording: false,
      recorded: false,
      recordedData: [],
      pause: false,
      time: 0,
      maxLength: 15000,
      cameraType: RNCamera.Constants.Type.front,
      searchSongValue: "",
      showSongPicker: false,
      songPickerAnimatedValue: new Animated.Value(0),
      videoReady: false,
      screenHeight: screenDimensions.ScreenHeight,
    };
  }

  _toggleSongPicker = () => {
    this.setState(
      {
        showSongPicker: !this.state.showSongPicker,
      },
      () => {
        if (this.state.showSongPicker) {
          return Animated.parallel([
            Animated.timing(this.state.songPickerAnimatedValue, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start();
        } else {
          return Animated.parallel([
            Animated.timing(this.state.songPickerAnimatedValue, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start();
        }
      }
    );
  };

  _searchSongValueInputHandler = (e) => {
    this.setState({
      searchSongValue: e.target.value,
    });
  };

  openGallery = () => {
    const options = {
      title: "Select Video",
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: "videos",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  toggleCamera = () => {
    let { cameraType } = this.state;
    if (cameraType == RNCamera.Constants.Type.back) {
      cameraType = RNCamera.Constants.Type.front;
    } else {
      cameraType = RNCamera.Constants.Type.back;
    }
    console.log(cameraType);
    this.setState(
      {
        cameraType,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  stopCapture = (isPause) => {
    const shouldStopCapture = () => {
      this.stopTimer();
      this.camera.stopRecording();

      let stateUpdateObject = {
        isRecording: false,
        recorded: false,
      };

      if (!isPause) {
        stateUpdateObject.time = 0;
        stateUpdateObject.pause = false;
      }

      this.setState(stateUpdateObject, () => {
        console.log(this.state, "Stopped");
      });
    };

    if (this.props.runAfterInteractions) {
      InteractionManager.runAfterInteractions(shouldStopCapture);
    } else {
      shouldStopCapture();
    }
  };

  startTimer = () => {
    this.timer = setInterval(() => {
      const time = this.state.time + 100;
      // console.log(time, this.state.maxLength, time/this.state.maxLength);
      this.setState({ time, progress: time / this.state.maxLength });
      if (this.state.maxLength > 0 && time >= this.state.maxLength) {
        this.stopCapture();
      }
    }, 100);
  };

  stopTimer = () => {
    if (this.timer) clearInterval(this.timer);
  };

  convertTimeString = (time) => {
    return `${Number(time / 1000).toFixed(0)} Sec`;
  };

  renderTimer() {
    const { isRecording, time, recorded } = this.state;
    return (
      <View style={styles.timer}>
        {(recorded || isRecording) && (
          <Text style={styles.timerText}>{this.convertTimeString(time)}</Text>
        )}
      </View>
    );
  }

  submitVideo = () => {
    const { isRecording } = this.state;
    if (isRecording) {
      this.stopRecording();
    }
    setTimeout(() => {
      console.log("============ FINAL DATA \n =============== ");
      const videos = this.state.recordedData.map((item) => item.uri);
      console.log(videos);
      console.log("============ FINAL DATA \n =============== ");
      this.setState({
        recorded: false,
        time: 0,
        pause: false,
        videoReady: true,
      });
    }, 250);
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  recordVideo = async () => {
    if (this.camera) {
      const options = {
        quality: "480p",
        maxDuration: 15,
        maxFileSize: 100 * 1024 * 1024,
      };
      const { uri, codec = "mp4" } = await this.camera.recordAsync(options);
      console.log(uri, codec);
    }
  };

  stopRecording() {
    this.camera.stopRecording();
  }

  onRecordingEnd = () => {
    this.stopTimer();
    this.setState({
      isRecording: false,
    });
  };

  startCapture = (isPauseRestart) => {
    const shouldStartCapture = () => {
      this.camera
        .recordAsync(this.props.recordOptions)
        .then((data) => {
          let { recordedData } = this.state;
          recordedData = recordedData.slice(0);
          recordedData.push(data);
          this.setState({
            recorded: true,
            recordedData,
          });
        })
        .catch((err) => console.error(err));
      setTimeout(() => {
        this.startTimer();
        this.setState({
          isRecording: true,
          recorded: false,
          time: isPauseRestart ? this.state.time : 0,
          pause: false,
        });
      });
    };
    if (this.state.maxLength > 0 || this.state.maxLength < 0) {
      if (this.props.runAfterInteractions) {
        InteractionManager.runAfterInteractions(shouldStartCapture);
      } else {
        shouldStartCapture();
      }
    }
  };

  pauseCapture = () => {
    const { pause } = this.state;
    console.log("pppppppppppppp", pause);
    if (pause) {
      this.setState(
        {
          pause: false,
        },
        () => {
          this.startCapture(1);
        }
      );
    } else {
      console.log("Stopping");
      this.setState(
        {
          pause: true,
        },
        () => {
          this.stopCapture(1);
        }
      );
    }
  };

  _recordVideo() {
    this.camera
      .capture({ mode: RNCamera.Constants.CaptureMode.video })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const onProgress = (data) => {
      console.log("Progess", data, this.camera.isRecording);
    };

    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.cameraType}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          onProgress={onProgress}
          onRecordingEnd={this.onRecordingEnd.bind(this)}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
          androidRecordAudioPermissionOptions={{
            title: "Permission to use audio recording",
            message: "We need your permission to use your audio",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
        />

        <View style={styles.bottomControls}>
          {this.renderTimer()}
          {(this.state.isRecording || this.state.recorded) && (
            <TouchableOpacity
              onPress={this.stopCapture.bind(this)}
              style={styles.iconContainer}
            >
              <Image source={CancelRecord} style={styles.miniIcon} />
            </TouchableOpacity>
          )}

          {(this.state.isRecording || this.state.time > 0) &&
            (!this.state.recorded || this.state.pause) && (
              <View style={styles.progressBar}>
                <ProgressBar
                  size={60}
                  thickness={5}
                  border={5}
                  color={"#d32f2f"}
                  progress={this.state.progress}
                />
              </View>
            )}

          {this.state.isRecording && (
            <TouchableOpacity onPress={this.pauseCapture.bind(this)}>
              <Image source={Stop} style={styles.miniIcon} />
            </TouchableOpacity>
          )}

          {!this.state.isRecording && (
            <TouchableOpacity onPress={this.startCapture.bind(this)}>
              <Image source={CameraRecord} style={styles.mediumIcon} />
            </TouchableOpacity>
          )}

          {(this.state.isRecording || this.state.recorded) && (
            <TouchableOpacity
              onPress={this.submitVideo.bind(this)}
              style={styles.iconContainer}
            >
              <Image source={SubmitRecord} style={styles.miniIcon} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.otherOptions}>
          <TouchableOpacity
            style={[styles.iconContainer, styles.songIcon]}
            onPress={this.openGallery.bind(this)}
          >
            <Image source={Gallery} style={styles.otherOptionsIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconContainer, styles.swapCamera]}
            onPress={this.toggleCamera.bind(this)}
          >
            <Image source={SwapCamera} style={styles.otherOptionsIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconContainer, styles.songIcon]}
            onPress={this._toggleSongPicker.bind(this)}
          >
            <Image source={Song} style={styles.otherOptionsIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconContainer, styles.songIcon]}>
            <Image source={Flash} style={styles.otherOptionsIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconContainer, styles.songIcon]}>
            <Image source={Timer} style={styles.otherOptionsIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconContainer, styles.songIcon]}>
            <Image source={More} style={styles.otherOptionsIcon} />
          </TouchableOpacity>
        </View>

        {this.state.showSongPicker && (
          <Animated.View
            style={[
              styles.songPicker,
              {
                transform: [
                  {
                    translateY: this.state.songPickerAnimatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [600, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.songPickerTitle}>Select Song</Text>
            <TouchableOpacity
              style={[styles.iconContainer, styles.backIconContainer]}
              onPress={this._toggleSongPicker.bind(this)}
            >
              <Image source={Back} style={styles.backIcon} />
            </TouchableOpacity>
            <View>
              <TextInput
                style={styles.songSelection}
                onChangeText={(e) =>
                  this._searchSongValueInputHandler(e).bind(this)
                }
                value={this.searchSongValue}
              />
            </View>
          </Animated.View>
        )}

        {this.state.recordedData &&
          this.state.recordedData.length > 0 &&
          this.state.videoReady && (
            <View style={styles.songPicker}>
              <TouchableOpacity
                style={[styles.iconContainer, styles.backIconContainer]}
                onPress={() => this.setState({ videoReady: false })}
              >
                <Image source={Back} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.songPickerTitle}>Quick Preview</Text>
              <ScrollView
                style={[
                  styles.scrollView,
                  { flex: 1, height: screenDimensions.ScreenHeight - 200 },
                ]}
                scrollEnabled={true}
                onContentSizeChange={this.onContentSizeChange}
              >
                <View style={styles.videoPlaylist}>
                  {this.state.recordedData.map((item, idx) => {
                    return (
                      <Video
                        key={idx}
                        source={{ uri: item.uri }}
                        muted={false}
                        repeat={false}
                        controls={true}
                        resizeMode={"cover"}
                        rate={1}
                        filter={FilterType.SEPIA}
                        paused={true}
                        ignoreSilentSwitch={"obey"}
                        style={{
                          width: screenDimensions.ScreenWidth - 100,
                          height: 160,
                          marginVertical: 10,
                          borderRadius: 12,
                        }}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
  timer: {
    position: "absolute",
    top: -15,
    left: screenDimensions.ScreenWidth / 2 - 15,
    marginVertical: 7,
  },
  timerText: {
    color: "#fff",
  },
  bottomControls: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 70,
    width: "100%",
    height: 90,
    padding: 15,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.35)",
  },
  mediumIcon: {
    width: 60,
    height: 60,
  },
  otherOptionsIcon: {
    width: 18,
    height: 18,
  },
  miniIcon: {
    width: 20,
    height: 20,
  },
  progressBar: {
    position: "absolute",
    bottom: 14,
    left: screenDimensions.ScreenWidth / 2 - 30,
  },
  otherOptions: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 50,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 40,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  songPicker: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 90,
    padding: 10,
    paddingTop: 20,
    height: 450,
    backgroundColor: "#202020",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: "flex",
    alignItems: 'center',
    flexDirection: "column",
  },
  songPickerTitle: {
    fontSize: 17,
    color: "#fff",
    fontFamily: "Capriola-Regular",
  },
  backIconContainer: {
    position: "absolute",
    left: 10,
    top: 7,
  },
  backIcon: {
    width: 15,
    height: 15,
  },
  songSelection: {
    height: 40,
    width: screenDimensions.ScreenWidth - 50,
    borderRadius: 90,
    marginVertical: 15,
    backgroundColor: "#161616",
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  videoPlaylist: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
});

export default CameraScreen;
