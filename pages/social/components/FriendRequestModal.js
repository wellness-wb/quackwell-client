import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import {
  acceptFriendRequest,
  getFriendRequests,
  getSentFriendRequests,
  rejectFriendRequest,
} from '../../../utils/auth';

const FriendRequestModal = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState('received');
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisible) {
      if (activeTab === 'received') {
        fetchReceivedRequests();
      } else {
        fetchSentRequests();
      }
    }
  }, [isVisible, activeTab]);

  const fetchReceivedRequests = async () => {
    setLoading(true);
    try {
      const requests = await getFriendRequests();
      setReceivedRequests(requests);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSentRequests = async () => {
    setLoading(true);
    try {
      const requests = await getSentFriendRequests();
      setSentRequests(requests);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
      Alert.alert('Success', 'Friend request accepted.');
      fetchReceivedRequests();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectFriendRequest(requestId);
      Alert.alert('Success', 'Friend request rejected.');
      fetchReceivedRequests();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleCancelRequest = async (requestId) => {
    try {
      await rejectFriendRequest(requestId);
      Alert.alert('Success', 'Friend request canceled.');
      fetchSentRequests();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderReceivedRequests = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#153CE6" />;
    }

    if (receivedRequests.length === 0) {
      return <Text style={styles.emptyText}>No friend requests.</Text>;
    }

    return receivedRequests.map((request) => (
      <View key={request.id} style={styles.requestItem}>
        <Text style={styles.username}>{request.profiles.username}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() => handleAccept(request.id)}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleReject(request.id)}
          >
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  const renderSentRequests = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#153CE6" />;
    }

    if (sentRequests.length === 0) {
      return <Text style={styles.emptyText}>No sent friend requests.</Text>;
    }

    return sentRequests.map((request) => (
      <View key={request.id} style={styles.requestItem}>
        <Text style={styles.username}>{request.profiles.username}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => handleCancelRequest(request.id)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Friend Requests</Text>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'received' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('received')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'received' && styles.activeTabText,
                ]}
              >
                Received Requests
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'sent' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('sent')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'sent' && styles.activeTabText,
                ]}
              >
                Sent Requests
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.requestsContainer}>
            {activeTab === 'received'
              ? renderReceivedRequests()
              : renderSentRequests()}
          </View>

          <TouchableOpacity
            style={[styles.modalButton, styles.closeButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
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
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  tabButton: {
    flex: 1,
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#153CE6',
  },
  tabText: {
    fontSize: hp('2%'),
    color: '#777',
  },
  activeTabText: {
    color: '#153CE6',
    fontWeight: 'bold',
  },
  requestsContainer: {
    width: '100%',
    minHeight: hp('10%'),
    maxHeight: hp('30%'),
  },
  emptyText: {
    fontSize: hp('2%'),
    color: '#555',
    marginVertical: hp('3%'),
    textAlign: 'center',
  },
  requestItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  username: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 5,
    marginLeft: wp('1%'),
  },
  acceptButton: {
    backgroundColor: '#153CE6',
  },
  rejectButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#777',
  },
  buttonText: {
    color: 'white',
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
  },
  rejectButtonText: {
    color: '#ff6b6b',
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#777',
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
  },
  modalButton: {
    width: '100%',
    height: hp('6%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  closeButton: {
    backgroundColor: '#153CE6',
  },
});

export default FriendRequestModal;
