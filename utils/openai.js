import OpenAI from "openai";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const transcribeAudio = async (audio) => {
  try {
    const info = await FileSystem.getInfoAsync(audio);
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    const uri = info.uri;
    const formData = new FormData();
    formData.append("file", {
      uri,
      type: "audio/m4a",
      name: "speech2text",
    });
    // Get the transcription from OpenAI
    const transcription = await openai.audio.transcriptions.create({
      file: formData,
      model: "whisper-1",
    });

    console.log(transcription.text);
    return transcription.text; // Return the transcription text
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error for handling in the caller function
  }
};

export const textToSpeech = async (text) => {
  try {
    // Create the speech using OpenAI API
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    // Convert the mp3 response to Base64
    const mp3Base64 = mp3._bodyInit._data.blobId;

    // Get the directory for saving the speech file
    const directory = FileSystem.documentDirectory + "speech.mp3";

    // Write the Base64 data to a file
    await FileSystem.writeAsStringAsync(directory, mp3Base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log("Speech file saved successfully:", directory);

    // Play the speech file
    const { sound } = await Audio.Sound.createAsync({
      uri: directory,
    });
    await sound.playAsync();
  } catch (error) {
    console.error("Error occurred during text-to-speech conversion:", error);
    // Handle the error as needed, such as logging it or displaying an error message to the user
  }
};
