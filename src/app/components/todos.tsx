"use client";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../lib/store/store";
import { Todo } from "../lib/interfaces/todo";
import { setTodos } from "../lib/store/features/todo/slice";
import { useEffect } from "react";

export const Todos = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    const localStorageTodos = JSON.parse(
      window.localStorage.getItem("todos") ?? "[]"
    ) as Todo[];

    dispatch(setTodos(localStorageTodos));
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <TodoComponent key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

const TodoComponent = ({ todo }: { todo: Todo }) => {
  const { id, title } = todo;

  return (
    <div className="mt-2 flex items-center justify-between">
      <p>{title}</p>
      <p className="text-xs">{id}</p>
    </div>
  );
};
