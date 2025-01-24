import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Calendar from "./Calendar.js";

const PlannerMain = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Add the calendar at the top */}
      <View style={styles.calendarContainer}>
        <Calendar />
      </View>

      {/* Other planner content goes here */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start", // Start content from the top
    alignItems: "center", // Center everything horizontally
  },
  calendarContainer: {
    width: "90%", // Adjust width as needed
    marginTop: 20, // Space from the top
  },
});

export default PlannerMain;
