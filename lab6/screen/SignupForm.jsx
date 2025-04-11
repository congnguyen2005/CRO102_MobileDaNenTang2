import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SignupForm = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    gender: '',
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const { name, age, email, password, gender } = form;

    if (!name || !age || !email || !password || !gender) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tất cả các trường.');
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum <= 10) {
      Alert.alert('Lỗi', 'Tuổi phải là một số hợp lệ lớn hơn 10.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    Alert.alert('Thành công', 'Thông tin đã được gửi:\n' + JSON.stringify(form, null, 2));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Đăng ký tài khoản</Text>

      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.label}>Họ tên*</Text>
          <TextInput
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
            style={styles.input}
            placeholder="Nguyễn Văn A"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Tuổi*</Text>
          <TextInput
            value={form.age}
            onChangeText={(text) => handleChange('age', text)}
            keyboardType="numeric"
            style={styles.input}
            placeholder="20"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email*</Text>
        <TextInput
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
          style={styles.input}
          placeholder="abc@example.com"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Mật khẩu*</Text>
        <TextInput
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry
          style={styles.input}
          placeholder="Tối thiểu 6 ký tự"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Giới tính*</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.gender}
            onValueChange={(value) => handleChange('gender', value)}
            style={Platform.OS === 'android' ? {} : styles.picker}
          >
            <Picker.Item label="Nam" value="male" />
            <Picker.Item label="Nữ" value="female" />
            <Picker.Item label="Khác" value="other" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Gửi" onPress={handleSubmit} color="#00bcd4" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#00796b',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  field: {
    flex: 1,
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: '#444',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default SignupForm;
