import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";

const UpperMenu = () => {
    // useState hook const [state, setState ] = useState(initalValue). in this case no setState bc it will be handled by animated view
    // Animated.Value is an object represents a mutable value that can be smoothly animated
  const [menuHeight] = useState(new Animated.Value(50)); // initial height of the menu

  // PanResponder is a utility that helps with touch gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true, // called every time user moves their finger on the screen
    // event when the animation should be activated
    onPanResponderMove: Animated.event(
      [
        null, // ignore the native event
        {
          dy: menuHeight, // vertical gesture to change the height of menu
        },
      ],
      { useNativeDriver: false } // don't need the native threads, for better animation
    ),
    onPanResponderRelease: (_, gestureState) => { // is activated when the user lifts their finger off the screen
      const threshold = 20; // minimum gesture length to expand/collapse
      if (gestureState.dy > threshold) {
        // collapse the menu
        Animated.timing(menuHeight, {
          toValue: 150, // height when expanded
          duration: 300, // ms of animation
          useNativeDriver: false,
        }).start();
      } else {
        // expand the menu
        Animated.timing(menuHeight, {
          toValue: 50, // height when collapsed
          duration: 300, //ms for animation
          useNativeDriver: false,
        }).start();
      }
    },
  });

  // the container with animation
  return (
    <Animated.View
      {...panResponder.panHandlers} // attach the responder to the menu
      style={[styles.menuBar, { height: menuHeight }]} // will have the same argument as animation function
    >
      <LinearGradient
        colors={["#A4CDF1", "#F3CAAF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* placeholder content */}
        <View style={styles.placeholder} />
      </LinearGradient>
      {/* sldier handle */}
      <View style={styles.sliderHandle} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuBar: {
    width: "100%",
    position: "absolute",
    top: 0,
    opacity: 0.77,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderHandle: {
    position: 'absolute',
    top: '75%',
    height: 10,
    width: 70,
    backgroundColor: "#E8CDC0",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5, // Android shadow
  },
});

export default UpperMenu;
