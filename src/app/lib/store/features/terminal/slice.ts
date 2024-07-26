import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialLines = [
  '<p className="text-green-300 mt-4">visitor@jata.com: ~$ touch call frank</p>',
  '<p className="ml-8 text-blue-400"><span className="font-semibold">call frank</span> was added to todo list</p>',
  '<p className="text-green-300 mt-4">visitor@jata.com: ~$ touch see camille</p>',
  '<p className="ml-8 text-blue-400"><span className="font-semibold">see camille</span> was added to todo list</p>',
];

export interface TerminalSlice {
  lines: string[];
  todos: string[];
}

const initialState: TerminalSlice = {
  lines: initialLines,
  todos: ["call frank", "see camille"],
};

export const terminalSlice = createSlice({
  name: "terminalSlice",
  initialState,
  reducers: {
    addLine: (state, action: PayloadAction<string>) => {
      state.lines = [...state.lines, action.payload];
    },
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos = [...state.todos, action.payload];
    },
    clearHistory: (state) => {
      state.lines = [];
    },
  },
});

export const { addLine, addTodo, clearHistory } = terminalSlice.actions;

export default terminalSlice.reducer;
