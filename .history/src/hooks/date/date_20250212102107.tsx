import { getDates } from "@/entries/date/date";
import { useQuery } from "@tanstack/react-query";

export function useDates() {
  const { data: dates, isPending: isLoadingDates } = useQuery<Date[]>({
    queryKey: ["date"],
    queryFn: () => getDates(),
    staleTime: 60 * 1_000,
    gcTime: 120 * 1_000,
  });

  return { dates, isLoadingDates };
}
