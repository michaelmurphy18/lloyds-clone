import { Header } from "@/components/headers";
import { Stack } from "expo-router";

export default function HomeLayout() {
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
              title="Hi, John Doe"
              {...props}
            />
          ),
        }}
      />
    </Stack>
  );
}
