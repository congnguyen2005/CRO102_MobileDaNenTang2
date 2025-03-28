import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux2/store";
import { increment, decrement } from "../redux2/counterSlice";
import * as ImagePicker from "react-native-image-picker";

const CounterWithImage = () => {
    const count = useSelector((state: RootState) => state.counter.count);
    const dispatch = useDispatch();
    const [image, setImage] = useState<string | null>(null);

    const pickImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
            if (response.assets) setImage(response.assets[0].uri);
        });
    };

    return (
        <View style={styles.container}>
            <Text>Count: {count}</Text>
            <Button title="+" onPress={() => dispatch(increment())} />
            <Button title="-" onPress={() => dispatch(decrement())} />
            <Button title="Chọn ảnh" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
        </View>
    );
};

const styles = StyleSheet.create({ container: { alignItems: "center", gap: 10 } });

export default CounterWithImage;
