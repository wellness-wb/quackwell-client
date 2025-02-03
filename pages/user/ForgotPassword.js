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
import { sendPasswordResetLink } from "../../utils/auth";
import { useBouncePress } from "../../utils/useBouncePress";
import BubbleBackground from "./components/bubble/BubbleBackground";
import ContinueButton from "./components/button/ContinueButton";
import EditableInput from "./components/EditableInput";
import UserHeader from "./components/UserHeader";

const ForgotPassword = ({ navigation }) => {
  const { bounceAnim, soundRef, handlePress } = useBouncePress();
  const [email, setEmail] = useState("");

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

  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      await sendPasswordResetLink(email);
      alert("Password reset email sent! Please check your inbox.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (err) {
      console.error(err);
      alert(`Error: ${err}`);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <BubbleBackground />

      {/* Header Message */}
      <UserHeader title="Forgot Password" />

      {/* Animation logo */}
      <Pressable onPress={handlePress}>
        <Animated.Image
          source={require("../../assets/logo_animated.gif")}
          style={[styles.gif.gifIcon, { transform: [{ scale: bounceAnim }] }]}
          resizeMode="contain"
        />
      </Pressable>

      {/* Text field */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form.container}>
          <EditableInput
            placeholder="Enter your email..."
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}
          />

          <ContinueButton
            title="Send Reset Email"
            onPress={handleResetPassword}
          />
        </View>
      </TouchableWithoutFeedback>
      {/* Back to Login link */}
      <View style={styles.footer.container}>
        <Text style={styles.footer.bottomText}>
          Go back to{" "}
          <Text
            style={styles.footer.bottomLink}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            }
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
  header: {
    position: "absolute",
    top: 100,
    width: "100%",
    alignItems: "center",
  },
  headerText: {
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

export default ForgotPassword;
