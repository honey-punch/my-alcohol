"use client";

import { useState } from "react";

type ViewType = "summary" | "calendar";

export default function Home() {
  const [viewType, setViewType] = useState<ViewType>("summary");
  return <div></div>;
}
