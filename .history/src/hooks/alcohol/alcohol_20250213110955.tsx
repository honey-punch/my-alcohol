import { getAlcoholDates } from "@/entries/alcohol/alcohol";
import { useQuery } from "@tanstack/react-query";

export function useAlcoholDates() {
  const { data: alcoholDates, isPending: isLoadingAlcoholDates } = useQuery<
    AlcoholDate[]
  >({
    queryKey: ["alcohol", "date"],
    queryFn: () => getAlcoholDates(),
    staleTime: 60 * 1_000,
    gcTime: 120 * 1_000,
  });

  return { alcoholDates, isLoadingAlcoholDates };
}

export function useAddlcoholDates