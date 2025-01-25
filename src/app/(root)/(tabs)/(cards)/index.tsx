import { View, Text, SectionList, Pressable } from "react-native";
import React from "react";
import {
  CardManagementData,
  CardManagementSection,
  type CardManagementItem,
} from "@/constants";
import { cn } from "@/libs/utils";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function CardPage() {
  const renderItem = ({
    item,
    index,
    section,
  }: {
    item: CardManagementItem;
    section: CardManagementSection;
    index: number;
  }) => {
    const firstItem = index === 0;
    const lastItem = index === section.data.length - 1;

    return (
      <Link href={item.href} asChild>
        <Pressable
          className={cn(
            "flex-row items-center gap-x-3 bg-white p-5",
            lastItem && "rounded-b-xl",
            firstItem && "rounded-t-xl",
          )}
        >
          {/* <FontAwesome name={item.icon} size={24} color="black" /> */}
          <Text>{item.label}</Text>
          <View className="flex-1" />
          <FontAwesome name="angle-right" size={24} color="black" />
        </Pressable>
      </Link>
    );
  };

  const renderSectionHeader = ({
    section,
  }: {
    section: CardManagementSection;
  }) => {
    return <Text className="mt-4 font-semibold">{section.subtitle}</Text>;
  };

  return (
    <SectionList
      contentContainerClassName="px-5"
      sections={CardManagementData}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      SectionSeparatorComponent={() => <View className="h-4" />}
      ItemSeparatorComponent={() => (
        <View className="border-b border-b-gray-200" />
      )}
      stickySectionHeadersEnabled={false}
    />
  );
}
