import { View, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../redux/sliceTodo";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

function AddTodo() {
  let [text, setText] = useState("");
  const dispatch = useDispatch();
  return (
    <View>
      <TextInput onChangeText={setText} value={text} style={styles.input} />
      <Button
        onPress={() => {
          dispatch(addTodo(text));
        }}
        style={{ width: 30 }}
        title="New"
        color="#841584"
      />
    </View>
  );
}

export default AddTodo;
