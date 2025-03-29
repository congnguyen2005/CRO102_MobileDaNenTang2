import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";

const ProfileScreen = () => {
  const [name, setName] = useState("Trần Minh Tú");
  const [email, setEmail] = useState("minhtu@email.com");
  const [address, setAddress] = useState("03 Láng Hạ, Ba Đình, Hà Nội");
  const [phone, setPhone] = useState("0123456789");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.avatar} />
      <Text style={styles.label}>Tên</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        editable={isEditing}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        editable={false}
      />
      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        editable={isEditing}
      />
      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        editable={isEditing}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={[styles.button, isEditing ? styles.buttonActive : styles.buttonDisabled]}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Text style={styles.buttonText}>{isEditing ? "Lưu thông tin" : "Chỉnh sửa thông tin"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff", alignItems: "center" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  label: { alignSelf: "flex-start", marginLeft: 16, fontSize: 14, fontWeight: "bold" },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10
  },
  button: { padding: 12, borderRadius: 8, width: "90%", alignItems: "center" },
  buttonActive: { backgroundColor: "green" },
  buttonDisabled: { backgroundColor: "gray" },
  buttonText: { color: "white", fontSize: 16 }
});

export default ProfileScreen;
