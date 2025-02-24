// DayBackground.js
import { default as React, useEffect, useRef } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const MainHubDay = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0

  useEffect(() => {
    // Fade in and out the glow image
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1, // Fade in
          duration: 2000, // 3 seconds
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0, // Fade out
          duration: 2000, // 3 seconds
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <ImageBackground
      source={require('../../assets/living_room.png')} // Add your image here
      style={styles.background}
    >
      <View style={styles.sunBox}>
        <Animated.Image
          source={require('../../assets/glow.png')}
          style={[styles.glowImage, { opacity: fadeAnim }]}
        />
      </View>

      <View style={styles.steamBox}>
        <Animated.Image
          source={require('../../assets/steam.png')}
          style={[styles.steamImage, { opacity: fadeAnim }]}
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

  sunBox: {
    width: wp('40%'),
    height: hp('20%'),
    top: hp('37%'),
    left: wp('3%'),
    zIndex: 4,
    opacity: 0.5,
  },

  glowImage: {
    width: wp('40%'),
    height: hp('20%'),
  },

  steamBox: {
    width: wp('20%'),
    height: hp('10%'),
    top: hp('44%'),
    right: wp('1%'),
    zIndex: 5,
  },

  steamImage: {
    width: wp('10%'),
    height: hp('5%'),
  },
});

export default MainHubDay;
