import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook"; 
import { GoogleAuthProvider, FacebookAuthProvider, signInWithCredential } from "firebase/auth"; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    // Google Authentication
    if (googleResponse?.type === "success") {
      const { id_token } = googleResponse.authentication;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Đăng nhập thành công!", "Bạn đã đăng nhập bằng Google.");
          navigation.replace("Main");
        })
        .catch((error) => {
          Alert.alert("Lỗi Google Sign-In", error.message);
        });
    }

    // Facebook Authentication
    if (facebookResponse?.type === "success") {
      const { token } = facebookResponse.authentication;
      const credential = FacebookAuthProvider.credential(token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Đăng nhập thành công!", "Bạn đã đăng nhập bằng Facebook.");
          navigation.replace("Main");
        })
        .catch((error) => {
          Alert.alert("Lỗi Facebook Sign-In", error.message);
        });
    }
  }, [googleResponse, facebookResponse]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Đăng nhập thành công!");
      navigation.replace("Main");
    } catch (error) {
      Alert.alert("Lỗi đăng nhập!", error.message);
    }
  };

  return (
    <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require("../assets/background.png")} style={styles.logo} />
        <Text style={styles.title}>Chào mừng bạn</Text>
        <Text style={styles.subtitle}>Đăng nhập tài khoản</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="gray" style={styles.inputIcon} />
          <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} value={email} keyboardType="email-address" />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="gray" style={styles.inputIcon} />
          <TextInput placeholder="Mật khẩu" style={styles.input} onChangeText={setPassword} value={password} secureTextEntry />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        {/* Social Login */}
        <Text style={styles.orText}>Hoặc đăng nhập bằng</Text>
        <View style={styles.socialContainer}>
          {/* Google Login Button */}
          <TouchableOpacity style={styles.socialButton} onPress={() => googlePromptAsync()} activeOpacity={0.7}>
            <FontAwesome name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
          
          {/* Facebook Login Button */}
          <TouchableOpacity style={styles.socialButton} onPress={() => facebookPromptAsync()} activeOpacity={0.7}>
            <FontAwesome name="facebook" size={24} color="#4267B2" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.rowContainer}>
          <Text style={styles.footerText}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}> Tạo tài khoản</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#388E3C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#388E3C",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  orText: {
    color: "gray",
    marginVertical: 15,
    fontSize: 16,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 50,
    marginHorizontal: 10,
    elevation: 3,
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  footerText: {
    color: "gray",
  },
  registerText: {
    color: "#388E3C",
    fontWeight: "bold",
  },
});

export default LoginScreen;
