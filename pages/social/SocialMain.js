import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MenuBar from '../components/MenuBar';

const SocialMain = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Profile Circle */}
      <View style={styles.profileCircle}>
        <Image
          source={require('../../assets/profilepic.png')}
          style={styles.profileImage}
        />
      </View>

      {/* Profile Box */}
      <View style={styles.profileBox}>
        <LinearGradient
          colors={['#739cef', '#f3caaf']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* Profile Name */}
          <Text style={styles.profileName}>Quack Quackwell Jr</Text>

          {/* Icon Row */}
          <View style={styles.iconContainer}>
            {/* Envelope Icon */}
            <TouchableOpacity onPress={() => navigation.navigate('TrophyPage')}>
              <LinearGradient
                colors={['#e6f1fb', '#F3CAAF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBackground}
              >
                <FontAwesome5
                  name="envelope"
                  solid
                  size={30}
                  color={'#153CE6'}
                />
              </LinearGradient>
            </TouchableOpacity>

            {/* Settings Icon */}
            <TouchableOpacity onPress={() => console.log('Settings Pressed')}>
              <LinearGradient
                colors={['#e6f1fb', '#F3CAAF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBackground}
              >
                <FontAwesome5 name="cogs" solid size={30} color={'#153CE6'} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Trophy & Friends Box */}
          <View style={styles.trophyContainer}>
            {/* Trophy Box */}
            <LinearGradient
              colors={['#e6f1fb', '#F3CAAF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.trophyBox}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('TrophyPage')}
              >
                <FontAwesome5 name="trophy" solid size={40} color={'#153CE6'} />
              </TouchableOpacity>
            </LinearGradient>

            {/* Friends Box */}
            <LinearGradient
              colors={['#e6f1fb', '#F3CAAF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.friendsBox}
            >
              <TouchableOpacity onPress={() => console.log('Friends Pressed')}>
                <FontAwesome5
                  name="user-friends"
                  solid
                  size={40}
                  color={'#153CE6'}
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>

      {/* Menu Bar */}
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
  profileBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('40%'),
  },
  profileCircle: {
    width: hp('12%'),
    height: hp('12%'),
    borderRadius: hp('6%'),
    backgroundColor: '#153CE6',
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('37%'),
    zIndex: 5,
  },
  profileImage: {
    width: wp('25%'),
    height: hp('14%'),
  },
  profileName: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: hp('3.0%'),
    color: '#153CE6',
    textAlign: 'center',
    marginBottom: hp('5%'),
    top: hp('-3%'),
  },
  gradient: {
    width: '100%',
    height: hp('60%'),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.77,
    borderRadius: 30,
    overflow: 'hidden',
    paddingVertical: hp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: wp('40%'),
    height: hp('5%'),
    bottom: hp('4%'),
    marginBottom: hp('3%'),
  },
  iconBackground: {
    width: hp('7%'),
    height: hp('7%'),
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  trophyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: wp('80%'),
    height: hp('17%'),
    marginTop: hp('3%'),
    bottom: hp('7%'),
  },
  trophyBox: {
    width: wp('35%'),
    height: hp('15%'),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendsBox: {
    width: wp('35%'),
    height: hp('15%'),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SocialMain;
