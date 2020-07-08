'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { withNavigationFocus } from 'react-navigation' 

class TvTab extends PureComponent {
  render() {
    const onRecordingEnd = data => {
      console.log(data.uri);
    }

    
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          onRecordingEnd={onRecordingEnd}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.recordVideo.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Record </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.stopRecording.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> STOP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


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
        quality: '480p',
        maxDuration: 15,
        maxFileSize: 100 * 1024 * 1024
      };
      const { uri, codec = "mp4" } = await this.camera.recordAsync(options);
      console.log(uri, codec);
    }
  }

  stopRecording() {
    this.camera.stopRecording();
}

  _recordVideo() {
    this.camera.capture({mode: RNCamera.Constants.CaptureMode.video})
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default TvTab;