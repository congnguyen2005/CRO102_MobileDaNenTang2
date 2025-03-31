import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("Người dùng");
  const [email, setEmail] = useState("example@gmail.com");

  useEffect(() => {
    const loadProfile = async () => {
      const storedName = await AsyncStorage.getItem("profile_name");
      const storedEmail = await AsyncStorage.getItem("profile_email");
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
    };
    const unsubscribe = navigation.addListener("focus", loadProfile);
    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    // Xóa dữ liệu người dùng khỏi AsyncStorage
    await AsyncStorage.removeItem("profile_name");
    await AsyncStorage.removeItem("profile_email");
    
    // Chuyển hướng đến màn hình đăng nhập hoặc màn hình khác (tùy chỉnh theo nhu cầu)
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={require("../assets/image/avatar.png")} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chung</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Text style={styles.option}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PlantGuide")}>
          <Text style={styles.option}>Cẩm nang trồng cây</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("TransactionHistory")}>
          <Text style={styles.option}>Lịch sử giao dịch</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("QA")}>
          <Text style={styles.option}>Q & A</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("GeminiAI")}>
          <Text style={styles.option}>Trò chuyện với AI</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bảo mật và Điều khoản</Text>
        <TouchableOpacity onPress={() => navigation.navigate("TermsConditions")}>
          <Text style={styles.option}>Điều khoản và điều kiện</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
          <Text style={styles.option}>Chính sách quyền riêng tư</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  profileSection: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  userInfo: { marginLeft: 15 },
  name: { fontSize: 18, fontWeight: "bold" },
  email: { color: "gray" },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  option: { fontSize: 14, paddingVertical: 8 },
  logout: { fontSize: 14, color: "red", paddingVertical: 8 },
});

export default ProfileScreen;
