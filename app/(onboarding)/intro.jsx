import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import cat from "../../assets/cat.png";
import { StatusBar } from "expo-status-bar";
const Intro = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textBox}>
        Let's create your custom Korean conversation?
      </Text>
      <Image source={cat} style={styles.logo} />
      <TouchableOpacity style={styles.button}>
        <Link href="/practice">
          <Text style={styles.buttonText}>Let's Go!</Text>
        </Link>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 70,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 250,
    backgroundColor: "#5589F4",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: 200,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cathand: {
    position: "absolute", // Position the cathand absolutely
    bottom: 0, // Align it to the bottom of the screen
    marginBottom: 20, // Add some margin if needed
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  textBox: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: "black",
    backgroundColor: "#D9E6FF", // Background color
    borderRadius: 10, // Rounded borders
    overflow: "hidden", // Clip text overflow
    width: 200,
    padding: 12,
  },
});
