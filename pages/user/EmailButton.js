import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EmailButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <LinearGradient
          colors={["#153CE6", "#0C2180"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Email...</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10, // Adjust spacing between buttons if needed
  },
  button: {
    width: 320,
    height: 70,
    borderRadius: 29,
    overflow: 'hidden', // Ensures the gradient respects the button shape
  },
  gradient: {
    flex: 1,
    justifyContent: 'center', // Centers the content vertically
    flexDirection: 'row',
    alignItems: 'center', // Centers the content horizontally
    opacity: 0.77,
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EmailButton;