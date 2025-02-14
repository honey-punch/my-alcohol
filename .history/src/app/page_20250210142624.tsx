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

  return <div>{viewType === "summary" ? <Summary /> : <Calendar />}</div>;
}
