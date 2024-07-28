"use client";

import { RootState } from "../lib/store/store";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export const Terminal = () => {
  const { lines } = useSelector((state: RootState) => state.terminal);

  return (
    <div className="mb-4">
      {lines.map((line, index) => (
        <div key={index} className="mb-1">
          {parse(line)}
        </div>
      ))}
    </div>
  );
};
