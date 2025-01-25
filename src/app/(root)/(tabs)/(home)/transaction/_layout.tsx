import { Header } from "@/components/headers";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Transaction Details",
          header: (props) => <Header showBack {...props} />,
        }}
      />
    </Stack>
  );
}
