export const getTodoAddedLine = (todo: string): string => {
  return `<p className="ml-8 text-zinc-300"><span className="text-blue-400/70 font-semibold">${todo}</span> was added to todo list</p>`;
};
