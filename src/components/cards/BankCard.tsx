import { View, Text, ViewProps } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { cn } from "@/libs/utils";
import { CardProviders, ProvidersWithIcon } from "@/types";

const LCBankCard = ({
  cardHolder,
  accountNumber,
  accountType,
  provider = "visa",
  cardType = "debit",
  className,
  ...props
}: {
  cardHolder: string;
  accountType: string;
  accountNumber: string;
  provider: CardProviders;
  cardType: "debit" | "credit";
} & ViewProps) => {
  return (
    <View
      className={cn("h-full w-full flex-col items-center gap-y-3", className)}
      {...props}
    >
      <View className="aspect-card w-4/5 justify-between rounded-xl bg-green-500 p-4 shadow shadow-gray-400">
        <Text className="text-lg font-semibold uppercase">Lloyds bank</Text>
        <Text className="text-center text-lg font-semibold">
          {accountNumber}
        </Text>
        <View className="flex-row items-baseline justify-between">
          <Text className="text-sm font-light uppercase">{cardHolder}</Text>
          <View className="relative items-end">
            <FontAwesome
              name={ProvidersWithIcon.get(provider)}
              size={50}
              color="black"
            />
            {/* <Text className="absolute bottom-1 right-1 text-green-300 font-semibold text-[10px]">
              {cardType}
            </Text> */}
          </View>
        </View>
      </View>
      <Text className="font-medium capitalize">{accountType}</Text>
    </View>
  );
};

export default LCBankCard;
