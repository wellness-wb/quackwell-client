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
import MenuBar from '../components/MenuBar';
import HydrationWarning from './components/HydrationWarning';

const HydrationMain = ({ navigation }) => {
  // hydrationGoal is the current value, setHydrationGoal is the function to update it, useState initializes it to ""
  const [hydrationGoal, setHydrationGoal] = useState(''); // User input
  const [unit, setUnit] = useState('L'); // Default unit
  const [warningVisible, setWarningVisible] = useState(false); // Warning state

  const handleSetGoal = () => {
    const goal = parseFloat(hydrationGoal);
    const isInvalid =
      (unit === 'fl oz' && (goal / 33.814 < 1.5 || goal / 33.814 > 6)) ||
      (unit === 'L' && (goal < 1.5 || goal > 6));

    setWarningVisible(isInvalid);
  };

  return (
    // touchablewithoutfeedback is basically for dismissing keyboard
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.background}
      >
        <HydrationWarning
          isVisible={warningVisible}
          onClose={() => setWarningVisible(false)}
        />

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
          <Text style={styles.title}>Desired Water Intake per Day:</Text>

          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#153CE6', '#0C2180']}
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
                placeholderTextColor="#F3CAAF" // Adjust placeholder color for better visibility
                returnKeyType="done" // Adds "Set" or "Done" to the keyboard button
                onSubmitEditing={handleSetGoal}
              />
            </LinearGradient>
          </View>

          <View style={styles.toggleContainer}>
            <GradientButton
              text="L"
              width={wp('30%')}
              height={hp('6%')}
              colors={
                unit === 'L' ? ['#F3CAAF', '#F0A26F'] : ['#153CE6', '#0C2180']
              }
              textColor={unit === 'L' ? '#153CE6' : '#F3CAAF'} // Dynamic text color
              onPress={() => setUnit('L')}
            />
            <GradientButton
              text="fl oz"
              width={wp('30%')}
              height={hp('6%')}
              colors={
                unit === 'fl oz'
                  ? ['#F3CAAF', '#F0A26F']
                  : ['#153CE6', '#0C2180']
              }
              textColor={unit === 'fl oz' ? '#153CE6' : '#F3CAAF'} // Dynamic text color
              onPress={() => setUnit('fl oz')}
            />
          </View>

          <GradientButton
            text="Set"
            width={wp('30%')}
            height={hp('6%')}
            colors={['#153CE6', '#0C2180']}
            textColor="#F3CAAF"
            onPress={() => {
              const goal = parseFloat(hydrationGoal);
              if (
                (unit === 'fl oz' &&
                  (goal / 33.814 < 1.5 || goal / 33.814 > 6)) ||
                (unit === 'L' && (goal < 1.5 || goal > 6))
              ) {
                setWarningVisible(true); // Show warning
                return;
              }
              setWarningVisible(false); // Hide warning
              navigation.navigate('HydrationTracker', {
                hydrationGoal,
                unit,
              }); // Pass the data
            }}
          />
        </LinearGradient>

        <MenuBar navigation={navigation} activeScreen="HydrationMain" />
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
    color: '#F3CAAF',
    marginHorizontal: wp('5%'),
  },

  toggleContainer: {
    flexDirection: 'row',
    marginBottom: hp('5%'),
    justifyContent: 'space-around',
  },
});

export default HydrationMain;
