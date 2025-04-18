import AsyncStorage from '@react-native-async-storage/async-storage';
import HydrationInit from './HydrationInit';
import HydrationTracker from './HydrationTracker';
import MenuBar from '../components/MenuBar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

const HydrationMain = ({ navigation }) => {
  const [isWaterIntakeSet, setIsWaterIntakeSet] = useState(false);
  const STORAGE_KEY = 'hydration_goal';

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
      {isWaterIntakeSet ? (
        <HydrationTracker
          onResetWaterIntake={() => setIsWaterIntakeSet(false)}
          navigation={navigation}
        />
      ) : (
        <HydrationInit onSetGoal={handleSetGoal} />
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
});

export default HydrationMain;
