import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialLines = [
  '<p className="mt-4">visitor@jata.com: ~$ touch call frank</p>',
  '<p className="ml-8 text-zinc-300"><span className="font-semibold">call frank</span> was added to todo list</p>',
  '<p className="mt-4">visitor@jata.com: ~$ touch see camille</p>',
  '<p className="ml-8 text-zinc-300"><span className="font-semibold">see camille</span> was added to todo list</p>',
];

export interface Stats {
  currentTodoCount: number;
  totalTodoCount: number;
  terminatedTodos: number;
}

export interface TerminalSlice {
  history: string[];
  historyIndex: number;
  lines: string[];
  stats: Stats;
  todos: string[];
}

const initialState: TerminalSlice = {
  history: [
    "touch call frank",
    "touch see camille",
    "touch call max",
    "touch see pierre",
  ],
  historyIndex: 3, // init at history.length - 1
  lines: initialLines,
  stats: {
    currentTodoCount: 4,
    totalTodoCount: 4,
    terminatedTodos: 0,
  },
  todos: ["call frank", "see camille", "touch call max", "touch see pierre"],
};

export const terminalSlice = createSlice({
  name: "terminalSlice",
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<string>) => {
      state.history = [...state.history, action.payload];
      state.historyIndex = state.history.length - 1;
    },
    incrementHistoryIndex: (state) => {
      state.historyIndex = state.historyIndex + 1;
    },
    decrementHistoryIndex: (state) => {
      state.historyIndex = state.historyIndex - 1;
    },
    addLine: (state, action: PayloadAction<string>) => {
      state.lines = [...state.lines, action.payload];
    },
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos = [...state.todos, action.payload];

      // Stats
      state.stats.currentTodoCount = state.todos.length;
      state.stats.totalTodoCount += 1;
    },
    clearTerminal: (state) => {
      state.lines = [];
    },
    deleteTodoByIndex: (state, action: PayloadAction<number>) => {
      const updatedTodos = [...state.todos];
      updatedTodos.splice(action.payload, 1);
      state.todos = updatedTodos;

      // Stats
      state.stats.currentTodoCount = state.todos.length;
      state.stats.terminatedTodos += 1;
    },
  },
});

export const {
  addHistory,
  incrementHistoryIndex,
  decrementHistoryIndex,
  addLine,
  addTodo,
  clearTerminal,
  deleteTodoByIndex,
} = terminalSlice.actions;

export default terminalSlice.reducer;
