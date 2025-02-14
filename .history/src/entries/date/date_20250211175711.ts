export async function getDateList() {
  const res = await fetch("/api/date");

  if (!res.ok) {
    throw new Error("Failed to fetch dates");
  }

  return res;
}
