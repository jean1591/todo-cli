import { Action, Command } from "@/app/lib/interfaces/command";

import { v4 as uuidv4 } from "uuid";

const successColour = "text-green-400";

export const getActionAndDetailsFromCommand = (rawCommand: string): Command => {
  const action = rawCommand.split(" ")[0] as Action;
  const details = rawCommand.split(" ").slice(1).join(" ");

  return {
    action,
    actionColour: successColour,
    details,
    uuid: uuidv4(),
  };
};
