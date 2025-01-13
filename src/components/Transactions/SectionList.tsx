import { cn, formatCurrency } from "@/libs/utils";
import { Transaction, TransactionSection } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import React, { forwardRef } from "react";
import { SectionList, SectionListProps, View, Text } from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";
import { Image } from "expo-image";

const AnimatedSectionList = Animated.createAnimatedComponent(
  SectionList<Transaction, TransactionSection>,
);

type TransactionSectionListProps = {
  sections: TransactionSection[];
} & AnimatedProps<SectionListProps<Transaction, TransactionSection>>;

const TransactionSectionList = forwardRef<
  SectionList<Transaction, TransactionSection>,
  TransactionSectionListProps
>(
  (
    {
      sections,
      // onScroll,
      ...props
    },
    ref,
  ) => {
    return (
      <AnimatedSectionList
        {...props}
        ref={ref}
        className="h-full w-full"
        contentContainerClassName="py-3"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        sections={sections}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View className="border-b-hairline border-b-gray-500 bg-white p-2">
            <Text className="text-sm">
              {new Date(section.date).toDateString()}
            </Text>
          </View>
        )}
        SectionSeparatorComponent={({ leadingItem }) =>
          leadingItem && <View className="h-2" />
        }
        renderItem={({ item, index }) => (
          <View className="relative flex-row items-center gap-x-2 bg-white p-4 active:bg-black/5">
            <Image
              source={require("@assets/images/icon.png")}
              style={{ width: 50, height: 50, borderRadius: 100 }}
            />
            <Text className="text-lg">{item.payee.name}</Text>
            <View className="flex-1" />
            <View className="items-end gap-y-1">
              <Text className={cn(item.type === "deposit" && "text-green-800")}>
                <Text>{item.type === "deposit" ? "+ " : "- "}</Text>
                <Text>{formatCurrency(Math.abs(item.amount))}</Text>
              </Text>
              <Text className="text-xs">
                {formatCurrency(item.balanceAfter)}
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
            {item.type === "deposit" && (
              <View className="absolute h-4/5 w-1 translate-y-1/2 bg-green-500" />
            )}
          </View>
        )}
      />
    );
  },
);

export default TransactionSectionList;
TransactionSectionList.displayName = "TransactionSectionList";
