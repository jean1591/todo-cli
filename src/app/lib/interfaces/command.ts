export enum Action {
  ADD = "add",
  CD = "cd",
  ERROR = "error",
  HELP = "help",
  MKDIR = "mkdir",
  TERMINATE = "terminate",
}

export const actions = ["add", "cd", "help", "mkdir", "terminate"];

export interface Command {
  action: Action;
  actionColour: string;
  details: string;
  uuid: string;
}
