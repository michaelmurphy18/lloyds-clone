import { Header } from "@/components/headers";
import { Stack } from "expo-router";

export default function CardsLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Card management",
          header: (props) => <Header showSupport showUser {...props} />,
        }}
      />
      <Stack.Screen
        name="view-pin"
        initialParams={{ timeout: false }}
        options={{
          title: "View PIN",
          header: (props) => <Header showBack {...props} />,
        }}
      />
      <Stack.Screen
        name="card-details"
        options={{
          title: "Card details",
          header: (props) => <Header showBack {...props} />,
        }}
      />
    </Stack>
  );
}
