import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const PlannerList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Todo List Page</Text>
      <Button
        title="Go to Todo Details"
        onPress={() => navigation.navigate("TodoDetails")}
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

export default PlannerList;
