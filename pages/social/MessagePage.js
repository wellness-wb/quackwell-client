import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
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

const messagesData = [
  {
    id: 1,
    name: 'Mr. Quackwell I',
    profilePic: require('../../assets/profilepic.png'),
    status: 'offline',
    unread: 2,
    lastMessage: "Don't forget the prophecy...",
    messageHistory: [
      {
        sender: 'You',
        text: 'You getting old...',
        timestamp: '2:45 AM',
      },
      {
        sender: 'Mr. Quackwell I',
        text: "Don't forget the prophecy...",
        timestamp: '9:05 AM',
      },
    ],
  },
  {
    id: 2,
    name: 'Duck Norris',
    profilePic: require('../../assets/duck_with_knife.png'),
    status: 'online',
    unread: 1,
    lastMessage: 'Meet me at dawn.',
    messageHistory: [
      {
        sender: 'Duck Norris',
        text: 'Meet me at dawn.',
        timestamp: '10:30 AM',
      },
      { sender: 'You', text: "I'll be there!", timestamp: '10:31 AM' },
    ],
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
  const [messages, setMessages] = useState(messagesData);
  const [showDevModal, setShowDevModal] = useState(true);

  // Function to handle navigation and mark unread as 0
  const handleMessagePress = (msg) => {
    const updatedMessages = messages.map((message) =>
      message.id === msg.id ? { ...message, unread: 0 } : message,
    );
    setMessages(updatedMessages); // Update state with read messages

    navigation.navigate('MessageDetail', {
      name: msg.name,
      profilePic: msg.profilePic,
      status: msg.status,
      lastMessage: msg.lastMessage,
      messages: msg.messageHistory,
    });
  };
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Modal visible={showDevModal} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🚧 Feature In Development</Text>
            <Text style={styles.modalText}>
              This feature is still under construction. Check back soon!
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowDevModal(false);
                navigation.goBack();
              }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
              onPress={() => {
                handleMessagePress(msg);
                navigation.navigate('MessageDetail', {
                  name: msg.name,
                  profilePic: msg.profilePic,
                  status: msg.status,
                  lastMessage: msg.lastMessage,
                  // Passing the message history correctly
                  initialMessages: msg.messageHistory,
                });
              }}
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

        <MenuBar navigation={navigation} activeScreen="SocialMain" />
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
    fontFamily: 'Inter',
    color: '#153CE6',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#153CE6',
    textAlign: 'center',
    alignSelf: 'center',
  },
  modalText: {
    fontSize: hp('2%'),
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#153CE6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
});

export default MessagesPage;
