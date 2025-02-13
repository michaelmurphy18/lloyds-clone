import { Button } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const { bottom } = useSafeAreaInsets();

  const [checked, setChecked] = useState(false);

  return (
    <View
      className="flex-1 gap-y-5 bg-white px-4 py-10"
      style={{ paddingBottom: bottom }}
    >
      <View className="flex-row items-center gap-x-3 rounded-xl border px-3">
        <Text>Payee name:</Text>
        <TextInput
          className="flex-1 py-4"
          placeholderTextColor="#838383"
          placeholder="Name of the person or company"
        />
      </View>
      <View className="flex-row items-center gap-x-3 rounded-xl border px-3">
        <Text>Sort code:</Text>
        <TextInput
          className="flex-1 py-4"
          placeholderTextColor="#838383"
          placeholder="Enter sort code"
        />
      </View>
      <View className="flex-row items-center gap-x-3 rounded-xl border px-3">
        <Text>Account number:</Text>
        <TextInput
          className="flex-1 py-4"
          placeholderTextColor="#838383"
          placeholder="Enter account number"
        />
      </View>
      <View className="flex-row items-center gap-x-3">
        <Checkbox
          style={{ borderRadius: 5, width: 25, height: 25 }}
          color={"#000"}
          value={checked}
          onValueChange={setChecked}
        />
        <Text className="">Is this a business?</Text>
      </View>
      <View className="flex-row items-center gap-x-3 rounded-xl bg-[#F2F2F2] px-3 py-4">
        <Ionicons name="shield-outline" size={24} color="black" />
        <Text className="text-sm">
          We'll check these details with the payee's bank.
        </Text>
      </View>
      <View className="flex-1" />
      <Button label="Continue" size="lg" />
    </View>
  );
}
