import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Header({ user }: { user: { name: string; avatar: string } }) {
    return (
        <View style={styles.header}>
            <View style={styles.userInfo}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View>
                    <Text style={styles.greeting}>Chào ngày mới,</Text>
                    <Text style={styles.name}>{user.name}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: 20,
        backgroundColor: "#f8f9fa",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 30,
        marginRight: 12,
        borderWidth: 2,
        borderColor: "#ddd",
    },
    greeting: {
        fontSize: 15,
        color: "#6c757d",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
  
});
