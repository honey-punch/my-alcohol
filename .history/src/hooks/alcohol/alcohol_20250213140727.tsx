import { addAlcoholDate, getAlcoholDates } from "@/entries/alcohol/alcohol";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAlcoholDates() {
  const { data, isPending } = useQuery<AlcoholDate[]>({
    queryKey: ["alcohol", "date"],
    queryFn: () => getAlcoholDates(),
    staleTime: 60 * 1_000,
    gcTime: 120 * 1_000,
  });

  return { alcoholDates: data, isLoadingAlcoholDates: isPending };
}

export function useAddAlcoholDate() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["alcohol", "date"],
    mutationFn: (body: AlcoholDate) => addAlcoholDate(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alcohol", "date"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { addAlcoholDate: mutate, isLoadingAddAlcoholDate: isPending };
}

export function useDeleteAlcoholDate() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["alcohol", "date"],
    mutationFn: (id: string) => addAlcoholDate(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alcohol", "date"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { addAlcoholDate: mutate, isLoadingAddAlcoholDate: isPending };
}
