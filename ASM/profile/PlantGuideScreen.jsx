import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PlantGuideScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cẩm nang trồng cây</Text>
      
      <Text style={styles.sectionTitle}>1. Chọn loại cây phù hợp</Text>
      <Text style={styles.text}>Tùy vào điều kiện ánh sáng và khí hậu, bạn nên chọn loại cây phù hợp để trồng.</Text>
      
      <Text style={styles.sectionTitle}>2. Đất và dinh dưỡng</Text>
      <Text style={styles.text}>Sử dụng đất tơi xốp, giàu dinh dưỡng để giúp cây phát triển tốt. Bổ sung phân hữu cơ hoặc phân bón vi sinh định kỳ.</Text>
      
      <Text style={styles.sectionTitle}>3. Tưới nước hợp lý</Text>
      <Text style={styles.text}>Không tưới quá nhiều nước, nên tưới theo nhu cầu từng loại cây. Tưới vào buổi sáng hoặc chiều mát để tránh bay hơi nhanh.</Text>
      
      <Text style={styles.sectionTitle}>4. Ánh sáng và nhiệt độ</Text>
      <Text style={styles.text}>Đặt cây ở nơi có đủ ánh sáng hoặc dùng đèn hỗ trợ nếu cần. Một số cây ưa bóng râm, cần đặt ở nơi mát mẻ.</Text>
      
      <Text style={styles.sectionTitle}>5. Phòng ngừa sâu bệnh</Text>
      <Text style={styles.text}>Kiểm tra cây thường xuyên để phát hiện và xử lý sâu bệnh kịp thời. Sử dụng các biện pháp tự nhiên như dầu neem hoặc dung dịch tỏi ớt để phòng trừ sâu bệnh.</Text>
      
      <Text style={styles.sectionTitle}>6. Cắt tỉa và tạo dáng</Text>
      <Text style={styles.text}>Cắt tỉa lá vàng, cành khô để kích thích cây ra lá mới. Đối với cây cảnh, bạn có thể tạo dáng theo ý thích.</Text>
      
      <Text style={styles.sectionTitle}>7. Chăm sóc theo mùa</Text>
      <Text style={styles.text}>Mùa mưa có thể giảm tưới nước, mùa hè cần che nắng cho cây non. Mùa đông nên giữ ấm cho cây nhạy cảm với nhiệt độ lạnh.</Text>
      
      <Text style={styles.sectionTitle}>8. Thay chậu và nhân giống</Text>
      <Text style={styles.text}>Cây phát triển lớn cần thay chậu để có đủ không gian sinh trưởng. Bạn cũng có thể nhân giống bằng giâm cành hoặc gieo hạt.</Text>
      
      <Text style={styles.sectionTitle}>9. Bổ sung khoáng chất</Text>
      <Text style={styles.text}>Cung cấp khoáng chất thiết yếu như canxi, magie để cây phát triển mạnh mẽ. Có thể dùng bột vỏ trứng hoặc tro bếp để bổ sung tự nhiên.</Text>
      
      <Text style={styles.sectionTitle}>10. Tạo môi trường sống tốt</Text>
      <Text style={styles.text}>Giữ môi trường xung quanh sạch sẽ, thoáng khí để cây phát triển tốt hơn. Tránh để cây trong môi trường quá ô nhiễm hoặc chật chội.</Text>
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
