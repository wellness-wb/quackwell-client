import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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
    width: "100%",
    marginTop: hp("8%"),
    paddingHorizontal: hp("2%"),
  },
  topText: {
    fontSize: hp("4%"),
    color: "#153CE6",
    fontFamily: "Inter",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default UserHeader;
