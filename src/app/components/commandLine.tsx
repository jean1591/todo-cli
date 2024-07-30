"use client";

import { ActionEnum, getAction } from "@/utils/commands/action";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  addHistory,
  addLine,
  addTodo,
  clearTerminal,
  decrementHistoryIndex,
  deleteTodoByIndex,
  incrementHistoryIndex,
} from "../lib/store/features/terminal/slice";
import {
  getHelpLines,
  getInvalidCommandLine,
  getStatsLines,
  getTodoAddedLine,
  getTodos,
} from "@/utils";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../lib/store/store";
import { classNames } from "@/utils";

const baseCommand = "visitor@jata.com: ~$";
const isCommandEmpty = (command: string) => command.trim() === "";

export const CommandLine = () => {
  const { history, historyIndex, stats, todos } = useSelector(
    (state: RootState) => state.terminal
  );
  const dispatch = useDispatch();

  const [command, setCommand] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNewLine = (command: string): string => {
    switch (getAction(command)) {
      case ActionEnum.CLEAR:
        dispatch(clearTerminal());
        return "";

      case ActionEnum.HELP:
        return getHelpLines();

      case ActionEnum.LS:
        return getTodos(todos);

      case ActionEnum.TOUCH:
        const todo = command.split("touch")[1].trim();
        dispatch(addTodo(todo));
        return getTodoAddedLine(todo);

      case ActionEnum.RM:
        const index = parseInt(command.split("rm")[1].trim(), 10);
        dispatch(deleteTodoByIndex(index));
        return "";

      case ActionEnum.STATS:
        return getStatsLines(stats);

      default:
        return getInvalidCommandLine(command);
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
        const [action, ...rest] = command.split(" ");

        dispatch(
          addLine(
            `<p className="mt-4">${baseCommand} ${action} ${rest ?? ""}</p>`
          )
        );
        dispatch(addLine(handleNewLine(command)));
        dispatch(addHistory(command));
        setCommand("");
      }
    } else if (event.key === "ArrowUp" && historyIndex > 0) {
      dispatch(decrementHistoryIndex());
      setCommand(history[historyIndex]);
    } else if (event.key === "ArrowDown" && historyIndex < history.length - 1) {
      dispatch(incrementHistoryIndex());
      setCommand(history[historyIndex]);
    } else if (
      event.key === "ArrowDown" &&
      historyIndex === history.length - 1
    ) {
      setCommand("");
    }
  };

  return (
    <div className="flex gap-x-1 mt-4">
      <p className="text-nowrap">{baseCommand}</p>
      <input
        className="bg-zinc-900 outline-none w-full"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        type="text"
        value={command}
      />
    </div>
  );
};
