import { default as React } from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View
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
                <Image source={require("../assets/welcome.png")} style={[styles.header.headerImage]} resizeMode="contain" />
                {/* Button Container */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "Login" })}>
                        <GradientButton
                        text="Let's Get Started"
                        width={width * 0.58} 
                        height={height * 0.08}
                        colors={["#F3CAAF", "#739CEF"]}
                        textColor="#153CE6"
                        //onPress={() => navigation.navigate("Login")}
                        rightIcon={require("../assets/cloud.png")}
                        leftIcon={require("../assets/cloud.png")}
                    />
                    </TouchableOpacity>
                </View>
            <View style={styles.footer.box}>
                <Image source={require("../assets/logo_team_colored.png")} style={styles.footer.logo} resizeMode="contain" />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        headerImage: {
            width: width * 0.85,
            height: height * 0.7,
            top: height * 0.1,
        },
    },

    buttonContainer: {
        position: "absolute",
        top: height * 0.55,
        left: width * 0.225,
        justifyContent: "center",
        alignSelf: "center",
        zIndex: 1,
    },

    footer: {
        box: {
            flex: 1,
            justifyContent: "flex-end",
            paddingTop: 50,
            alignItems: "center",
            
            
        },
        logo: {
            width: width * 0.8,
            height: width * 0.8,
            alignSelf: "center",
            borderRadius: Math.min(Dimensions.get("window").width, Dimensions.get("window").height) * 0.1,
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