import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState } from "../redux1/store";
import { increment, decrement } from "../redux1/counterSlice";

const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.count);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Counter App</Text>
            <Text style={styles.count}>{count}</Text>
            <View style={styles.buttonContainer}>
                <Button title="-" onPress={() => dispatch(decrement())} color="#4CAF50" />
                <Button title="+" onPress={() => dispatch(increment())} color="#F44336" />
            </View>
        </View>
    );
};

export default function ReduxToolkitScreen() {
    return (
        <Provider store={store}>
            <Counter />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    count: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#333",
        marginVertical: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 20,
    },
});
