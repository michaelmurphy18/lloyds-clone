import { View, Text, Pressable } from "react-native";
import React from "react";
import { CurrencyView } from "@/components";
import { Link } from "expo-router";

// Todo: click to see account details
const AccountSummaryCard = () => {
  return (
    <Link
      asChild
      href={{
        pathname: "/(tabs)/(home)/transactions/[id]",
        params: { id: "001" },
      }}
    >
      <Pressable className="bg-white p-5 rounded-xl flex-row justify-between items-center">
        <View>
          <Text className="font-semibold text-lg">Classic</Text>
          <Text className="text-sm font-light">00-00-00 / 00000000</Text>
        </View>

        <CurrencyView amount={100} />
      </Pressable>
    </Link>
  );
};

export default AccountSummaryCard;
