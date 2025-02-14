export async function getDates() {
  const res = await fetch("/api/alcohol/date");

  if (!res.ok) {
    throw new Error("Failed to fetch dates");
  }

  const data = (await res.json()) as AlcoholDate[];

  return data;
}
