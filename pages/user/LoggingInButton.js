import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { Animated, Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const LoggingInButton = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animate to make the button grow
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 2.5, // Slightly larger
      useNativeDriver: true,
    }).start();
  };

  // Animate to reset the button size
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Back to original size
      useNativeDriver: true,
    }).start();
  };

    return (
      <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
        <LinearGradient
          colors={["#153CE6", "#0C2180"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
        <View style={styles.buttonContainer}>
          <Image
            source={require("../../assets/arrow.png")}
            style={styles.image}
          />
        </View>
      </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10, // Adjust spacing between buttons if needed
  },
  button: {
    width: 90,
    height: 70,
    borderRadius: 29,
    overflow: 'hidden', // Ensures the gradient respects the button shape
  },
  gradient: {
    flex: 1,
    justifyContent: 'center', // Centers the content vertically
    flexDirection: 'row',
    alignItems: 'center', // Centers the content horizontally
    opacity: 0.77,
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 50,
    height: 50,
  }
});

export default LoggingInButton;