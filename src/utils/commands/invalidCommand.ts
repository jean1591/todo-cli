export const getInvalidCommandLine = (command: string): string => {
  return `<p className="text-red-400/70 ml-8"><span className="font-semibold">${command}</span> is not a valid command. Type <span className="font-semibold">help</span> for all commands</p>`;
};
