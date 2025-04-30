import React, { useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const TrophyItem = ({ title, image }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        style={[styles.trophyContainer, { transform: [{ scale: bounceAnim }] }]}
      >
        <View style={styles.trophyBox}>
          <Image source={image} style={styles.trophyIcon} />
          <Text style={styles.trophyText}>{title}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  trophyContainer: {
    alignItems: 'center',
    marginBottom: hp('3%'),
  },

  trophyBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },

  trophyText: {
    marginTop: hp('1%'),
    fontSize: hp('2%'),
    color: '#0C2180',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  trophyIcon: {
    width: wp('30%'),
    height: wp('30%'),
    resizeMode: 'contain',
  },
});

export default TrophyItem;
