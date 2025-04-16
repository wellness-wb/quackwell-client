import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Post = ({
  profilePic,
  username,
  contentText,
  contentImage,
  comments,
  isOwner,
  onDelete,
}) => {
  const handleDelete = () => {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: onDelete,
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.postContainer}>
      <LinearGradient
        colors={[
          'rgba(164, 205, 241, 0.77)', // Slightly transparent blue
          'rgba(243, 202, 175, 0.77)', // Slightly transparent peach
        ]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.postBackground}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {profilePic && (
              <Image source={profilePic} style={styles.profilePic} />
            )}
            <Text style={styles.username}>{username}</Text>
          </View>
          {isOwner && (
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.deleteButton}
            >
              <FontAwesome name="trash" size={hp('2.2%')} color="#153CE6" />
            </TouchableOpacity>
          )}
        </View>

        {/* Content */}
        {contentText && <Text style={styles.contentText}>{contentText}</Text>}

        {contentImage && (
          <View style={styles.imageWrapper}>
            <Image source={contentImage} style={styles.contentImage} />
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerText}>💬 {comments} Comments</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: wp('90%'),
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: hp('1.5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    top: hp('10%'),
  },

  postBackground: {
    padding: wp('4%'),
    borderRadius: 15,
    overflow: 'visible',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profilePic: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    marginRight: wp('3%'),
  },

  username: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#153CE6',
  },

  contentText: {
    fontSize: hp('2%'),
    color: '#153CE6',
    marginVertical: hp('1%'),
  },

  imageWrapper: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
    marginVertical: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentImage: {
    width: '70%',
    height: hp('25%'),
    resizeMode: 'cover',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: hp('1.5%'),
  },

  footerText: {
    fontSize: hp('1.8%'),
    color: '#153CE6',
    fontWeight: '600',
  },

  deleteButton: {
    padding: wp('2%'),
  },
});

export default Post;
