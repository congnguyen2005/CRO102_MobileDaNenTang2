import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message'; // Import Toast
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const OrderSuccessScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  const {
    name, email, address, phone, shippingMethod, total, paymentMethod,
    product, quantity
  } = route.params;

  const handleBackToHome = () => {
    navigation.navigate('Main'); // Quay lại trang chủ hoặc màn hình phù hợp
  };

  // Lưu thông tin thanh toán thành công vào Firestore và AsyncStorage
  useEffect(() => {
    const saveOrderToFirebase = async () => {
      try {
        // Lưu đơn hàng vào Firestore
        await firestore().collection('orders').add({
          name,
          email,
          address,
          phone,
          shippingMethod,
          total,
          paymentMethod,
          product,
          quantity,
          status: 'Thanh toán thành công',
          timestamp: firestore.FieldValue.serverTimestamp(),
        });

        // Tạo thông báo thanh toán thành công
        const newNotification = {
          id: Math.random().toString(),
          date: new Date().toLocaleDateString(),
          message: 'Bạn đã thanh toán thành công',
          productName: product.name,
          category: product.category || 'Không xác định',
          quantity: quantity,
          image: product.image || 'default_image_url',
        };

        // Lưu thông báo vào AsyncStorage
        const savedNotifications = await AsyncStorage.getItem('notifications');
        const notifications = savedNotifications ? JSON.parse(savedNotifications) : [];
        notifications.unshift(newNotification); // Thêm vào đầu danh sách thông báo

        await AsyncStorage.setItem('notifications', JSON.stringify(notifications));

        // Lưu thông báo vào Firestore
        await firestore().collection('notifications').add(newNotification);

        console.log('Thông báo thanh toán thành công đã được lưu vào Firebase và AsyncStorage');
      } catch (error) {
        console.error('Lỗi khi lưu thông báo thanh toán thành công:', error);
      }
    };

    saveOrderToFirebase();

    // Hiển thị thông báo thanh toán thành công
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Thanh toán thành công',
      text2: 'Bạn đã thanh toán thành công cho đơn hàng!',
      visibilityTime: 4000, // Thời gian hiển thị thông báo
      autoHide: true,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ĐẶT HÀNG THÀNH CÔNG</Text>
      
      {/* Thông tin người dùng */}
      <View style={styles.section}>
        <Text style={styles.label}>Thông tin khách hàng:</Text>
        <Text>Tên: {name}</Text>
        <Text>Email: {email}</Text>
        <Text>Địa chỉ: {address}</Text>
        <Text>Số điện thoại: {phone}</Text>
      </View>
      
      {/* Thông tin sản phẩm */}
      <View style={styles.section}>
        <Text style={styles.label}>Sản phẩm:</Text>
        <Text>Tên sản phẩm: {product.name}</Text>
        <Text>Số lượng: {quantity}</Text>
        <Text>Giá: {product.price}</Text>
      </View>
      
      {/* Phương thức vận chuyển */}
      <View style={styles.section}>
        <Text style={styles.label}>Phương thức vận chuyển:</Text>
        <Text>{shippingMethod === 'fast' ? 'Giao hàng nhanh' : 'Giao hàng COD'}</Text>
      </View>

      {/* Phương thức thanh toán */}
      <View style={styles.section}>
        <Text style={styles.label}>Phương thức thanh toán:</Text>
        <Text>{paymentMethod === 'visa' ? 'Thẻ VISA/MASTERCARD' : 'Thẻ ATM'}</Text>
      </View>

      {/* Tổng tiền */}
      <View style={styles.section}>
        <Text style={styles.label}>Tổng tiền:</Text>
        <Text>{total.toLocaleString('vi-VN')}đ</Text>
      </View>

      {/* Nút quay lại trang chủ */}
      <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
        <Text style={styles.buttonText}>QUAY LẠI TRANG CHỦ</Text>
      </TouchableOpacity>

      {/* Toast container */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  section: { marginBottom: 16 },
  label: { fontWeight: 'bold', marginBottom: 8 },
  button: {
    backgroundColor: '#2e7d32', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 20
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default OrderSuccessScreen;
