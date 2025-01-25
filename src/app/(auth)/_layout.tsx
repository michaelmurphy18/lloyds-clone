import { Redirect, Stack } from "expo-router";

const Layout = () => {
  const authenticated = false;

  if (authenticated) {
    return <Redirect href="/(root)/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="open-account"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
