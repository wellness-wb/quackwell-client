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

const messages = [
  {
    id: 1,
    name: 'Mr. Quackwell I',
    profilePic: require('../../assets/profilepic.png'),
    status: 'offline',
    unread: 0,
    lastMessage: "Don't forget the prophecy...",
  },
  {
    id: 2,
    name: 'Duck Norris',
    profilePic: require('../../assets/duck_with_knife.png'),
    status: 'online',
    unread: 3,
    lastMessage: 'Meet me at dawn.',
  },
  {
    id: 3,
    name: 'Sir Waddlesworth',
    profilePic: require('../../assets/team_logo.png'),
    status: 'offline',
    unread: 0,
    lastMessage: 'Waddle waddle 🦆',
  },
  {
    id: 4,
    name: 'Mrs. Quackwell',
    profilePic: require('../../assets/duckwithbody.png'),
    status: 'online',
    unread: 7,
    lastMessage: 'Tell my son he’s disowned.',
  },
  {
    id: 5,
    name: 'Mrs. Quackwell II',
    profilePic: require('../../assets/duckwithbodynohearts.png'),
    status: 'online',
    unread: 100,
    lastMessage: 'Quack you.',
  },
  {
    id: 6,
    name: 'Quackwell App',
    profilePic: require('../../assets/winking_animated.gif'),
    status: 'offline',
    unread: 1,
    lastMessage: 'We are inviting you to our event...',
  },
];

const MessagesPage = ({ navigation }) => {
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
          <Text style={styles.title}>Messages</Text>

          {messages.map((msg) => (
            <TouchableOpacity
              key={msg.id}
              onPress={() => {}}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[
                  'rgba(164, 205, 241, 0.77)',
                  'rgba(243, 202, 175, 0.77)',
                ]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.card}
              >
                <Image source={msg.profilePic} style={styles.avatar} />
                <View style={styles.info}>
                  <Text style={styles.name}>{msg.name}</Text>
                  <Text
                    style={[
                      styles.status,
                      { color: msg.status === 'online' ? '#00B300' : '#999' },
                    ]}
                  >
                    {msg.status}
                  </Text>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {msg.lastMessage}
                  </Text>
                </View>

                {msg.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{msg.unread}</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <MenuBar navigation={navigation} activeScreen="MessagesPage" />
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
    borderRadius: 20,
    padding: hp('2%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  avatar: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: 100,
    marginRight: wp('4%'),
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#153CE6',
  },
  status: {
    fontSize: hp('1.8%'),
    marginTop: 2,
  },
  lastMessage: {
    fontSize: hp('1.8%'),
    color: '#555',
    marginTop: 2,
  },
  unreadBadge: {
    position: 'absolute',
    right: wp('5%'),
    backgroundColor: '#FF3B30',
    borderRadius: 20,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('1.6%'),
  },
});

export default MessagesPage;
