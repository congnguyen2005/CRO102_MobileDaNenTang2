import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();

  const categories = [
    {
      title: 'Cây trồng',
      products: [
        { 
          name: 'Spider Plant', 
          price: '250.000đ', 
          image: { uri: 'https://btnmt.1cdn.vn/thumbs/1200x630/2022/04/27/vo-co-bau-chong-khong-duoc-trong-cay-1.png' },
          description: 'Cây nhện - giúp lọc không khí, dễ chăm sóc.',
          rating: 4.5
        },
        { 
          name: 'Song of India', 
          price: '250.000đ', 
          image: { uri: 'https://cdn.benhvienquan11.vn/editor/2024/bao%20ve%20moi%20truong/a.jpg' },
          description: 'Cây xanh đẹp mắt, phù hợp với không gian sống.',
          rating: 4.7
        },
        { 
          name: 'Spider Plant', 
          price: '250.000đ', 
          image: { uri: 'https://lg.com.vn/wp-content/uploads/2024/09/bonsai08-jpg.webp' },
          description: 'Cây nhện - giúp lọc không khí, dễ chăm sóc.',
          rating: 4.5
        },
        { 
          name: 'Spider Plant', 
          price: '250.000đ', 
          image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwxmXwqJyKja9vG85zqqNQdO1pd4nyaWcKxA&s' },
          description: 'Cây nhện - giúp lọc không khí, dễ chăm sóc.',
          rating: 4.5
        }
      ]
    },
    {
      title: 'Chậu cây trồng',
      products: [
        { 
          name: 'Planta Trắng', 
          price: '250.000đ', 
          image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTShEhQuwh7IKb4XfQZtApA_eOCfOepMBUHvQ&s' },
          description: 'Chậu sứ trắng đơn giản nhưng tinh tế.',
          rating: 4.6
        },
        { 
          name: 'Planta Lemon Balm', 
          price: '250.000đ', 
          image: { uri: 'https://www.gardendesign.com/pictures/images/675x529Max/site_3/dusty-miller-jacobaea-maritima-shutterstock-com_16611.jpg' },
          description: 'Chậu cây giúp không gian thêm tươi mới.',
          rating: 4.8
        }
      ]
    },
    {
      title: 'Cây trồng',
      products: [
        { 
          name: 'Spider Plant', 
          price: '250.000đ', 
          image: { uri: 'https://btnmt.1cdn.vn/thumbs/900x600/2020/06/09/a5.jpg' },
          description: 'Cây nhện - giúp lọc không khí, dễ chăm sóc.',
          rating: 4.5
        },
        { 
          name: 'Song of India', 
          price: '250.000đ', 
          image: { uri: 'https://cdn.tgdd.vn/Files/2022/08/11/1455456/hoa-da-quy-trang-nguon-goc-y-nghia-va-cach-trong-202208110730314816.jpg' },
          description: 'Cây xanh đẹp mắt, phù hợp với không gian sống.',
          rating: 4.7
        }
      ]
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Image source={{ uri: 'https://cdn.tgdd.vn/Files/2022/08/11/1455456/hoa-da-quy-trang-nguon-goc-y-nghia-va-cach-trong-202208110730314816.jpg' }} style={{ width: '100%', height: 150, borderRadius: 10 }} />
      </View>
    
      {categories.map((category, index) => (
        <View key={index} style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{category.title}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {category.products.map((product, idx) => (
              <TouchableOpacity key={idx} style={{ marginRight: 16, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 10, width: 140, alignItems: 'center' }}>
                <Image source={product.image} style={{ width: 100, height: 100, borderRadius: 8 }} />
                <Text style={{ fontWeight: 'bold', textAlign: 'center', marginTop: 8 }}>{product.name}</Text>
                <Text style={{ color: 'gray', fontSize: 12, textAlign: 'center' }}>{product.description}</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 4 }}>{product.price}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                  <FontAwesome name="star" size={14} color="gold" />
                  <Text style={{ marginLeft: 4 }}>{product.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
