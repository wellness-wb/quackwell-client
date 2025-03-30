import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import VirtualPet from './components/VirtualPet';
import MainHubAnimation from './components/MainHubAnimation';
import MainHubDay from './components/MainHubDay';
import MainHubNight from './components/MainHubNight';
import MenuBar from './components/MenuBar';
import UpperMenu from './components/UpperMenu';

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
    <View style={styles.background}>
      {isDayTime ? <MainHubDay /> : <MainHubNight />}

      <UpperMenu />

      <VirtualPet />

      <View style={styles.animationBox}>
        <MainHubAnimation />
      </View>

      <MenuBar navigation={navigation} activeScreen="MainHub" />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  animationBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('70%'),
    height: hp('35%'),
    top: hp('12%'),
    left: wp('20%'),
    zIndex: 10,
  },
});

export default MainHub;
