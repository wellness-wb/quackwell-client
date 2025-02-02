import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PrimaryButton = ({ title, onPress, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <LinearGradient
          colors={["#153CE6", "#0C2180"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  button: {
    borderRadius: 29,
    overflow: "hidden",
  },
  gradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.77,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PrimaryButton;
