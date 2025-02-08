import { View, Text, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { CurrencyView } from "@/components";
import { sortCodeFormatter } from "@/libs/utils";
import { Button, SkeletonLoader } from "../ui";
import { Account } from "@/schema";

type AccountMainCardProps = {} & Pick<
  Account,
  "accountName" | "accountNumber" | "id" | "balance" | "sortCode"
>;

const Card = ({
  id,
  balance,
  sortCode,
  accountName,
  accountNumber,
}: AccountMainCardProps) => {
  const sortCodeFormatted = sortCodeFormatter(sortCode);

  const query = JSON.stringify({
    id,
    balance,
    accountName,
    sortCode,
    accountNumber,
  });

  return (
    <View className="overflow-hidden rounded-xl bg-white">
      <Link href={`/account/${id}?name=${accountName}`} asChild>
        <Pressable className="flex-row justify-between p-4 active:bg-black/10">
          <View>
            <Text className="font-semibold">{accountName}</Text>
            <Text className="text-sm font-light">{`${sortCodeFormatted} / ${accountNumber}`}</Text>
            <CurrencyView amount={balance} className="mt-2" />
          </View>
          <Button size="icon" variant="ghost" onPress={() => {}}>
            <Feather name="more-horizontal" size={24} color="black" />
          </Button>
        </Pressable>
      </Link>
      <View className="flex-row overflow-hidden rounded-b-xl border-t border-gray-300">
        <Link href={`/(root)/(modals)/(payment)?query=${query}`} asChild>
          <Pressable className="flex-1 items-center py-4 active:bg-gray-200">
            <Text>Pay & Transfer</Text>
          </Pressable>
        </Link>
        <View className="w-px bg-gray-300" />
        <Link href={"/"} asChild>
          <Pressable className="flex-1 items-center py-4 active:bg-gray-200">
            <Text>Regular payments</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const Skeleton = () => {
  return (
    <View className="overflow-hidden rounded-xl bg-white">
      <SkeletonLoader height={140}>
        <View className="flex-1 justify-between">
          <View className="flex-col gap-y-1 p-4">
            <View className="h-4 w-1/3 rounded-full bg-white" />
            <View className="h-3 w-1/2 rounded-full bg-white" />
            <View className="mt-2 h-6 w-1/6 rounded-full bg-white" />
          </View>
          <View className="h-12 bg-white" />
        </View>
      </SkeletonLoader>
    </View>
  );
};

export const AccountMain = {
  Card,
  Skeleton,
};
