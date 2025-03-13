import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icon

const CustomHeader = ({ title, showAvatar }) => {
    return (
        <View style={styles.header}>
            {/* Nút Back */}
            <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* Tiêu đề (Dùng flex: 1 và textAlign: "center" để luôn căn giữa) */}
            <Text style={styles.title}>{title}</Text>

            {/* Avatar hoặc Placeholder rỗng để giữ bố cục cân đối */}
            <View style={styles.avatarContainer}>
                {showAvatar ? (
                    <TouchableOpacity>
                        <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY001Ow66b0KtfByqojlzddWFk_Eovia0zdg&s" }} style={styles.avatar} />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.placeholder} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    iconButton: {
        padding: 5,
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center", // Đảm bảo luôn nằm giữa
    },
    avatarContainer: {
        width: 30, // Giữ không gian ngay cả khi không có avatar
        height: 30,
    },
    avatar: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
    },
    placeholder: {
        width: 30,
        height: 30,
    },
});

export default CustomHeader;
