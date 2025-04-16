import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MessageDetail = ({ route, navigation }) => {
  const { name, profilePic, status, initialMessages } = route.params;
  const [messages, setMessages] = useState(initialMessages || []);
  const [newMessage, setNewMessage] = useState('');

  // Load messages from AsyncStorage on page load
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(name);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error('Error loading messages from AsyncStorage:', error);
      }
    };
    if (!initialMessages) {
      loadMessages(); // Only load from AsyncStorage if no initial messages are passed
    }
  }, [initialMessages, name]);

  // Save messages to AsyncStorage whenever they change
  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem(name, JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving messages to AsyncStorage:', error);
      }
    };
    saveMessages();
  }, [messages, name]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      sender: 'You',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setNewMessage(''); // Clear the input field
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')} // Replace with your background image
      style={styles.background} // Full background image for the entire page
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header Container */}

        <View style={styles.header}>
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
              <FontAwesome5
                name="arrow-left"
                size={hp('2.5%')}
                color="#153CE6"
              />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FriendsProfile', {
                name: name,
                profilePic: profilePic,
                status: status,
                lastMessage: messages[messages.length - 1].text, // Display last message as a preview
              })
            }
          >
            <View style={styles.avatarContainer}>
              <Image source={profilePic} style={styles.avatar} />
            </View>
          </TouchableOpacity>

          <Text style={styles.name}>{name}</Text>
          <Text style={styles.status}>
            {status === 'online' ? 'Online' : 'Offline'}
          </Text>
        </View>

        {/* Message History */}
        <ScrollView style={styles.messagesContainer}>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBox,
                { alignSelf: msg.sender === name ? 'flex-start' : 'flex-end' },
              ]}
            >
              <Text style={styles.messageText}>{msg.text}</Text>
              <Text style={styles.timestamp}>{msg.timestamp}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Box */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            placeholder="Type a message..."
            placeholderTextColor="#153CE6"
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.sendButton}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the background image fills the entire screen
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Keep the background transparent to see the image
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp('2%'),
    borderRadius: hp('2%'),
    marginTop: hp('5%'),
  },
  avatarContainer: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: 100, // Full circle
    backgroundColor: '#153CE6', // White background for the avatar
    overflow: 'hidden', // Ensures the image stays within the circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  avatar: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: 100,
    marginBottom: 2,
  },
  name: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#153CE6',
  },
  status: {
    fontSize: hp('2%'),
    color: 'green',
  },
  messagesContainer: {
    flex: 1,
    padding: hp('2%'),
  },
  messageBox: {
    maxWidth: wp('70%'),
    marginBottom: hp('1.5%'),
    padding: hp('1.5%'),
    borderRadius: 20,
    backgroundColor: '#f3caaf', // Light color for the messages
  },
  messageText: {
    fontSize: hp('2%'),
    color: '#153CE6',
  },
  timestamp: {
    fontSize: hp('1.5%'),
    color: '#999',
    marginTop: 5,
  },
  inputBox: {
    height: hp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: hp('5%'),
  },
  inputText: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingLeft: wp('5%'),
    fontSize: hp('2%'),
    color: '#153CE6',
  },
  sendButton: {
    marginTop: 10,
    backgroundColor: '#739cef',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: hp('2%'),
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: hp('2%'),
    marginLeft: wp('5%'),
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
});

export default MessageDetail;
