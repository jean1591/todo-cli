export const getTodos = (todos: string[]): string => {
  const stringifiedTodos = todos.reduce((acc, current, index) => {
    return acc + `<li className="ml-8">${current} (${index})</li>`;
  }, "");
  return `<ul>${stringifiedTodos}</ul>`;
};
