import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Todo } from "@/app/lib/interfaces/todo";

export interface TodoSlice {
  todos: Todo[];
}

const initialState: TodoSlice = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload];
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, setTodos } = todoSlice.actions;

export default todoSlice.reducer;
