// ForgotPassword.js
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
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
import BubbleBackground from "./components/bubble/BubbleBackground";
import ContinueButton from "./components/button/ContinueButton";
import EditableInput from "./components/EditableInput";

const ForgotPassword = ({ navigation }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef(null);
  const [email, setEmail] = useState("");

  // Load the sound on mount
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
  }, []);

  // 애니메이트 로고 터치 시 효과
  const handlePress = async () => {
    if (soundRef.current) {
      await soundRef.current.replayAsync();
    }

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

  // 비밀번호 재설정 요청 처리
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
      {/* 배경 버블 */}
      <BubbleBackground />

      {/* 헤더 텍스트 */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>

      {/* 애니메이트 로고 */}
      <View style={styles.gifContainer}>
        <Pressable onPress={handlePress}>
          <Animated.Image
            source={require("../../assets/logo_animated.gif")}
            style={[styles.gif, { transform: [{ scale: bounceAnim }] }]}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* 입력 및 버튼 영역 */}
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

      {/* 하단 "Back to Login" 링크 */}
      <View style={styles.footer.container}>
        <Text
          style={styles.footerText}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          }
        >
          Back to Login
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
  gifContainer: {
    position: "absolute",
    top: 10,
    width: "100%",
    alignItems: "center",
  },
  gif: {
    width: 450,
    height: 450,
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
    footerText: {
      color: "#153CE6",
      textDecorationLine: "underline",
      fontSize: 16,
    },
  },
});

export default ForgotPassword;
