import { Header } from "@/components/headers";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Your logon details",
          headerShown: true,
          header: (props) => <Header textCenter {...props} showBack />,
        }}
      />
      <Stack.Screen
        name="password"
        options={{
          title: "About you",
          header: (props) => <Header textCenter {...props} showBack />,
        }}
      />
      <Stack.Screen
        name="userid"
        options={{
          title: "Find out your User ID",
          header: (props) => <Header textCenter {...props} showBack />,
        }}
      />
    </Stack>
  );
}
