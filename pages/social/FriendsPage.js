import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MenuBar from '../components/MenuBar';

const friends = [
  {
    id: 1,
    name: 'Mr. Quackwell I',
    status: 'Always watching...',
    profilePic: require('../../assets/profilepic.png'),
  },
  {
    id: 2,
    name: 'Duck Norris',
    status: 'Ready to fight.',
    profilePic: require('../../assets/duck_with_knife.png'),
  },
  {
    id: 3,
    name: 'Sir Waddlesworth',
    status: 'Currently chilling.',
    profilePic: require('../../assets/team_logo.png'),
  },
  {
    id: 4,
    name: 'Mr. Quackwell II',
    status: 'Grinding.',
    profilePic: require('../../assets/friendspic.png'),
  },
  {
    id: 5,
    name: 'Mrs. Quackwell',
    status: 'My son is a failure.',
    profilePic: require('../../assets/duckwithbody.png'),
  },
  {
    id: 6,
    name: 'Mrs. Quackwell II',
    status: 'My mother-in-law is a failure.',
    profilePic: require('../../assets/duckwithbodynohearts.png'),
  },
];

const FriendsPage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <LinearGradient
          colors={['rgba(164, 205, 241, 0.77)', 'rgba(243, 202, 175, 0.77)']}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.backGradient}
        >
          <FontAwesome name="arrow-left" size={hp('2.5%')} color="#153CE6" />
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text style={styles.title}>Friends</Text>

          {/* Friend Cards */}
          {friends.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              onPress={() => {}}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[
                  'rgba(164, 205, 241, 0.77)', // Light blue
                  'rgba(243, 202, 175, 0.77)', // Light peach
                ]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.card}
              >
                <Image source={friend.profilePic} style={styles.avatar} />
                <View style={styles.info}>
                  <Text style={styles.name}>{friend.name}</Text>
                  <Text style={styles.status}>{friend.status}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <MenuBar navigation={navigation} activeScreen="Feed" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingTop: hp('12%'),
    paddingBottom: 100,
  },
  backButton: {
    position: 'absolute',
    top: hp('8%'),
    left: wp('5%'),
    zIndex: 10,
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
  title: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: '#153CE6',
    marginBottom: hp('4%'),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('85%'),
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    padding: hp('2%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: 100,
    marginRight: wp('4%'),
  },
  info: {
    flexShrink: 1,
  },
  name: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#153CE6',
  },
  status: {
    fontSize: hp('1.8%'),
    color: '#555',
    marginTop: 4,
  },
});

export default FriendsPage;
