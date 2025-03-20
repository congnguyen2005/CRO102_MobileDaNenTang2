import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const CustomTextInput = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    note: "",
  });

  const [savedData, setSavedData] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = () => {
    setSavedData(formData);
  };

  return (
    <View style={styles.container}>
      {/* Username */}
      <Text style={styles.label}>Username *</Text>
      <TextInput
        style={[styles.input, focusedField === "username" && styles.focusedInput]}
        placeholder="Enter your name"
        value={formData.username}
        onChangeText={(text) => handleInputChange("username", text)}
        onFocus={() => setFocusedField("username")}
        onBlur={() => setFocusedField(null)}
      />

      {/* Email */}
      <Text style={styles.label}>Email *</Text>
      <TextInput
        style={[styles.input, focusedField === "email" && styles.focusedInput]}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        onFocus={() => setFocusedField("email")}
        onBlur={() => setFocusedField(null)}
      />

      {/* Password */}
      <Text style={styles.label}>Password *</Text>
      <TextInput
        style={[styles.input, focusedField === "password" && styles.focusedInput]}
        placeholder="Enter your password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleInputChange("password", text)}
        onFocus={() => setFocusedField("password")}
        onBlur={() => setFocusedField(null)}
      />

      {/* Phone Number */}
      <Text style={styles.label}>Phone Number *</Text>
      <TextInput
        style={[styles.input, focusedField === "phone" && styles.focusedInput]}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => handleInputChange("phone", text)}
        onFocus={() => setFocusedField("phone")}
        onBlur={() => setFocusedField(null)}
      />

      {/* Notes */}
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.multilineInput, focusedField === "note" && styles.focusedInput]}
        placeholder="Write something..."
        multiline
        value={formData.note}
        onChangeText={(text) => handleInputChange("note", text)}
        onFocus={() => setFocusedField("note")}
        onBlur={() => setFocusedField(null)}
      />

      {/* Nút Lưu */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu thông tin</Text>
      </TouchableOpacity>

      {savedData && (
        <View style={styles.savedDataContainer}>
          <Text style={styles.savedDataTitle}>Thông tin đã lưu:</Text>
          <Text>👤 Username: {savedData.username}</Text>
          <Text>📧 Email: {savedData.email}</Text>
          <Text>🔑 Password: {savedData.password}</Text>
          <Text>📞 Phone: {savedData.phone}</Text>
          <Text>📝 Notes: {savedData.note}</Text>
        </View>
      )}
    </View>
  );
};

// 🌟 STYLE
const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: "bold", color: "#2c3e50", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 5,
  },
  focusedInput: { borderColor: "#3498db", borderWidth: 2 },
  multilineInput: { minHeight: 80, textAlignVertical: "top" },
  saveButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  savedDataContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ecf0f1",
    borderRadius: 10,
  },
  savedDataTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});

export default CustomTextInput;
