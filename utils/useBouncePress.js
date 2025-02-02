import { useRef } from "react";
import { Animated } from "react-native";

export const useBouncePress = () => {
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef(null);

  const handlePress = async () => {
    if (soundRef.current) {
      await soundRef.current.replayAsync();
    }
    Animated.sequence([
      Animated.spring(bounceAnim, {
        toValue: 1.2,
        useNativeDriver: true,
        speed: 20,
        bounciness: 10,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 10,
      }),
    ]).start();
  };

  return { bounceAnim, soundRef, handlePress };
};
