import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import cat from "../../assets/cat.png";

const Context = () => {
  const [textInputValue, setTextInputValue] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const handleImageUpload = () => {
    // Implement image upload functionality here
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.viewTop}>
          <Image source={cat} />
          <Text style={styles.textBox}>What do you want to talk about?</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Type your context here..."
          value={textInputValue}
          onChangeText={(text) => setTextInputValue(text)}
          multiline={true}
        />
        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleImageUpload}
          >
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Context;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  viewTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    marginTop: 75,
  },
  textBox: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    backgroundColor: "#D9E6FF",
    borderRadius: 10,
    overflow: "hidden",
    width: 250,
    height: 70,
    padding: 12,
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 20,
  },
  uploadContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5589F4",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  uploadButtonText: {
    marginLeft: 5,
    color: "white",
    fontWeight: "bold",
  },
});
