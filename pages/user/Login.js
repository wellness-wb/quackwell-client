import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import EmailButton from "./EmailButton";
import LoggingInButton from "./LoggingInButton";
import PasswordButton from "./PasswordButton";

const Login = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Welcome Back Message */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
      </View>

      {/* Animated GIF */}
      <View style={styles.gifContainer}>
        <Image
          source={require("../../assets/logo_animated.gif")}
          style={styles.gif}
          resizeMode="contain"
        />
      </View>

      {/* Log In Text */}
      <View style={styles.logInContainer}>
        <Text style={styles.logIn}>Log In</Text>
      </View>
        {/* Email Button */}
      <View style={styles.buttonForEmail}>
        <EmailButton />
      </View>
        {/* Password Button */}
      <View style={styles.buttonForPassword}>
      <PasswordButton />
    </View>

    {/* Log Me In Button */}
    <View style={styles.buttonForLoggingIn}>
      <LoggingInButton onPress={() => navigation.navigate("MainHub")}/>
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
    top: 10, // Places the GIF below the welcome text
    alignItems: "center",
    width: "100%",
  },
  gif: {
    width: 450,
    height: 450,
  },
  logInContainer: {
    position: "absolute",
    top: 300, // Adjust to position the "Log In" text
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
    position: 'absolute',
    top: '50%',
    width: '100%',
    alignItems: 'center',
  },
  buttonForPassword: {
    position: 'absolute',
    top: '62%',
    width: '100%',
    alignItems: 'center',
  },
  buttonForLoggingIn: {
    position: 'absolute',
    top: '74%',
    width: '100%',
    alignItems: 'center',
  },
});

export default Login;
