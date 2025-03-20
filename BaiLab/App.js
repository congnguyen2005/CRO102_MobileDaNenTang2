import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Header from "./bai2/Header";
import Footer from "./bai2/Footer";

const colors = ["white", "gray", "yellow", "red", "blue", "orange"];

export default function Main() {
  const [user, setUser] = useState({
    name: "Chưa có tên",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });

  const [inputName, setInputName] = useState("");
  const [inputAvatar, setInputAvatar] = useState("");

  const [footerColor, setFooterColor] = useState(colors[0]);
  const [lastTimeUpdate, setLastTimeUpdate] = useState("");

  // Cập nhật thời gian thực mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const dateString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
      const timeString = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
      setLastTimeUpdate(`${timeString} - ${dateString}`);
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(interval); // Xóa interval khi component bị unmount
  }, []);

  // Cập nhật thông tin người dùng
  const onUpdateInfo = useCallback(() => {
    if (!inputName.trim() || !inputAvatar.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    setUser({ name: inputName, avatar: inputAvatar });
  }, [inputName, inputAvatar]);

  // Đổi màu footer
  const onClickChangeBgFooter = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setFooterColor(colors[randomIndex]);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header user={user} />

      {/* Input nhập thông tin */}
      <TextInput
        style={styles.input}
        placeholder="Nhập tên mới"
        placeholderTextColor="#888"
        value={inputName}
        onChangeText={setInputName}
      />
      <TextInput
        style={styles.input}
        placeholder="Dán địa chỉ avatar mới"
        placeholderTextColor="#888"
        value={inputAvatar}
        onChangeText={setInputAvatar}
      />

      {/* Nút bấm */}
      <TouchableOpacity style={styles.button} onPress={onUpdateInfo}>
        <Text style={styles.buttonText}>CẬP NHẬT THÔNG TIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={onClickChangeBgFooter}>
        <Text style={styles.buttonText}>ĐỔI MÀU FOOTER</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Footer timeUpdate={lastTimeUpdate} backgroundColor={footerColor} />
    </View>
  );
}

// Style nâng cấp
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  input: {
    width: "85%",
    height: 45,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    width: "85%",
    height: 45,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonSecondary: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
 