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
      <div onClick={handleChangeViewType} className="flex">
        <button
          className={`${
            viewType === "summary" && "bg-blue-500 text-white font-black"
          } rounded-s-full border-l border-y px-8 py-4 transition-colors hover:bg-blue-600 hover:text-white`}
        >
          개요
        </button>
        <button
          className={`${
            viewType === "calendar" && "bg-blue-500 text-white font-black"
          } rounded-e-full border-r border-y px-8 py-4 transition-colors hover:bg-blue-600 hover:text-white`}
        >
          달력
        </button>
      </div>
      {viewType === "summary" ? <Summary /> : <Calendar />}

      <button></button>
    </div>
  );
}
