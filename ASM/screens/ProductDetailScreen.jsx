import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProductDetailScreen = () => {
  const [quantity, setQuantity] = useState(0);
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

  const formatCurrency = (value) => `${value.toLocaleString('vi-VN')}đ`;

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === 'increase') return prev + 1;
      return Math.max(0, prev - 1);
    });
  };

  const handleBuy = () => {
    if (quantity > 0) {
      navigation.navigate('Checkout', { product, quantity });
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Hình ảnh sản phẩm */}
      <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={product.image} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
      </View>

      {/* Thông tin sản phẩm */}
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>{product.name}</Text>

        {/* Tags */}
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          {product.tags?.map((tag, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#2e7d32',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 6,
                marginRight: 8
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Giá */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2e7d32', marginBottom: 16 }}>
          {product.price}
        </Text>

        {/* Chi tiết sản phẩm */}
        <View style={{ borderTopWidth: 1, borderColor: '#ddd', paddingTop: 12 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Chi tiết sản phẩm</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Kích cỡ</Text>
            <Text>{product.size || 'Nhỏ'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Xuất xứ</Text>
            <Text>{product.origin || 'Châu Phi'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text>Tình trạng</Text>
            <Text style={{ color: '#2e7d32', fontWeight: 'bold' }}>
              Còn {product.stock || 156} sp
            </Text>
          </View>
        </View>

        {/* Bộ chọn số lượng */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text>Đã chọn {quantity} sản phẩm</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => handleQuantityChange('decrease')}
              style={{
                borderWidth: 1,
                borderColor: '#aaa',
                borderRadius: 4,
                paddingHorizontal: 10,
                paddingVertical: 4,
                marginRight: 8
              }}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity
              onPress={() => handleQuantityChange('increase')}
              style={{
                borderWidth: 1,
                borderColor: '#aaa',
                borderRadius: 4,
                paddingHorizontal: 10,
                paddingVertical: 4,
                marginLeft: 8
              }}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontWeight: 'bold' }}>
            {formatCurrency(quantity * parseInt(product.price.replace(/[^\d]/g, '')))}
          </Text>
        </View>

        {/* Nút chọn mua */}
        <TouchableOpacity
          disabled={quantity === 0}
          onPress={handleBuy}
          style={{
            backgroundColor: quantity > 0 ? '#2e7d32' : '#ccc',
            padding: 14,
            borderRadius: 8,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>CHỌN MUA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
