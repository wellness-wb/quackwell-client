import { FontAwesome } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { POST_DETAIL_CONSTANTS } from '../constants/postDetailConstants';

const CommentSection = ({ comments, currentUser, onDeleteComment }) => {
  const handleDelete = useCallback(
    (commentId) => {
      onDeleteComment(commentId);
    },
    [onDeleteComment],
  );

  return (
    <View style={styles.commentsSection}>
      <Text style={styles.commentTitle}>Comments</Text>
      {comments.map((comment) => (
        <View key={comment.id} style={styles.commentBox}>
          <View style={styles.commentContent}>
            <Text style={styles.commentUser}>{comment.profiles.username}</Text>
            <Text style={styles.commentText}>{comment.content}</Text>
          </View>
          {currentUser && currentUser.id === comment.user_id && (
            <TouchableOpacity
              onPress={() => handleDelete(comment.id)}
              style={styles.deleteButton}
            >
              <FontAwesome
                name="trash"
                size={hp('2%')}
                color={POST_DETAIL_CONSTANTS.COLORS.PRIMARY}
              />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  commentsSection: {
    padding: wp(POST_DETAIL_CONSTANTS.LAYOUT.PADDING.HORIZONTAL + '%'),
  },
  commentTitle: {
    fontWeight: 'bold',
    fontSize: hp('2%'),
    color: POST_DETAIL_CONSTANTS.COLORS.PRIMARY,
    marginBottom: hp('1%'),
  },
  commentContent: {
    flex: 1,
  },
  commentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp('1.5%'),
    backgroundColor: POST_DETAIL_CONSTANTS.COLORS.BACKGROUND,
    padding: wp(POST_DETAIL_CONSTANTS.LAYOUT.PADDING.VERTICAL + '%'),
    borderRadius: POST_DETAIL_CONSTANTS.LAYOUT.BORDER_RADIUS.SMALL,
  },
  commentUser: {
    fontWeight: 'bold',
    color: POST_DETAIL_CONSTANTS.COLORS.PRIMARY,
    fontSize: hp('1.8%'),
    marginBottom: hp('0.5%'),
  },
  commentText: {
    color: POST_DETAIL_CONSTANTS.COLORS.PRIMARY,
    fontSize: hp('1.8%'),
  },
  deleteButton: {
    padding: wp('2%'),
  },
});

export default CommentSection;
