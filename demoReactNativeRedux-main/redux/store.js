import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "./sliceTodo";
export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});
