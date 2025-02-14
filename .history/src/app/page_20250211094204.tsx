"use client";

import { useState } from "react";
import Summary from "./_component/Summary";
import Calendar from "./_component/Calendar";
import { FaPlus } from "react-icons/fa6";
import { Tooltip as ReactTooltip } from "react-tooltip";

type ViewType = "summary" | "calendar";

export default function Home() {
  // useState
  const [viewType, setViewType] = useState<ViewType>("summary");

  // functions
  function handleChangeViewType() {
    if (viewType === "summary") {
      setViewType("calendar");
    } else {
      setViewType("summary");
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center p-10 gap-20 relative">
      <div
        onClick={handleChangeViewType}
        className="flex rounded-full border group hover:border-black/30 transition-colors"
      >
        <button
          className={`${
            viewType === "summary" &&
            "bg-blue-500 text-white group-hover:bg-gray-400 group-hover:rounded-full"
          } rounded-s-full px-8 py-4 transition-[background-color,border-radius] `}
        >
          개요
        </button>
        <button
          className={`${
            viewType === "calendar" &&
            "bg-blue-500 text-white group-hover:bg-gray-400 group-hover:rounded-full"
          } rounded-e-full px-8 py-4 transition-[background-color,border-radius] `}
        >
          달력
        </button>
      </div>

      {viewType === "summary" ? <Summary /> : <Calendar />}

      <ReactTooltip id="my-tooltip"></ReactTooltip>
      <button
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Hello world!"
        data-tooltip-place="top"
        className="bottom-10 right-10 absolute shadow-md p-4 rounded-full bg-blue-500 text-white"
      >
        <FaPlus />
      </button>
    </div>
  );
}
