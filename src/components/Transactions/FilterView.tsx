import { cn } from "@/libs/utils";
import { TransactionType } from "@/types";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Pressable, Text } from "react-native";

type TransactionFilterViewProps = {
  filter: (type: TransactionType | null) => void;
};
const TransactionFilterView = ({ filter }: TransactionFilterViewProps) => {
  const [toggle, setToggle] = useState<{
    deposit: boolean;
    withdrawal: boolean;
  }>({
    deposit: false,
    withdrawal: false,
  });

  const handleToggle = (type: TransactionType) => {
    setToggle((prev) => {
      // Update toggle state
      const updatedToggle = {
        deposit: type === "deposit" ? !prev.deposit : false,
        withdrawal: type === "withdrawal" ? !prev.withdrawal : false,
      };

      // Determine the filter value
      const activeType: TransactionType | null = updatedToggle.deposit
        ? "deposit"
        : updatedToggle.withdrawal
          ? "withdrawal"
          : null;

      filter(activeType); // Pass the appropriate filter value
      return updatedToggle; // Update state
    });
  };

  return (
    <View className="flex-row items-center gap-x-3 bg-white p-4">
      <Pressable
        onPress={() => handleToggle("deposit")}
        className={cn(
          "rounded-md border border-gray-600 px-7 py-2 active:bg-gray-200",
          toggle.deposit && "bg-black",
        )}
      >
        <Text className={cn("text-sm", toggle.deposit && "text-white")}>
          In
        </Text>
      </Pressable>
      <Pressable
        onPress={() => handleToggle("withdrawal")}
        className={cn(
          "rounded-md border border-gray-600 px-7 py-2 active:bg-gray-200",
          toggle.withdrawal && "bg-black",
        )}
      >
        <Text className={cn("text-sm", toggle.withdrawal && "text-white")}>
          Out
        </Text>
      </Pressable>
      <View className="flex-1" />
      <AntDesign name="download" size={24} color="black" />
      <EvilIcons name="search" size={30} color="black" />
    </View>
  );
};

export default TransactionFilterView;
