import { Header } from "@/components/headers";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        title: "Your profile",
        header: (props) => <Header {...props} showBack showCall textCenter />,
      }}
    />
  );
}
