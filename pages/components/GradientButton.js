import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const GradientButton = ({
  text,
  width,
  height,
  colors,
  textColor = "#FFFFFF",
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width,
        height,
        borderRadius: height / 2, // Ensures the button is rounded
        overflow: "hidden",
      }}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: height / 2, // Matches the outer container for consistent rounding
        }}
      >
        <Text style={{ color: textColor, fontWeight: "bold", fontSize: 16 }}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25, // Default border radius
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#F3CAAF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GradientButton;
