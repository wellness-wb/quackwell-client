import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const HydrationWarning = ({ isVisible, onClose }) => {
  if (!isVisible) return null; // Don't render if not visible

  return (
    <LinearGradient
      colors={['rgba(239, 108, 139, 1)', 'rgba(240, 162, 111, 1)']} // ✅ Ensure this is always an array
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.warningContainer}
    >
      <Text style={styles.warningText}>
        The recommended water intake per day is 1.5L - 6L
      </Text>

      {/* Simple button to close the warning */}
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  warningContainer: {
    position: 'absolute',
    top: hp('40%'),
    height: hp('18%'),
    width: wp('90%'),
    borderRadius: wp('7%'),
    padding: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  warningText: {
    fontWeight: 'bold',
    color: '#153CE6',
    fontSize: hp('2.4%'),
    textAlign: 'center',
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  button: {
    backgroundColor: '#153CE6',
    height: hp('5%'),
    width: wp('19%'),
    borderRadius: wp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#F3CAAF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HydrationWarning;
