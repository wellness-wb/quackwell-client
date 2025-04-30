import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getUsername } from '../../utils/auth';
import MenuBar from '../components/MenuBar';
import UpperMenu from '../components/UpperMenu';
import IconRow from './components/IconRow';
import ProfileCircle from './components/ProfileCircle';
import TrophyFriendsBox from './components/TrophyFriendsBox';
import { SOCIAL_CONSTANTS } from './constants/socialConstants';

const SocialMain = ({ navigation }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const name = await getUsername();
        setUsername(name);
      } catch (error) {
        console.error('Error fetching username:', error);
        Alert.alert('Error', 'Failed to load user information');
      }
    };

    fetchUsername();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.upperMenu}>
        <UpperMenu navigation={navigation} />
      </View>

      <ProfileCircle />

      <View style={styles.profileBox}>
        <LinearGradient
          colors={SOCIAL_CONSTANTS.GRADIENTS.MAIN}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.profileName}>{username}</Text>
          <IconRow navigation={navigation} />
          <TrophyFriendsBox navigation={navigation} />
        </LinearGradient>
      </View>

      <MenuBar navigation={navigation} activeScreen="SocialMain" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  upperMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  profileBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('40%'),
  },
  gradient: {
    width: '100%',
    height: hp(SOCIAL_CONSTANTS.LAYOUT.PROFILE_BOX.height + '%'),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: SOCIAL_CONSTANTS.LAYOUT.PROFILE_BOX.opacity,
    borderRadius: SOCIAL_CONSTANTS.LAYOUT.PROFILE_BOX.borderRadius,
    overflow: 'hidden',
    paddingVertical: hp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  profileName: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: hp('3.0%'),
    color: SOCIAL_CONSTANTS.COLORS.PRIMARY,
    textAlign: 'center',
    marginBottom: hp('5%'),
    top: hp('-3%'),
  },
});

export default SocialMain;
