import { View, Text, StyleSheet, ViewProps } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { cn } from "@/libs/utils";

type RedirectBanner = {
  title: string;
  description: string;
  action: string;
  icon: string;
} & ViewProps;

// Todo: click to see credit score
const RedirectBanner = ({
  title,
  description,
  action,
  icon,
  className,
}: RedirectBanner) => {
  return (
    <View
      className={cn(
        "relative max-h-[30%] gap-y-2 rounded-xl bg-green-600 p-5",
        className,
      )}
    >
      <Text className="text-lg font-semibold capitalize">{title}</Text>
      <Text className="max-w-[75%] text-sm font-light tracking-wide">
        {description}
      </Text>
      <View className="flex-row items-center gap-x-2">
        <Text className="font-semibold">{action}</Text>
        <FontAwesome name="arrow-circle-right" size={24} color="black" />
      </View>
      <View className="h-[12%]" />
      <Image source={icon} style={styles.creditScoreImage} />
    </View>
  );
};

export default RedirectBanner;

const styles = StyleSheet.create({
  creditScoreImage: {
    width: 96,
    height: 96,
    borderRadius: 100,
    position: "absolute",
    right: 0,
    bottom: 0,
    marginEnd: 10,
    marginBottom: 10,
  },
});
