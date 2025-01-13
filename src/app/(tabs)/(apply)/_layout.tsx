import { Header } from "@/components/headers";
import { Stack } from "expo-router";

export default function ApplyLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Apply" }} />
    </Stack>
  );
}
