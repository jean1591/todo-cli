import { Action, Command } from "@/app/lib/interfaces/command";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialHistoryCommands: Command[] = [
  {
    action: Action.TODO,
    actionColour: "text-green-400",
    details: "call bob",
    uuid: uuidv4(),
  },
  {
    action: Action.TODO,
    actionColour: "text-green-400",
    details: "go to dentist",
    uuid: uuidv4(),
  },
  {
    action: Action.HELP,
    actionColour: "text-green-400",
    details: "",
    uuid: uuidv4(),
  },
  {
    action: Action.TERMINATE,
    actionColour: "text-green-400",
    details: "0f58e62e",
    uuid: uuidv4(),
  },
  {
    action: Action.TODO,
    actionColour: "text-green-400",
    details: "email frank about contract signature",
    uuid: uuidv4(),
  },
];

export interface CommandsSlice {
  history: Command[];
}

const initialState: CommandsSlice = {
  history: initialHistoryCommands,
};

export const commandsSlice = createSlice({
  name: "commandsSlice",
  initialState,
  reducers: {
    addCommandToHistory: (state, action: PayloadAction<Command>) => {
      state.history = [...state.history, action.payload];
    },
    addErrorToHistory: (state, action: PayloadAction<string>) => {
      const error: Command = {
        action: "error" as Action,
        actionColour: "text-red-400",
        details: `${action.payload}. Check available commands with help`,
        uuid: uuidv4(),
      };
      state.history = [...state.history, error];
    },
  },
});

export const { addCommandToHistory, addErrorToHistory } = commandsSlice.actions;

export default commandsSlice.reducer;
