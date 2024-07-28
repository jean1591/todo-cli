export const getTodoAddedLine = (todo: string): string => {
  return `<p className="ml-8 text-zinc-100"><span className="text-blue-400 font-semibold">${todo}</span> was added to todo list</p>`;
};
