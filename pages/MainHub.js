import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const MainHub = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>MainHub page</Text>
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
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

export default MainHub;
