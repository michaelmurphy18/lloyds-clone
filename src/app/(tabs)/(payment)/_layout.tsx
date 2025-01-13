import { Header } from "@/components/headers";
import { Stack } from "expo-router";

export default function PaymentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Pay & Transfer",
          header: (props) => <Header showClose {...props} />,
        }}
      />
    </Stack>
  );
}
