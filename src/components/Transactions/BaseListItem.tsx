import { Link } from "expo-router";
import { Pressable, View, Text } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { cn, formatCurrency } from "@/libs/utils";
import { Transaction } from "@/types";
import { memo } from "react";

const BaseListItem = ({ transaction }: { transaction: Transaction }) => {
  return (
    <Link
      asChild
      href={{
        pathname: "/transaction/[id]",
        params: { id: transaction.id },
      }}
    >
      <Pressable className="relative flex-row items-center gap-x-2 bg-white p-4 active:bg-black/5">
        <Image
          source={"https://avatar.iran.liara.run/public/12"}
          style={{ width: 50, height: 50, borderRadius: 100 }}
        />
        <Text className="text-lg">{transaction.payee.name}</Text>
        <View className="flex-1" />
        <View className="items-end gap-y-1">
          <Text
            className={cn(transaction.type === "deposit" && "text-green-800")}
          >
            <Text>{transaction.type === "deposit" ? "+ " : "- "}</Text>
            <Text>{formatCurrency(Math.abs(transaction.amount))}</Text>
          </Text>
          <Text className="text-xs">
            {formatCurrency(transaction.balanceAfter)}
          </Text>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
        {transaction.type === "deposit" && (
          <View className="absolute h-4/5 w-1 translate-y-1/2 rounded-sm bg-green-500" />
        )}
      </Pressable>
    </Link>
  );
};

export default memo(BaseListItem);
