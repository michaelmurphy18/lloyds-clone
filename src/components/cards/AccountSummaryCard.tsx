import { View, Text, Pressable } from "react-native";
import React from "react";
import { CurrencyView } from "@/components";
import { Link } from "expo-router";
import { Account } from "@/schema";
import { useAccountsQuery } from "@/hooks";
import { SkeletonLoader } from "../ui";

type AccountSummaryCardProps = Pick<
  Account,
  "id" | "accountName" | "balance" | "sortCode" | "accountNumber"
>;

const Cards = ({ id, count }: { id: string; count: number }) => {
  const { accountsQuery } = useAccountsQuery({ id });

  if (accountsQuery.isPending || accountsQuery.isError) {
    return Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} />
    ));
  }

  return accountsQuery.data.map((account) => (
    <Card {...account} key={account.id} />
  ));
};

const Card = ({
  id,
  accountName,
  balance,
  sortCode,
  accountNumber,
}: AccountSummaryCardProps) => {
  return (
    <Link asChild href={`/account/${id}?name=${accountName}`}>
      <Pressable className="flex-row items-center justify-between rounded-xl bg-white p-5">
        <View>
          <Text className="text-lg font-semibold">{accountName}</Text>
          <Text className="text-sm font-light">{`${sortCode} / ${accountNumber}`}</Text>
        </View>

        <CurrencyView amount={balance} />
      </Pressable>
    </Link>
  );
};

const Skeleton = () => {
  return (
    <View className="h-[78] rounded-xl bg-white p-5">
      <SkeletonLoader>
        <View className="w-full flex-row items-center justify-between">
          <View className="flex-1 flex-col gap-y-2">
            <View className="h-5 w-1/4 rounded-full bg-black" />
            <View className="h-3.5 w-1/2 rounded-full bg-black" />
          </View>
          <View className="h-7 w-1/4 rounded-full bg-black" />
        </View>
      </SkeletonLoader>
    </View>
  );
};

export default {
  Cards,
  Card,
  Skeleton,
};
