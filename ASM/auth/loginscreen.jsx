import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "761658028644-7p4olqah34pvchnsr492hb8bqvqn69gd.apps.googleusercontent.com", // Thay bằng ID thật
    androidClientId: "761658028644-824aqhu01a5jfgnh68927njai5ekjpcr.apps.googleusercontent.com",
    iosClientId: "761658028644-3v9ntshf2gacvnvb3hv1sdiecmb48tc0.apps.googleusercontent.com", 
    webClientId: "761658028644-b2qct9fdj0ln6p006rabl2vrnnbok8nh.apps.googleusercontent.com",
  });

  useEffect(() => {
    const handleGoogleSignIn = async () => {
      if (response?.type === "success") {
        const { id_token } = response.authentication;
        const credential = GoogleAuthProvider.credential(id_token);

        try {
          await signInWithCredential(auth, credential);
          Alert.alert("Đăng nhập Google thành công!");
          navigation.replace("Main"); // Điều hướng sang màn chính
        } catch (error) {
          Alert.alert("Lỗi đăng nhập Google", error.message);
        }
      }
    };

    handleGoogleSignIn();
  }, [response]);

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

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="gray" style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="gray" style={styles.inputIcon} />
          <TextInput
            placeholder="Mật khẩu"
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Hoặc đăng nhập bằng</Text>
        <View style={styles.socialContainer}>
          {/* Google Login */}
          <TouchableOpacity style={styles.socialButton} onPress={() => promptAsync()} activeOpacity={0.7}>
            <FontAwesome name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
        </View>

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
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 15,
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
