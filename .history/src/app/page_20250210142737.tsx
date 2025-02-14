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
    <div>
      <div className="flex">
        <div>개요</div>
        <div>달력</div>
      </div>
      {viewType === "summary" ? <Summary /> : <Calendar />}
    </div>
  );
}
