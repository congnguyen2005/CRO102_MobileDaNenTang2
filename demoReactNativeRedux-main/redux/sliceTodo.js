import { createSlice } from "@reduxjs/toolkit";

let list = [
  {
    key: "Học JS Redux",
  },
  {
    key: "Học TS",
  },
  {
    key: "Học React",
  },
];

const todoSlice = createSlice({
  name: "todos",
  initialState: list,
  reducers: {
    addTodo(state, action) {
      let todo = { key: action.payload };
      state.push(todo);
    },
  },
});

export const { addTodo } = todoSlice.actions;
const todoReducer = todoSlice.reducer;
export default todoReducer;
