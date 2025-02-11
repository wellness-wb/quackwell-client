import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const AuthButton = ({
  onPress,
  buttonText,
  iconName,
  gradientColors = ["#153CE6", "#0C2180"],
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <LinearGradient
          colors={["#F3CAAF", "#739CEF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.iconContainer}>
            <AntDesign name={iconName} size={hp("2.8%")} color="#153CE6" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    width: wp("70%"),
    height: hp("8%"),
    borderRadius: 25,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.77,
    paddingHorizontal: wp("5%"),
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("5%"),
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  buttonText: {
    color: "white",
    fontSize: hp("2.1%"),
    fontWeight: "bold",
  },
});

export default AuthButton;
