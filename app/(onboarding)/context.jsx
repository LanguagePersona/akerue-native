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
import ImagePickerButton from "../../components/ImagePicker";
import { Link } from "expo-router";

const Context = () => {
  const [textInputValue, setTextInputValue] = useState("");
  const [imageUri, setImageUri] = useState(null);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.viewTop}>
          <Image source={cat} />
          <Text style={styles.textBox}>What do you want to talk about?</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your context here..."
            value={textInputValue}
            onChangeText={(text) => setTextInputValue(text)}
            multiline={true}
          />
          <ImagePickerButton />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Link href="/loading">
              <Text style={styles.buttonText}>Let's Go!</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Context;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
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
  inputContainer: {
    alignItems: "center",
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    width: "80%",
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
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    marginTop: 50,
    backgroundColor: "#5589F4",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: 300,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
