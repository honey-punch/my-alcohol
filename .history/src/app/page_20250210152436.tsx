"use client";

import { useState } from "react";
import Summary from "./_component/Summary";
import Calendar from "./_component/Calendar";

type ViewType = "summary" | "calendar";

export default function Home() {
  // TODO - DB에서 받아온 술마신 날들 중 가장 마지막 날
  const lastDay = new Date("2025-02-08T22:00:00");

  const today = new Date();

  // useState
  const [viewType, setViewType] = useState<ViewType>("summary");
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  // functions
  function handleChangeViewType() {
    if (viewType === "summary") {
      setViewType("calendar");
    } else {
      setViewType("summary");
    }
  }

  function getTimeDiff() {
    const diffMs = Math.abs(today.getTime() - lastDay.getTime());
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}시간 ${minutes}분`;
  }

  function getDayDiff() {
    const diffMs = Math.abs(today.getTime() - lastDay.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return `${days}일 `;
  }

  console.log(getTimeDiff());
  console.log(getDayDiff());

  return (
    <div className="w-full flex flex-col items-center p-10 gap-10">
      <div onClick={handleChangeViewType} className="flex">
        <button
          className={`${
            viewType === "summary"
              ? "bg-black text-white font-black"
              : "hover:bg-black/20"
          } rounded-s-full border px-8 py-4 transition-colors`}
        >
          개요
        </button>
        <button
          className={`${
            viewType === "calendar"
              ? "bg-black text-white font-black"
              : "hover:bg-black/20"
          } rounded-e-full border px-8 py-4 transition-colors`}
        >
          달력
        </button>
      </div>
      {viewType === "summary" ? <Summary today={today} /> : <Calendar />}
    </div>
  );
}
