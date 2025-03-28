import React from "react";
import { View, Button, StyleSheet, ImageBackground } from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <ImageBackground
            source={{ uri: "https://tse4.mm.bing.net/th?id=OIP.i8xv3WaNVg3uk7eMiiNZGwAAAA&pid=Api&P=0&h=220" }}
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
