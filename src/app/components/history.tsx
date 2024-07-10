"use client";

import { PiCaretRightBold } from "react-icons/pi";
import { RootState } from "../lib/store/store";
import { classNames } from "@/utils";
import { useSelector } from "react-redux";

export const History = () => {
  const { history } = useSelector((state: RootState) => state.commands);

  return (
    <div>
      {history.map(({ action, actionColour, details, uuid }) => (
        <div
          key={uuid}
          className="mt-1 flex items-center justify-start gap-x-1"
        >
          <PiCaretRightBold className="h-4 w-4 text-green-400" />
          <p className={classNames(actionColour, "font-medium")}>{action}</p>
          <p>{details}</p>
        </div>
      ))}
    </div>
  );
};
