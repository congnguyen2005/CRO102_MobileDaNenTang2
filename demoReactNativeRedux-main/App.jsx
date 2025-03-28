import { View, StyleSheet, TextInput, Button } from "react-native";
import List from "./components/list";
import { useState } from "react";
import AddTodo from "./components/addTodo";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AddTodo />
        <List />
      </View>
    </Provider>
  );
}

export default App;
