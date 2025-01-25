import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/headers";

const SupportScreen = () => {
  return (
    <View>
      <Stack.Screen
        name="support"
        options={{
          title: "Support",
          header: (props) => <Header showBack showUser {...props} />,
        }}
      />
      <Text>SupportScreen</Text>
    </View>
  );
};

export default SupportScreen;
