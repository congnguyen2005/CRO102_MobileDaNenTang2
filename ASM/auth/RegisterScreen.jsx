  import React, { useState, useEffect } from "react";
  import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
  } from "react-native";
  import { LinearGradient } from "expo-linear-gradient";
  import Icon from "react-native-vector-icons/FontAwesome";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../config/firebaseConfig";
  import * as Google from "expo-auth-session/providers/google";
  import * as WebBrowser from "expo-web-browser";
  import * as Facebook from 'expo-auth-session/providers/facebook';

  WebBrowser.maybeCompleteAuthSession();

  const RegisterScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");  // Thêm state để chứa thông báo lỗi

    const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
      expoClientId: "YOUR_EXPO_CLIENT_ID",
      androidClientId: "YOUR_ANDROID_CLIENT_ID",
      iosClientId: "YOUR_IOS_CLIENT_ID",
      webClientId: "761658028644-7p4olqah34pvchnsr492hb8bqvqn69gd.apps.googleusercontent.com",
    });

    const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
      clientId: "YOUR_FACEBOOK_APP_ID",
    });

    useEffect(() => {
      if (googleResponse?.type === "success") {
        const { id_token } = googleResponse.authentication;
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
          .then(() => {
            navigation.replace("Home");
          })
          .catch((error) => {
            setErrorMessage("Đăng nhập bằng Google thất bại");
          });
      }
      if (facebookResponse?.type === "success") {
        const { token } = facebookResponse.authentication;
        const credential = FacebookAuthProvider.credential(token);
        signInWithCredential(auth, credential)
          .then(() => {
            navigation.replace("Home");
          })
          .catch((error) => {
            setErrorMessage("Đăng nhập bằng Facebook thất bại");
          });
      }
    }, [googleResponse, facebookResponse]);

    const handleRegister = async () => {
      if (!email || !password || !confirmPassword || !fullName || !phone) {
        setErrorMessage("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp.");
        return;
      }

      setLoading(true);
      setErrorMessage("");  // Reset thông báo lỗi khi bắt đầu đăng ký

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigation.replace("Login");
      } catch (error) {
        setErrorMessage("Lỗi đăng ký: " + error.message);
      }
      setLoading(false);
    };

    return (
      <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.container}>
        <View style={styles.card}>
          <Image source={require("../assets/background.png")} style={styles.image} />
          <Text style={styles.title}>Tạo tài khoản</Text>

          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#888" style={styles.icon} />
            <TextInput
              placeholder="Họ và tên"
              style={styles.input}
              onChangeText={setFullName}
              value={fullName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#888" style={styles.icon} />
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#888" style={styles.icon} />
            <TextInput
              placeholder="Số điện thoại"
              style={styles.input}
              onChangeText={setPhone}
              value={phone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#888" style={styles.icon} />
            <TextInput
              placeholder="Mật khẩu"
              style={styles.input}
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#888" style={styles.icon} />
            <TextInput
              placeholder="Xác nhận mật khẩu"
              style={styles.input}
              secureTextEntry
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </View>

          {/* Hiển thị thông báo lỗi */}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Đăng ký</Text>}
          </TouchableOpacity>

          {/* Google Button */}
          <TouchableOpacity style={styles.socialButton} onPress={() => googlePromptAsync()}>
            <Icon name="google" size={24} color="#fff" />
            <Text style={styles.socialButtonText}> Đăng nhập với Google</Text>
          </TouchableOpacity>

          {/* Facebook Button */}
          <TouchableOpacity style={styles.socialButton} onPress={() => facebookPromptAsync()}>
            <Icon name="facebook" size={24} color="#fff" />
            <Text style={styles.socialButtonText}> Đăng nhập với Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Quay lại đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    card: {
      width: "100%",
      maxWidth: 400,
      padding: 24,
      backgroundColor: "white",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
      alignItems: "center",
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 16,
      color: "#2E7D32",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 12,
      marginBottom: 12,
      paddingHorizontal: 10,
      width: "100%",
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      padding: 12,
    },
    button: {
      width: "100%",
      backgroundColor: "#4CAF50",
      padding: 12,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    socialButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#DB4437",
      padding: 12,
      borderRadius: 12,
      marginTop: 16,
      width: "100%",
    },
    socialButtonText: {
      marginLeft: 8,
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    loginText: {
      textAlign: "center",
      color: "#4CAF50",
      marginTop: 16,
      fontSize: 16,
    },
    errorText: {
      color: "red",
      fontSize: 14,
      marginBottom: 10,
      textAlign: "center",
    },
  });

  export default RegisterScreen;
