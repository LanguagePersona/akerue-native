import React from "react";
import { Stack } from "expo-router";

const ChatLayout = () => {
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
        headerTitle: "Chat",
      })}
    ></Stack>
  );
};

export default ChatLayout;
