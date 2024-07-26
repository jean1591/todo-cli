import { configureStore } from "@reduxjs/toolkit";
import terminalReducer from "./features/terminal/slice";

export const store = configureStore({
  reducer: {
    interactions: terminalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
