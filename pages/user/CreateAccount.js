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
import { signUp } from "../../utils/auth";
import { useBouncePress } from "../../utils/useBouncePress";
import BubbleBackground from "./components/bubble/BubbleBackground";
import ContinueButton from "./components/button/ContinueButton";
import EditableInput from "./components/EditableInput";
import UserHeader from "./components/UserHeader";

const CreateAccount = ({ navigation }) => {
  const { bounceAnim, soundRef, handlePress } = useBouncePress();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      alert("Sign-up success! Please check your email for confirmation link.");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      alert(`Sign-up error: ${error}`);
    }
  };

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
      {/* Bubbles */}
      <BubbleBackground />

      {/* Header Message */}
      <UserHeader title="Create Account" />

      {/* Animation logo */}
      <Pressable onPress={handlePress}>
        <Animated.Image
          source={require("../../assets/logo_animated.gif")}
          style={[styles.gif.gifIcon, { transform: [{ scale: bounceAnim }] }]}
          resizeMode="contain"
        />
      </Pressable>

      {/* Form Section */}
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

          <ContinueButton title="Sign Up" onPress={handleSignUp} />
        </View>
      </TouchableWithoutFeedback>

      {/* Footer with Link to Login */}
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

export default CreateAccount;
