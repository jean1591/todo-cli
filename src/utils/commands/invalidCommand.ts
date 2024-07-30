export const getInvalidCommandLine = (command: string): string => {
  return `<p className="text-pastel-red ml-8">${command} is not a valid command. Type <span className="font-semibold">help</span> for all commands</p>`;
};
