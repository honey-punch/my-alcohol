"use client";

import { useState } from "react";
import Summary from "./_component/Summary";
import Calendar from "./_component/Calendar";

type ViewType = "summary" | "calendar";

export default function Home() {
  const [viewType, setViewType] = useState<ViewType>("summary");

  function handleChangeViewType() {
    viewType === "summary" ? setViewType("calendar") : setViewType("summary");
  }

  return <div>{viewType === "summary" ? <Summary /> : <Calendar />}</div>;
}
