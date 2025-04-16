import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import firestore from '@react-native-firebase/firestore'; // Import Firestore for saving notifications

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        // Lấy các thông báo từ AsyncStorage
        const savedNotifications = await AsyncStorage.getItem('notifications');
        if (savedNotifications) {
          setNotifications(JSON.parse(savedNotifications));
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông báo từ AsyncStorage:', error);
      }
    };

    loadNotifications(); // Lấy thông báo khi màn hình được render

    // Để đồng bộ dữ liệu với Firestore, bạn có thể lắng nghe sự thay đổi của Firestore nếu cần
    const unsubscribe = firestore()
      .collection('notifications')
      .orderBy('timestamp', 'desc') // Sắp xếp theo thời gian
      .onSnapshot(snapshot => {
        const notificationsList = snapshot.docs.map(doc => doc.data());
        setNotifications(notificationsList);
      });

    // Cleanup khi component bị hủy
    return () => unsubscribe();
  }, []);

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
                  <Text>{item.productName} | {item.category}</Text>
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
