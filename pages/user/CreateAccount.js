// CreateAccount.js
import React, { useRef, useState } from "react";
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
import { signUp } from "../../utils/auth";
import EditableInput from "./components/EditableInput";
import FloatingBubble from "./components/FloatingBubble";

const CreateAccount = ({ navigation }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;

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

  // Similar bounce animation when the logo is pressed
  const handlePress = () => {
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
      {/* Floating Bubbles */}
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

      {/* Header Message */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Create Account</Text>
      </View>

      {/* Animated Logo */}
      <View style={styles.gifContainer}>
        <Pressable onPress={handlePress}>
          <Animated.Image
            source={require("../../assets/logo_animated.gif")}
            style={[styles.gif, { transform: [{ scale: bounceAnim }] }]}
            resizeMode="contain"
          />
        </Pressable>
      </View>

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
          <View style={styles.signUpButtonContainer}>
            <Button title="Sign Up" onPress={handleSignUp} />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Footer with Link to Login */}
      <View style={styles.footer.container}>
        <Text>
          Already have an account?{" "}
          <Text
            style={styles.footer.link}
            onPress={() => navigation.navigate("Login")}
          >
            Log In
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
  form: {
    container: {
      position: "absolute",
      top: "45%",
      width: "100%",
      alignItems: "center",
      paddingHorizontal: 20,
    },
  },
  signUpButtonContainer: {
    marginTop: 20,
    width: "80%",
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

export default CreateAccount;
