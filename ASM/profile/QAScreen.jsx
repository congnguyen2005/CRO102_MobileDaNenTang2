import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const questions = [
  { id: "1", question: "Làm sao để đặt hàng?", answer: "Bạn có thể đặt hàng qua ứng dụng bằng cách chọn sản phẩm và bấm vào nút 'Mua ngay'." },
  { id: "2", question: "Thời gian giao hàng là bao lâu?", answer: "Thời gian giao hàng tùy khu vực, thường từ 3-5 ngày làm việc." },
  { id: "3", question: "Tôi có thể hủy đơn hàng không?", answer: "Bạn có thể hủy đơn hàng trước khi đơn hàng được xử lý." },
];

const QAScreen = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Q & A</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.questionItem} 
            onPress={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <Text style={styles.question}>{item.question}</Text>
            {expanded === item.id && <Text style={styles.answer}>{item.answer}</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
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
  questionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
  },
  answer: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
});

export default QAScreen;