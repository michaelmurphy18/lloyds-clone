import { GetCurrentUser } from "@/api/users/me";
import { UserQueryKey } from "@/libs/query-keys";
import { useQuery } from "@tanstack/react-query";

export type UseUserQueryOptions = {
  enabled?: boolean;
};

const useUserQuery = (options?: UseUserQueryOptions) => {
  const userQuery = useQuery({
    queryKey: UserQueryKey.currentUser,
    queryFn: GetCurrentUser,
    ...options,
  });

  const { data: user, ...rest } = userQuery;

  return {
    user,
    ...rest,
  };
};

export default useUserQuery;
