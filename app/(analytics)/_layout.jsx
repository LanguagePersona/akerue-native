import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons

const AnalyticsLayout = ({ navigation }) => {
  return (
    <Stack
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#5589F4",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: "Analytics",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        ),
      })}
    ></Stack>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
  },
});

export default AnalyticsLayout;
