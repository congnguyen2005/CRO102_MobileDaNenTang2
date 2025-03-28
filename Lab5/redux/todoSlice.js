import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Improved API fetch function
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos', 
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching todos from API...');
      
      const response = await axios.get(
        'https://67dce415e00db03c40694362.mockapi.io/todos',
        { 
          timeout: 15000,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
      console.log('API response:', response.data);
      
      // Validate that data is an array
      if (!Array.isArray(response.data)) {
        console.error('API did not return an array:', response.data);
        return rejectWithValue('API did not return an array');
      }
      
      // Map the API response to a consistent format if needed
      // Based on your console logs, it seems the API returns objects with 'id' and 'key' properties
      const formattedData = response.data.map(item => ({
        id: item.id,
        title: item.key // Use the 'key' property as the title
      }));
      
      return formattedData;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error.message || error);
      
      // Return default data instead of rejecting
      return [
        { id: '1', title: 'Công việc 1 (Mặc định)' },
        { id: '2', title: 'Công việc 2 (Mặc định)' },
      ];
    }
  }
);

// Thêm todo mới
export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (title) => {
    // Create a local todo with a unique ID
    return { 
      id: Date.now().toString(), 
      title 
    };
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
      // Handle fetchTodos
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
      
      // Handle addTodo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default todoSlice.reducer;