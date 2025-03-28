import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor, RootState } from "../redux2/store";
import { increment, decrement, setImage } from "../redux2/counterSlice";
import { PersistGate } from "redux-persist/integration/react";
import * as ImagePicker from "expo-image-picker";

const Counter = () => {
    const count = useSelector((state: RootState) => state.count);
    const imageUri = useSelector((state: RootState) => state.imageUri);
    const dispatch = useDispatch();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            dispatch(setImage(result.assets[0].uri)); // Lưu ảnh vào Redux Persist
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Redux Persist</Text>
            <Text style={styles.count}>Count: {count}</Text>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={() => dispatch(decrement())}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => dispatch(increment())}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Text style={styles.buttonText}>Chọn ảnh</Text>
            </TouchableOpacity>

            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        </View>
    );
};

export default function ReduxPersistScreen() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Counter />
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    count: {
        fontSize: 20,
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: "row",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    imageButton: {
        backgroundColor: "#28a745",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
});
