import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;

// Đăng ký ứng dụng
AppRegistry.registerComponent(appName, () => App);
