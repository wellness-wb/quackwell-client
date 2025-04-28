import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { POST_DETAIL_CONSTANTS } from '../constants/postDetailConstants';

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <LinearGradient
        colors={POST_DETAIL_CONSTANTS.GRADIENTS.MAIN}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.backGradient}
      >
        <FontAwesome
          name="arrow-left"
          size={hp('2.5%')}
          color={POST_DETAIL_CONSTANTS.COLORS.PRIMARY}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    top: hp('10%'),
    left: wp('5%'),
    zIndex: 10,
  },
  backGradient: {
    overflow: 'hidden',
    borderRadius: POST_DETAIL_CONSTANTS.LAYOUT.BORDER_RADIUS.CIRCLE,
    width: wp(POST_DETAIL_CONSTANTS.LAYOUT.BACK_BUTTON.SIZE + '%'),
    height: wp(POST_DETAIL_CONSTANTS.LAYOUT.BACK_BUTTON.SIZE + '%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: POST_DETAIL_CONSTANTS.SHADOW.color,
    shadowOpacity: POST_DETAIL_CONSTANTS.SHADOW.opacity,
    shadowOffset: POST_DETAIL_CONSTANTS.SHADOW.offset,
    shadowRadius: POST_DETAIL_CONSTANTS.SHADOW.radius,
    elevation: POST_DETAIL_CONSTANTS.SHADOW.elevation,
  },
});

export default BackButton;
