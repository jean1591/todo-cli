"use client";

import { Action, Command } from "../lib/interfaces/command";
import { KeyboardEvent, useState } from "react";
import {
  getActionAndDetailsFromCommand,
  isActionAvailable,
} from "@/utils/commands";

import { PiCaretRightBold } from "react-icons/pi";
import { addCommandToHistory } from "../lib/store/features/commands/slice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const generateErrorCommand = (action: string): Command => ({
  action: "error" as Action,
  actionColour: "text-red-400",
  details: `unknown "${action}" command. Check available commands with help`,
  uuid: uuidv4(),
});

export const CommandLine = () => {
  const dispatch = useDispatch();
  const [command, setCommand] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (command.trim() !== "") {
        const formattedCommand = getActionAndDetailsFromCommand(command);
        dispatch(addCommandToHistory(formattedCommand));

        if (!isActionAvailable(formattedCommand.action)) {
          dispatch(
            addCommandToHistory(generateErrorCommand(formattedCommand.action))
          );
        }

        setCommand("");
      } else {
        console.log("Invalid input: Input cannot be empty");
      }
    }
  };

  return (
    <div className="mt-1 flex items-center justify-start gap-x-1">
      <PiCaretRightBold className="h-4 w-4 text-green-400" />
      <input
        autoFocus
        className="bg-zinc-900 text-zinc-100 outline-none"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        value={command}
      />
    </div>
  );
};
