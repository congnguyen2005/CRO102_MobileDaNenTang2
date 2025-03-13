import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Animatable from "react-native-animatable";

// Import Custom Header
import CustomHeader from "./component/header";
import SectionViewScreen from "./component/SectionView";
import TextInputScreen from "./component/CustomTextInput";


const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Chọn bài học:
      </Animatable.Text>

      {[
        { title: "Bài 1: Header", screen: "CustomHeader", delay: 100 },
        { title: "Bài 2: Section View", screen: "SectionView", delay: 200 },
        { title: "Bài 3: Text Input", screen: "TextInput", delay: 300 },
      ].map(({ title, screen, delay }, index) => (
        <Animatable.View animation="fadeInUp" delay={delay} key={index}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(screen)}
          >
            <Text style={styles.buttonText}>{title}</Text>
          </TouchableOpacity>
        </Animatable.View>
      ))}
    </View>
  );
};

const CustomHeaderScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header 1 */}
      <CustomHeader title="Header" showAvatar={true} />
      {/* Header 2 */}
      <CustomHeader title="Trang chủ" showAvatar={false} />
      {/* Header 3 */}
      <CustomHeader title="Đặng Công Nguyên" showAvatar={true} />
      <CustomHeader title="" showAvatar={false} />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#3498db" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Menu chính" }} />
        <Stack.Screen name="CustomHeader" component={CustomHeaderScreen} options={{ title: "Bài 1: Header" }} />
        <Stack.Screen name="SectionView" component={SectionViewScreen} options={{ title: "Bài 2: Section View" }} />
        <Stack.Screen name="TextInput" component={TextInputScreen} options={{ title: "Bài 3: Text Input" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2980b9",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: 250,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
