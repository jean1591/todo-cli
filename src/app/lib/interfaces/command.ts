export enum Action {
  ERROR = "error",
  HELP = "help",
  TERMINATE = "terminate",
  TODO = "todo",
}

export const actions = ["todo", "help", "terminate"];

export interface Command {
  action: Action;
  actionColour: string;
  details: string;
  uuid: string;
}
