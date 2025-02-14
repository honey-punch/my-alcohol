export async function getDates() {
  const res = await fetch("/api/date");

  if (!res.ok) {
    throw new Error("Failed to fetch dates");
  }

  const data = (await res.json()) as Date[];

  return data;
}
