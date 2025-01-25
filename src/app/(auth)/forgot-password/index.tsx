import { Button } from "@/components/ui";
import { cn } from "@/libs/utils";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 bg-white">
      <Text className="py-10 text-center text-xl font-semibold">
        What would you like to do?
      </Text>

      <View>
        <Link href={"/forgot-password/userid"} asChild>
          <Pressable className="flex-row items-center justify-between gap-x-3 border-y border-y-gray-300 p-4">
            <Text className="">Find out your User ID</Text>

            <FontAwesome name="angle-right" size={24} color="#00000060" />
          </Pressable>
        </Link>
        <Link href={"/forgot-password/password"} asChild>
          <Pressable className="flex-row items-center justify-between gap-x-3 border-b border-b-gray-300 p-4">
            <Text className="">Change your password</Text>

            <FontAwesome name="angle-right" size={24} color="#00000060" />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
