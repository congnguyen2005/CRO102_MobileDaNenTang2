import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL mới (thay thế bằng URL của bạn nếu có)
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Lấy danh sách todos từ API
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching todos from API...');

      const response = await axios.get(API_URL, {
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('API response:', response.data);

      if (!Array.isArray(response.data)) {
        console.error('API did not return an array:', response.data);
        return rejectWithValue('API did not return an array');
      }

      // Format dữ liệu nhận từ API
      const formattedData = response.data.map(item => ({
        id: item.id,
        title: item.title // Sử dụng 'title' thay vì 'key'
      }));

      return formattedData;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error.message || error);

      // Dữ liệu mặc định khi xảy ra lỗi
      return [
        { id: '1', title: 'Mobile (Mặc định)' },
        { id: '2', title: 'Development (Mặc định)' },
      ];
    }
  }
);

// Thêm một todo mới
export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (title) => {
    return {
      id: Date.now().toString(),
      title
    };
  }
);

// Xóa một todo
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    return id;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
