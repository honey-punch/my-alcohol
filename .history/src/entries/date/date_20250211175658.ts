export async function getDateList() {
  const res = await fetch("/api/date");

  return res;
}
