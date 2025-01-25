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
      <Pressable className="flex-row items-center justify-between rounded-xl bg-white p-5">
        <View>
          <Text className="text-lg font-semibold">Classic</Text>
          <Text className="text-sm font-light">00-00-00 / 00000000</Text>
        </View>

        <CurrencyView amount={100} />
      </Pressable>
    </Link>
  );
};

export default AccountSummaryCard;
