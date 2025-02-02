import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const editableInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onBlur={() => setIsEditing(false)}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={secureTextEntry}
        />
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsEditing(true)}
        >
          <LinearGradient
            colors={["#153CE6", "#0C2180"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                {value ? (secureTextEntry ? "••••••" : value) : placeholder}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  button: {
    width: 270,
    height: 70,
    borderRadius: 29,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.77,
  },
  textContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: 320,
    height: 70,
    borderRadius: 29,
    backgroundColor: "#153CE6",
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default editableInput;
