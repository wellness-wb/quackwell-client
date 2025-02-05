import { default as React } from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import GradientButton from "./components/GradientButton";
import BubbleBackground from "./user/components/bubble/BubbleBackground";

const { width, height } = Dimensions.get("window");

const WelcomePage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Bubbles */}
      <BubbleBackground />
      <View style={styles.header.box}>
        <Image
            source={require("../assets/welcome.png")}
            style={[styles.header.headerImage]}
            resizeMode="contain"
        />
      </View>
      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <GradientButton
            text="Let's Get Started"
            width={width * 0.58}
            height={height * 0.08}
            colors={["#F3CAAF", "#739CEF"]}
            textColor="#153CE6"
            onPress={() => navigation.navigate("Login")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.footer.box}>
        <Image
          source={require("../assets/team_logo.png")}
          style={styles.footer.logo}
          resizeMode="contain"
        />
      </View>
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
        flex: 0.8,
        justifyContent: "flex-end",
        alignItems: "center",
        alignSelf: "stretch",
      },
      headerImage: {
        width: "90%", 
        height: "90%",
        resizeMode: "contain",
      },
    },
  
    buttonContainer: {
      flex: 0.3,
      justifyContent: "flex-start",
      alignItems: "center",
      alignSelf: "stretch",
      zIndex: 2,
    },
  
    footer: {
      box: {
        flex: 0.2,
        justifyContent: "flex-end",
        alignItems: "center",
        alignSelf: "stretch",
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
        zIndex: 1,
      },
    },
  });
export default WelcomePage;
