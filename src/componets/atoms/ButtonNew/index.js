import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ButtonNew = ({ focused, size, color }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: focused ? "#9184b7" : "#6d5e9f" },
      ]}
    >
      <Entypo
        name="plus"
        color={focused ? "#FFF" : "#F8f8f8"}
        size={size}
      ></Entypo>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
