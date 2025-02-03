import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserHeader = ({ title, fontSize }) => {
  return (
    <View style={styles.header}>
      <Text
        style={[styles.topText, fontSize && { fontSize }]}
        adjustsFontSizeToFit
        numberOfLines={1}
        minimumFontScale={0.5}
      >
        {title || "Start your productivity and wellness journey with Quackwell"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 100,
    alignItems: "center",
    width: "100%",
  },
  topText: {
    color: "#153CE6",
    fontSize: 40,
    fontFamily: "Inter",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default UserHeader;
