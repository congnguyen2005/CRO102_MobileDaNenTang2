import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodos } from '../redux/todoSlice';
import TodoItem from '../components/TodoItem';

const HomeScreen = () => {
  const [todoText, setTodoText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);

  // For debugging
  useEffect(() => {
    console.log('Current todos:', todos);
    console.log('Current status:', status);
  }, [todos, status]);

  const loadTodos = async () => {
    try {
      await dispatch(fetchTodos()).unwrap();
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [dispatch]);

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

  // This is important - we need to extract the correct property from the API data
  const renderItem = ({ item }) => {
    // Check if item has a 'key' property (from API) or 'title' property (from local add)
    const title = item.key || item.title;
    return <TodoItem title={title} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc..."
          value={todoText}
          onChangeText={setTodoText}
        />
        <Button title="Lưu" onPress={handleAddTodo} />
      </View>

      {status === 'loading' && !isRefreshing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Đang tải danh sách...</Text>
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
          <Button title="Thử lại" onPress={loadTodos} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  errorContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
  },
});

export default HomeScreen;