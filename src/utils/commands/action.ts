export enum ActionEnum {
  CLEAR = "clear",
  HELP = "help",
  LS = "ls",
  RM = "rm",
  TOUCH = "touch",
  STATS = "stats",
}
const actionTypes = ["touch", "rm", "help", "clear", "ls", "stats"] as const;
type Action = (typeof actionTypes)[number];

export const getAction = (command: string): Action | null => {
  for (let action of actionTypes) {
    const regex = new RegExp(`^${action}`);
    if (regex.test(command)) {
      return action;
    }
  }

  return null;
};
