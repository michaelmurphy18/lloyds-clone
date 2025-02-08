import { GetCurrentUser } from "@/api/users/me";
import { Header } from "@/components/headers";
import { UserQueryKey } from "@/libs/query-keys";
import { getGreetings } from "@/libs/utils";
import { useQuery } from "@tanstack/react-query";
import { Stack, useGlobalSearchParams } from "expo-router";

export default function HomeLayout() {
  const { data: fullName } = useQuery({
    queryKey: UserQueryKey.currentUser,
    queryFn: GetCurrentUser,
    select: (res) => res.fullName,
  });

  const glob = useGlobalSearchParams<{ id: string; name: string }>();

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          header: (props) => (
            <Header
              showMessage
              showSupport
              showUser
              title={`${getGreetings()}, ${fullName}`}
              {...props}
            />
          ),
        }}
      />

      <Stack.Screen
        name="account/[id]"
        options={{
          title: glob?.name,
          header: (props) => <Header {...props} showBack />,
        }}
      />

      <Stack.Screen
        name="transaction/[id]"
        options={{
          title: "Transaction Details",
          header: (props) => <Header showBack {...props} />,
        }}
      />
    </Stack>
  );
}
