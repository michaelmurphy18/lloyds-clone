import { GetAccount } from "@/api/account/main";
import { AccountQueryKey } from "@/libs/query-keys";
import { useQuery } from "@tanstack/react-query";

const useAccountQuery = (id: string) => {
  const query = useQuery({
    queryKey: AccountQueryKey.userAccount(id),
    queryFn: () => GetAccount(id),
    staleTime: 0,
    gcTime: 0,
  });

  return query;
};
export default useAccountQuery;
