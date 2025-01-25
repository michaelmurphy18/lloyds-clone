import { Header } from "@/components/headers";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Let's get you logged in",
          header: (props) => <Header textCenter {...props} showBack showCall />,
        }}
      />
      <Stack.Screen
        name="form"
        options={{
          header: (props) => <Header textCenter {...props} showBack showCall />,
          title: "Log on",
        }}
      />
    </Stack>
  );
}
