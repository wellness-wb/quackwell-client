import { LinearGradient } from 'expo-linear-gradient'; // Correct import for LinearGradient
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
import TrophyItem from './components/TrophyItem';

const ProfilePage = ({ route, navigation }) => {
  const { name, profilePic, status = 'offline', lastMessage } = route.params;

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <LinearGradient
          colors={[
            'rgba(164, 205, 241, 0.77)', // Slightly transparent blue
            'rgba(243, 202, 175, 0.77)', // Slightly transparent peach
          ]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.backGradient}
        >
          <FontAwesome5 name="arrow-left" size={hp('2.5%')} color="#153CE6" />
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.profileBox}>
        <LinearGradient
          colors={['#739cef', '#f3caaf']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* Profile image and name */}
          <View style={styles.avatarContainer}>
            <Image source={profilePic} style={styles.avatar} />
          </View>
          <Text style={styles.name}>{name}</Text>

          {/* Status text */}
          <Text
            style={[
              styles.status,
              { color: status === 'online' ? '#1d704c' : '#eb2a4d' }, // Set color based on status
            ]}
          >
            {status === 'online' ? 'Online' : 'Offline'}
          </Text>

          {/* Last message */}
          <Text style={styles.lastMessage}>{lastMessage}</Text>
          {/* You can add posts, badges, etc. here */}
          {/* Icon Row */}
          <View style={styles.iconContainer}>
            {/* Envelope Icon */}
            <TouchableOpacity
              onPress={() => navigation.navigate('MessagePage')}
            >
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
            <TouchableOpacity
              onPress={() => navigation.navigate('FriendsPage')}
            >
              <LinearGradient
                colors={['#e6f1fb', '#F3CAAF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBackground}
              >
                <FontAwesome5
                  name="user-friends"
                  solid
                  size={30}
                  color={'#153CE6'}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.trophyList}>
            {/* Trophy with Custom GIF */}
            <TrophyItem
              title="Aquaholic"
              image={require('../../assets/aquaholic.gif')}
              progress={0.2}
            />

            <TrophyItem
              title="Quack Tacktitian"
              image={require('../../assets/quacktitian.gif')}
              progress={0.8}
            />

            <TrophyItem
              title="They were roommates"
              image={require('../../assets/roommates.gif')}
              progress={0.5}
            />
          </View>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the background fills the entire screen
  },
  profileBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('7%'), // Positioning the profile box
  },
  gradient: {
    width: '100%',
    height: hp('80%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: hp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  avatarContainer: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: 100, // Full circle
    backgroundColor: '#153CE6', // White background for the avatar
    overflow: 'hidden', // Ensures the image stays within the circle
    justifyContent: 'center',
    alignItems: 'center',
    right: wp('29%'), // Adjusted to position the avatar correctly
  },
  avatar: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: 100, // Circle avatar
  },
  name: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#153CE6',
    fontFamily: 'Inter',
    bottom: hp('14%'),
    left: wp('15%'), // Adjusted to position the name correctly
  },
  status: {
    fontSize: hp('2%'),
    marginTop: hp('2%'),
    bottom: hp('5%'),
    right: wp('28.5%'),
  },
  lastMessage: {
    fontSize: hp('2%'),
    color: '#555',
    marginTop: hp('1%'),
    bottom: hp('18%'),
    left: wp('15%'),
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('10%'),
    height: hp('10%'),
    bottom: hp('18%'),
    left: wp('15%'),
    marginBottom: hp('3%'),
    gap: wp('5%'),
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
  backButton: {
    top: hp('10%'),
    left: wp('5%'),
    zIndex: 10,
    width: wp('13%'),
  },

  backGradient: {
    overflow: 'hidden',
    borderRadius: 50,
    width: wp('12%'),
    height: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  trophyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: hp('11%'),
  },
});

export default ProfilePage;
