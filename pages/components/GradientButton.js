import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const GradientButton = ({
  text,
  width,
  height,
  colors,
  textColor = '#FFFFFF',
  onPress,
  style,
}) => {
  return (
    <View style={[styles.buttonBox, { width, height }, style]}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { width, height }]}
        >
          <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    flex: 1,
    zIndex: 5,
  },

  gradient: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 40,
    opacity: 0.77,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: height * 0.05 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#F3CAAF',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
});

export default GradientButton;
