import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ContinueButton = ({ title, onPress, containerStyle }) => {
const ContinueButton = ({ title, onPress, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <LinearGradient
          colors={['#F3CAAF', '#739CEF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.77,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#153CE6',
    fontWeight: 'bold',
  },
});

export default ContinueButton;
export default ContinueButton;
