import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const CalmMain = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={["#A4CDF1", "#F3CAAF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* placeholder content */}
          <View style={styles.placeholder} />
        </LinearGradient>
      </View>

      {/* Other planner content goes here */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  gradientContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 500,
    opacity: 0.77,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden", // gradient always needs overflow hidden to show the border
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default CalmMain;
