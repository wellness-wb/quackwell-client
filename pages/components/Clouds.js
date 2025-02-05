import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

const Clouds = ({ animatedValue }) => {
    return (
        <View style={styles.container}>
            <Animated.Image
                source={require("../../assets/cloud.png")}
                style={[styles.iconLeft,
                { transform: [{ translateX: animatedValue }] }, // moves left
                ]}
                resizeMode="contain"
            />
            <Animated.Image
                source={require("../../assets/cloud.png")}
                style={[styles.iconRight,
                { transform: [{ translateX: animatedValue.interpolate
                    ({ inputRange: [-width, 0], outputRange: [width, 0] }) }] }, // moves right
                ]}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    iconLeft: {
        width: width * 0.8,
        height: height * 0.8,
        left: -width,
    },
    iconRight: {
        width: width * 0.8,
        height: height * 0.8,
        right: -width,
        transform: [{ scaleX: -1 }],
    },
});

export default Clouds;
