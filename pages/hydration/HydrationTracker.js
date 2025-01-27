import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import GradientButton from "../components/GradientButton";
import MenuBar from "../components/MenuBar";

const HydrationTracker = ({ route, navigation }) => {
  const { hydrationGoal, unit } = route.params; // Retrieve params from HydrationMain
  const [currentHydration, setCurrentHydration] = useState(0); // current hydration deafult 0, setCurretntHydration will update it
  const [inputHydration, setInputHydration] = useState(""); // const for use input
  const [showConfetti, setShowConfetti] = useState(false); // confetti trigger

  const handleAddWater = () => {
    // for user input
    const input = parseFloat(inputHydration);
    if (!isNaN(input) && input > 0) {
      // passing a function tot calculate based on the previous state
      const newHydration = Math.min(
        currentHydration + input,
        parseFloat(hydrationGoal)
      );
      setCurrentHydration(newHydration);
      setInputHydration(""); // Clear input after adding
      Keyboard.dismiss(); // Dismiss the keyboard

      if (newHydration >= hydrationGoal) {
        setShowConfetti(true);
        setTimeout(() => {
          setCurrentHydration(0);
          setShowConfetti(false);
        }, 5000); // show confetti for 3 seconds
      }
    } else {
      alert("Please enter a valid amount!");
    }
  };

  const handleSetNewGoal = () => {
    navigation.navigate("HydrationMain");
  };

  // Convert liters to fl oz if needed
  const displayGoal =
    unit === "fl oz" ? (hydrationGoal * 33.814).toFixed(1) : hydrationGoal;
  const displayCurrent =
    unit === "fl oz"
      ? (currentHydration * 33.814).toFixed(1)
      : currentHydration;

  return (
    // everything on the screen (unless states otyherwise will dismiss the keyboard)
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.background}
        // image fully covers the container, even if some parts of the image are cut off
        resizeMode="cover"
      >
        {/* Confetti */}
        {showConfetti && (
          <>
            <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} fadeOut />
            <View style={styles.congratulationsContainer}>
              <Text style={styles.congratulationsText}>
                You've reached your hydration goal!
              </Text>
            </View>
          </>
        )}

        {/* Main Container */}
        <LinearGradient
          colors={[
            "rgba(164, 205, 241, 0.77)", // Slightly transparent blue
            "rgba(243, 202, 175, 0.77)", // Slightly transparent peach
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          {/* Circular Progress */}
          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              size={200}
              width={15}
              // the circle will show the percentage
              fill={(currentHydration / hydrationGoal) * 100}
              tintColor="#153CE6"
              backgroundColor="rgba(0, 0, 0, 0)"
              lineCap="round"
              // starting point set to 0
              rotation={0}
            >
              {/* rendering function */}
              {() => (
                <View style={styles.progressContent}>
                  <Text style={styles.currentHydrationText}>
                    {displayCurrent}
                  </Text>
                  <Text style={styles.goalText}>
                    out of {displayGoal} {unit}
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`Type here (${unit})`}
              keyboardType="numeric"
              value={inputHydration}
              onChangeText={setInputHydration}
              placeholderTextColor="#153CE6"
              returnKeyType="done"
            />
          </View>

          {/* Gradient Buttons */}
          <View style={styles.buttonContainer}>
            <GradientButton
              text="Add"
              width={120}
              height={50}
              colors={["#153CE6", "#0C2180"]}
              textColor="#F3CAAF"
              onPress={handleAddWater}
            />
            <GradientButton
              text="Set New"
              width={120}
              height={50}
              colors={["#F3CAAF", "#F0A26F"]}
              textColor="#153CE6"
              onPress={handleSetNewGoal}
            />
          </View>
        </LinearGradient>
        <MenuBar navigation={navigation} activeScreen="HydrationTracker" />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  // gradient container
  container: {
    position: "absolute",
    top: 250,
    height: 400,
    width: "100%",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
  },

  progressContainer: {
    position: "absolute",
    top: 35,
  },

  progressContent: {
    alignItems: "center",
  },
  currentHydrationText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#153CE6",
  },
  goalText: {
    fontSize: 16,
    color: "#153CE6",
  },
  inputContainer: {
    postion: "absolute",
    top: 210,
    marginVertical: 20,
    width: "80%",
  },

  input: {
    borderColor: "#153CE6",
    borderRadius: 10,
    height: 50,
    textAlign: "center",
    fontSize: 18,
    color: "#153CE6",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 200,
  },

  congratulationsContainer: {
    position: "absolute",
    top: 100,
    alignItems: "center",
    width: "100%",
  },

  congratulationsText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Inter",
    color: "#153CE6",
    textAlign: "center",
  },
});

export default HydrationTracker;
