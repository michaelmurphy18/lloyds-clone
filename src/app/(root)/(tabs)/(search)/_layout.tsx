import { Header } from "@/components/headers";
import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Search",
          header: (props) => <Header showClose {...props} />,
        }}
      />
    </Stack>
  );
}
