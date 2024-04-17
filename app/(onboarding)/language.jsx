import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import cat from "../../assets/cat.png";
import kr from "../../assets/Flag_of_South_Korea.png";
import ch from "../../assets/Flag_of_Peoples_Republic_of_China.png";
import fr from "../../assets/Flag_of_France.png";
import vn from "../../assets/Flag_of_Vietnam.png";
import sp from "../../assets/Flag_of_Spain.png";
import { Link } from "expo-router";

const Language = () => {
  return (
    <View>
      <View style={styles.viewTop}>
        <Image source={cat} />
        <Text style={styles.textBox}>
          What language would you like to learn?
        </Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Link href="/level">
            <View style={styles.country}>
              <Image source={kr} style={styles.flagImage} />
              <Text style={styles.buttonText}>Korean</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Link href="/">
            <View style={styles.country}>
              <Image source={ch} style={styles.flagImage} />
              <Text style={styles.buttonText}>Chinese</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Link href="/">
            <View style={styles.country}>
              <Image source={vn} style={styles.flagImage} />
              <Text style={styles.buttonText}>Vietnamese</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Link href="/">
            <View style={styles.country}>
              <Image source={fr} style={styles.flagImage} />
              <Text style={styles.buttonText}>France</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Link href="/">
            <View style={styles.country}>
              <Image source={sp} style={styles.flagImage} />
              <Text style={styles.buttonText}>Spain</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Language;

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
    justifyContent: "center", // Center items horizontally
    gap: 10,
  },
  flagImage: {
    width: 40,
    height: 30,
  },
});
