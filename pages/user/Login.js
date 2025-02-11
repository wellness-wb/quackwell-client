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
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

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

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <BubbleBackground />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <UserHeader title="Welcome to Quackwell" />
            <Pressable onPress={handlePress} style={styles.gifIcon}>
              <Animated.Image
                source={require("../../assets/logo_animated.gif")}
                style={[styles.gifIcon, { transform: [{ scale: bounceAnim }] }]}
              />
            </Pressable>
            <Text style={styles.gifMessage}>Log in</Text>

            <View style={styles.formContainer}>
              <EditableInput
                placeholder="Email..."
                value={email}
                onChangeText={setEmail}
                secureTextEntry={false}
                style={styles.spacing}
              />
              <EditableInput
                placeholder="Password..."
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.spacing}
              />
              <ContinueButton title="Login" onPress={handleLogin} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {!isKeyboardVisible && (
        <View style={styles.footer}>
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate("Signup")}
          >
            Want to Sign Up?
          </Text>
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot Password?
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
  gifMessage: {
    position: "absolute",
    top: hp("33%"),
    color: "#153CE6",
    fontSize: hp("3.5%"),
    fontFamily: "Inter",
    fontWeight: "bold",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    flexGrow: 1,
  },
  spacing: {
    marginBottom: hp("2.5%"),
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("7%"),
    marginBottom: hp("5%"),
  },
  footerLink: {
    color: "#153CE6",
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
});

export default Login;
