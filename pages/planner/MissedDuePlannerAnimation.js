import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const MissedDuePlannerAnimation = ({ missedDueDate }) => {
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    console.log('missedDueDate in animation:', missedDueDate);
    if (missedDueDate) {
      setPlayAnimation(true); // Start the animation when missedDueDate is true
    } else {
      setPlayAnimation(false); // Stop the animation when missedDueDate is false
    }
  }, [missedDueDate]);

  if (!playAnimation) {
    return null; // Don't render the animation container if missedDueDate is false
  }

  return (
    <LottieView
      source={{
        uri: 'https://assets3.lottiefiles.com/packages/lf20_t2pznrxm.json',
      }} // Replace with your JSON file path
      autoPlay
      loop={true} // Set to true if you want the animation to loop
      style={styles.lottieAnimation}
    />
  );
};

const styles = StyleSheet.create({
  lottieAnimation: {
    width: wp('70%'), // Adjust size of the animation
    height: hp('45%'), // Adjust size of the animation
  },
});

export default MissedDuePlannerAnimation;
