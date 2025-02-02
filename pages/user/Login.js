import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
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
import { signIn } from "../../utils/auth";
import { useBouncePress } from "../../utils/useBouncePress";
import BubbleBackground from "./components/bubble/BubbleBackground";
import ContinueButton from "./components/button/ContinueButton";
import EditableInput from "./components/EditableInput";
import UserHeader from "./components/UserHeader";

const Login = ({ navigation }) => {
  const { bounceAnim, soundRef, handlePress } = useBouncePress();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainHub" }],
      });
    } catch (error) {
      console.error(error);
      alert(`Login failed: ${error}`);
    }
  };

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
  }, [soundRef]);

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Bubbles */}
      <BubbleBackground />

      {/* Header Message */}
      <UserHeader fontSize={35} title="Welcome to Quackwell" />

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form.container}>
          <EditableInput
            placeholder="Email..."
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}
          />
          <EditableInput
            placeholder="Password..."
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <ContinueButton title="Login" onPress={handleLogin} />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.footer.container}>
        <View>
          <Text onPress={() => navigation.navigate("Signup")}>Sign Up</Text>
        </View>
        <View>
          <Text onPress={() => navigation.navigate("ForgotPassword")}>
            Forgot Password?
          </Text>
        </View>
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

  form: {
    container: {
      position: "absolute",
      top: "45%",
      width: "100%",
      alignItems: "center",
      paddingHorizontal: 20,
    },
  },
  footer: {
    container: {
      position: "absolute",
      bottom: "10%",
      alignItems: "center",
    },
    link: {
      color: "#153CE6",
      textDecorationLine: "underline",
      marginVertical: 5,
      fontSize: 16,
    },
  },
});

export default Login;
