import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GoogleButton = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <LinearGradient
            colors={["#153CE6", "#0C2180"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
        <View style={styles.iconContainer}>
            <AntDesign name="google" size={30} color="white" />
          </View>

        <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Continue with Google</Text>
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
        flex: 1,
    },
    button: {
        width: 320,
        height: 70,
        borderRadius: 29,
        overflow: 'hidden', // gradient respects the borders
    },
    gradient: {
        flex: 1,
        flexDirection: 'row', // aligns children horizontally
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.77,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    textContainer: {
        flex: 1, // will take up the remaining space
        justifyContent: 'center',
    },
});

export default GoogleButton;