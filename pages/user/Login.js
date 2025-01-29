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
import EmailButton from "./components/EmailButton";
import FloatingBubble from "./components/FloatingBubble";
import LoggingInButton from "./components/LoggingInButton";
import PasswordButton from "./components/PasswordButton";

const Login = ({ navigation }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef(null);

  // Load the sound when the component mounts
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/quack.mp3") // Path to your sound file
      );
      soundRef.current = sound;
    };

    loadSound();

    // Unload the sound when the component unmounts
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // Handle click animation and sound
  const handlePress = async () => {
    // Play sound
    if (soundRef.current) {
      await soundRef.current.replayAsync(); // Play or restart the sound
    }

    // Run bounce animation
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
        delay={150}
        size={2050}
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
        delay={200}
        size={1000}
      />
      <FloatingBubble
        source={require("../../assets/bubble.png")}
        startX={Math.random() * 300}
        delay={250}
        size={1000}
      />
      <FloatingBubble
        source={require("../../assets/bubble.png")}
        startX={Math.random() * 300}
        delay={300}
        size={1500}
      />
      <FloatingBubble
        source={require("../../assets/bubble.png")}
        startX={Math.random() * 300}
        delay={320}
        size={2000}
      />
      <FloatingBubble
        source={require("../../assets/bubble.png")}
        startX={Math.random() * 300}
        delay={340}
        size={1750}
      />
      <FloatingBubble
        source={require("../../assets/bubble.png")}
        startX={Math.random() * 300}
        delay={250}
        size={2050}
      />
      <FloatingBubble
        source={require("../../assets/bubble.png")}
        startX={Math.random() * 300}
        delay={170}
        size={1500}
      />
      <FloatingBubble
        source={require("../../assets/bubble.png")}
        startX={Math.random() * 300}
        delay={0}
        size={1000}
      />

      {/* Welcome Back Message */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
      </View>

      {/* Animated GIF */}
      <View style={styles.gifContainer}>
        <Pressable onPress={handlePress}>
          <Animated.Image
            source={require("../../assets/logo_animated.gif")}
            style={[styles.gif, { transform: [{ scale: bounceAnim }] }]}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* Log In Text */}
      <View style={styles.logInContainer}>
        <Text style={styles.logIn}>Log In</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonForEmail}>
        <EmailButton />
      </View>
      <View style={styles.buttonForPassword}>
        <PasswordButton />
      </View>
      <View style={styles.buttonForLoggingIn}>
        <LoggingInButton
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "MainHub" }],
            })
          }
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  welcomeContainer: {
    position: "absolute",
    top: 100,
    alignItems: "center",
    width: "100%",
  },
  welcomeText: {
    color: "#153CE6",
    fontSize: 50,
    fontFamily: "Inter",
    fontWeight: "bold",
    textAlign: "center",
  },
  gifContainer: {
    position: "absolute",
    top: 10,
    alignItems: "center",
    width: "100%",
  },
  gif: {
    width: 450,
    height: 450,
  },
  logInContainer: {
    position: "absolute",
    top: 300,
    width: "100%",
    alignItems: "center",
  },
  logIn: {
    color: "#153CE6",
    fontSize: 50,
    fontFamily: "Inter",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonForEmail: {
    position: "absolute",
    top: "50%",
    width: "100%",
    alignItems: "center",
  },
  buttonForPassword: {
    position: "absolute",
    top: "62%",
    width: "100%",
    alignItems: "center",
  },
  buttonForLoggingIn: {
    position: "absolute",
    top: "74%",
    width: "100%",
    alignItems: "center",
  },
});

export default Login;
