import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const storedName = await AsyncStorage.getItem("profil _name");
      const storedEmail = await AsyncStorage.getItem("profile_email");
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    await AsyncStorage.setItem("profile_name", name);
    await AsyncStorage.setItem("profile_email", email);
    Alert.alert("Thành công", "Thông tin đã được cập nhật!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa thông tin</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Họ và tên" />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: { height: 50, borderColor: "gray", borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 15 },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default EditProfileScreen;
