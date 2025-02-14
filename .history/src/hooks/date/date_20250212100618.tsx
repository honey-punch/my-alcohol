import { useQuery } from "@tanstack/react-query";

export function useDates() {
  const { data: userList, isPending: isLoadingUserList } = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: () => getUser(),
    staleTime: 60 * 1_000,
    gcTime: 120 * 1_000,
  });

  return { userList, isLoadingUserList };
}
