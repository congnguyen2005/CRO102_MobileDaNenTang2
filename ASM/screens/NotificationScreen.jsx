import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet
} from "react-native";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      date: "Thứ tư, 03/09/2021",
      message: "Đặt hàng thành công",
      productName: "Spider Plant",
      category: "Lá bóng",
      quantity: "2 sản phẩm",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQq3RaIjtGWxlcPXSt-wVeCfTnxGCvHmem0A&s"
    }
  ]);

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <Text style={styles.noNotification}>Hiện chưa có thông báo nào cho bạn</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.notificationContent}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View>
                  <Text style={styles.successText}>{item.message}</Text>
                  <Text>
                    {item.productName} | {item.category}
                  </Text>
                  <Text>{item.quantity}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  noNotification: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
  notificationItem: { marginBottom: 16, borderBottomWidth: 1, borderBottomColor: "#ddd", paddingBottom: 10 },
  date: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
  notificationContent: { flexDirection: "row", alignItems: "center" },
  image: { width: 50, height: 50, marginRight: 10, borderRadius: 5 },
  successText: { color: "green", fontWeight: "bold" }
});

export default NotificationScreen;
