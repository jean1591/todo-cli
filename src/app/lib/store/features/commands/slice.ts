import { Action, Command } from "@/app/lib/interfaces/command";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialHistoryCommands: Command[] = [
  {
    action: Action.ADD,
    actionColour: "text-green-400",
    details: "call bob",
    uuid: uuidv4(),
  },
  {
    action: Action.ADD,
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
    details: "1ef6",
    uuid: uuidv4(),
  },
  {
    action: Action.MKDIR,
    actionColour: "text-green-400",
    details: "work",
    uuid: uuidv4(),
  },
  {
    action: Action.CD,
    actionColour: "text-green-400",
    details: "work",
    uuid: uuidv4(),
  },
  {
    action: Action.ADD,
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
  },
});

export const { addCommandToHistory } = commandsSlice.actions;

export default commandsSlice.reducer;
