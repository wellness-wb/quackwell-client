// dependencies npm install -g npm@10.9.1
// npx expo install expo-linear-gradient
import { Audio } from "expo-av";
import React, { useEffect } from "react";
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useBouncePress } from "../../utils/useBouncePress";
import BubbleBackground from "./components/bubble/BubbleBackground";
import AuthButton from "./components/button/AuthButton";
import UserHeader from "./components/UserHeader";

const Signup = ({ navigation }) => {
  const { bounceAnim, soundRef, handlePress } = useBouncePress();

  // load the sound when the component mounts
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/quack.mp3")
      );
      soundRef.current = sound;
    };

    loadSound();

    // unload the sound when the component unmounts
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
      {/* Header Message */}
      <UserHeader fontSize={35} title="Welcome to Quackwell" />

      {/* Bubbles */}
      <BubbleBackground />

      {/* GIF with bounce */}
      <Pressable onPress={handlePress}>
        <Animated.Image
          source={require("../../assets/logo_animated.gif")}
          style={[styles.gif.gifIcon, { transform: [{ scale: bounceAnim }] }]}
          resizeMode="contain"
        />
      </Pressable>
      <View style={styles.gif.messageWrapper}>
        <Text style={styles.gif.message}>Sign Up</Text>
      </View>

      {/* buttons */}
      <View style={styles.buttonContainer}>
        <AuthButton
          onPress={() => navigation.navigate("CreateAccount")}
          buttonText="Sign up with Email"
          iconName="mail"
        />

        <AuthButton
          onPress={() => {
            alert("Google Sign Up");
          }}
          buttonText="Continue with Google"
          iconName="google"
        />
      </View>

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
    flex: 1, // the background takes up the full height and width of the container
    justifyContent: "flex-start", // start the content from the top
    alignItems: "center", // all child components will be horizontally centered
  },
  header: {
    top: -300,
    alignItems: "center",
  },
  topText: {
    position: "absolute", // will allow the position adjustment by me not by the container rules
    top: 400,
    color: "#153CE6",
    fontSize: 20,
    fontFamily: "Inter",
    fontWeight: "normal",
    textAlign: "center", // align always horizontally
    width: "80%",
  },
  gif: {
    gifIcon: {
      width: "140%",
      height: undefined,
      aspectRatio: 1, // scaling GIF proportionally
    },
    messageWrapper: {
      position: "absolute",
      top: 350,
      alignItems: "center",
    },
    message: {
      width: "100%",
      color: "#153CE6",
      fontSize: 50,
      fontFamily: "Inter",
      fontWeight: "bold",
      textAlign: "center", // align always horizontally
      marginBottom: 30,
    },
  },
  buttonContainer: {
    position: "absolute",
    top: "57%",
    width: "100%",
    alignItems: "center",
    gap: 10,
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
