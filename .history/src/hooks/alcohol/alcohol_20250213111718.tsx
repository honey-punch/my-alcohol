import { addAlcoholDate, getAlcoholDates } from "@/entries/alcohol/alcohol";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAlcoholDates() {
  const { : alcoholDates, isPending: isLoadingAlcoholDates } = useQuery<
    AlcoholDate[]
  >({
    queryKey: ["alcohol", "date"],
    queryFn: () => getAlcoholDates(),
    staleTime: 60 * 1_000,
    gcTime: 120 * 1_000,
  });

  return { alcoholDates:data, isLoadingAlcoholDates };
}

export function useAddlcoholDates() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["alcohol", "date"],
    mutationFn: (body: AlcoholDate) => addAlcoholDate(body),
    onSuccess: () => {},
    onError: (err) => {
      console.error(err);
    },
  });

  return { addAlcoholDate: mutate, isLoadingAddAlcoholDate: isPending };
}
