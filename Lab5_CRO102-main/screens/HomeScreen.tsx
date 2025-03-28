import React from "react";
import { View, Button, StyleSheet, ImageBackground } from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <ImageBackground
            source={{ uri: "https://i.pinimg.com/564x/0a/b4/61/0ab4613f7bbd218d8b3c17adca6c68cf.jpg" }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Button title="Bài 1: Redux Toolkit" onPress={() => navigation.navigate("ReduxToolkit")} />
                <View style={styles.spacing} />
                <Button title="Bài 2: Redux Persist & Chọn Ảnh" onPress={() => navigation.navigate("ReduxPersist")} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "80%",
        alignItems: "center",
    },
    spacing: {
        height: 20, // Khoảng cách giữa các nút
    },
});
