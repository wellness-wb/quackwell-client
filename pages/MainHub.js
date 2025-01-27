import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MenuBar from "./components/MenuBar";
import UpperMenu from "./components/UpperMenu";

const MainHub = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <UpperMenu />
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
    <View style={styles.container}>
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-bottom",
  },
  image: {
    widtth: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default MainHub;
