import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ConfettiCannon from 'react-native-confetti-cannon';
import GradientButton from '../components/GradientButton';
import UpperMenu from '../components/UpperMenu';

const HydrationTracker = ({ navigation }) => {
  const [hydrationGoal, setHydrationGoal] = useState(0);
  const [unit, setUnit] = useState('L');
  const [currentHydration, setCurrentHydration] = useState(0);
  const [inputHydration, setInputHydration] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const GOAL_STORAGE_KEY = 'hydration_goal';
  const CURRENT_STORAGE_KEY = 'currentHydration';

  useEffect(() => {
    const loadHydrationData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(GOAL_STORAGE_KEY);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setHydrationGoal(parsed.goal);
          setUnit(parsed.unit);
        }

        const storedCurrent = await AsyncStorage.getItem(CURRENT_STORAGE_KEY);
        const today = new Date().toISOString().split('T')[0];
        if (storedCurrent) {
          const parsedCurrent = JSON.parse(storedCurrent);
          // Compare the saved date with today's date
          if (parsedCurrent.date === today) {
            setCurrentHydration(parsedCurrent.value);
          } else {
            // reset current hydration on a new day
            setCurrentHydration(0);
            await AsyncStorage.setItem(
              CURRENT_STORAGE_KEY,
              JSON.stringify({ value: 0, date: today }),
            );
          }
        } else {
          setCurrentHydration(0);
        }
      } catch (error) {
        console.error('Error loading hydration data', error);
      }
    };

    loadHydrationData();
  }, []);

  useEffect(() => {
    // Request notification permissions and set up the notification token
    async function requestPermission() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        const token = await Notifications.getExpoPushTokenAsync();
        console.log('Notification Token:', token.data);
      } else {
        console.log('Notification permission denied');
      }
    }

    requestPermission();

    // Set up a reminder every 3 hours if the goal is not met
    const reminderInterval = setInterval(
      () => {
        if (currentHydration < hydrationGoal) {
          sendReminderNotification(); // Send a reminder every 3 hours
        }
      },
      3 * 60 * 60 * 1000, // 3 hours in milliseconds
    );

    return () => clearInterval(reminderInterval); // Clean up on unmount
  }, [currentHydration, hydrationGoal]);

  // Send a reminder notification
  const sendReminderNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Keep Hydrated!',
        body: `You have consumed ${currentHydration} out of ${hydrationGoal} ${unit}. Keep going!`,
        sound: 'default',
      },
      trigger: {
        seconds: 10, // Send immediately
        repeats: true, // Keep repeating every time the condition is checked
      },
    });
  };

  const handleAddWater = async () => {
    const input = parseFloat(inputHydration);
    if (!isNaN(input) && input > 0) {
      const newHydration = Math.min(currentHydration + input, hydrationGoal);
      setCurrentHydration(newHydration);
      setInputHydration('');
      Keyboard.dismiss();

      const today = new Date().toISOString().split('T')[0];
      // Save the updated hydration value with today's date
      await AsyncStorage.setItem(
        CURRENT_STORAGE_KEY,
        JSON.stringify({ value: newHydration, date: today }),
      );

      if (newHydration >= hydrationGoal) {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);
      }
    } else {
      alert('Please enter a valid amount!');
    }
  };

  const handleSetNewGoal = async () => {
    await AsyncStorage.removeItem('hydration_goal');
    await AsyncStorage.setItem(
      CURRENT_STORAGE_KEY,
      JSON.stringify({
        value: 0,
        date: new Date().toISOString().split('T')[0],
      }),
    ); // Reset current hydration to 0 for today

    setCurrentHydration(0); // Reset state to 0
    navigation.replace('HydrationMain');
  };

  // Convert liters to fl oz if needed
  const displayGoal =
    unit === 'fl oz' ? (hydrationGoal * 33.814).toFixed(1) : hydrationGoal;
  const displayCurrent =
    unit === 'fl oz'
      ? (currentHydration * 33.814).toFixed(1)
      : currentHydration;

  return (
    // everything on the screen (unless states otyherwise will dismiss the keyboard)
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.background}
        // image fully covers the container, even if some parts of the image are cut off
        resizeMode="cover"
      >
        <UpperMenu
          hydrationGoal={hydrationGoal}
          currentHydration={currentHydration}
        />

        {/* Confetti */}
        {showConfetti && (
          <>
            <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} fadeOut />
            <View style={styles.congratulationsContainer}>
              <Text style={styles.congratulationsText}>
                You've reached your hydration goal!
              </Text>
            </View>
          </>
        )}

        {/* Main Container */}
        <LinearGradient
          colors={[
            'rgba(164, 205, 241, 0.77)', // Slightly transparent blue
            'rgba(243, 202, 175, 0.77)', // Slightly transparent peach
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          {/* Circular Progress */}
          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              key={`${hydrationGoal}-${currentHydration}`}
              size={hp('20%')}
              width={wp('3%')}
              // the circle will show the percentage
              fill={(currentHydration / hydrationGoal) * 100}
              tintColor="#153CE6"
              backgroundColor="rgba(0, 0, 0, 0)"
              lineCap="round"
              // starting point set to 0
              rotation={0}
            >
              {/* rendering function */}
              {() => (
                <View style={styles.progressContent}>
                  <Text style={styles.currentHydrationText}>
                    {displayCurrent}
                  </Text>
                  <Text style={styles.goalText}>
                    out of {displayGoal} {unit}
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`Type here (${unit})`}
              keyboardType="numeric"
              value={inputHydration}
              onChangeText={setInputHydration}
              placeholderTextColor="#153CE6"
              returnKeyType="done"
            />
          </View>

          {/* Gradient Buttons */}
          <View style={styles.buttonContainer}>
            <GradientButton
              text="Add"
              width={120}
              height={50}
              colors={['#F3CAAF', '#739CEF']}
              textColor="#153CE6"
              onPress={handleAddWater}
            />
            <GradientButton
              text="Set New"
              width={120}
              height={50}
              colors={['#F3CAAF', '#739CEF']}
              textColor="#153CE6"
              onPress={handleSetNewGoal}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  // gradient container
  container: {
    position: 'absolute',
    top: 250,
    height: 400,
    width: '100%',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
  },

  progressContainer: {
    position: 'absolute',
    top: 35,
  },

  progressContent: {
    alignItems: 'center',
  },
  currentHydrationText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#153CE6',
  },
  goalText: {
    fontSize: 16,
    color: '#153CE6',
  },
  inputContainer: {
    top: hp('23%'),
    height: hp('7%'),
    width: wp('80%'),
  },

  input: {
    borderColor: '#153CE6',
    height: hp('7%'),
    textAlign: 'center',
    fontSize: hp('2%'),
    color: '#153CE6',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%'),
    marginTop: hp('27%'),
  },

  congratulationsContainer: {
    position: 'absolute',
    top: hp('15%'),
    alignItems: 'center',
    width: wp('80%'),
  },

  congratulationsText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    fontFamily: 'Inter',
    color: '#153CE6',
    textAlign: 'center',
  },
  addGif: {
    position: 'absolute',
    top: hp('30%'),
    left: wp('20%'),
    width: wp('30%'),
    height: hp('15%'),
    zIndex: 100,
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default HydrationTracker;
