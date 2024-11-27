import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const PlannerDetails = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Todo Details Page</Text>
      <Button
        title="Back to Todo List"
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

export default PlannerDetails;
