import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const CardInputScreen = () => {
  const navigation = useNavigation(); // Đảm bảo khai báo navigation
  const route = useRoute();
  const params = route?.params ?? {};
  
  const {
    name = '', email = '', address = '', phone = '',
    shippingMethod = '', total = 0,
    product = { name: '' }, quantity = 0
  } = params;
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(name ? name.toUpperCase() : '');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleConfirm = () => {
    if (!cardNumber || !expiry || !cvv || !cardName) {
      alert('Vui lòng nhập đầy đủ thông tin thẻ');
      return;
    }

    navigation.navigate('OrderSuccess', {
      name, email, address, phone, shippingMethod, total,
      paymentMethod: 'VISA/MASTERCARD', product, quantity
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>THANH TOÁN</Text>

      {/* Hiển thị lại thông tin đơn hàng */}
      <View style={styles.section}>
        <Text style={styles.label}>Thông tin đơn hàng</Text>
        <Text>Sản phẩm: {product.name}</Text>
        <Text>Số lượng: {quantity}</Text>
        <Text>Tổng tiền: {total.toLocaleString('vi-VN')}đ</Text>
      </View>

      <Text style={styles.label}>Nhập thông tin thẻ</Text>
      <TextInput
        style={styles.input}
        placeholder="XXXX XXXX XXXX XXXX"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Tên chủ thẻ"
        value={cardName}
        onChangeText={setCardName}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          placeholder="MM/YY"
          value={expiry}
          keyboardType="numeric"
          onChangeText={setExpiry}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="CVV"
          keyboardType="numeric"
          value={cvv}
          onChangeText={setCvv}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Xác nhận thanh toán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  section: { marginBottom: 16 },
  label: { fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 16
  },
  row: { flexDirection: 'row', marginBottom: 16 },
  button: {
    backgroundColor: '#2e7d32', padding: 14, borderRadius: 8, alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});

export default CardInputScreen;
