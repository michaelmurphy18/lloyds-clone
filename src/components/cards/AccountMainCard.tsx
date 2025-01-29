import { View, Text, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { CurrencyView } from "@/components";
import { sortCodeFormatter } from "@/libs/utils";
import { accountTypeLabels } from "@/constants";
import { Button } from "../ui";

type AccountMainCardProps = {
  balance: number;
  sortCode: string;
  accountNumber: string;
  accountType: string;
  id: string;
};

const AccountMainCard = ({
  balance,
  sortCode,
  accountNumber,
  accountType,
  id,
}: AccountMainCardProps) => {
  const sortCodeFormatted = sortCodeFormatter(sortCode);

  return (
    <View className="overflow-hidden rounded-xl bg-white">
      <Link
        href={{
          pathname: "/account/[id]",
          params: { id },
        }}
        asChild
      >
        <Pressable className="flex-row justify-between p-4 active:bg-black/10">
          <View>
            <Text className="font-semibold">Classic</Text>
            <Text className="text-sm font-light">{`${sortCodeFormatted} / ${accountNumber}`}</Text>
            <CurrencyView amount={balance} className="mt-2" />
          </View>
          <Button size="icon" variant="ghost" onPress={() => {}}>
            <Feather name="more-horizontal" size={24} color="black" />
          </Button>
        </Pressable>
      </Link>
      <View className="flex-row overflow-hidden rounded-b-xl border-t border-gray-300">
        <Link href={"/(root)/(tabs)/(payment)"} asChild>
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

export default AccountMainCard;
