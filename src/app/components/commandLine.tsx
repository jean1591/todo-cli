"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  addLine,
  addTodo,
  clearHistory,
} from "../lib/store/features/terminal/slice";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../lib/store/store";
import { classNames } from "@/utils";

const baseCommand = "visitor@jata.com: ~$";
const isCommandEmpty = (command: string) => command.trim() === "";

enum ActionEnum {
  CLEAR = "clear",
  HELP = "help",
  LS = "ls",
  RM = "rm",
  TOUCH = "touch",
  STATS = "stats",
}
const actionTypes = ["touch", "rm", "help", "clear", "ls", "stats"] as const;
type Action = (typeof actionTypes)[number];

export const getAction = (command: string): Action | null => {
  for (let action of actionTypes) {
    const regex = new RegExp(`^${action}`);
    if (regex.test(command)) {
      return action;
    }
  }

  return null;
};

export const CommandLine = () => {
  const { todos } = useSelector((state: RootState) => state.interactions);
  const dispatch = useDispatch();

  const [command, setCommand] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNewLine = (command: string): string => {
    switch (getAction(command)) {
      case ActionEnum.CLEAR:
        dispatch(clearHistory());
        return "";

      case ActionEnum.LS:
        const stringifiedTodos = todos.reduce((acc, current, index) => {
          return (
            acc +
            `<li className="ml-8 text-blue-400">${index + 1}. ${current}</li>`
          );
        }, "");

        return `<ul>${stringifiedTodos}</ul>`;

      case ActionEnum.TOUCH:
        const todo = command.split("touch")[1].trim();
        dispatch(addTodo(todo));

        return `<p className="ml-8 text-blue-400"><span className="font-semibold">${todo}</span> was added to todo list</p>`;
      case ActionEnum.STATS:
        return '<p className="ml-8">Display stats</p>';
      default:
        return `<p className="text-red-300 ml-8"><span className="font-semibold">${command}</span> is not a valid command. Type <span className="font-semibold">help</span> for all commands</p>`;
    }
  };

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    focusInput();

    document.addEventListener("click", focusInput);

    return () => {
      document.removeEventListener("click", focusInput);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!isCommandEmpty(command)) {
        const [action, rest] = command.split(" ");

        setCommand("");
        dispatch(
          addLine(
            `<p className="text-green-300 mt-4">${baseCommand} ${action} ${
              rest ?? ""
            }</p>`
          )
        );
        dispatch(addLine(handleNewLine(command)));
      } else {
        console.log("Invalid input: Input cannot be empty");
      }
    }
  };

  return (
    <div className="flex gap-x-1">
      <p className="text-nowrap">{baseCommand}</p>
      <input
        className={classNames(
          getAction(command) ? "text-green-400" : "text-red-400 font-semibold",
          "bg-zinc-900  outline-none w-full"
        )}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        type="text"
        value={command}
      />
    </div>
  );
};
