import { GetAllAccount } from "@/api/account/main";
import { AccountQueryKey } from "@/libs/query-keys";
import { useQuery } from "@tanstack/react-query";
import useUserQuery from "./useUserQuery";

type Options = {
  id?: string;
  user?: { enabled?: boolean };
  accounts?: { enabled?: boolean };
};

const useAccountsQuery = ({
  id,
  user: userOptions,
  accounts: accountsOptions,
}: Options = {}) => {
  const userQuery = useUserQuery({
    enabled: !id && userOptions?.enabled,
  });

  const userId = id || userQuery.user?.id;

  const accountsQuery = useQuery({
    queryKey: AccountQueryKey.userAccounts(userId!),
    queryFn: GetAllAccount,
    enabled: !!userId && accountsOptions && accountsOptions.enabled,
    ...accountsOptions,
  });

  const { data: accounts, ...rest } = accountsQuery;

  return {
    userQuery,
    accountsQuery: {
      accounts,
      ...rest,
    },
  };
};

export default useAccountsQuery;
