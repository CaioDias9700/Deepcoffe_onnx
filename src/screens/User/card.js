// components/Card.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.1,
    borderColor: "#ccc",
    borderRadius: 1,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 1,
    elevation: 1,
    flex: 1,
    padding: 50,
  },
});

export default Card;
