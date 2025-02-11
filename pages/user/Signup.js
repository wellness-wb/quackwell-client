import { Audio } from "expo-av";
import React, { useEffect } from "react";
import {
  Animated,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useBouncePress } from "../../utils/useBouncePress";
import BubbleBackground from "./components/bubble/BubbleBackground";
import AuthButton from "./components/button/AuthButton";
import UserHeader from "./components/UserHeader";

const Signup = ({ navigation }) => {
  const { bounceAnim, soundRef, handlePress } = useBouncePress();

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/quack.mp3")
      );
      soundRef.current = sound;
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [soundRef]);

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Header Message */}
          <UserHeader title="Welcome to Quackwell" />

          {/* Bubbles */}
          <BubbleBackground />

          {/* GIF with bounce */}
          <Pressable onPress={handlePress} style={styles.gifIcon}>
            <Animated.Image
              source={require("../../assets/logo_animated.gif")}
              style={[styles.gifIcon, { transform: [{ scale: bounceAnim }] }]}
            />
          </Pressable>
          <Text style={styles.gifMessage}>Sign Up</Text>

          {/* buttons */}
          <View style={styles.buttonContainer}>
            <AuthButton
              onPress={() => navigation.navigate("CreateAccount")}
              buttonText="Sign up with Email"
              iconName="mail"
              style={styles.spacing}
            />

            <AuthButton
              onPress={() => {
                alert("Google Sign Up");
              }}
              buttonText="Continue with Google"
              iconName="google"
              style={styles.spacing}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* log in option */}
      <View style={styles.footer.container}>
        <Text style={styles.footer.bottomText}>
          Already have an account?{" "}
          <Text
            style={styles.footer.bottomLink}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: hp("5%"),
  },
  gifIcon: {
    height: hp("30%"),
    aspectRatio: 1,
  },
  gifMessage: {
    position: "absolute",
    top: hp("33%"),
    color: "#153CE6",
    fontSize: hp("3.5%"),
    fontFamily: "Inter",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    flexGrow: 1,
  },
  spacing: {
    marginBottom: hp("2.5%"),
  },
  footer: {
    container: {
      width: "100%",
      position: "absolute",
      bottom: "10%",
      alignItems: "center",
    },
    bottomText: {
      textAlign: "center",
      fontSize: 18,
    },
    bottomLink: {
      color: "#153CE6",
      fontWeight: "bold",
      fontSize: 18,
    },
  },
});

export default Signup;
