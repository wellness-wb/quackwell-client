// dependencies npm install -g npm@10.9.1
// npx expo install expo-linear-gradient

import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";


const Signup = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode='cover'
    >
        {/* header */}
      <View style={styles.header}>
        <Text style={styles.topText}>Start your productivity and wellness journey with Quackwell</Text>
 
      {/* GIF */}
      <Image
        source={require('../../assets/logo_animated.gif')}
          style={styles.gif}
          resizeMode="contain"
          />
      </View>

      <View style={styles.container}>
        <Text style={styles.signUp}>Sign Up</Text>
      </View>

      {/* buttons */}
      <View style={styles.buttonForGoogle}>
        <GoogleButton />
      </View>

      <View style={styles.buttonForFacebook}>
        <FacebookButton />
      </View>

        {/* log in option */}
        <View style={styles.bottomMessage}>
          <Text style={styles.bottomText}>Already have an account? <Text style={styles.underline}>Log in</Text>.
          </Text>
        </View>
    </ImageBackground>

// <Button title="Go to Profile" onPress={() => navigation.navigate("Profile")}/>

  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // the background takes up the full height and width of the container
    justifyContent: 'flex-start', // start the content from the top
    alignItems: 'center', // all child components will be horizontally centered
  },
  header: {
    position: 'absolute',
    top: 10,
    alignItems: 'center',
  },
  topText: {
    position: 'absolute', // will allow the position adjustment by me not by the container rules
    top: 75,
    color: '#153CE6',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 'normal',
    textAlign: 'center', // align always horizontally
    width: '80%',
  },
  gif: {
    width: '115%',
    height: undefined,
    aspectRatio: 1, //scaling GIF proprtionally
  },
  container: {
    position: 'absolute',
    top: 350,
    alignItems: 'center',
  },

  signUp: {
    width: '100%',
    color: '#153CE6',
    fontSize: 50,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'center', // align always horizontally
    marginBottom: 30,
  },
  buttonForGoogle: {
    position: 'absolute',
    top: '57%',
    width: '100%',
    alignItems: 'center',
  },
  buttonForFacebook: {
    position: 'absolute',
    top: '69%',
    width: '100%',
    alignItems: 'center',
  },
  bottomMessage: {
    position: 'absolute',
    bottom: 70,
    alignContent: 'center',
    width: '100%',
  },
  bottomText: {
    color: '#153CE6',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: 'normal',
  },
  underline: {
    textDecorationLine: 'underline',
    color: '#153CE6',
  },
});

export default Signup;
