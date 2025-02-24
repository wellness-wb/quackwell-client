// DayBackground.js
import { default as React, useEffect, useRef } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const MainHubNight = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000, // 3 seconds
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000, // 3 seconds
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <ImageBackground
      source={require('../../assets/bedroom.png')}
      style={styles.background}
    >
      <View style={styles.lampBox}>
        <Animated.Image
          source={require('../../assets/lamp_light.png')}
          style={[styles.lampImage, { opacity: fadeAnim }]}
        />
      </View>

      <View style={styles.laptopBox}>
        <Animated.Image
          source={require('../../assets/glow.png')}
          style={[styles.laptopImage, { opacity: fadeAnim }]}
        />
      </View>

      <View style={styles.blinkBox}>
        <Animated.Image
          source={require('../../assets/moon_blink.png')}
          style={[styles.blinkImage, { opacity: fadeAnim }]}
        />
      </View>

      <View style={styles.blinkBox2}>
        <Animated.Image
          source={require('../../assets/moon_blink.png')}
          style={[styles.blinkImage2, { opacity: fadeAnim }]}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('100%'),
    resizeMode: 'cover',
  },

  lampBox: {
    width: wp('25%'),
    height: hp('3%'),
    top: hp('49.8%'),
    left: wp('10.5%'),
    zIndex: 5,
  },

  lampImage: {
    width: wp('10%'),
    height: hp('7%'),
  },

  laptopBox: {
    width: wp('25%'),
    height: hp('10%'),
    top: hp('52%'),
    right: wp('7%'),
    zIndex: 1,
    justifyContent: 'center',
    opacity: 0.5,
    resizeMode: 'contain',
  },

  laptopImage: {
    width: wp('15%'),
    height: hp('10%'),
  },

  blinkBox: {
    width: wp('15%'),
    height: hp('5%'),
    top: hp('19%'),
    right: wp('6%'),
    zIndex: 3,
  },

  blinkImage: {
    width: wp('15%'),
    height: hp('5%'),
  },

  blinkBox2: {
    width: wp('15%'),
    height: hp('5%'),
    top: hp('20%'),
    left: wp('9%'),
    zIndex: 2,
  },

  blinkImage2: {
    width: wp('15%'),
    height: hp('5%'),
  },
});

export default MainHubNight;
