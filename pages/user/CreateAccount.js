import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { signUp } from '../../utils/auth';
import { useBouncePress } from '../../utils/useBouncePress';
import BubbleBackground from './components/bubble/BubbleBackground';
import ContinueButton from './components/button/ContinueButton';
import EditableInput from './components/EditableInput';
import UserHeader from './components/UserHeader';

const CreateAccount = ({ navigation }) => {
  const { bounceAnim, soundRef, handlePress } = useBouncePress();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      alert('Sign-up success! Please check your email for confirmation link.');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      alert(`Sign-up error: ${error}`);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/quack.mp3'),
      );
      soundRef.current = sound;
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }

      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [soundRef]);

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Bubbles */}
      <BubbleBackground />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Header Message */}
            <UserHeader title="Create Account" />

            {/* Animation logo */}
            <Pressable onPress={handlePress} style={styles.gifIcon}>
              <Animated.Image
                source={require('../../assets/logo_animated.gif')}
                style={[styles.gifIcon, { transform: [{ scale: bounceAnim }] }]}
              />
            </Pressable>

            <View style={styles.formContainer}>
              <EditableInput
                placeholder="Email..."
                value={email}
                onChangeText={setEmail}
                secureTextEntry={false}
                style={styles.spacing}
              />
              <EditableInput
                placeholder="Password..."
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.spacing}
              />

              <ContinueButton title="Sign Up" onPress={handleSignUp} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Footer with Link to Login */}
      {!isKeyboardVisible && (
        <View style={styles.footer.container}>
          <Text style={styles.footer.bottomText}>
            Already have an account?{' '}
            <Text
              style={styles.footer.bottomLink}
              onPress={() => navigation.navigate('Login')}
            >
              Log in
            </Text>
          </Text>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  gifIcon: {
    height: hp('30%'),
    aspectRatio: 1,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    flexGrow: 1,
  },
  spacing: {
    marginBottom: hp('2.5%'),
  },
  footer: {
    container: {
      width: '100%',
      position: 'absolute',
      bottom: '10%',
      alignItems: 'center',
    },
    bottomText: {
      textAlign: 'center',
      fontSize: wp('4.2%'),
    },
    bottomLink: {
      color: '#153CE6',
      fontWeight: 'bold',
      fontSize: wp('4.5%'),
    },
  },
});

export default CreateAccount;
