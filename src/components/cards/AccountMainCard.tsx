import { View, Text, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { CurrencyView } from "@/components";

const AccountMainCard = () => {
  return (
    <View className="bg-white rounded-xl overflow-hidden">
      <Link
        href={{
          pathname: "/(tabs)/(home)/transactions/[id]",
          params: { id: "001" },
        }}
        asChild
      >
        <Pressable className="p-4 flex-row justify-between active:bg-black/10">
          <View>
            <Text className="font-semibold ">Classic</Text>
            <Text className="text-sm font-light">00-00-00 / 00000000</Text>
            <CurrencyView amount={100} className="mt-2" />
          </View>
          <Feather name="more-horizontal" size={24} color="black" />
        </Pressable>
      </Link>
      <View className="flex-row rounded-b-xl overflow-hidden border-t border-gray-300">
        <Link href={"/(tabs)/(payment)"} asChild>
          <Pressable className="flex-1 py-4 items-center active:bg-gray-200">
            <Text>Pay & Transfer</Text>
          </Pressable>
        </Link>
        <View className="w-px bg-gray-300" />
        <Link href={"/"} asChild>
          <Pressable className="flex-1 py-4 items-center active:bg-gray-200">
            <Text>Regular payments</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default AccountMainCard;
