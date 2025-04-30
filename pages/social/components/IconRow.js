import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SOCIAL_CONSTANTS } from '../constants/socialConstants';

const IconRow = ({ navigation }) => {
  const handleMessagePress = useCallback(() => {
    navigation.navigate('MessagePage');
  }, [navigation]);

  const handleFriendsPress = useCallback(() => {
    navigation.navigate('FriendsPage');
  }, [navigation]);

  const handleSettingsPress = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={handleMessagePress}>
        <LinearGradient
          colors={SOCIAL_CONSTANTS.GRADIENTS.ICON}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconBackground}
        >
          <FontAwesome5
            name="envelope"
            solid
            size={30}
            color={SOCIAL_CONSTANTS.COLORS.ICON}
          />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleFriendsPress}>
        <LinearGradient
          colors={SOCIAL_CONSTANTS.GRADIENTS.ICON}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconBackground}
        >
          <FontAwesome5
            name="user-friends"
            solid
            size={30}
            color={SOCIAL_CONSTANTS.COLORS.ICON}
          />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSettingsPress}>
        <LinearGradient
          colors={SOCIAL_CONSTANTS.GRADIENTS.ICON}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconBackground}
        >
          <FontAwesome5
            name="cogs"
            solid
            size={30}
            color={SOCIAL_CONSTANTS.COLORS.ICON}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('40%'),
    height: hp('5%'),
    bottom: hp('4%'),
    marginBottom: hp('3%'),
    gap: wp('5%'),
  },
  iconBackground: {
    width: hp(SOCIAL_CONSTANTS.LAYOUT.ICON.size + '%'),
    height: hp(SOCIAL_CONSTANTS.LAYOUT.ICON.size + '%'),
    borderRadius: SOCIAL_CONSTANTS.LAYOUT.ICON.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: SOCIAL_CONSTANTS.SHADOW.color,
    shadowOffset: SOCIAL_CONSTANTS.SHADOW.offset,
    shadowOpacity: SOCIAL_CONSTANTS.SHADOW.opacity,
    shadowRadius: SOCIAL_CONSTANTS.SHADOW.radius,
    elevation: SOCIAL_CONSTANTS.SHADOW.elevation,
  },
});

export default IconRow;
