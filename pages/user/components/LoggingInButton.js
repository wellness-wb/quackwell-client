import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LoggingInButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <LinearGradient
        colors={["#153CE6", "#0C2180"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>Log Me In</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10, // Adjust spacing between buttons if needed
  },
  button: {
    width: 120,
    height: 70,
    borderRadius: 29,
    overflow: "hidden", // Ensures the gradient respects the button shape
  },
  gradient: {
    flex: 1,
    justifyContent: "center", // Centers the content vertically
    flexDirection: "row",
    alignItems: "center", // Centers the content horizontally
    opacity: 0.77,
  },
  textContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoggingInButton;
