export async function getAlcoholDates() {
  const res = await fetch("/api/alcohol/date");

  if (!res.ok) {
    throw new Error("Failed to fetch dates");
  }

  const data = (await res.json()) as AlcoholDate[];

  const sortedData = data.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return sortedData;
}

export async function addAlcoholDate(body: AlcoholDate) {
  const res = await fetch("/api/alcohol/date", { method: "POST", body });
}
