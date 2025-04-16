import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  RefreshControl,
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
import {
  addFriendByUsername,
  getFriendRequests,
  getFriends,
  getUsername,
} from '../../utils/auth';
import MenuBar from '../components/MenuBar';
import AddFriendModal from './components/AddFriendModal';
import FriendProfileModal from './components/FriendProfileModal';
import FriendRequestModal from './components/FriendRequestModal';

//  profilePic: require('../../assets/profilepic.png'),
// profilePic: require('../../assets/duck_with_knife.png'),

const FriendsPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false);
  const [isFriendRequestModalVisible, setIsFriendRequestModalVisible] =
    useState(false);
  const [friendUsername, setFriendUsername] = useState('');
  const [hasFriendRequests, setHasFriendRequests] = useState(false);
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isFriendProfileModalVisible, setIsFriendProfileModalVisible] =
    useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const name = await getUsername();
        setUsername(name);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
    checkFriendRequests();
    loadFriendsInBackground();
  }, []);

  const loadFriendsInBackground = async () => {
    try {
      const friendsList = await getFriends();
      setFriends(friendsList);
    } catch (error) {
      console.error('Background loading error:', error);
    } finally {
      setInitialLoadComplete(true);
    }
  };

  const fetchFriends = async () => {
    setIsLoading(true);
    try {
      const friendsList = await getFriends();
      setFriends(friendsList);
    } catch (error) {
      console.error('Error fetching friends:', error);
      Alert.alert('Error', 'Failed to load friends list.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkFriendRequests = async () => {
    try {
      const requests = await getFriendRequests();
      setHasFriendRequests(requests.length > 0);
    } catch (error) {
      console.error('Error checking friend requests:', error);
    }
  };

  const handleAddFriend = async (friendUsername) => {
    try {
      await addFriendByUsername(friendUsername);
      Alert.alert('Success', 'Friend request sent.');
      setIsAddFriendModalVisible(false);
      fetchFriends();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleOpenFriendRequestModal = () => {
    setIsFriendRequestModalVisible(true);
    setHasFriendRequests(false);
  };

  const handleFriendPress = (friend) => {
    setSelectedFriend(friend);
    setIsFriendProfileModalVisible(true);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchFriends();
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.headerContainer}>
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
        <Text style={styles.username}>{username}</Text>
        <View style={styles.headerRightSpace} />
      </View>

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Title and Buttons */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Friends</Text>
            <View style={styles.buttonContainer}>
              {/* Friend Request Button */}
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleOpenFriendRequestModal}
              >
                <LinearGradient
                  colors={[
                    'rgba(164, 205, 241, 0.77)',
                    'rgba(243, 202, 175, 0.77)',
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconButtonGradient}
                >
                  <FontAwesome name="bell" size={hp('2.5%')} color="#153CE6" />
                  {hasFriendRequests && (
                    <View style={styles.notificationBadge} />
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Add Friend Button */}
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsAddFriendModalVisible(true)}
              >
                <LinearGradient
                  colors={[
                    'rgba(164, 205, 241, 0.77)',
                    'rgba(243, 202, 175, 0.77)',
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconButtonGradient}
                >
                  <FontAwesome
                    name="user-plus"
                    size={hp('2.5%')}
                    color="#153CE6"
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Friends List */}
          <View style={styles.friendsContainer}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3E8D9C" />
                <Text style={styles.loadingText}>Loading friends...</Text>
              </View>
            ) : friends.length > 0 ? (
              friends.map((friend) => (
                <TouchableOpacity
                  key={friend.id}
                  onPress={() => handleFriendPress(friend)}
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
                    <Image
                      source={friend.profilePic}
                      style={styles.friendAvatar}
                    />
                    <View style={styles.friendInfo}>
                      <Text style={styles.friendName}>{friend.name}</Text>
                      <Text style={styles.friendStatus}>{friend.status}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))
            ) : initialLoadComplete ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No friends yet. Add some friends!
                </Text>
              </View>
            ) : (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#3E8D9C" />
                <Text style={styles.loadingText}>Loading friends...</Text>
              </View>
            )}
          </View>
        </ScrollView>

        <AddFriendModal
          isVisible={isAddFriendModalVisible}
          onClose={() => setIsAddFriendModalVisible(false)}
          onAddFriend={handleAddFriend}
        />

        <FriendRequestModal
          isVisible={isFriendRequestModalVisible}
          onClose={() => {
            setIsFriendRequestModalVisible(false);
            checkFriendRequests();
            fetchFriends();
          }}
        />

        <FriendProfileModal
          isVisible={isFriendProfileModalVisible}
          onClose={() => setIsFriendProfileModalVisible(false)}
          friend={selectedFriend}
          onFriendDeleted={fetchFriends}
        />

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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('8%'),
    marginBottom: hp('2%'),
    zIndex: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingTop: hp('2%'),
    paddingBottom: 100,
  },
  backButton: {
    width: wp('12%'),
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
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#153CE6',
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
  username: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#153CE6',
    flex: 1,
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('85%'),
    marginBottom: hp('4%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: wp('12%'),
    height: wp('12%'),
    marginLeft: wp('2%'),
  },
  iconButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp('80%'),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: hp('3%'),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#153CE6',
    marginBottom: hp('3%'),
  },
  input: {
    width: '100%',
    height: hp('6%'),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: wp('4%'),
    marginBottom: hp('3%'),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    width: '45%',
    height: hp('6%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
  sendButton: {
    backgroundColor: '#153CE6',
  },
  buttonText: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  notificationBadge: {
    position: 'absolute',
    top: hp('0.5%'),
    right: hp('0.5%'),
    width: hp('1.2%'),
    height: hp('1.2%'),
    backgroundColor: '#ff3b30',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
  },
  headerRightSpace: {
    width: wp('12%'),
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    marginVertical: 10,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#153CE6',
    marginBottom: hp('2%'),
  },
  friendItem: {
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
  friendAvatar: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: 100,
    marginRight: wp('4%'),
  },
  friendInfo: {
    flexShrink: 1,
  },
  friendName: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#153CE6',
  },
  friendStatus: {
    fontSize: hp('1.8%'),
    color: '#555',
    marginTop: 4,
  },
});

export default FriendsPage;
