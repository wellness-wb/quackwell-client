import { default as React, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View
} from "react-native";
import FastImage from "react-native-fast-image";
import { useBouncePress } from "../utils/useBouncePress";
import GradientButton from "./components/GradientButton";
import BubbleBackground from "./user/components/bubble/BubbleBackground";

const { width, height } = Dimensions.get("window");

const WelcomePage = ({ navigation }) => {
  
  const { bounceAnim, handlePress } = useBouncePress();
  const gifLoopAnim = useRef(new Animated.Value(1)).current;
 
  useEffect(() => {
    const startLoopingAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(gifLoopAnim, {
            toValue: 1.05,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(gifLoopAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
 
    startLoopingAnimation();

    return () => {
      gifLoopAnim.setValue(1);
    };
  }, []);

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
    <View style={styles.header.box}>
      <Pressable onPress={handlePress}>
        <Animated.Image
            source={require("../assets/welcome.png")}
            style={[styles.header.headerImage, { transform: [{ scale: bounceAnim }] }]}
            resizeMode={FastImage.resizeMode.contain}
          />
          </Pressable>
    </View>

     {/* Button Container */}
     <View style={styles.buttonContainer}>
          <GradientButton
            text="Let's Get Started"
            width={width * 0.58}
            height={height * 0.08}
            colors={["#F3CAAF", "#739CEF"]}
            textColor="#153CE6"
            onPress={() => navigation.navigate("Login")}
          />
        </View>

      {/* Bubbles */}
      <BubbleBackground pointerEvents="box-none" />
      {/* Animation */}

      <View style={styles.footer.box}>
        <Image
          source={require("../assets/team_logo.png")}
          style={styles.footer.logo}
          resizeMode="contain"
        />
      </View>

      <Animated.View style={[styles.animationBox, { transform: [{ scale: gifLoopAnim }] }]}>
        <Image
          source={require("../assets/welcome_animated.gif")} 
          style={styles.animation}
          resizeMode="contain"
        />
      </Animated.View>

    </ImageBackground>
  );
};


const styles = StyleSheet.create({
    background: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  
    header: {
      box: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        height: height * 0.4,
        width: width * 0.8,
        zIndex: 5,
      },
      headerImage: {
        resizeMode: "contain",
        width: width * 0.9,
        height: height * 0.6,
      },
    },
  
    buttonContainer: {
      flex: 0.3,
      justifyContent: "flex-start",
      alignItems: "center",
      alignSelf: "stretch",
    },

    animationBox: {
      position: 'absolute',
      top: height * 0.5,
      left: width * 0.01,
      width: width * 0.8,
      height: height * 0.8,
      justifyContent: "center",
      alignItems: "center",
    },

    animation:  {
      width: "100%",
      height: "100%",
      aspectRatio: 1,
    },
    
    footer: {
      box: {
        position: "absolute",
        top: height * 0.08,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: width * 0.2,
        height: height * 0.25,
      },
      logo: {
        width: "100%",
        height: "100%",
        alignSelf: "center",
        borderRadius: Math.min(width, height) * 0.1,
        opacity: 0.77,
        shadowColor: "black",
        shadowOffset: { width: 0, height: height * 0.005 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        justifyContent: "center",
      },
    },
  });
export default WelcomePage;
