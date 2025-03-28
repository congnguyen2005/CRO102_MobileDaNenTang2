import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Bai1Screen from "./bai1/bai1";
import Bai2Screen from "./bai1/bai2";
import Bai3Screen from "./bai1/bai3";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn Bài</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Bài 1")}>
        <Text style={styles.buttonText}>Bài 1: Đếm số lần nhấn</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Bài 2")}>
        <Text style={styles.buttonText}>Bài 2: Co giãn khối vuông</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Bài 3")}>
        <Text style={styles.buttonText}>Bài 3: Chuyển động hình tròn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Bài 1" component={Bai1Screen} />
        <Stack.Screen name="Bài 2" component={Bai2Screen} />
        <Stack.Screen name="Bài 3" component={Bai3Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 10, marginVertical: 10 },
  buttonText: { color: "#fff", fontSize: 18 },
});
