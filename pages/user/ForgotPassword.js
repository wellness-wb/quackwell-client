import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  Animated,
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { sendPasswordResetLink } from "../../utils/auth";
import { useBouncePress } from "../../utils/useBouncePress";
import BubbleBackground from "./components/bubble/BubbleBackground";
import ContinueButton from "./components/button/ContinueButton";
import EditableInput from "./components/EditableInput";
import UserHeader from "./components/UserHeader";

const ForgotPassword = ({ navigation }) => {
  const { bounceAnim, soundRef, handlePress } = useBouncePress();
  const [email, setEmail] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

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

      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
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

      {/* Text field */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <UserHeader title="Forgot Password" />
            <Pressable onPress={handlePress} style={styles.gifIcon}>
              <Animated.Image
                source={require("../../assets/logo_animated.gif")}
                style={[styles.gifIcon, { transform: [{ scale: bounceAnim }] }]}
              />
            </Pressable>
            <View style={styles.formContainer}>
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
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Back to Login link */}
      {!isKeyboardVisible && (
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
      )}
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
  formContainer: {
    width: "100%",
    alignItems: "center",
    flexGrow: 1,
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
      fontSize: wp("4.2%"),
    },
    bottomLink: {
      color: "#153CE6",
      fontWeight: "bold",
      fontSize: wp("4.5%"),
    },
  },
});

export default ForgotPassword;
