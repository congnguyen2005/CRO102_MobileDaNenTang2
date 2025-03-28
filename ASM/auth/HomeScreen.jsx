import React from "react";
import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Chào mừng đến trang chủ!</Text>
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  );
}
