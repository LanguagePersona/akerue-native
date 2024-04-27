import OpenAI from "openai";
import * as FileSystem from "expo-file-system";
import axios from "axios";

export const transcribeAudio = async (audioUri) => {
  try {
    const payload = {
      audioUri: audioUri,
    };

    console.log(JSON.stringify(payload));
    const response = await fetch("http://localhost:3000/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to transcribe audio");
    }
    const transcription = await response.json();
    console.log("Transcription:", transcription);

    return transcription.transcription.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return null;
  }
};
