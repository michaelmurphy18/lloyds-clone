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
      className={cn("flex-col items-center w-full h-full gap-y-3", className)}
      {...props}
    >
      <View className="bg-green-500 w-4/5 aspect-card rounded-xl p-4 justify-between shadow shadow-gray-400">
        <Text className="uppercase font-semibold text-lg">Lloyds bank</Text>
        <Text className="text-lg text-center font-semibold">
          {accountNumber}
        </Text>
        <View className="flex-row items-baseline justify-between">
          <Text className="uppercase font-light text-sm">{cardHolder}</Text>
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
      <Text className="capitalize font-medium">{accountType}</Text>
    </View>
  );
};

export default LCBankCard;
