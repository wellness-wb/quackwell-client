import React, { useState } from 'react';
import {
  Modal,
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

const AddFriendModal = ({ isVisible, onClose, onAddFriend }) => {
  const [friendUsername, setFriendUsername] = useState('');

  const handleAddFriend = () => {
    onAddFriend(friendUsername);
    setFriendUsername('');
  };

  const handleClose = () => {
    setFriendUsername('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Friend</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your friend's username"
            value={friendUsername}
            onChangeText={setFriendUsername}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.sendButton]}
              onPress={handleAddFriend}
            >
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
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
});

export default AddFriendModal;
