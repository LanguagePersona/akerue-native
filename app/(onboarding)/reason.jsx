import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import cat from "../../assets/cat.png";
import career from "../../assets/career.png";
import Fun from "../../assets/Fun.png";
import Rainbow from "../../assets/Rainbow.png";
import Travel from "../../assets/Travel.png";

import { Link } from "expo-router";

const Reason = () => {
  return (
    <View>
      <View style={styles.viewTop}>
        <Image source={cat} />
        <Text style={styles.textBox}>Why do you want to learn Korean?</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Link href="/practice">
            <View style={styles.country}>
              <Image source={career} />
              <Text style={styles.buttonText}>Education</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Link href="/practice">
            <View style={styles.country}>
              <Image source={Fun} />
              <Text style={styles.buttonText}>Fun</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Link href="/practice">
            <View style={styles.country}>
              <Image source={Rainbow} />
              <Text style={styles.buttonText}>Daily</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Link href="/practice">
            <View style={styles.country}>
              <Image source={Travel} />
              <Text style={styles.buttonText}>Travel</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Reason;

const styles = StyleSheet.create({
  viewTop: {
    display: "flex",
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
    backgroundColor: "#D9E6FF", // Background color
    borderRadius: 10, // Rounded borders
    overflow: "hidden", // Clip text overflow
    width: 250,
    height: 70,
    padding: 12,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  button: {
    display: "flex",
    direction: "row",
    justifyContent: "center",
    height: 55,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: 350,
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 3,
    },
    margin: 10,
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // Android elevation
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  country: {
    paddingTop: 4,
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Align items vertically
    justifyContent: "start", // Center items horizontally
    gap: 10,
  },
  flagImage: {
    width: 40,
    height: 30,
  },
});
