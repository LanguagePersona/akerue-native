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

export const translateText = async (text, target, source) => {
  try {
    const payload = {
      text: text,
    };

    const response = await fetch("http://localhost:3000/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const translatedText = await response.json();
    console.log("Translation: ", translatedText);

    return translatedText.translation[0].text;
  } catch (error) {
    console.error("Error translating audio:", error);
    return null;
  }
};

export const aromanizeText = async (text) => {
  try {
    const payload = {
      text: text,
    };

    const response = await fetch("http://localhost:3000/aromanize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const aromanizedText = await response.json();
    console.log("Aromanized Text: ", aromanizedText);

    return aromanizedText.text;
  } catch (error) {
    console.error("Error translating audio:", error);
    return null;
  }
};

export const chatWithBot = async (message) => {
  try {
    const payload = {
      message: message,
    };

    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const chatResponse = await response.json();
    console.log("Chat Text: ", chatResponse.response.content);
    return chatResponse.response.content;
  } catch (error) {
    console.error("Error creating text", error);
    return null;
  }
};
