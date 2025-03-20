import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Body = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Body</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#e9ecef",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default Body;
