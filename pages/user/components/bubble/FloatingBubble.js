import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const FloatingBubble = ({ source, size = 50 }) => {
  const translateX = useRef(new Animated.Value(Math.random() * width)).current; // Random horizontal start
  const translateY = useRef(new Animated.Value(height)).current; // Start at the bottom
  const xDirection = useRef(Math.random() > 0.5 ? 1 : -1); // Random initial horizontal direction

  useEffect(() => {
    const randomHorizontalDrift = () => Math.random() * 50 + 50; // Random horizontal drift distance

    const moveHorizontally = () => {
      const toValue =
        xDirection.current === 1
          ? Math.min(translateX._value + randomHorizontalDrift(), width - size)
          : Math.max(translateX._value - randomHorizontalDrift(), 0);

      Animated.timing(translateX, {
        toValue,
        duration: 3000 + Math.random() * 2000, // 3-5 seconds
        useNativeDriver: true,
      }).start(() => {
        // Reverse direction if hitting edges
        if (toValue <= 0 || toValue >= width - size) {
          xDirection.current *= -1; // Reverse direction
        }
        moveHorizontally(); // Continue horizontal movement
      });
    };

    const moveVertically = () => {
      Animated.timing(translateY, {
        toValue: -700, // Float above the top of the screen
        duration: 10000 + Math.random() * 3000, // 10-15 seconds
        useNativeDriver: true,
      }).start(() => {
        // Reset to the bottom after reaching the top
        translateY.setValue(height);
        translateX.setValue(Math.random() * width); // Random horizontal start
        moveVertically(); // Restart vertical animation
      });
    };

    moveHorizontally(); // Start horizontal movement
    moveVertically(); // Start vertical movement
  }, [translateX, translateY]);

  return (
    <Animated.Image
      source={source}
      style={[
        styles.bubble,
        {
          width: size,
          height: size,
          transform: [{ translateX }, { translateY }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    resizeMode: 'contain',
    opacity: 0.7,
  },
});

export default FloatingBubble;
