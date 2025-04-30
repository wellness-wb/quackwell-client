import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SOCIAL_CONSTANTS } from '../constants/socialConstants';

const TrophyFriendsBox = ({ navigation }) => {
  const handleTrophyPress = useCallback(() => {
    navigation.navigate('TrophyPage');
  }, [navigation]);

  const handleFeedPress = useCallback(() => {
    navigation.navigate('Feed');
  }, [navigation]);

  return (
    <View style={styles.trophyContainer}>
      <LinearGradient
        colors={SOCIAL_CONSTANTS.GRADIENTS.ICON}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.trophyBox}
      >
        <TouchableOpacity onPress={handleTrophyPress}>
          <FontAwesome5
            name="trophy"
            solid
            size={40}
            color={SOCIAL_CONSTANTS.COLORS.ICON}
          />
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={SOCIAL_CONSTANTS.GRADIENTS.ICON}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.friendsBox}
      >
        <TouchableOpacity onPress={handleFeedPress}>
          <FontAwesome5
            name="comments"
            solid
            size={40}
            color={SOCIAL_CONSTANTS.COLORS.ICON}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  trophyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: wp('80%'),
    height: hp('17%'),
    marginTop: hp('3%'),
    bottom: hp('7%'),
  },
  trophyBox: {
    width: wp(SOCIAL_CONSTANTS.LAYOUT.TROPHY_BOX.width + '%'),
    height: hp(SOCIAL_CONSTANTS.LAYOUT.TROPHY_BOX.height + '%'),
    borderRadius: SOCIAL_CONSTANTS.LAYOUT.TROPHY_BOX.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendsBox: {
    width: wp(SOCIAL_CONSTANTS.LAYOUT.TROPHY_BOX.width + '%'),
    height: hp(SOCIAL_CONSTANTS.LAYOUT.TROPHY_BOX.height + '%'),
    borderRadius: SOCIAL_CONSTANTS.LAYOUT.TROPHY_BOX.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrophyFriendsBox;
