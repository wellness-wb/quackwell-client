import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { signIn } from "../../utils/auth";
import EditableInput from "./components/EditableInput";
import FloatingBubble from "./components/FloatingBubble";

const Login = ({ navigation }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef(null);

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
          <View style={styles.loginButtonContainer}>
            <Button title="Login" onPress={handleLogin} />
          </View>
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
    loginButtonContainer: {
      marginTop: 20,
      width: "80%",
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
