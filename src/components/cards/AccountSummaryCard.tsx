import { View, Text, Pressable } from "react-native";
import React from "react";
import { CurrencyView } from "@/components";
import { Link } from "expo-router";
import { sortCodeFormatter } from "@/libs/utils";
import { Account } from "@/schema";

// Todo: click to see account details

type AccountSummaryCardProps = {
  // id: string;
  // accountType: string;
  // balance: number;
  // sortCode: string;
  // accountNumber: string;
} & Pick<
  Account,
  "id" | "accountName" | "balance" | "sortCode" | "accountNumber"
>;
const AccountSummaryCard = ({
  id,
  accountName,
  balance,
  sortCode,
  accountNumber,
}: AccountSummaryCardProps) => {
  const sortCodeFormatted = sortCodeFormatter(sortCode);

  return (
    <Link asChild href={`/account/${id}?name=${accountName}`}>
      <Pressable className="flex-row items-center justify-between rounded-xl bg-white p-5">
        <View>
          <Text className="text-lg font-semibold">{accountName}</Text>
          <Text className="text-sm font-light">{`${sortCodeFormatted} / ${accountNumber}`}</Text>
        </View>

        <CurrencyView amount={balance} />
      </Pressable>
    </Link>
  );
};

export default AccountSummaryCard;
