import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, 
  SafeAreaView, TouchableOpacity 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodos, deleteTodo } from '../redux/todoSlice';
import TodoItem from '../components/TodoItem';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [todoText, setTodoText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);

  useEffect(() => {
    loadTodos();
  }, [dispatch]);

  const loadTodos = async () => {
    try {
      await dispatch(fetchTodos()).unwrap();
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTodos();
    setIsRefreshing(false);
  };

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(addTodo(todoText));
      setTodoText('');
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const renderItem = ({ item }) => (
    <TodoItem title={item.title} onDelete={() => handleDeleteTodo(item.id)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc..."
          value={todoText}
          onChangeText={setTodoText}
          placeholderTextColor="#bbb"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Ionicons name="add-circle" size={50} color="#3498db" />
        </TouchableOpacity>
      </View>

      {status === 'loading' && !isRefreshing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Đang tải danh sách...</Text>
        </View>
      )}

      {status === 'succeeded' && (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          style={styles.list}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Không có công việc nào</Text>
          )}
        />
      )}

      {status === 'failed' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Lỗi tải dữ liệu!</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadTodos}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f7f9fc',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    marginLeft: 10,
  },
  list: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
  errorContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7f8c8d',
    marginVertical: 20,
  },
});

export default HomeScreen;
