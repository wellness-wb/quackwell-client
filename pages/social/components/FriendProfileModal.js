import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const FriendProfileModal = ({ isVisible, onClose, friend }) => {
  if (!friend) return null;

  const handleDeleteFriend = () => {
    Alert.alert(
      'Delete Friend',
      `Are you sure you want to remove ${friend.name} from your friends list?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            Alert.alert('Success', 'Friend has been removed.');
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={['rgba(164, 205, 241, 0.9)', 'rgba(243, 202, 175, 0.9)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.modalContent}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="close" size={hp('2.5%')} color="#153CE6" />
          </TouchableOpacity>

          <View style={styles.profileContainer}>
            <Image source={friend.profilePic} style={styles.profileImage} />
            <Text style={styles.profileName}>{friend.name}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Status:</Text>
              <Text style={styles.statusText}>{friend.status || 'Online'}</Text>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#A4CDF1', '#F3CAAF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.actionButtonGradient}
              >
                <FontAwesome name="comment" size={hp('2.2%')} color="#153CE6" />
              </LinearGradient>
              <Text style={styles.actionText}>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#A4CDF1', '#F3CAAF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.actionButtonGradient}
              >
                <FontAwesome
                  name="calendar-plus-o"
                  size={hp('2.2%')}
                  color="#153CE6"
                />
              </LinearGradient>
              <Text style={styles.actionText}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDeleteFriend}
            >
              <LinearGradient
                colors={['#ff9999', '#ffcccc']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.actionButtonGradient}
              >
                <FontAwesome
                  name="user-times"
                  size={hp('2.2%')}
                  color="#d9534f"
                />
              </LinearGradient>
              <Text style={styles.deleteActionText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp('80%'),
    borderRadius: 20,
    padding: hp('2.5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: hp('1.8%'),
    right: hp('1.8%'),
    zIndex: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: hp('2.5%'),
    marginBottom: hp('2.5%'),
  },
  profileImage: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: hp('1.5%'),
  },
  profileName: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#153CE6',
    marginBottom: hp('0.5%'),
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.5%'),
  },
  statusLabel: {
    fontSize: hp('1.8%'),
    color: '#444',
    marginRight: wp('1%'),
  },
  statusText: {
    fontSize: hp('1.8%'),
    color: '#153CE6',
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: hp('1.5%'),
    paddingTop: hp('1.5%'),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)',
  },
  actionButton: {
    alignItems: 'center',
    width: wp('16%'),
  },
  actionButtonGradient: {
    width: hp('5%'),
    height: hp('5%'),
    borderRadius: hp('2.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('0.8%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: hp('1.6%'),
    color: '#153CE6',
    fontWeight: '500',
  },
  deleteActionText: {
    fontSize: hp('1.6%'),
    color: '#d9534f',
    fontWeight: '500',
  },
});

export default FriendProfileModal;
