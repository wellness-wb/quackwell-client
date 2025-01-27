import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";


const MenuBar = ({navigation, activeScreen}) => {
  return (
    <View style={styles.menuBar}>
      {/* Calendar */}
      <TouchableOpacity 
      style={styles.calendarContainer}
      onPress={() => navigation.navigate("PlannerMain")}
      >
        <LinearGradient
          colors={
            activeScreen === "PlannerMain"
              ? ["#F3CAAF", "#F0A26F"] // Active gradient
              : ["#739CEF", "#A4CDF1"] // Default gradient
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Image
            source={require("../assets/calendar.png")}
            style={styles.calendarIcon}
          />
        </LinearGradient>
      </TouchableOpacity>

      {/* Hydration */}
      <TouchableOpacity 
      style={styles.hydrationContainer}
      onPress={() => navigation.navigate("HydrationMain")}
      >
          {/* Active screen will change the color of the icon background */}
          <LinearGradient
          colors={
            ["HydrationMain", "HydrationTracker"].includes(activeScreen)
              ? ["#F3CAAF", "#F0A26F"] // Active gradient
              : ["#739CEF", "#A4CDF1"] // Default gradient
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Image
            source={require("../assets/hydration.png")}
            style={styles.hydrationIcon}
          />
        </LinearGradient>
      </TouchableOpacity>

      {/* Calm */}
      <TouchableOpacity 
      style={styles.calmContainer}
      onPress={() => navigation.navigate("CalmMain")}
      >
        <LinearGradient
          colors={["#739CEF", "#F3CAAF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Image
            source={require("../assets/calm.png")}
            style={styles.calmIcon}
          />
        </LinearGradient>
      </TouchableOpacity>

      {/* Feed */}
      <TouchableOpacity 
      style={styles.feedContainer}
      onPress={() => navigation.navigate("SocialMain")}>
        <LinearGradient
          colors={["#739CEF", "#F3CAAF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Image
            source={require("../assets/feed.png")}
            style={styles.feedIcon}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuBar: {
    position: "absolute",
    bottom: 35,
    width: "90%",
    height: 80,
    backgroundColor: "#153CE6",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 33,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 27,
  },

  calendarContainer: {
    width: 70,
    height: 65,
    borderRadius: 35,
    marginLeft: 0,
    marginRight: 5,
  },
  hydrationContainer: {
    width: 70,
    height: 65,
    borderRadius: 35,
    marginLeft: 5,
    marginRight: 5,
  },
  calmContainer: {
    width: 70,
    height: 65,
    borderRadius: 35,
    marginLeft: 5,
    marginRight: 5,
  },
  feedContainer: {
    width: 70,
    height: 65,
    borderRadius: 35,
    marginLeft: 5,
  },
 
  calendarIcon: {
    width: 300,
    height: 300,
    marginLeft: 5,
    marginTop: 5,
    resizeMode: "contain",
  },
  hydrationIcon: {
    width: 360,
    height: 360,
    marginLeft: 15,
    resizeMode: "contain",
  },
  calmIcon: {
    width: 500,
    height: 500,
    resizeMode: "contain",
  },
  feedIcon: {
    width: 500,
    height: 500,
    resizeMode: "contain",
  },
});

export default MenuBar;
