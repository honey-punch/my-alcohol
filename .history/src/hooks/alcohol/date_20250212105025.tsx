import { getDates } from "@/entries/alcohol/alcohol";
import { useQuery } from "@tanstack/react-query";

export function useDates() {
  const { data: dates, isPending: isLoadingDates } = useQuery<AlcoholDate[]>({
    queryKey: ["date"],
    queryFn: () => getDates(),
    staleTime: 60 * 1_000,
    gcTime: 120 * 1_000,
  });

  return { dates, isLoadingDates };
}
