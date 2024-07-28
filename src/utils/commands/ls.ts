export const getTodos = (todos: string[]): string => {
  const stringifiedTodos = todos.reduce((acc, current, index) => {
    return acc + `<li className="ml-8">${index}. ${current}</li>`;
  }, "");
  return `<ul>${stringifiedTodos}</ul>`;
};
