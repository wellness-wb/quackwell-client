import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import Calendar from "../planner/Calendar.js";

const UpperMenu = () => {
  return (
    <View style={styles.menuBar}>
      <LinearGradient
        colors={["#e6f1fb", "#F3CAAF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Calendar inside UpperMenu */}
        <View style={styles.calendarContainer}>
          <Calendar />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  menuBar: {
    width: "100%",
    height: 175,
    top: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center', // Center the content inside
    alignItems: 'center', // Align items horizontally
  },
  calendarContainer: {
    width: '100%',
    height: 500,
  },
});

export default UpperMenu;
