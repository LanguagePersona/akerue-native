import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { aromanizeText, transcribeAudio, translateText } from "../utils/api";
import * as FileSystem from "expo-file-system";

export default function Microphone({
  setAromanizedResponse,
  setTranslateResponse,
  onRecordingStop,
  setAromanizedText,
  setTranslatedText,
  setResponseBox,
  suggestedResponse,
  setChatResponse,
  setGrade,
}) {
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
      setResponseBox(false);
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setChatResponse("");
      setAromanizedText("");
      setTranslatedText("");
      setGrade("");
      setAromanizedResponse("");
      setTranslateResponse("");
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
      // Get the current date and time
      const currentDateTime = new Date();

      // Format the current date and time to include milliseconds for uniqueness
      const formattedDateTime = currentDateTime
        .toISOString()
        .replace(/[-:.]/g, "");

      // Use the formatted date and time in the filename
      const localUri = `${FileSystem.documentDirectory}recording_${formattedDateTime}.m4a`;
      await FileSystem.copyAsync({ from: uri, to: localUri });
      const transcription = await transcribeAudio(
        localUri.slice(7),
        suggestedResponse
      );
      const aromanizedText = await aromanizeText(
        transcription.transcription.text
      );
      const translatedText = await translateText(
        transcription.transcription.text
      );
      onRecordingStop(transcription.transcription.text);
      setAromanizedText(aromanizedText);
      setTranslatedText(translatedText);
      setGrade(transcription.grade);
      setResponseBox(true);
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
