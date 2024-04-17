import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import logo from "../assets/logo.png";
import cathand from "../assets/cathand.png";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Akerue</Text>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity style={styles.button}>
        <Link href="/intro">
          <Text style={styles.buttonText}>Start Now</Text>
        </Link>
      </TouchableOpacity>
      <Image source={cathand} style={styles.cathand} />
      <StatusBar style="auto" />
    </View>
  );
}

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
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#5589F4",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
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
});
