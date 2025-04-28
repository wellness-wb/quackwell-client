import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainHubDay from './components/MainHubDay';
import MainHubNight from './components/MainHubNight';
import MenuBar from './components/MenuBar';
import UpperMenu from './components/UpperMenu';
import VirtualPet from './components/VirtualPet';

const MainHub = ({ navigation }) => {
  const [isDayTime, setIsDayTime] = useState(true);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 7 && currentHour <= 19) {
      setIsDayTime(true);
    } else {
      setIsDayTime(false);
    }
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDayTime ? 'dark-content' : 'light-content'} />
      <View style={styles.background}>
        {isDayTime ? (
          <View style={styles.backgroundContainer}>
            <MainHubDay />
          </View>
        ) : (
          <View style={styles.backgroundContainer}>
            <MainHubNight />
          </View>
        )}

        <UpperMenu navigation={navigation} />

        <View style={styles.animationBox}>
          <VirtualPet />
        </View>

        <MenuBar navigation={navigation} activeScreen="MainHub" />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'relative',
    height: Platform.OS === 'android' ? '100%' : 'auto',
  },

  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },

  animationBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('70%'),
    height: hp('35%'),
    bottom: hp('12%'),
    alignSelf: 'center',
  },
});

export default MainHub;
