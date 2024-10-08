import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import avatar from "../../assets/Avatar.png";
import spoilerImage from "../../assets/spoiler.png"; // Import the spoiler image
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import BottomNavBar from "../../components/BottomNavbar";
import * as Speech from "expo-speech";
import {
  aromanizeText,
  getSuggestedResponse,
  translateText,
} from "../../utils/api";
import { chatWithBot } from "../../utils/api"; // Import the chatWithBot function

const Chat = () => {
  const [responseBox, setResponseBox] = useState(false);
  const [translationBot, setTranslationBot] = useState(true);
  const [translationUser, setTranslationUser] = useState(true);
  const [suggestion, setSuggestion] = useState(true);
  const [audioBot, setAudioBot] = useState(false);
  const [audioUser, setAudioUser] = useState(false);

  const [recordedText, setRecordedText] = useState("");
  const [aromanizedText, setAromanizedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const [chatResponseBox, setChatResponseBox] = useState(false);
  const [chatResponse, setChatResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [aromanizedResponse, setAromanizedResponse] = useState("");
  const [translatedResponse, setTranslateResponse] = useState("");

  const [suggestedResponse, setSuggestedResponse] = useState("");
  const [aromanizedSuggestion, setAromanizedSuggestion] = useState("");
  const [translatedSuggestion, setTranslatedSuggestion] = useState("");
  const [audioSuggestion, setAudioSuggestion] = useState(false);

  const toggleTranslationBot = () => {
    setTranslationBot(!translationBot);
  };

  const toggleTranslationUser = () => {
    setTranslationUser(!translationUser);
  };

  const toggleTranslationSuggestion = () => {
    setSuggestion(!suggestion);
  };

  // FOR BOT
  const handleMicrophonePressBot = async (text) => {
    setAudioBot(true);
    await Speech.speak(text, {
      language: "ko-KR",
      onDone: () => {
        setAudioBot(false);
      },
    });
  };

  // FOR USER
  const handleMicrophonePressUserResponse = async () => {
    setAudioUser(true);
    await Speech.speak(recordedText, {
      language: "ko-kr",
      onDone: () => {
        setAudioUser(false);
      },
    });
  };

  const handleMicrophoneSuggestedResponse = async () => {
    setAudioSuggestion(true);
    await Speech.speak(suggestedResponse, {
      language: "ko-kr",
      onDone: () => {
        setAudioSuggestion(false);
      },
    });
  };

  useEffect(() => {
    const fetchChatResponse = async () => {
      try {
        const result = await chatWithBot(recordedText);
        const response = result.response.content;

        setChatResponse(response);
        setChatResponseBox(true);
        setChatHistory((prevChatHistory) => [...prevChatHistory, response]);
        setTranslateResponse(result.translatedMessage[0].text);
        setAromanizedResponse(result.aromanizedMessage);

        await handleMicrophonePressBot(response);

        const suggestionResult = await getSuggestedResponse(response);
        console.log(suggestionResult);
        setSuggestedResponse(suggestionResult.suggestions);
        setAromanizedSuggestion(suggestionResult.aromanizedResponse);
        setTranslatedSuggestion(suggestionResult.translatedResponse);
      } catch (error) {
        console.error("Error chatting with bot", error);
      }
    };

    fetchChatResponse();
  }, [recordedText]);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={avatar} style={styles.avatar} />
        <View style={styles.help}>
          <AntDesign name="questioncircleo" size={30} color="#5589F4" />
          <Feather name="bookmark" size={30} color="#5589F4" />
          <AntDesign name="linechart" size={30} color="#5589F4" />
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={30}
            color="#5589F4"
          />
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {chatResponseBox && (
          <View style={styles.chatBotBox}>
            <View style={styles.textContainer}>
              <Text style={styles.textBox}>{chatResponse}</Text>
              <TouchableOpacity
                onPress={() => handleMicrophonePressBot(chatResponse)}
                style={styles.chatBoxIcons}
              >
                {audioBot ? (
                  <MaterialIcons
                    name="multitrack-audio"
                    size={20}
                    color="blue"
                  />
                ) : (
                  <Feather name="mic" size={20} color="black" />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              {translationBot ? (
                <Text style={styles.textBox}>{aromanizedResponse}</Text>
              ) : (
                <Text style={styles.textBox}>{translatedResponse}</Text>
              )}
              <TouchableOpacity
                onPress={toggleTranslationBot}
                style={styles.chatBoxIcons}
              >
                <MaterialIcons
                  name="translate"
                  size={20}
                  color={translationBot ? "black" : "#5589F4"} // Change color based on englishMasked state
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {responseBox && (
          <View style={styles.responseBox}>
            <Text style={{ color: "gray" }}>Your Reponse:</Text>
          </View>
        )}
        {responseBox && (
          <View style={styles.chatResponseBox}>
            <View style={styles.textContainer}>
              <Text style={styles.textBoxResponse}>{recordedText}</Text>
              <TouchableOpacity
                onPress={handleMicrophonePressUserResponse}
                style={styles.chatBoxIcons}
              >
                {audioUser ? (
                  <MaterialIcons
                    name="multitrack-audio"
                    size={20}
                    color="blue"
                  />
                ) : (
                  <Feather name="mic" size={20} color="black" />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              {translationUser ? (
                <Text style={styles.textBoxResponse}>{aromanizedText}</Text>
              ) : (
                <Text style={styles.textBoxResponse}>{translatedText}</Text>
              )}
              <TouchableOpacity
                onPress={toggleTranslationUser}
                style={styles.chatBoxIcons}
              >
                <MaterialIcons
                  name="translate"
                  size={20}
                  color={translationUser ? "black" : "#5589F4"} // Change color based on englishMasked state
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {suggestedResponse && (
          <View style={styles.suggestedResponse}>
            <Text style={{ color: "gray" }}>Suggested Reponse:</Text>
          </View>
        )}
        {suggestedResponse && (
          <View style={styles.suggestedResponseBox}>
            <View style={styles.textContainer}>
              <Text style={styles.textBoxResponse}>{suggestedResponse}</Text>
              <TouchableOpacity
                onPress={handleMicrophoneSuggestedResponse}
                style={styles.chatBoxIcons}
              >
                {audioSuggestion ? (
                  <MaterialIcons
                    name="multitrack-audio"
                    size={20}
                    color="blue"
                  />
                ) : (
                  <Feather name="mic" size={20} color="black" />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              {suggestion ? (
                <Text style={styles.textBoxResponse}>
                  {aromanizedSuggestion}
                </Text>
              ) : (
                <Text style={styles.textBoxResponse}>
                  {translatedSuggestion}
                </Text>
              )}
              <TouchableOpacity
                onPress={toggleTranslationSuggestion}
                style={styles.chatBoxIcons}
              >
                <MaterialIcons
                  name="translate"
                  size={20}
                  color={suggestion ? "black" : "#5589F4"} // Change color based on englishMasked state
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={styles.bottom}>
        <BottomNavBar
          setRecordedText={setRecordedText}
          setAromanizedText={setAromanizedText}
          setTranslatedText={setTranslatedText}
          setResponseBox={setResponseBox}
        />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 350,
    height: 260,
    resizeMode: "contain",
  },
  help: {
    position: "absolute",
    right: 0,
    top: 50,
    marginRight: 15,
    gap: 25,
  },
  chatBotBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#D9E6FF",
    borderRadius: 10,
    width: 300,
    height: 100,
    gap: 10,
  },
  chatResponseBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#0069E4",
    borderRadius: 10,
    width: 300,
    height: 100,
    gap: 10,
  },
  textBox: {
    fontSize: 15,
  },
  textBoxResponse: {
    fontSize: 15,
    color: "white",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    gap: 10,
    overflow: "hidden",
  },
  chatBoxIcons: {
    borderRadius: 20,
    backgroundColor: "#B9B9C5",
    padding: 4,
  },
  bottom: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom: 20,
  },
  responseBox: {
    position: "absolute",
    left: 70,
    paddingTop: 60,
  },
  suggestedResponseBox: {
    position: "absolute",
    top: 320,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5589F4",
    borderRadius: 10,
    width: 370,
    height: 100,
    gap: 10,
  },
  suggestedResponse: {
    position: "absolute",
    top: 300,
    left: 40,
  },
});
