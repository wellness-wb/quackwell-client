import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EmailButton = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          onBlur={() => setIsEditing(false)} //exits the edit mode when input loses focus
          autoFocus
          placeholder="Enter email"
          placeholderTextColor="#999"
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
              <Text style={styles.buttonText}>{email || "Email..."}</Text>
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
    marginVertical: 10, // Adjust spacing between buttons if needed
  },
  button: {
    width: 270,
    height: 70,
    borderRadius: 29,
    overflow: "hidden", // Ensures the gradient respects the button shape
  },
  gradient: {
    flex: 1,
    justifyContent: "center", // Centers the content vertically
    flexDirection: "row",
    alignItems: "center", // Centers the content horizontally
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

export default EmailButton;
