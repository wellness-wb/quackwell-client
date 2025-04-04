import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const TimerQuickOption = ({ label, duration, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.circleButton}
      onPress={() => onPress(duration)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circleButton: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: '#739CEF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TimerQuickOption;
