import { Text, View } from "react-native";
import React from "react";

export const Page = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="h-1 bg-green-700/50">
        <View className="h-1 w-2/5 bg-green-600" />
      </View>
      <Text>AccountPage</Text>
    </View>
  );
};
export default Page;
