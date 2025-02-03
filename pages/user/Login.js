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
import GradientButton from "../components/GradientButton";
import BubbleBackground from "./components/bubble/BubbleBackground";
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
      <UserHeader fontSize={32} title="Welcome to Quackwell" />

      {/* Animated GIF */}
      <Pressable onPress={handlePress}>
        <Animated.Image
          source={require("../../assets/logo_animated.gif")}
          style={[styles.gif.gifIcon, { transform: [{ scale: bounceAnim }] }]}
          resizeMode="contain"
        />
      </Pressable>
      <View style={styles.gif.messageWrapper}>
        <Text style={styles.gif.message}>Log in</Text>
      </View>

      {/* Buttons */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form.container}>
        {/* Email Input */}
        <EditableInput
          placeholder="Email..."
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false}
          style={styles.spacing}
        />
        {/* Password Input */}
        <EditableInput
          placeholder="Password..."
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        style={styles.spacing}
        />


        {/* Submit Button */}
        <GradientButton
          text="Log in"
          width={100}
          height={60}
          colors={["#F3CAAF", "#739CEF"]}
          textColor="#153CE6"
          onPress={() => console.log("Button Pressed")}
          style={styles.spacing}
        />
      </View>
    </TouchableWithoutFeedback>

      <View style={styles.footer.container}>
        <View>
          <Text
            style={styles.footer.link}
            onPress={() => navigation.navigate("Signup")}
          >
            Wnat to Sign Up?
          </Text>
        </View>
        <View>
          <Text
            style={styles.footer.link}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
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

  form: {
    container: {
      position: "absolute",
      top: "50%",
      width: "100%",
      alignItems: "center",
      paddingHorizontal: 20,
    },
  },
  spacing: {
    marginBottom: 17,
  },
  footer: {
    container: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      bottom: "10%",
      paddingHorizontal: 50,
    },
    link: {
      color: "#153CE6",
      fontWeight: "bold",
      fontSize: 18,
    },
  },
});

export default Login;
