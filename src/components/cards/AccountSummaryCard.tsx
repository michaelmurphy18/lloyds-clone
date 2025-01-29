import { View, Text, Pressable } from "react-native";
import React from "react";
import { CurrencyView } from "@/components";
import { Link } from "expo-router";
import { sortCodeFormatter } from "@/libs/utils";

// Todo: click to see account details

type AccountSummaryCardProps = {
  id: string;
  accountType: string;
  balance: number;
  sortCode: string;
  accountNumber: string;
};
const AccountSummaryCard = ({
  id,
  accountType,
  balance,
  sortCode,
  accountNumber,
}: AccountSummaryCardProps) => {
  const sortCodeFormatted = sortCodeFormatter(sortCode);

  return (
    <Link
      asChild
      href={{
        pathname: "/account/[id]",
        params: { id },
      }}
    >
      <Pressable className="flex-row items-center justify-between rounded-xl bg-white p-5">
        <View>
          <Text className="text-lg font-semibold">Classic</Text>
          <Text className="text-sm font-light">{`${sortCodeFormatted} / ${accountNumber}`}</Text>
        </View>

        <CurrencyView amount={balance} />
      </Pressable>
    </Link>
  );
};

export default AccountSummaryCard;
