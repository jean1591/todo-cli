"use client";

import { KeyboardEvent, useState } from "react";
import {
  addCommandToHistory,
  addErrorToHistory,
} from "../lib/store/features/commands/slice";
import { addTodo, setTodos } from "../lib/store/features/todo/slice";

import { Action } from "../lib/interfaces/command";
import { PiCaretRightBold } from "react-icons/pi";
import { Todo } from "../lib/interfaces/todo";
import { getActionAndDetailsFromCommand } from "@/utils/commands";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const isCommandEmpty = (command: string) => command.trim() === "";

export const CommandLine = () => {
  const dispatch = useDispatch();
  const [command, setCommand] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!isCommandEmpty(command)) {
        const formattedCommand = getActionAndDetailsFromCommand(command);
        console.log("🚀:", formattedCommand);
        dispatch(addCommandToHistory(formattedCommand));

        const todos = JSON.parse(
          window.localStorage.getItem("todos") ?? ""
        ) as Todo[];

        switch (formattedCommand.action) {
          case Action.TODO:
            const todo: Todo = {
              createdAt: new Date().toISOString().slice(0, 10),
              id: uuidv4().slice(0, 8),
              title: formattedCommand.details,
            };

            window.localStorage.setItem(
              "todos",
              JSON.stringify([...todos, todo])
            );
            dispatch(addTodo(todo));

            setCommand("");
            return;
          case Action.TERMINATE:
            const updatedTodos = todos.filter(
              ({ id }) => id !== formattedCommand.details
            );

            window.localStorage.setItem("todos", JSON.stringify(updatedTodos));
            dispatch(setTodos(updatedTodos));

            setCommand("");
            return;
          default:
            dispatch(
              addErrorToHistory(`unknown "${formattedCommand.action}" command`)
            );
        }
      } else {
        console.log("Invalid input: Input cannot be empty");
      }
    }
  };

  return (
    <div className="flex items-center justify-start gap-x-1">
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
