import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const transactions = [
  { id: "1", date: "25/03/2025", amount: "500,000 VND", status: "Thành công" },
  { id: "2", date: "20/03/2025", amount: "1,200,000 VND", status: "Thành công" },
  { id: "3", date: "15/03/2025", amount: "750,000 VND", status: "Đang xử lý" },
];

const TransactionHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử giao dịch</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.amount}>{item.amount}</Text>
            <Text style={[styles.status, item.status === "Thành công" ? styles.success : styles.pending]}>
              {item.status}
            </Text>
          </View>
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
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  date: {
    fontSize: 14,
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
  success: {
    color: "green",
  },
  pending: {
    color: "orange",
  },
});

export default TransactionHistoryScreen;
