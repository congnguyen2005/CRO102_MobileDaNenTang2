// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './screen/counterSlice';
import { pokemonApi } from './screen/PokemonApi';
import CounterComponent from './screen/CounterComponent';
import PokemonSearch from './screen/PokemonSearch';
import SignupForm from './screen/SignupForm';
import { View, Button, StyleSheet, ScrollView } from 'react-native';

const Stack = createNativeStackNavigator();

// Cấu hình Redux store
const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

// Màn hình chính chứa 3 nút để chuyển trang
const HomeScreen = ({ navigation }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Button title="🧮 Bài 1 - Counter" onPress={() => navigation.navigate('Counter')} />
    <View style={styles.space} />
    <Button title="🔍 Bài 2 - Tìm kiếm Pokemon" onPress={() => navigation.navigate('Pokemon')} />
    <View style={styles.space} />
    <Button title="📝 Bài 3 - Form Đăng ký" onPress={() => navigation.navigate('Signup')} />
  </ScrollView>
);

// App chính
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
          <Stack.Screen name="Counter" component={CounterComponent} options={{ title: 'Bài 1 - Counter' }} />
          <Stack.Screen name="Pokemon" component={PokemonSearch} options={{ title: 'Bài 2 - Pokemon Search' }} />
          <Stack.Screen name="Signup" component={SignupForm} options={{ title: 'Bài 3 - Đăng ký' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  space: {
    height: 20,
  },
});

export default App;
