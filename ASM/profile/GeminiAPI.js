import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { API_KEY, TRANSLATE_API_KEY } from "../config/cofig"; // Đảm bảo có API Key cho Google Translate

const GeminiAPI = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGeminiResponse = async () => {
    if (!inputText.trim()) {
      setResponseText("Vui lòng nhập câu hỏi trước!");
      return;
    }

    setLoading(true);
    setResponseText("");
    setTranslatedText("");

    try {
      // Gọi API Gemini
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: inputText }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Lỗi API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi từ AI.";

      setResponseText(aiResponse);

      // Gọi API Google Translate để dịch sang tiếng Việt
      translateText(aiResponse);
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      setResponseText("Lỗi khi kết nối AI. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const translateText = async (text) => {
    try {
      const translateResponse = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: text,
            source: "en",
            target: "vi",
            format: "text",
          }),
        }
      );

      const translateData = await translateResponse.json();
      const translated = translateData?.data?.translations?.[0]?.translatedText || "Không thể dịch.";

      setTranslatedText(translated);
    } catch (error) {
      console.error("Lỗi dịch:", error);
      setTranslatedText("Lỗi khi dịch. Vui lòng thử lại!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập câu hỏi:</Text>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Nhập nội dung..."
      />
      <TouchableOpacity style={styles.button} onPress={fetchGeminiResponse} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Gửi</Text>}
      </TouchableOpacity>
      <Text style={styles.responseLabel}>Phản hồi từ AI:</Text>
      <Text style={styles.responseText}>{responseText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 18, fontWeight: "bold" },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 8 },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  responseLabel: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  responseText: { fontSize: 16, marginTop: 10 },
});

export default GeminiAPI;
