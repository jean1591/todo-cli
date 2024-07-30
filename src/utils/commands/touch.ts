export const getTodoAddedLine = (todo: string): string => {
  return `<p className="ml-8 text-zinc-300"><span className="font-semibold">${todo}</span> was added to todo list</p>`;
};
