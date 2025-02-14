"use client";

import { useState } from "react";
import Summary from "./_component/Summary";
import Calendar from "./_component/Calendar";

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
    <div className="w-full flex flex-col items-center p-10 gap-20 relative">
      <div onClick={handleChangeViewType} className="flex rounded-full">
        <button
          className={`${
            viewType === "summary" && "bg-blue-500 text-white"
          } rounded-s-full border-l border-y px-8 py-4 transition-colors hover:bg-gray-200 `}
        >
          개요
        </button>
        <button
          className={`${
            viewType === "calendar" && "bg-blue-500 text-white"
          } rounded-e-full border-r border-y px-8 py-4 transition-colors hover:bg-gray-200`}
        >
          달력
        </button>
      </div>
      {viewType === "summary" ? <Summary /> : <Calendar />}

      <button></button>
    </div>
  );
}
