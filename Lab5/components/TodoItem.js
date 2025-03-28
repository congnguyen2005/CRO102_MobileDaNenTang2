import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TodoItem = ({ title }) => {
  // Add debug log to check what's being passed to the component
  console.log('Rendering TodoItem with title:', title);
  
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title || 'Untitled Task'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: 16,
  },
});

export default TodoItem;