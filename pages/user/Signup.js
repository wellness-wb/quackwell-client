import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Signup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Signup Page</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Signup;
