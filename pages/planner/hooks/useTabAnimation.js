import { useRef, useState } from 'react';
import { Animated, PanResponder, Platform } from 'react-native';

export const useTabAnimation = (
  initialHeight = Platform.OS === 'android' ? 200 : 375,
) => {
  const [menuPosition, setMenuPosition] = useState(0);
  const menuHeight = useRef(new Animated.Value(initialHeight)).current;

  const onLayout = (event) => {
    const { y } = event.nativeEvent.layout;
    setMenuPosition(y);
  };

  const expandMenu = () => {
    Animated.timing(menuHeight, {
      toValue: Platform.OS === 'android' ? 500 : 600,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const collapseMenu = () => {
    Animated.timing(menuHeight, {
      toValue: Platform.OS === 'android' ? 200 : 375,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      const touchY = evt.nativeEvent.pageY;
      const menuTop = menuPosition;
      return touchY >= menuTop && touchY <= menuTop + 50;
    },
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > 10;
    },
    onPanResponderMove: (_, gestureState) => {
      let newHeight = menuHeight._value - gestureState.dy;
      newHeight = Math.max(50, Math.min(600, newHeight));
      menuHeight.setValue(newHeight);
    },
    onPanResponderRelease: (_, gestureState) => {
      const threshold = 100;

      if (gestureState.dy < -threshold) {
        expandMenu();
      } else if (gestureState.dy > threshold) {
        collapseMenu();
      } else {
        if (menuHeight._value > 300) {
          expandMenu();
        } else {
          collapseMenu();
        }
      }
    },
  });

  return {
    menuHeight,
    menuPosition,
    expandMenu,
    collapseMenu,
    onLayout,
    panResponder,
  };
};
