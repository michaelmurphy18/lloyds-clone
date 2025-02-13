import { Header } from "@/components/headers";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => (
          <Header
            {...props}
            useSafeArea={false}
            showBack
            showClose
            dismissTo="/(root)/(tabs)/(home)/(tabs)"
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Pay & Transfer",
          header: (props) => (
            <Header useSafeArea={false} {...props} showClose />
          ),
        }}
      />
      <Stack.Screen
        name="add-payee"
        options={{
          title: "Pay someone new",
        }}
      />
      <Stack.Screen
        name="select-account"
        options={{
          title: "Send money from",
        }}
      />
      <Stack.Screen
        name="select-payee"
        options={{
          title: "Send money to",
        }}
      />
      <Stack.Screen name="new-payee" options={{ title: "New payee details" }} />
      <Stack.Screen
        name="payment-details"
        options={{
          title: "Add payment details",

          header: (props) => (
            <Header
              useSafeArea={false}
              showClose
              dismissTo="/(root)/(tabs)/(home)/(tabs)"
              {...props}
            />
          ),
        }}
      />
    </Stack>
  );
}
