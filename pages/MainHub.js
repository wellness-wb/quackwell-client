import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { signOut } from "../utils/auth";
import MenuBar from "./components/MenuBar";
import UpperMenu from "./components/UpperMenu";

const MainHub = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error(error);
      alert("Logout error: " + error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <UpperMenu />
      <TouchableOpacity
        onPress={handleLogout}
        style={{ marginTop: 50, marginRight: 16 }}
      >
        <Text style={{ color: "blue" }}>Logout</Text>
      </TouchableOpacity>
      <DuckAnimation />
      <MenuBar navigation={navigation} />
    </ImageBackground>
  );
};

const DuckAnimation = () => {
  const [isFirstImage, setIsFirstImage] = useState(true); // tracking which image is displayed
  const handlePress = () => {
    setIsFirstImage((prevState) => !prevState); // toggle the state
  };

  return (
    <View style={styles.imageBox}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={
            isFirstImage
              ? require("../assets/duckwithbodynohearts.png")
              : require("../assets/duckwithbody.png")
          }
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    zIndex: 0,
  },
});

export default MainHub;
