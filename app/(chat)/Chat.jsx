import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
import { Link } from "expo-router";

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

  const [grade, setGrade] = useState("");
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
        const response = result.response;

        await Promise.all([
          setChatResponse(response),
          setChatHistory((prevChatHistory) => [...prevChatHistory, response]),
          setTranslateResponse(result.translatedMessage[0].text),
          setAromanizedResponse(result.aromanizedMessage),
          setChatResponseBox(true),
        ]);

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
          <View>
            <Link href="/analytics">
              <AntDesign name="linechart" size={30} color="#5589F4" />
            </Link>
          </View>
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
            <Text style={{ color: "gray" }}>Feedback:</Text>
          </View>
        )}
        {responseBox && (
          <View style={styles.grading}>
            <Text
              style={{
                color: "gray",
                fontWeight: "bold",
                fontSize: 17,
                color: "red",
              }}
            >
              Grade: {grade}
            </Text>
          </View>
        )}
        {responseBox && grade === "A" && (
          <View style={styles.chatResponseBox}>
            <View style={styles.textContainer}>
              <Text style={styles.textBoxResponse}>
                Your pronunciation is perfect! Keep it up!
              </Text>
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
          </View>
        )}
        {responseBox && (grade === "B" || grade === "C") && (
          <View style={styles.chatResponseBoxImproved}>
            <View style={styles.textContainer}>
              <Text style={styles.textBoxResponse}>
                Your pronunciation can be improved!{"\n"}Press the audio button
                to hear the correct pronunciation!
              </Text>
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
          </View>
        )}
        {responseBox && (grade === "D" || grade === "F") && (
          <View style={styles.chatResponseBoxFail}>
            <View style={styles.textContainer}>
              <Text style={styles.textBoxResponse}>
                Your pronunciation is wrong! {"\n"}Press the audio button to
                hear the correct pronunciation!
              </Text>
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
          setAromanizedResponse={setAromanizedResponse}
          setTranslateResponse={setTranslateResponse}
          setRecordedText={setRecordedText}
          setAromanizedText={setAromanizedText}
          setTranslatedText={setTranslatedText}
          setResponseBox={setResponseBox}
          suggestedResponse={suggestedResponse}
          setChatResponse={setChatResponse}
          setGrade={setGrade}
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
    padding: 10,
    gap: 10,
  },
  chatResponseBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#0069E4",
    borderRadius: 10,
    width: 300,
    padding: 10,
    gap: 10,
  },
  chatResponseBoxFail: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#e84242",
    borderRadius: 10,
    width: 300,
    padding: 10,
    gap: 10,
  },
  chatResponseBoxImproved: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#e88721",
    borderRadius: 10,
    width: 300,
    padding: 10,
    gap: 10,
  },
  textBox: {
    fontSize: 15,
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "85%",
  },
  textBoxResponse: {
    fontSize: 15,
    color: "white",
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "85%",
    justifyContent: "space-between",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  chatBoxIcons: {
    borderRadius: 20,
    backgroundColor: "#B9B9C5",
    padding: 4,
    flexShrink: 0,
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
    paddingTop: 75,
  },
  grading: {
    position: "absolute",
    right: 73,
    paddingTop: 75,
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
    padding: 10,
    gap: 10,
  },
  suggestedResponse: {
    position: "absolute",
    top: 300,
    left: 40,
  },
});
