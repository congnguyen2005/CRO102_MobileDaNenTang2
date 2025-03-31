import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PlantGuideScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cẩm nang trồng cây</Text>
      <Text style={styles.sectionTitle}>1. Chọn loại cây phù hợp</Text>
      <Text style={styles.text}>Tùy vào điều kiện ánh sáng và khí hậu, bạn nên chọn loại cây phù hợp để trồng.</Text>
      
      <Text style={styles.sectionTitle}>2. Đất và dinh dưỡng</Text>
      <Text style={styles.text}>Sử dụng đất tơi xốp, giàu dinh dưỡng để giúp cây phát triển tốt.</Text>
      
      <Text style={styles.sectionTitle}>3. Tưới nước hợp lý</Text>
      <Text style={styles.text}>Không tưới quá nhiều nước, nên tưới theo nhu cầu từng loại cây.</Text>
      
      <Text style={styles.sectionTitle}>4. Ánh sáng và nhiệt độ</Text>
      <Text style={styles.text}>Đặt cây ở nơi có đủ ánh sáng hoặc dùng đèn hỗ trợ nếu cần.</Text>
      
      <Text style={styles.sectionTitle}>5. Phòng ngừa sâu bệnh</Text>
      <Text style={styles.text}>Kiểm tra cây thường xuyên để phát hiện và xử lý sâu bệnh kịp thời.</Text>
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

export default PlantGuideScreen;