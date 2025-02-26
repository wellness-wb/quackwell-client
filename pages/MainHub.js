import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { signOut } from '../utils/auth';
import MainHubAnimation from './components/MainHubAnimation';
import MainHubDay from './components/MainHubDay';
import MainHubNight from './components/MainHubNight';
import MenuBar from './components/MenuBar';
import UpperMenu from './components/UpperMenu';

const MainHub = ({ navigation }) => {
  const [isDayTime, setIsDayTime] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error(error);
      alert('Logout error: ' + error);
    }
  };

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

      <View style={styles.animationBox}>
        <MainHubAnimation />
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={{ marginTop: 50, marginRight: 16 }}
      >
        <Text style={{ color: 'blue' }}>Logout</Text>
      </TouchableOpacity>

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
    height: hp('24%'),
    top: hp('35%'),
    left: wp('20%'),
    zIndex: 10,
  },
});

export default MainHub;
