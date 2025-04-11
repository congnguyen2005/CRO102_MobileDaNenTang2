import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, multiply, reset } from './counterSlice';

const CounterComponent = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bộ đếm nâng cấp</Text>
      <Text style={styles.count}>{count}</Text>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(increment(1))}>
        <Text style={styles.buttonText}>+1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(decrement(1))}>
        <Text style={styles.buttonText}>-1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(multiply())}>
        <Text style={styles.buttonText}>Bình phương</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={() => dispatch(reset())}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  count: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0077cc',
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 5,
    width: 200,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CounterComponent;
