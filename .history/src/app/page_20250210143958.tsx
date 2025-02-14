"use client";

import { useState } from "react";
import Summary from "./_component/Summary";
import Calendar from "./_component/Calendar";

type ViewType = "summary" | "calendar";

export default function Home() {
  const today = new Date();
  console.log(today);

  const [viewType, setViewType] = useState<ViewType>("summary");
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  function handleChangeViewType() {
    if (viewType === "summary") {
      setViewType("calendar");
    } else {
      setViewType("summary");
    }
  }

  return (
    <div className="w-full flex flex-col items-center p-10 gap-10">
      <div onClick={handleChangeViewType} className="flex">
        <button
          className={`${
            viewType === "summary"
              ? "bg-black text-white font-bold"
              : "hover:bg-black/20"
          } rounded-s-full border px-8 py-4 transition-colors`}
        >
          개요
        </button>
        <button
          className={`${
            viewType === "calendar"
              ? "bg-black text-white font-bold"
              : "hover:bg-black/20"
          } rounded-e-full border px-8 py-4 transition-colors`}
        >
          달력
        </button>
      </div>
      {viewType === "summary" ? <Summary /> : <Calendar />}
    </div>
  );
}
