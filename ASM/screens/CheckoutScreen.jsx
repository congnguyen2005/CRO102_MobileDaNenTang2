import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const CheckoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product, quantity } = route.params;

  const [name, setName] = useState('Trần Minh Trí');
  const [email, setEmail] = useState('tranminhtri@gmail.com');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingMethod, setShippingMethod] = useState('fast');
  const [paymentMethod, setPaymentMethod] = useState('visa');

  const [errors, setErrors] = useState({});

  const subtotal = quantity * parseInt(product.price.replace(/[^\d]/g, ''));
  const shippingFee = shippingMethod === 'fast' ? 15000 : 20000;
  const total = subtotal + shippingFee;

  const validate = () => {
    const newErrors = {};
    if (!address) newErrors.address = 'Vui lòng nhập Địa chỉ';
    if (!phone || phone.length < 9) newErrors.phone = 'Vui lòng nhập Số điện thoại hợp lệ';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    if (paymentMethod === 'visa') {
      navigation.navigate('CardInputScreen', {
        name, email, address, phone, shippingMethod, total,
        product, quantity
      });
    } else {
      navigation.navigate('OrderSuccess', {
        name, email, address, phone, shippingMethod, total, paymentMethod,
        product, quantity
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>THANH TOÁN</Text>

      {/* Hiển thị thông tin sản phẩm */}
      <View style={styles.section}>
        <Text style={styles.label}>Sản phẩm</Text>
        <Text>Tên sản phẩm: {product.name}</Text>
        <Text>Giá: {product.price}</Text>
        <Text>Số lượng: {quantity}</Text>
        <Text>Tạm tính: {subtotal.toLocaleString('vi-VN')}đ</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Thông tin khách hàng</Text>
        <TextInput value={name} editable={false} style={styles.input} />
        <TextInput value={email} editable={false} style={styles.input} />
        <TextInput placeholder="Địa chỉ" value={address} onChangeText={setAddress} style={styles.input} />
        {errors.address && <Text style={styles.error}>{errors.address}</Text>}
        <TextInput placeholder="Số điện thoại" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="numeric" />
        {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Phương thức vận chuyển</Text>
        {['fast', 'cod'].map((method) => (
          <TouchableOpacity key={method} onPress={() => setShippingMethod(method)} style={styles.optionRow}>
            <Text style={{ flex: 1 }}>
              {method === 'fast' ? 'Giao hàng Nhanh - 15.000đ' : 'Giao hàng COD - 20.000đ'}
            </Text>
            {shippingMethod === method && <Text>✔️</Text>}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Hình thức thanh toán</Text>
        {['visa', 'atm'].map((method) => (
          <TouchableOpacity key={method} onPress={() => setPaymentMethod(method)} style={styles.optionRow}>
            <Text style={{ flex: 1 }}>
              {method === 'visa' ? 'Thẻ VISA/MASTERCARD' : 'Thẻ ATM'}
            </Text>
            {paymentMethod === method && <Text>✔️</Text>}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text>Phí vận chuyển: {shippingFee.toLocaleString('vi-VN')}đ</Text>
        <Text style={styles.total}>Tổng cộng: {total.toLocaleString('vi-VN')}đ</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>TIẾP TỤC</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  section: { marginBottom: 20 },
  label: { fontWeight: 'bold', marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 6
  },
  optionRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 8
  },
  error: { color: 'red', fontSize: 13 },
  total: { fontWeight: 'bold', marginTop: 6 },
  button: {
    backgroundColor: '#2e7d32', padding: 14, borderRadius: 8, alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default CheckoutScreen;
