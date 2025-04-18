import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
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
import GradientButton from '../components/GradientButton';
import HydrationWarning from './components/HydrationWarning';

const HydrationInit = ({ onSetGoal }) => {
  // hydrationGoal holds the user input as a string.
  const [hydrationGoal, setHydrationGoal] = useState(0);
  const [unit, setUnit] = useState('L'); // Default unit
  const [warningVisible, setWarningVisible] = useState(false);

  // Validate input and then use the parent's callback to save the goal.
  const handleSetGoalPress = () => {
    const goal = parseFloat(hydrationGoal);
    const isInvalid =
      (unit === 'fl oz' && (goal / 33.814 < 1.5 || goal / 33.814 > 6)) ||
      (unit === 'L' && (goal < 1.5 || goal > 6));

    if (isInvalid) {
      setWarningVisible(true);
      return;
    }

    setWarningVisible(false);
    // Call the parent's callback to save the goal to AsyncStorage.
    onSetGoal(goal, unit);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.background}
      >
        <HydrationWarning
          isVisible={warningVisible}
          onClose={() => setWarningVisible(false)}
        />

        <LinearGradient
          colors={['rgba(164, 205, 241, 0.77)', 'rgba(243, 202, 175, 0.77)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <Text style={styles.title}>Desired Water Intake per Day:</Text>

          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#F3CAAF', '#739CEF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientInput}
            >
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={hydrationGoal}
                onChangeText={setHydrationGoal}
                placeholderTextColor="#153CE6"
                returnKeyType="done"
                onSubmitEditing={handleSetGoalPress}
              />
            </LinearGradient>
          </View>

          <View style={styles.toggleContainer}>
            <GradientButton
              text="L"
              width={wp('30%')}
              height={hp('6%')}
              colors={
                unit === 'L' ? ['#153CE6', '#0C2180'] : ['#F3CAAF', '#739CEF']
              }
              textColor={unit === 'L' ? '#F3CAAF' : '#153CE6'}
              onPress={() => setUnit('L')}
            />
            <GradientButton
              text="fl oz"
              width={wp('30%')}
              height={hp('6%')}
              colors={
                unit === 'fl oz'
                  ? ['#153CE6', '#0C2180']
                  : ['#F3CAAF', '#739CEF']
              }
              textColor={unit === 'fl oz' ? '#F3CAAF' : '#153CE6'}
              onPress={() => setUnit('fl oz')}
            />
          </View>

          <GradientButton
            text="Set"
            width={wp('30%')}
            height={hp('6%')}
            colors={['#F3CAAF', '#739CEF']}
            textColor="#153CE6"
            onPress={handleSetGoalPress}
          />
        </LinearGradient>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    top: hp('29%'),
    height: hp('47%'),
    width: wp('98%'),
    borderRadius: wp('10%'),
    padding: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter',
    color: '#153CE6',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    marginBottom: hp('6%'),
    marginTop: hp('6%'),
  },
  inputContainer: {
    width: wp('55%'),
    height: hp('5.5%'),
    marginBottom: hp('4%'),
  },
  gradientInput: {
    flex: 1,
    borderRadius: wp('10%'),
    justifyContent: 'center',
    overflow: 'hidden',
    opacity: 0.77,
  },
  input: {
    fontFamily: 'Inter',
    flex: 1,
    textAlign: 'center',
    fontSize: hp('2.4%'),
    color: '#153CE6',
    marginHorizontal: wp('5%'),
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: hp('5%'),
    justifyContent: 'space-around',
  },
});

export default HydrationInit;
