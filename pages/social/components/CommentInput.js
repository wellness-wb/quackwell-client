import React, { useCallback } from 'react';
import {
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
import { POST_DETAIL_CONSTANTS } from '../constants/postDetailConstants';

const CommentInput = ({ value, onChangeText, onSubmit }) => {
  const handleSubmit = useCallback(() => {
    if (value.trim()) {
      onSubmit();
    }
  }, [value, onSubmit]);

  return (
    <View style={styles.commentInputBox}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Write a comment..."
        style={styles.input}
        placeholderTextColor={POST_DETAIL_CONSTANTS.COLORS.PLACEHOLDER}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.sendBox}>
          <Text style={styles.sendBtn}>Post</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  commentInputBox: {
    flexDirection: 'row',
    marginTop: hp('1%'),
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: POST_DETAIL_CONSTANTS.COLORS.INPUT_BACKGROUND,
    borderRadius: POST_DETAIL_CONSTANTS.LAYOUT.BORDER_RADIUS.LARGE,
    paddingHorizontal: wp(
      POST_DETAIL_CONSTANTS.LAYOUT.PADDING.HORIZONTAL + '%',
    ),
    height: hp('5%'),
    marginRight: wp('1%'),
    right: wp('1%'),
  },
  sendBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('14%'),
    height: hp('5%'),
    backgroundColor: POST_DETAIL_CONSTANTS.COLORS.SEND_BUTTON,
    borderRadius: POST_DETAIL_CONSTANTS.LAYOUT.BORDER_RADIUS.LARGE,
  },
  sendBtn: {
    color: POST_DETAIL_CONSTANTS.COLORS.PRIMARY,
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
});

export default CommentInput;
