import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import ReduxToolkitScreen from "./screens/ReduxToolkitScreen";
import ReduxPersistScreen from "./screens/ReduxPersistScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ReduxToolkit" component={ReduxToolkitScreen} />
        <Stack.Screen name="ReduxPersist" component={ReduxPersistScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
