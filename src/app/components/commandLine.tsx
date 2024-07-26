"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  Stats,
  addLine,
  addTodo,
  clearHistory,
  deleteTodoByIndex,
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

const getAction = (command: string): Action | null => {
  for (let action of actionTypes) {
    const regex = new RegExp(`^${action}`);
    if (regex.test(command)) {
      return action;
    }
  }

  return null;
};

const help = `<div className="ml-8 space-y-1">
<div className="grid grid-cols-6 gap-x-8">
<p className="text-green-400 font-semibold">clear</p>
<p className="col-span-5">Clear terminal</p>
</div>
<div className="grid grid-cols-6 gap-x-8">
<p className="text-green-400 font-semibold">help</p>
<p className="col-span-5">Display available commands</p>
</div>
<div className="grid grid-cols-6 gap-x-8">
<p className="text-green-400 font-semibold">ls</p>
<p className="col-span-5">Display todos</p>
</div>
<div className="grid grid-cols-6 gap-x-8">
<p className="text-green-400 font-semibold">rm</p>
<p className="col-span-5">Delete a todo, "rm 2" delete the second todo</p>
</div>
<div className="grid grid-cols-6 gap-x-8">
<p className="text-green-400 font-semibold">stats</p>
<p className="col-span-5">Display user stats</p>
</div>
<div className="grid grid-cols-6 gap-x-8">
<p className="text-green-400 font-semibold">touch</p>
<p className="col-span-5">Create a new todo, "touch my new task" for example</p>
</div>
</div>`;

const statsGenerator = (stats: Stats) => {
  return `
    <div className="ml-8 p-4 border-[1px] border-zinx-100 w-1/3">
    <div className="flex items-center justify-between">
    <p>Total todos</p>
    <p>${stats.totalTodoCount}</p>
    </div>
    <div className="flex items-center justify-between">
    <p>Active todos</p>
    <p>${stats.currentTodoCount}</p>
    </div>
    <div className="flex items-center justify-between">
    <p>Terminated todos</p>
    <p>${stats.terminatedTodos}</p>
    </div>
    </div>
    `;
};

export const CommandLine = () => {
  const { stats, todos } = useSelector(
    (state: RootState) => state.interactions
  );
  const dispatch = useDispatch();

  const [command, setCommand] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNewLine = (command: string): string => {
    switch (getAction(command)) {
      case ActionEnum.CLEAR:
        dispatch(clearHistory());
        return "";
      case ActionEnum.HELP:
        return help;
      case ActionEnum.LS:
        const stringifiedTodos = todos.reduce((acc, current, index) => {
          return acc + `<li className="ml-8">${index}. ${current}</li>`;
        }, "");

        return `<ul>${stringifiedTodos}</ul>`;
      case ActionEnum.TOUCH:
        const todo = command.split("touch")[1].trim();
        dispatch(addTodo(todo));

        return `<p className="ml-8 text-zinc-100"><span className="text-blue-400 font-semibold">${todo}</span> was added to todo list</p>`;
      case ActionEnum.RM:
        const index = parseInt(command.split("rm")[1].trim(), 10);
        dispatch(deleteTodoByIndex(index));
        return "";
      case ActionEnum.STATS:
        return statsGenerator(stats);
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

        const classname = classNames(
          "mt-4",
          getAction(command) ? "text-green-300" : "text-red-300 font-semibold"
        );

        dispatch(
          addLine(
            `<p className="${classname}">${baseCommand} ${action} ${
              rest ?? ""
            }</p>`
          )
        );
        dispatch(addLine(handleNewLine(command)));
        setCommand("");
      }
    }
  };

  return (
    <div className="flex gap-x-1 mt-4">
      <p className="text-nowrap">{baseCommand}</p>
      <input
        className={classNames(
          getAction(command) || command === ""
            ? "text-green-400"
            : "text-red-400 font-semibold",
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
