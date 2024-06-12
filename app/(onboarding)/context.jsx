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
import { Switch } from "react-native-switch";
import cat from "../../assets/cat.png";
import ImagePickerButton from "../../components/ImagePicker";
import { Link } from "expo-router";

const Context = () => {
  const [textInputValue, setTextInputValue] = useState("");
  const [additionalTextBoxVisible, setAdditionalTextBoxVisible] =
    useState(false);
  const [additionalTextInputValue, setAdditionalTextInputValue] = useState("");

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
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 30,
              }}
            >
              <Text style={styles.textBoxGoal}>
                Do you have a goal in mind?
              </Text>
              <Switch
                value={additionalTextBoxVisible}
                onValueChange={(val) => setAdditionalTextBoxVisible(val)}
                disabled={false}
                activeText={"ON"}
                inActiveText={"OFF"}
                circleSize={30}
                barHeight={35}
                circleBorderWidth={0}
                backgroundActive={"#5589F4"}
                backgroundInactive={"#D9E6FF"}
                circleActiveColor={"white"}
                circleInActiveColor={"#5589F4"}
                changeValueImmediately={true}
                innerCircleStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                outerCircleStyle={{}}
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2.5}
                switchRightPx={2.5}
                switchWidthMultiplier={2}
                switchBorderRadius={30}
              />
            </View>

            {additionalTextBoxVisible && (
              <TextInput
                style={styles.input}
                placeholder="What is your goal?"
                value={additionalTextInputValue}
                onChangeText={(text) => setAdditionalTextInputValue(text)}
                multiline={true}
              />
            )}
          </View>

          {/* <ImagePickerButton /> */}
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
  textBoxGoal: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    backgroundColor: "#D9E6FF",
    borderRadius: 10,
    overflow: "hidden",
    width: 250,
    height: 50,
    padding: 12,
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    height: 75,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    width: 350,
  },
  toggleButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  toggleButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    marginTop: 25,
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
