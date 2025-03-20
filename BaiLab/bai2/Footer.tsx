import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Footer({ timeUpdate, backgroundColor }: { timeUpdate: string; backgroundColor: string }) {
    return (
        <View style={[styles.footer, { backgroundColor }]}>
            <Text style={styles.text}>⏳ Cập nhật lần cuối: {timeUpdate}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    text: {
        fontSize: 15,
        fontWeight: "500",
        color: "#333",
    },
});
