import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ImageBackground, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MenuBar from '../components/MenuBar';
import UpperMenu from '../components/UpperMenu';
import HydrationInit from './HydrationInit';
import HydrationTracker from './HydrationTracker';

const HydrationMain = ({ navigation }) => {
  const [isWaterIntakeSet, setIsWaterIntakeSet] = useState(false);
  const STORAGE_KEY = 'hydration_goal';
  const [showStartGif, setShowStartGif] = useState(false);
  const fadeStartAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedGoal = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedGoal !== null) {
          setIsWaterIntakeSet(true);
        } else {
          setIsWaterIntakeSet(false);
        }
      } catch (e) {
        console.error('Error loading hydration data', e);
      }
    };

    loadData();
  }, []);

  const handleSetGoal = async (goal, unit) => {
    try {
      const data = { goal, unit };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setIsWaterIntakeSet(true);
      setShowStartGif(true);

      Animated.timing(fadeStartAnim, {
        toValue: 1, // Fade in
        duration: 7000,
        useNativeDriver: true,
      }).start();

      Animated.timing(fadeStartAnim, {
        toValue: 0, // Fade in
        duration: 5000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setShowStartGif(false);
        fadeStartAnim.setValue(0); // Reset the animation state
      }, 15000);
    } catch (e) {
      console.error('Error saving hydration data', e);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <UpperMenu navigation={navigation} />

      {isWaterIntakeSet ? (
        <HydrationTracker
          onResetWaterIntake={() => setIsWaterIntakeSet(false)}
          navigation={navigation}
        />
      ) : (
        <HydrationInit onSetGoal={handleSetGoal} />
      )}

      {showStartGif && (
        <Animated.Image
          source={require('../../assets/calm_happy.gif')}
          style={[styles.startGif, { opacity: fadeStartAnim }]}
        />
      )}
      <MenuBar navigation={navigation} activeScreen="HydrationMain" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start', // Start content from the top
    alignItems: 'center', // Center everything horizontally
  },
  startGif: {
    position: 'absolute',
    top: hp('9%'),
    right: wp('50%'),
    width: wp('50%'),
    height: hp('27%'),
    zIndex: 0,
  },
});

export default HydrationMain;
