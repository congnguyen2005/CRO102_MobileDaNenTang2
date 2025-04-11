// screen/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action) => {
      const amount = action.payload ?? 1; // mặc định +1 nếu không có payload
      state.value += amount;
    },
    decrement: (state, action) => {
      const amount = action.payload ?? 1; // mặc định -1 nếu không có payload
      state.value -= amount;
    },
    multiply: (state) => {
      state.value = state.value ** 2;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// ✅ Export các action
export const { increment, decrement, multiply, reset } = counterSlice.actions;

// ✅ Export reducer để dùng trong store
export default counterSlice.reducer;
