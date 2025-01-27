import { GetCurrentUser } from "@/api/users/me";
import { Header } from "@/components/headers";
import { getGreetings } from "@/libs/utils";
import { useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function HomeLayout() {
  const { data } = useQuery({
    queryKey: ["current-user"],
    queryFn: GetCurrentUser,
    select: (data) => data.fullName,
  });

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
              title={`${getGreetings()}, ${data}`}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="transaction"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
