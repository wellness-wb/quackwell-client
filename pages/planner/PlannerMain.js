import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import CalMenu from "./calMenu";
import MenuBar from "../components/MenuBar";
import PlansTab from "./PlansTab";

const PlannerMain = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      
      {/* Add the calendar at the top */}
      <CalMenu />
      
      {/* Other planner content goes here */}
      <PlansTab />

      <MenuBar navigation={navigation} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start", // Start content from the top
    alignItems: "center", // Center everything horizontally
  },
});

export default PlannerMain;
