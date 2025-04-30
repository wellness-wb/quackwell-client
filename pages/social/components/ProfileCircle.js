import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SOCIAL_CONSTANTS } from '../constants/socialConstants';

const ProfileCircle = () => {
  return (
    <View style={styles.profileCircle}>
      <Image
        source={require('../../../assets/profilepic.png')}
        style={styles.profileImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileCircle: {
    width: hp(SOCIAL_CONSTANTS.PROFILE.CIRCLE_SIZE + '%'),
    height: hp(SOCIAL_CONSTANTS.PROFILE.CIRCLE_SIZE + '%'),
    borderRadius: hp(SOCIAL_CONSTANTS.PROFILE.CIRCLE_SIZE / 2 + '%'),
    backgroundColor: SOCIAL_CONSTANTS.COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('37%'),
    zIndex: 5,
  },
  profileImage: {
    width: wp(SOCIAL_CONSTANTS.PROFILE.IMAGE_SIZE.width + '%'),
    height: hp(SOCIAL_CONSTANTS.PROFILE.IMAGE_SIZE.height + '%'),
  },
});

export default ProfileCircle;
