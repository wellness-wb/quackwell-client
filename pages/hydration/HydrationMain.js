import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import GradientButton from "../components/GradientButton";
import MenuBar from "../components/MenuBar";

const HydrationMain = ({ navigation }) => {
  // hydrationGoal is the current value, setHydrationGoal is the function to update it, useState initializes it to ""
  const [hydrationGoal, setHydrationGoal] = useState(""); // User input
  const [unit, setUnit] = useState("L"); // Default unit
  const [warningVisible, setWarningVisible] = useState(false); // Warning state
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardOffset(e.endCoordinates.height)
    );
    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardOffset(0)
    );

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const handleSetGoal = () => {
    const goal = parseFloat(hydrationGoal);

    // Check if the input is valid for "fl oz"
    if (unit === "fl oz") {
      const liters = goal / 33.814;
      if (liters < 1.5 || liters > 6) {
        setWarningVisible(true); // Show warning
        return;
      }
    } else {
      // Check if the input is valid for "L"
      if (goal < 1.5 || goal > 6) {
        setWarningVisible(true); // Show warning
        return;
      }
    }

    // Hide the warning if the input is valid
    setWarningVisible(false);
  };

  return (
    // touchablewithoutfeedback is basically for dismissing keyboard
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.background}
      >
        {/* Warning Container */}
        {warningVisible && (
          <LinearGradient
            colors={[
              "rgba(239, 108, 139, 0.7)", // 50% transparent pink
              "rgba(240, 162, 111, 0.7)", // 50% transparent orange
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.warningContainer}
          >
            <Text style={styles.warningText}>
              The recommended water intake per day is 1.5L - 6L
            </Text>
            <GradientButton
              text="OK"
              width={80}
              height={40}
              colors={["#0C2180", "#153CE6"]}
              onPress={() => setWarningVisible(false)}
            />
          </LinearGradient>
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
          <Text style={styles.title}>Desired Water Intake per Day:</Text>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={["#153CE6", "#0C2180"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientInput}
            >
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={hydrationGoal}
                onChangeText={setHydrationGoal}
                placeholderTextColor="#F3CAAF" // Adjust placeholder color for better visibility
                returnKeyType="done" // Adds "Set" or "Done" to the keyboard button
                onSubmitEditing={handleSetGoal}
              />
            </LinearGradient>
          </View>

          <View style={styles.toggleContainer}>
            <GradientButton
              text="L"
              width={80}
              height={50}
              colors={
                unit === "L" ? ["#F3CAAF", "#F0A26F"] : ["#153CE6", "#0C2180"]
              }
              textColor={unit === "L" ? "#153CE6" : "#F3CAAF"} // Dynamic text color
              onPress={() => setUnit("L")}
            />
            <GradientButton
              text="fl oz"
              width={80}
              height={50}
              colors={
                unit === "fl oz"
                  ? ["#F3CAAF", "#F0A26F"]
                  : ["#153CE6", "#0C2180"]
              }
              textColor={unit === "fl oz" ? "#153CE6" : "#F3CAAF"} // Dynamic text color
              onPress={() => setUnit("fl oz")}
            />
          </View>

          <GradientButton
            text="Set"
            width={100}
            height={50}
            colors={["#153CE6", "#0C2180"]}
            textColor="#F3CAAF"
            onPress={() => {
              const goal = parseFloat(hydrationGoal);
              if (
                (unit === "fl oz" &&
                  (goal / 33.814 < 1.5 || goal / 33.814 > 6)) ||
                (unit === "L" && (goal < 1.5 || goal > 6))
              ) {
                setWarningVisible(true); // Show warning
                return;
              }
              setWarningVisible(false); // Hide warning
              navigation.navigate("HydrationTracker", { hydrationGoal, unit }); // Pass the data
            }}
          />
        </LinearGradient>
        <MenuBar navigation={navigation} activeScreen="HydrationMain" />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  warningContainer: {
    position: "absolute",
    top: 120,
    height: 120,
    width: "90%",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
  },

  warningText: {
    fontFamily: "Inter",
    fontWeight: "bold",
    color: "#153CE6",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },

  container: {
    justifyContent: "flex-start",
    marginTop: 250,
    width: "100%",
    height: 500,
    borderRadius: 30,
    padding: 20,
    alignItems: "center",
    //justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  title: {
    fontFamily: "Inter",
    color: "#153CE6",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 50,
  },

  inputContainer: {
    width: "55%",
    height: 50,
    marginBottom: 40,
  },

  gradientInput: {
    flex: 1,
    borderRadius: 30,
    justifyContent: "center",
    overflow: "hidden",
  },

  input: {
    fontFamily: "Inter",
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "#F3CAAF", // Text color
    marginHorizontal: 10, // Optional, adds spacing between the text and gradient border
  },

  toggleContainer: {
    flexDirection: "row",
    marginBottom: 40,
    justifyContent: "space-around",
  },
});

export default HydrationMain;
