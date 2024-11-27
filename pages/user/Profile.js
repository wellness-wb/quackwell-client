import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
      <Button
        title="Go to Todo List"
        onPress={() => navigation.navigate("TodoList")}
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

export default Profile;
