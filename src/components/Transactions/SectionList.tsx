import { Transaction, TransactionSection } from "@/types";
import React, { forwardRef } from "react";
import { SectionList, SectionListProps, View, Text } from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";
import BaseListItem from "./BaseListItem";

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
        renderItem={({ item, index }) => <BaseListItem transaction={item} />}
      />
    );
  },
);

export default TransactionSectionList;
TransactionSectionList.displayName = "TransactionSectionList";
