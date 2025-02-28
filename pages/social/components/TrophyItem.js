import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const TrophyItem = ({ title, image, progress }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.trophyContainer}>
      <LinearGradient
        colors={['#153CE6', '#F3CAAF']}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.trophyBackground}
      >
        {/* Trophy Name */}
        <Text style={styles.trophyText}>{title}</Text>

        {/* Trophy GIF or Image */}
        <View style={styles.trophyBox}>
          <Animated.Image source={image} style={styles.trophyIcon} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBarAnimated,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', `${progress * 100}%`], // Starts at given progress
                }),
              },
            ]}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  trophyContainer: {
    alignItems: 'center',
    width: wp('90%'),
    marginBottom: hp('2%'),
  },

  trophyBackground: {
    width: '100%',
    height: hp('15%'),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  trophyBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },

  trophyText: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
    color: '#0C2180',
    textAlign: 'center',
    top: hp('10%'),
    left: wp('13%'),
  },

  trophyIcon: {
    width: wp('30%'),
    height: hp('30%'),
    right: wp('27%'),
    top: hp('0.2%'),
    resizeMode: 'contain',
  },

  progressContainer: {
    width: wp('49%'),
    height: hp('4%'),
    borderRadius: 10,
    overflow: 'hidden',
    left: wp('13%'),
    bottom: hp('12%'),
    zIndex: 2,
    backgroundColor: '#F3CAAF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  progressBarAnimated: {
    height: '100%',
    backgroundColor: '#153CE6',
    opacity: 0.88,
    borderRadius: 10,
    width: '60%',
  },
});

export default TrophyItem;
