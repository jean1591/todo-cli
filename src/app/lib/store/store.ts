import commandsReducer from "./features/commands/slice";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/slice";

export const store = configureStore({
  reducer: {
    commands: commandsReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
