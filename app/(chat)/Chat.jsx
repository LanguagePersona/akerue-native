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

const Chat = () => {
  const [englishMasked, setEnglishMasked] = useState(true);
  const [recording, setRecording] = useState(false);
  const [audio, setAudio] = useState(false);

  const toggleEnglishMask = () => {
    setEnglishMasked(!englishMasked);
  };

  const handleMicrophonePress = () => {
    setAudio(true);
    Speech.speak("안녕하세요! 오늘 하루 어땠어요?", {
      language: "ko-KR",
      onDone: () => {
        setAudio(false);
      },
    });
  };

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
        <View style={styles.chatBotBox}>
          <View style={styles.textContainer}>
            <Text style={styles.textBox}>안녕하세요! 오늘 하루 어땠어요?</Text>
            <TouchableOpacity
              onPress={handleMicrophonePress}
              style={styles.chatBoxIcons}
            >
              {audio ? (
                <MaterialIcons name="multitrack-audio" size={20} color="blue" />
              ) : (
                <Feather name="mic" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            {englishMasked ? (
              <Image source={spoilerImage} style={{ width: 200, height: 20 }} /> // Render spoiler image
            ) : (
              <Text style={styles.textBox}>
                Hello! How are you doing today?
              </Text>
            )}
            <TouchableOpacity
              onPress={toggleEnglishMask}
              style={styles.chatBoxIcons}
            >
              <MaterialIcons
                name="translate"
                size={20}
                color={englishMasked ? "black" : "#5589F4"} // Change color based on englishMasked state
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <BottomNavBar />
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
    height: 350,
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
  textBox: {
    fontSize: 15,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    gap: 10,
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
});
