import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux1/store";
import { increment, decrement } from "../redux1/counterSlice";

const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.count);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Count: {count}</Text>
            <Button title="+" onPress={() => dispatch(increment())} />
            <Button title="-" onPress={() => dispatch(decrement())} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: "center", gap: 10, marginTop: 50 },
    text: { fontSize: 24 },
});

export default Counter;
