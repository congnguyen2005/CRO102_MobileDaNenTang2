import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const TermsConditionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Điều khoản và Điều kiện</Text>
      <Text style={styles.sectionTitle}>1. Giới thiệu</Text>
      <Text style={styles.text}>Khi sử dụng ứng dụng này, bạn đồng ý tuân thủ các điều khoản và điều kiện sau.</Text>
      
      <Text style={styles.sectionTitle}>2. Quyền và Trách nhiệm</Text>
      <Text style={styles.text}>Bạn có trách nhiệm bảo mật thông tin tài khoản và không chia sẻ với người khác.</Text>
      
      <Text style={styles.sectionTitle}>3. Chính sách hoàn tiền</Text>
      <Text style={styles.text}>Chúng tôi không hỗ trợ hoàn tiền sau khi giao dịch hoàn tất, trừ trường hợp có lỗi hệ thống.</Text>
      
      <Text style={styles.sectionTitle}>4. Thay đổi điều khoản</Text>
      <Text style={styles.text}>Chúng tôi có quyền thay đổi điều khoản mà không cần thông báo trước. Vui lòng kiểm tra thường xuyên.</Text>
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

export default TermsConditionsScreen;
