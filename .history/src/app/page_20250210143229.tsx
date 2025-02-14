"use client";

import { useState } from "react";
import Summary from "./_component/Summary";
import Calendar from "./_component/Calendar";

type ViewType = "summary" | "calendar";

export default function Home() {
  const [viewType, setViewType] = useState<ViewType>("summary");

  function handleChangeViewType() {
    if (viewType === "summary") {
      setViewType("calendar");
    } else {
      setViewType("summary");
    }
  }

  return (
    <div className="w-full flex flex-col items-center p-10">
      <div className="flex">
        <button
          className={`${
            viewType === "summary" && "bg-black text-white font-bold"
          } rounded-s-full border px-8 py-4`}
        >
          개요
        </button>
        <div className={`rounded-e-full border px-8 py-4`}>달력</div>
      </div>
      {viewType === "summary" ? <Summary /> : <Calendar />}
    </div>
  );
}
