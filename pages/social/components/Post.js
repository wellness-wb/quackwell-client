import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Post = ({
  profilePic,
  username,
  contentText,
  contentImage,
  likes,
  comments,
}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
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
          {profilePic && (
            <Image source={profilePic} style={styles.profilePic} />
          )}
          <Text style={styles.username}>{username}</Text>
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
          <TouchableOpacity onPress={handleLikePress}>
            <Text style={styles.footerText}>❤️ {likeCount} Likes</Text>
          </TouchableOpacity>
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
    marginBottom: hp('1%'),
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
    justifyContent: 'space-between',
    marginTop: hp('1.5%'),
  },

  footerText: {
    fontSize: hp('1.8%'),
    color: '#153CE6',
    fontWeight: '600',
  },
});

export default Post;
