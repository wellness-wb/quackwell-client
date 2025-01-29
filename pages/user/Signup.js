// dependencies npm install -g npm@10.9.1
// npx expo install expo-linear-gradient
import { Audio } from "expo-av";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FacebookButton from "./components/FacebookButton";
import FloatingBubble from "./components/FloatingBubble";
import GoogleButton from "./components/GoogleButton";

const Signup = ({ navigation }) => {
  /*
  creating a new constant that will deal with the value that will get animated
  we starting with value 1, which is the original size of the object
  useRef is a hook that will keep the value consistent even after re-rendering
  */
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef(null);

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
  }, []);

  /*
  the function handles the pressing gestures
  Animated.sequence are basically animation frames
  Animated.spring will create a bounce-like animation (built-in)
  you can leave the toValue, speed, bounciness unspecified, it will apply default
  */
  const handlePress = async () => {
    // play sound
    if (soundRef.current) {
      await soundRef.current.replayAsync();
    }

    // run the animation
    Animated.sequence([
      Animated.spring(bounceAnim, {
        toValue: 1.2,
        useNativeDriver: true,
        speed: 20,
        bounciness: 10,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 10,
      }),
    ]).start();
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.topText}>
          Start your productivity and wellness journey with Quackwell
        </Text>
      </View>

      {/* Bubbles */}
      <FloatingBubble
        source={require("../../assets/bubble.png")}
        startX={Math.random() * 300}
        delay={0}
        size={1000}
      />
      <FloatingBubble
        source={require("../../assets/bubble.png")}
        startX={Math.random() * 300}
        delay={50}
        size={1500}
      />
      <FloatingBubble
        source={require("../../assets/bubble.png")}
        startX={Math.random() * 300}
        delay={100}
        size={2000}
      />
      <FloatingBubble
        source={require("../../assets/bubble.png")}
        startX={Math.random() * 300}
        delay={150}
        size={1750}
      />
      <FloatingBubble
        source={require("../../assets/bubble.png")}
        startX={Math.random() * 300}
        delay={200}
        size={2050}
      />

      {/* GIF with bounce */}
      <Pressable onPress={handlePress}>
        <Animated.Image
          source={require("../../assets/logo_animated.gif")}
          style={[styles.gif, { transform: [{ scale: bounceAnim }] }]}
          resizeMode="contain"
        />
      </Pressable>

      <View style={styles.container}>
        <Text style={styles.signUp}>Sign Up</Text>
      </View>

      {/* buttons */}
      <View style={styles.buttonForGoogle}>
        <GoogleButton />
      </View>

      <View style={styles.buttonForFacebook}>
        <FacebookButton />
      </View>

      {/* log in option */}
      <View style={styles.bottomMessage}>
        <Text style={styles.bottomText}>
          Already have an account?{" "}
          <Text
            style={styles.underline}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </Text>
          .
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
    width: "140%",
    height: undefined,
    aspectRatio: 1, // scaling GIF proportionally
  },
  container: {
    position: "absolute",
    top: 350,
    alignItems: "center",
  },
  signUp: {
    width: "100%",
    color: "#153CE6",
    fontSize: 50,
    fontFamily: "Inter",
    fontWeight: "bold",
    textAlign: "center", // align always horizontally
    marginBottom: 30,
  },
  buttonForGoogle: {
    position: "absolute",
    top: "57%",
    width: "100%",
    alignItems: "center",
  },
  buttonForFacebook: {
    position: "absolute",
    top: "69%",
    width: "100%",
    alignItems: "center",
  },
  bottomMessage: {
    position: "absolute",
    bottom: 70,
    alignContent: "center",
    width: "100%",
  },
  bottomText: {
    color: "#153CE6",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "normal",
  },
  underline: {
    textDecorationLine: "underline",
    color: "#153CE6",
  },
});

export default Signup;
