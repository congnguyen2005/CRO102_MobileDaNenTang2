import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Chính sách quyền riêng tư</Text>
      <Text style={styles.sectionTitle}>1. Giới thiệu</Text>
      <Text style={styles.text}>Chúng tôi cam kết bảo vệ quyền riêng tư của bạn và tuân thủ các quy định bảo mật dữ liệu.</Text>
      
      <Text style={styles.sectionTitle}>2. Thông tin thu thập</Text>
      <Text style={styles.text}>Chúng tôi có thể thu thập thông tin cá nhân như tên, email, số điện thoại để cung cấp dịch vụ tốt hơn.</Text>
      
      <Text style={styles.sectionTitle}>3. Sử dụng thông tin</Text>
      <Text style={styles.text}>Thông tin của bạn được sử dụng để cải thiện trải nghiệm dịch vụ, hỗ trợ khách hàng và gửi thông báo quan trọng.</Text>
      
      <Text style={styles.sectionTitle}>4. Bảo mật</Text>
      <Text style={styles.text}>Chúng tôi áp dụng các biện pháp bảo mật để bảo vệ thông tin cá nhân khỏi truy cập trái phép.</Text>
      
      <Text style={styles.sectionTitle}>5. Quyền của người dùng</Text>
      <Text style={styles.text}>Bạn có quyền yêu cầu chỉnh sửa hoặc xóa thông tin cá nhân của mình bất cứ lúc nào.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  text: {
    fontSize: 14,
    marginTop: 5,
    lineHeight: 20,
  },
});

export default PrivacyPolicyScreen;
