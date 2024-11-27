import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate("Signup")}
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

export default Login;
