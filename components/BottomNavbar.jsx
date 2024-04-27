import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Microphone from "./Microphone";

const BottomNavBar = ({
  onTranslatePress,
  onKeyboardPress,
  setRecordedText,
}) => {
  const [showMicrophone, setShowMicrophone] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onTranslatePress} style={styles.buttons}>
        <MaterialIcons name="translate" size={25} color="black" />
      </TouchableOpacity>
      <View style={styles.chatBoxIcons}>
        <Microphone onRecordingStop={setRecordedText} />
      </View>
      <TouchableOpacity onPress={onKeyboardPress} style={styles.buttons}>
        <FontAwesome5 name="keyboard" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#5589F4",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 20,
    width: 390,
    height: 100,
    borderRadius: 20,
  },
  buttons: {
    borderRadius: 30,
    backgroundColor: "white",
    padding: 15,
  },
});

export default BottomNavBar;
