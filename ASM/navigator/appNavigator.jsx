import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

// Import screens
import HomeScreen from "../auth/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../profile/ProfileScreen";
import EditProfileScreen from "../profile/EditProfileScreen";
import PlantGuideScreen from "../profile/PlantGuideScreen";
import TransactionHistoryScreen from "../profile/TransactionHistoryScreen";
import QAScreen from "../profile/QAScreen";
import TermsConditionsScreen from "../profile/TermsConditionsScreen";
import PrivacyPolicyScreen from "../profile/PrivacyPolicyScreen";
import GeminiAPI from "../profile/GeminiAPI";
import LoginScreen from "../auth/loginscreen";
import RegisterScreen from "../auth/RegisterScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Profile Stack
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: "Hồ sơ" }} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Chỉnh sửa thông tin" }} />
    <Stack.Screen name="PlantGuide" component={PlantGuideScreen} options={{ title: "Cẩm nang trồng cây" }} />
    <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} options={{ title: "Lịch sử giao dịch" }} />
    <Stack.Screen name="QA" component={QAScreen} options={{ title: "Q & A" }} />
    <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} options={{ title: "Điều khoản & Điều kiện" }} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: "Chính sách quyền riêng tư" }} />
    <Stack.Screen name="GeminiAI" component={GeminiAPI} options={{ title: "Trò chuyện với AI" }} />

  </Stack.Navigator>
);

// Bottom Tab Navigator
const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Home") iconName = "home";
        else if (route.name === "Search") iconName = "search";
        else if (route.name === "Notifications") iconName = "bell";
        else if (route.name === "Profile") iconName = "user";
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "green",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Notifications" component={NotificationScreen} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

// Main App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;