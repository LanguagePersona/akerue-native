import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { transcribeAudio } from "../utils/openai";

export default function Microphone() {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [sound, setSound] = useState();

  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();

    try {
      // Load the recorded audio file
      const { sound } = await Audio.Sound.createAsync({ uri: uri });

      // Play the loaded audio file
      await sound.playAsync();
      console.log("Recording stopped and stored at", uri);
      const { transcription, error } = await transcribeAudio(uri);
    } catch (error) {
      console.error("Failed to play recorded audio or transcribe", error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={recording ? stopRecording : startRecording}
        style={styles.button}
      >
        {recording ? (
          <MaterialIcons name="multitrack-audio" size={24} color="blue" />
        ) : (
          <Feather name="mic" size={25} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
