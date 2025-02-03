import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const GradientButton = ({
  text,
  width,
  height,
  colors,
  textColor = "#FFFFFF",
  onPress,
  leftIcon,
  rightIcon,
  value,
  onChangeText,
  placeholder,
  isInput = false,
  style,
}) => {
  return (
    <View style={[styles.buttonContainer, { width, height }, style]}> 
        {leftIcon && <Image source={leftIcon} style={styles.iconLeft} resizeMode="contain" />}
       
        <TouchableOpacity onPress={isInput ? null : onPress} activeOpacity={isInput ? 1 : 0.7} style={{ flex: 1 }}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { borderRadius: height / 2 }]}
        >
        {isInput ? (
          <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#153CE6"
          fontSize={17}
          fontWeight="bold"
          fontFamily="Inter"
          style={[styles.input, { color: textColor}]}
          />
        ) : (
          <Text style={[styles.buttonText, { color: textColor }]}>
            {text}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
        {rightIcon && <Image source={rightIcon} style={styles.iconRight} resizeMode="contain" />}
       
      </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    flex: 1,
    zIndex: 2,
  },

  gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    opacity: 0.77,
    zIndex: 2,
  },
  buttonText: {
    color: "#F3CAAF",
    fontSize: 16,
    fontWeight: "bold",
  },

  iconLeft: {
    zIndex: 1,
    width: 600,
    height: 600,
    position: "absolute",
    left: -290,
    top: -276,
  },

  iconRight: {
    zIndex: 1,
    width: 600,
    height: 600,
    position: "absolute",
    right: -275,
    top: -276,
    transform: [{ scaleX: -1 }],
  },

});

export default GradientButton;
