import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { signOut } from "../utils/auth";
import MainHubDay from "./components/MainHubDay";
import MainHubNight from "./components/MainHubNight";
import MenuBar from "./components/MenuBar";
import UpperMenu from "./components/UpperMenu";

const MainHub = ({ navigation }) => {
  const [isDayTime, setIsDayTime] = useState(true);

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

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 7 && currentHour <= 19) {
      setIsDayTime(true); 
    } else {
      setIsDayTime(false); 
    }
  }, []);


  return (
    <View style={styles.background}>
      {isDayTime ? <MainHubDay /> : <MainHubNight />}

      <UpperMenu />

      <TouchableOpacity
        onPress={handleLogout}
        style={{ marginTop: 50, marginRight: 16 }}
      >
    
        <Text style={{ color: "blue" }}>Logout</Text>
      </TouchableOpacity>
  
      <MenuBar navigation={navigation} activeScreen="MainHub" />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  UpperMenuBox: {

  },

  buttonBox: {

  },

  menuBarBox: {

  },
});

export default MainHub;
