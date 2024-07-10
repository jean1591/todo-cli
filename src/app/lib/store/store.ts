import commandsReducer from "./features/commands/slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    commands: commandsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
