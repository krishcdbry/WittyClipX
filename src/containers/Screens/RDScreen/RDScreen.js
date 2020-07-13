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
  Dimensions,
  ScrollView,
  Platform,
  Easing,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  DeviceEventEmitter,
} from "react-native";
import MultiSlider from "../../../plugins/MultiSlider";
import { RNCamera } from "react-native-camera";
import ImagePicker from "react-native-image-picker";
import Video, { FilterType } from "react-native-video";
import RNVideoEditor from "react-native-video-editor";
import Toast from "react-native-simple-toast";
import AudioPlayer from "react-native-play-audio";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";

import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";
import { RNFFmpeg, RNFFprobe, RNFFmpegConfig } from "react-native-ffmpeg";
import CameraRoll from "@react-native-community/cameraroll";

import SubmitRecord from "../../../../assets/images/icons/tick.png";
import CancelRecord from "../../../../assets/images/icons/cancel.png";
import SwapCamera from "../../../../assets/images/icons/swap-camera.png";
import Song from "../../../../assets/images/icons/song.png";
import Flash from "../../../../assets/images/icons/flash.png";
import FlashOff from "../../../../assets/images/icons/flash-off.png";
import Timer from "../../../../assets/images/icons/timer.png";
import Gallery from "../../../../assets/images/icons/gallery.png";
import More from "../../../../assets/images/icons/more.png";
import Back from "../../../../assets/images/icons/back.png";
import Logo from "../../../../assets/images/logom.png";

import ProgressBar from "../../../plugins/ProgressBar";
import { screenDimensions } from "../../../utils/global";
import CommonStyles from "../../../styles/common";
import SongsList from "../../../components/SongsList/SongsList";

class CameraScreeen extends PureComponent {
  constructor(props) {
    super(props);

    const maxOpacity = 0.25;
    this.state = {
      permissionsGranted: false,
      progress: 0,
      isRecording: false,
      recorded: false,
      recordedData: [],
      pause: false,
      time: 0,
      recordedVideoTime: 0,
      finalVideoCurrentTime: 0,
      maxLength: 15,
      cameraZoom: 0,
      cameraType: RNCamera.Constants.Type.front,
      showSongPicker: false,
      songPickerAnimatedValue: new Animated.Value(0),
      videoReady: false,
      screenHeight: screenDimensions.ScreenHeight,
      finalVideoUrl: null,
      flashMode: RNCamera.Constants.FlashMode.off,
      width: 50,
      maxOpacity,
      scaleValue: new Animated.Value(0.01),
      opacityValue: new Animated.Value(maxOpacity),
      songs: [],
      selectedSong: null,
      finalVideoThumbPath: null,
      finalVideoPaused: false,
      nonCollidingMultiSliderValue: [0, 100],
    };

    this.spinValue = new Animated.Value(0);
    this.spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    this.renderRippleView = this.renderRippleView.bind(this);
    this.startCapture = this.startCapture.bind(this);
    this.pauseCapture = this.pauseCapture.bind(this);
    this.stopCapture = this.stopCapture.bind(this);
    this.songSelected = this.songSelected.bind(this);
    this.selectZoom = this.selectZoom.bind(this);
    this.processFinalVideo = this.processFinalVideo.bind(this);
  }

  componentDidMount() {
    this.setState({
      width: screenDimensions.ScreenWidth / 2,
    });
    requestMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]).then((result) => {
        this.setState({
          permissionsGranted: true
        })
    });
  }

  selectZoom(cameraZoom = 0) {
    this.setState({
      cameraZoom,
    });
  }

  songIconAnimate() {
    if (this.animatedVal) {
      this.animatedVal.stop();
      this.animatedVal = null;
    } else {
      this.animatedVal = Animated.loop(
        Animated.timing(this.spinValue, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      this.animatedVal.start();
    }
  }

  toggleTorch() {
    let { flashMode } = this.state;
    this.setState({
      flashMode:
        flashMode === RNCamera.Constants.FlashMode.torch
          ? RNCamera.Constants.FlashMode.off
          : RNCamera.Constants.FlashMode.torch,
    });
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
    if (this.state.isRecording || this.state.pause) {
      Toast.show(
        "Cancel the recording if you want to choose from gallery ",
        Toast.SHORT,
        ["UIAlertController"]
      );
      return;
    }
    const options = {
      title: "Select Video",
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

      console.log("IS OAUSED? ", isPause);

      if (!isPause) {
        stateUpdateObject.pause = false;
      }

      this.setState(stateUpdateObject, () => {
        console.log(this.state, "Stopped");
      });
    };

    shouldStopCapture();
    // if (this.props.runAfterInteractions) {
    //   InteractionManager.runAfterInteractions(shouldStopCapture);
    // } else {
    //   shouldStopCapture();
    // }
  };

  startTimer = () => {
    this.timer = setInterval(() => {
      const time = this.state.time + 1;
      // console.log(time, this.state.maxLength, time/this.state.maxLength);
      this.setState({ time, progress: time / this.state.maxLength });
      if (this.state.maxLength > 0 && time >= this.state.maxLength) {
        this.setState({
          progressBar: 100,
        });
        this.stopCapture();
      }
    }, 1000);
  };

  stopTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      // const adjustedTime = this.state.time - 200;
      // this.setState({
      //   time: adjustedTime,
      //   progress: adjustedTime / this.state.maxLength,
      // });
    }
  };

  convertTimeString = (time) => {
    return `${Number(time).toFixed(0)} Sec`;
  };

  renderTimer() {
    const { isRecording, pause, time, recorded } = this.state;
    return (
      <View
        style={[
          styles.timer,
          {
            opacity: (isRecording || pause) && time > 0 ? 1 : 0,
            transform: [
              {
                translateX: -this.state.width / 2,
              },
            ],
          },
        ]}
      >
        {(recorded || isRecording || pause) && (
          <Text style={styles.timerText}>{this.convertTimeString(time)}</Text>
        )}
      </View>
    );
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
      CameraRoll.save(uri).then(
        (res) => {
          console.log("Success");
        },
        (err) => {
          console.log("Error", err);
        }
      );
    }
  };

  generateFinalVideoOutputFile = () => {
    return `file://${
      RNFS.DocumentDirectoryPath
    }-generated-output-file-${new Date().toLocaleTimeString()}.mp4`;
  };

  generateVideoFrames = () => {
    const { finalVideoUrl } = this.state;
    RNFFmpeg.execute(
      `-i ${finalVideoUrl} -r 1 -vf scale=250:-1 ${finalVideoUrl}_thumb_%01d.jpg`
    ).then(
      (res) => {
        console.log("Execute result", res);
        this.setState({
          finalVideoThumbPath: `${finalVideoUrl}_thumb_`,
        });
      },
      (err) => {
        console.log("Error generating thumbnails", err);
      }
    );
  };

  processFinalVideo = async () => {
    const { finalVideoUrl, recordedVideoTime } = this.state;
    let { selectedSong } = this.state;
    if (selectedSong && selectedSong.path) {
      selectedSong = `file://${selectedSong.path.trim().replace(/ /g,"%20")}`
    }

    // Generating watermark
    const watermark = "logom.png";
    const watermarkAbsolutePath = `file://${
      RNFS.DocumentDirectoryPath
    }/${watermark}`;

    // TODO: Some error in this - await not working
    RNFS.copyFileAssets(watermark, watermarkAbsolutePath)
      .then(async () => {
        // Output file
        const finalFileWithWatermark = this.generateFinalVideoOutputFile();

        const songAndWaterMarkMixerCommand  = `-ss 0 -t ${recordedVideoTime} -i ${finalVideoUrl} -loop 1 -i ${watermarkAbsolutePath} -i ${selectedSong} \
        -filter_complex "[1]format=yuva420p,fade=in:st=1:d=1:alpha=1[i];[0][i]overlay=x=15:y=15:shortest=1[v]" \
        -qscale:v 9 -pix_fmt yuv420p -c:a aac -strict -2 \
        -map "[v]" -map 2:a -shortest  ${finalFileWithWatermark}`

        const waterMarkCommand  = `-ss 0 -t ${recordedVideoTime} -i ${finalVideoUrl} -loop 1 -i ${watermarkAbsolutePath} \
        -filter_complex "[1]format=yuva420p,fade=in:st=1:d=1:alpha=1[i];[0][i]overlay=x=15:y=15" \
        -qscale:v 9 -pix_fmt yuv420p -c:a aac -strict -2 -shortest  ${finalFileWithWatermark}`

        const finalVideoFile = await RNFFmpeg.execute(selectedSong ? songAndWaterMarkMixerCommand : waterMarkCommand);
        if (!finalVideoFile) {
          this.setState({ finalVideoUrl });
        }
        this.setState({ finalVideoUrl: finalFileWithWatermark }, () => {
          //
          this.saveVideo(`file://${finalFileWithWatermark}`)
        });
      })
      .catch((_err) => {
        console.log("error", _err);
        this.setState({ finalVideoUrl });
      });
  };

  setPreProcessedVideo = video => {
    this.setState(
      {
        finalVideoUrl: video,
      },
      () => {
        this.generateVideoFrames();

        const {selectedSong} = this.state;
        if (!selectedSong) return;

        console.log("SONG SELECTED", selectedSong);

        AudioPlayer.setTime(0);
        AudioPlayer.play();
        setInterval(() => {
          this.currentAudioTimer = AudioPlayer.getCurrentTime((currentTime) => {
            if (currentTime >= this.state.recordedVideoTime) {
              AudioPlayer.setTime(0)
              AudioPlayer.play()
            }
          });
        }, 1000);
      }
    );
  }

  submitVideo = async () => {
    const { isRecording } = this.state;

    if (isRecording) {
      this.stopRecording();
    }

    setTimeout(() => {
      const videos = this.state.recordedData.map((item) => item.uri);
      this.setState({
        pause: false,
        videoReady: true,
        recorded: true,
        recordedVideoTime: this.state.time,
        nonCollidingMultiSliderValue: [0, this.state.time],
      });

      if (videos.length > 1) {
        try {
          RNVideoEditor.merge(
            videos,
            (results) => {
              console.log("Error: " + results);
            },
            (_, file) => {
              console.log("FILEEEEE", file);
              this.setPreProcessedVideo(`file://${file}`)
              // this.processFinalVideo(`file://${file}`);
            }
          );
        } catch (e) {
          console.log("Error", e);
        }
      } else {
        this.setPreProcessedVideo(videos[0])
      }
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
    if (this.state.time >= this.state.maxLength) {
      Toast.show("You have reached MAX duration ", Toast.SHORT, [
        "UIAlertController",
      ]);
      return;
    }

    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start();

    if (this.state.pause) {
      isPauseRestart = true;
    }
    console.log("startttt", this.state.isRecording, isPauseRestart);
    if (this.state.isRecording && !isPauseRestart) return;
    const shouldStartCapture = () => {
      try {
        AudioPlayer.getDuration((duration) => {
          if (!isPauseRestart && this.state.selectedSong) {
            AudioPlayer.prepare(this.state.selectedSong.path, () => {
              AudioPlayer.play();
            });
          } else {
            AudioPlayer.play();
          }
        });
      } catch (e) {
        //
      }
      this.camera
        .recordAsync({
          quality: RNCamera.Constants.VideoQuality["1080p"],
          targetBitrate: 1000 * 1000 * 40, // 5 Mbps
        })
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
    shouldStartCapture();
    // if (this.state.maxLength > 0 || this.state.maxLength < 0) {
    //   if (this.props.runAfterInteractions) {
    //     InteractionManager.runAfterInteractions(shouldStartCapture);
    //   } else {
    //     shouldStartCapture();
    //   }
    // }
  };

  pauseCapture = () => {
    if (this.state.time < 1) return;
    Animated.timing(this.state.opacityValue, {
      toValue: 0,
      useNativeDriver: Platform.OS === "android",
    }).start(() => {
      this.state.scaleValue.setValue(0.01);
      this.state.opacityValue.setValue(this.state.maxOpacity);
    });
    const { pause } = this.state;
    if (pause) {
      this.setState(
        {
          pause: false,
        },
        () => {
          try {
            AudioPlayer.play();
          } catch (e) {
            //
          }
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
          try {
            AudioPlayer.pause();
          } catch (e) {
            //
          }
          this.stopCapture(1);
        }
      );
    }
  };

  cancelRecording = () => {
    Animated.timing(this.state.opacityValue, {
      toValue: 0,
      useNativeDriver: Platform.OS === "android",
    }).start(() => {
      this.state.scaleValue.setValue(0.01);
      this.state.opacityValue.setValue(this.state.maxOpacity);
    });
    this.setState({
      isRecording: false,
      recorded: false,
      pause: false,
      time: 0,
      progress: 0,
      recordedData: [],
      finalVideoUrl: null,
      videoReady: false,
    });
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

  renderRippleView() {
    const { scaleValue, opacityValue } = this.state;
    const rippleSize = 160;
    return (
      <Animated.View
        useNativeDriver={Platform.OS === "android"}
        style={{
          position: "absolute",
          left: -20,
          top: -20,
          width: rippleSize,
          height: rippleSize,
          borderRadius: rippleSize / 2,
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
          backgroundColor: "black",
        }}
      />
    );
  }

  songSelected = (selectedSong) => {
    this._toggleSongPicker();
    this.setState(
      {
        selectedSong,
      },
      () => {
        this.songIconAnimate();
        AudioPlayer.prepare(this.state.selectedSong.path, () => {
          Toast.show("Song loaded ", Toast.SHORT, ["UIAlertController"]);
        });
      }
    );
  };

  componentWillUnmount() {
    const {selectedSong} = this.state;
    if (!selectedSong) return;

    if (this.currentAudioTimer) {
      clearInterval(this.currentAudioTimer);
    }
    AudioPlayer.stop()
  }

  render() {
    const {
      cameraZoom,
      videoReady,
      isRecording,
      cameraType,
      selectedSong,
      flashMode,
      recordedVideoTime,
      finalVideoThumbPath,
      finalVideoCurrentTime,
      nonCollidingMultiSliderValue,
      finalVideoPaused
    } = this.state;

    const onProgress = (data) => {
      // console.log("Progess", data, this.camera.isRecording);
    };

    const renderZoomStyles = (zoom) => {
      return cameraZoom === zoom
        ? [styles.zoomControlOption, styles.zoomControlOptionActive]
        : styles.zoomControlOption;
    };

    const renderThumbnails = () => {
      const thumbs = [];
      for (let idx = 1; idx <= recordedVideoTime; idx++) {
        thumbs.push(
          <View
            key={`video-thumb-${idx}`}
          >
            <Image
              source={{ uri: `${finalVideoThumbPath}${idx}.jpg` }}
              style={styles.videoThumb}
            />
          </View>
        );
      }
      return thumbs;
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.topRightBackArrow}
          onPress={() => this.props.navigation.navigate("HomeScreen")}
        >
          <Image source={Back} style={styles.miniIcon} />
        </TouchableOpacity>

        {!videoReady && (
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
            useNativeZoom={true}
            zoom={cameraZoom}
            style={styles.preview}
            type={cameraType}
            flashMode={flashMode}
            captureAudio={selectedSong ? false : true}
            onProgress={onProgress}
            onRecordingEnd={this.onRecordingEnd.bind(this)}
            quality={"720p"}
            codec={"H264"}
            birtate="30000"
            exposure={0.5}
            faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate} // Need to test
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
        )}

        {this.renderTimer()}

        <View style={styles.zoomControls}>
          <TouchableOpacity
            style={renderZoomStyles(0)}
            onPress={() => this.selectZoom(0)}
          >
            <Text style={styles.zoomControlOptionText}>1x</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={renderZoomStyles(0.25)}
            onPress={() => this.selectZoom(0.25)}
          >
            <Text style={styles.zoomControlOptionText}>1.25x</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={renderZoomStyles(0.5)}
            onPress={() => this.selectZoom(0.5)}
          >
            <Text style={styles.zoomControlOptionText}>1.5x</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={renderZoomStyles(0.7)}
            onPress={() => this.selectZoom(0.75)}
          >
            <Text style={styles.zoomControlOptionText}>1.75x</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={renderZoomStyles(1)}
            onPress={() => this.selectZoom(1)}
          >
            <Text style={styles.zoomControlOptionText}>2x</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomControls}>
          {(this.state.recorded || this.state.pause) && (
            <TouchableOpacity
              onPress={this.cancelRecording.bind(this)}
              style={styles.iconContainer}
            >
              <Image source={CancelRecord} style={styles.miniIcon} />
            </TouchableOpacity>
          )}

          <TouchableWithoutFeedback
            onLongPress={() => this.startCapture()}
            onPressOut={() => this.pauseCapture()}
            style={{
              position: "relative",
            }}
          >
            <View>
              {this.renderRippleView()}

              {(this.state.isRecording ||
                this.state.pause ||
                this.state.progress > 0.9) && (
                <View
                  style={{
                    position: "absolute",
                    zIndex: 10,
                  }}
                >
                  <ProgressBar
                    size={120}
                    thickness={3.5}
                    border={3.5}
                    color={this.state.progress > 0.98 ? "#32CD32" : "#d32f2f"}
                    progress={this.state.progress}
                  />
                </View>
              )}

              <View style={styles.recordCircle}>
                <Text style={[styles.pressHold]}>Press & Hold</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          {(this.state.recorded || this.state.pause) && (
            <TouchableOpacity
              onPress={this.submitVideo.bind(this)}
              style={styles.iconContainer}
            >
              <Image source={SubmitRecord} style={styles.miniIcon} />
            </TouchableOpacity>
          )}
        </View>

        {!isRecording && (
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
              style={[
                styles.iconContainer,
                styles.songIcon,
                {
                  backgroundColor: this.state.selectedSong
                    ? "#FF544D"
                    : "rgba(32,32,32,0.69)",
                },
              ]}
              onPress={this._toggleSongPicker.bind(this)}
            >
              {this.state.selectedSong ? (
                <Animated.Image
                  style={[
                    styles.otherOptionsIcon,
                    { transform: [{ rotate: this.spin }] },
                  ]}
                  source={Song}
                />
              ) : (
                <Image source={Song} style={styles.otherOptionsIcon} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconContainer, styles.songIcon]}
              onPress={() => this.toggleTorch()}
            >
              <Image
                source={
                  this.state.flashMode === RNCamera.Constants.FlashMode.off
                    ? Flash
                    : FlashOff
                }
                style={styles.otherOptionsIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.iconContainer, styles.songIcon]}>
              <Image source={Timer} style={styles.otherOptionsIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.iconContainer, styles.songIcon]}>
              <Image source={More} style={styles.otherOptionsIcon} />
            </TouchableOpacity>
          </View>
        )}

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
            <SongsList onSelect={this.songSelected} />
          </Animated.View>
        )}

        {this.state.recordedData &&
          this.state.recordedData.length > 0 &&
          this.state.videoReady && (
            <View style={styles.videoFinalContainer}>
              {/* <TouchableOpacity
                style={[
                  styles.iconContainer,
                  styles.backIconContainer,
                  styles.backIconFinal,
                ]}
                onPress={() => this.setState({ videoReady: false })}
              >
                <Image source={Back} style={styles.backIcon} />
              </TouchableOpacity> */}

              {this.state.finalVideoUrl && this.state.finalVideoUrl.length > 5 && (
                <TouchableOpacity onPress={() => {
                  this.setState({
                    finalVideoPaused: !this.state.finalVideoPaused
                  }, () => {
                    if (this.state.finalVideoPaused) {
                      AudioPlayer.pause();
                    } else {
                      AudioPlayer.play();
                    }
                  })
                }}>
                <Video
                  source={{ uri: this.state.finalVideoUrl }}
                  muted={false}
                  repeat={true}
                  controls={false}
                  currentTime={finalVideoCurrentTime}
                  seek={finalVideoCurrentTime}
                  resizeMode={"contain"}
                  rate={1}
                  filter={FilterType.TONAL}
                  paused={finalVideoPaused}
                  ignoreSilentSwitch={"obey"}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
                </TouchableOpacity>
              )}

              <View style={styles.videoWatermark}>
                <Image source={Logo} style={styles.watermarkLogo} />
                <Text style={styles.watermarkText}>KrishCdbry</Text>
              </View>

              <View style={styles.saveVideoButtons}>
                <TouchableOpacity style={[styles.saveVideoButton, styles.cancelButton]}>
                  <Text style={styles.saveVideoButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveVideoButton} onPress={this.processFinalVideo}>
                  <Text style={styles.watermarkText}>Save</Text>
                </TouchableOpacity>
              </View>

              {this.state.finalVideoThumbPath && (
                <View style={styles.thumbSlider}>
                  <View style={styles.thumbSliderSlide}>
                    <MultiSlider
                      values={[
                        nonCollidingMultiSliderValue[0],
                        nonCollidingMultiSliderValue[1],
                      ]}
                      style={{
                        width: '100%',
                        opacity: 0.2,
                        paddingHorizontal: 17,
                      }}
                      sliderLength={screenDimensions.ScreenWidth - 65}
                      onValuesChange={(val) => {
                        this.setState({
                          finalVideoCurrentTime:
                            finalVideoCurrentTime === val[0] ? val[1] : val[0],
                          nonCollidingMultiSliderValue: val,
                        })
                        AudioPlayer.setTime(val[0])
                      }}
                      trackStyle={{
                        opacity: 0,
                      }}
                      height={80}
                      min={0}
                      max={recordedVideoTime}
                      step={1}
                      allowOverlap={false}
                      snapped
                      minMarkerOverlapDistance={50}
                      customMarker={(e) => (
                        <View
                          style={styles.customMarkerStyle}
                          currentValue={e.currentValue}
                        />
                      )}
                    />
                  </View>

                  <View style={styles.thumbSliderThumbs}>
                    {renderThumbnails()}
                  </View>
                </View>
               )} 
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
  recordCircle: {
    width: 120,
    height: 120,
    borderRadius: 200,
    borderWidth: 3.5,
    borderColor: "#ddd",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    ...CommonStyles.flex,
  },
  pressHold: {
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  timer: {
    position: "absolute",
    top: 45,
    right: 5,
    opacity: 0,
    marginVertical: 7,
    borderRadius: 15,
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 2,
    ...CommonStyles.flex,
  },
  timerText: {
    color: "#fff",
    fontSize: 9,
  },
  bottomControls: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 80,
    width: "100%",
    height: 150,
    padding: 15,
  },
  mediumIcon: {
    width: 100,
    height: 100,
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
    bottom: 10,
    left: screenDimensions.ScreenWidth / 2 - 50,
    zIndex: 10,
    shadowColor: "#fff",
    shadowOffset: {
      width: 4,
      height: 16,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
    zIndex: 1,
  },
  otherOptions: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 50,
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 40,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 90,
    marginHorizontal: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(32,32,32,0.69)",
    shadowColor: "#fff",
    shadowOffset: {
      width: 4,
      height: 16,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
    zIndex: 1,
  },
  songPicker: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 90,
    padding: 10,
    paddingTop: 20,
    height: screenDimensions.ScreenHeight,
    backgroundColor: "#202020",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    elevation: 5,
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
  scrollView: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  videoPlaylist: {
    flexDirection: "column",
    width: "100%",
    ...CommonStyles.flex,
  },
  topRightBackArrow: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 50,
  },
  videoFinalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: screenDimensions.ScreenWidth,
    height: screenDimensions.screenHeight,
    zIndex: 120,
    backgroundColor: "#000",
    elevation: 5,
  },
  backIconFinal: {
    zIndex: 200,
  },
  toggleTorch: {
    position: "absolute",
    right: 30,
    top: 50,
    zIndex: 50,
  },
  pageContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  zoomControls: {
    position: "absolute",
    right: 30,
    bottom: 200,
    width: 50,
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 50,
  },
  zoomControlOption: {
    margin: 5,
    width: 35,
    height: 35,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomControlOptionText: {
    color: "#fff",
    fontSize: 13,
  },
  zoomControlOptionActive: {
    backgroundColor: "#202020",
  },
  thumbSlider: {
    position: "absolute",
    zIndex: 1000,
    elevation: 5,
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    width: screenDimensions.ScreenWidth,
    paddingHorizontal: 15,
    backgroundColor: "#202020",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  videoThumb: {
    width: 40,
    height: 90,
    marginHorizontal: 1,
    borderRadius: 9,
    resizeMode: "cover",
  },
  videoWatermark: {
    position: "absolute",
    top: 15,
    left: 15,
    ...CommonStyles.flex,
  },
  watermarkLogo: {
    height: 55,
    width: 55,
    zIndex: 1000,
    resizeMode: "contain",
  },
  watermarkText: {
    fontSize: 13,
    marginVertical: 5,
    fontFamily: "Capriola-Regular",
    color: "#fff",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  customMarkerStyle: {
    height: 85,
    width: 7,
    backgroundColor: "#ddd",
    color: "#ddd",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 9,
  },
  thumbSliderSlide: {
    width: '100%',
    position: "absolute",
    left: 13,
    zIndex: 2000,
    opacity: 1,
    height: 100,
    top: 9,
    paddingHorizontal: 15,
  },
  thumbSliderThumbs: {
    width: screenDimensions.ScreenWidth - 40,
    paddingHorizontal: 10,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  saveVideoButtons: {
    position: 'absolute',
    bottom: 135,
    right: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  saveVideoButton: {
    ...CommonStyles.flex,
    borderRadius: 20,
    height: 35,
    paddingHorizontal: 15,
    backgroundColor: '#FF544D',
    marginHorizontal: 5,
    shadowColor: "#fff",
    shadowOffset: { 
      width: 4,
      height: 16,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
    zIndex: 1,
  },
  cancelButton: {
    backgroundColor: '#999'
  },
  saveVideoButtonText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: "Capriola-Regular",
  }
});

export default CameraScreeen;
